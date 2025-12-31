"""
Job Analyzer Service

Integrates with Gemini API to parse job postings and extract structured skill requirements.
"""

import json
import logging
import requests
from typing import Dict, List, Optional
from config import Config

logger = logging.getLogger(__name__)

class JobAnalyzer:
    """Service for analyzing job postings using Gemini API"""
    
    def __init__(self):
        self.api_key = Config.GEMINI_API_KEY
        self.api_url = Config.GEMINI_API_URL
        self.timeout = Config.API_TIMEOUT
        
        if not self.api_key:
            logger.warning("Gemini API key not configured. Job analysis will use fallback methods.")
    
    def extract_job_skills(self, job_posting_text: str) -> Dict:
        """
        Extract structured skill requirements from job posting text
        
        Args:
            job_posting_text: Raw job posting content
            
        Returns:
            Dictionary containing extracted job information
        """
        try:
            if not self.api_key:
                return self._fallback_skill_extraction(job_posting_text)
            
            prompt = self._build_job_analysis_prompt(job_posting_text)
            response = self._call_gemini_api(prompt)
            
            if response:
                return self._parse_gemini_response(response)
            else:
                return self._fallback_skill_extraction(job_posting_text)
                
        except Exception as e:
            logger.error(f"Error in job skill extraction: {str(e)}")
            return self._fallback_skill_extraction(job_posting_text)
    
    def categorize_skills(self, skills_list: List[str]) -> Dict[str, List[str]]:
        """
        Categorize skills by technology domain
        
        Args:
            skills_list: List of skill names
            
        Returns:
            Dictionary with skills grouped by domain
        """
        categories = {
            'frontend': [],
            'backend': [],
            'ai_ml': [],
            'devops': [],
            'database': [],
            'mobile': [],
            'other': []
        }
        
        # Skill categorization mappings
        skill_mappings = {
            'frontend': ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'sass', 'tailwind'],
            'backend': ['python', 'java', 'node.js', 'express', 'django', 'flask', 'spring', 'php', 'ruby'],
            'ai_ml': ['machine learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'ai'],
            'devops': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'terraform', 'ansible'],
            'database': ['sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch'],
            'mobile': ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios']
        }
        
        for skill in skills_list:
            skill_lower = skill.lower()
            categorized = False
            
            for category, keywords in skill_mappings.items():
                if any(keyword in skill_lower for keyword in keywords):
                    categories[category].append(skill)
                    categorized = True
                    break
            
            if not categorized:
                categories['other'].append(skill)
        
        return categories
    
    def estimate_skill_difficulty(self, skill_name: str) -> int:
        """
        Estimate learning time for a skill in days
        
        Args:
            skill_name: Name of the skill
            
        Returns:
            Estimated learning time in days
        """
        # Basic difficulty estimation based on skill complexity
        difficulty_map = {
            # Frontend (easier to start)
            'html': 7, 'css': 14, 'javascript': 30, 'react': 45, 'vue': 40, 'angular': 60,
            
            # Backend (moderate complexity)
            'python': 30, 'java': 45, 'node.js': 35, 'django': 40, 'flask': 25, 'express': 30,
            
            # AI/ML (higher complexity)
            'machine learning': 90, 'tensorflow': 60, 'pytorch': 60, 'data science': 75,
            
            # DevOps (moderate to high)
            'docker': 20, 'kubernetes': 45, 'aws': 60, 'azure': 55, 'terraform': 35,
            
            # Database (moderate)
            'sql': 25, 'mongodb': 30, 'postgresql': 35, 'redis': 20
        }
        
        skill_lower = skill_name.lower()
        
        # Check for exact matches first
        if skill_lower in difficulty_map:
            return difficulty_map[skill_lower]
        
        # Check for partial matches
        for known_skill, days in difficulty_map.items():
            if known_skill in skill_lower or skill_lower in known_skill:
                return days
        
        # Default estimation based on skill name length and complexity indicators
        if any(word in skill_lower for word in ['advanced', 'senior', 'expert', 'architect']):
            return 60
        elif any(word in skill_lower for word in ['basic', 'junior', 'entry']):
            return 14
        else:
            return 30  # Default moderate difficulty
    
    def _build_job_analysis_prompt(self, job_text: str) -> str:
        """Build structured prompt for Gemini API job analysis"""
        return f"""
        Analyze this job posting and extract structured information. Return a JSON object with the following structure:

        {{
            "company_name": "extracted company name or null",
            "position_title": "extracted job title",
            "salary_range": {{
                "min_salary": number or null,
                "max_salary": number or null,
                "currency": "INR" or detected currency
            }},
            "experience_level": "junior/mid/senior or null",
            "required_skills": [
                {{
                    "name": "skill name",
                    "priority": "critical/important/optional",
                    "proficiency_required": 1-10 scale
                }}
            ],
            "preferred_skills": ["list of nice-to-have skills"],
            "technology_domains": ["frontend", "backend", "ai_ml", "devops", etc.]
        }}

        Job Posting:
        {job_text}

        Focus on technical skills and provide realistic proficiency levels. For Indian job market, prioritize INR currency detection.
        """
    
    def _call_gemini_api(self, prompt: str) -> Optional[Dict]:
        """Make API call to Gemini"""
        try:
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.api_key}'
            }
            
            payload = {
                'contents': [{
                    'parts': [{'text': prompt}]
                }],
                'generationConfig': {
                    'temperature': 0.1,
                    'maxOutputTokens': 2048
                }
            }
            
            response = requests.post(
                self.api_url,
                headers=headers,
                json=payload,
                timeout=self.timeout
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Gemini API error: {response.status_code} - {response.text}")
                return None
                
        except requests.exceptions.Timeout:
            logger.error("Gemini API request timed out")
            return None
        except Exception as e:
            logger.error(f"Gemini API call failed: {str(e)}")
            return None
    
    def _parse_gemini_response(self, response: Dict) -> Dict:
        """Parse Gemini API response and extract job analysis"""
        try:
            # Extract text content from Gemini response
            content = response.get('candidates', [{}])[0].get('content', {})
            text_content = content.get('parts', [{}])[0].get('text', '')
            
            # Try to parse as JSON
            if text_content:
                # Clean up the response (remove markdown formatting if present)
                clean_text = text_content.strip()
                if clean_text.startswith('```json'):
                    clean_text = clean_text[7:]
                if clean_text.endswith('```'):
                    clean_text = clean_text[:-3]
                
                return json.loads(clean_text.strip())
            
            return self._create_empty_analysis()
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse Gemini response as JSON: {str(e)}")
            return self._create_empty_analysis()
        except Exception as e:
            logger.error(f"Error parsing Gemini response: {str(e)}")
            return self._create_empty_analysis()
    
    def _fallback_skill_extraction(self, job_text: str) -> Dict:
        """Fallback method for skill extraction when API is unavailable"""
        logger.info("Using fallback skill extraction method")
        
        # Basic keyword-based skill extraction
        common_skills = [
            'python', 'java', 'javascript', 'react', 'node.js', 'sql', 'aws', 'docker',
            'kubernetes', 'machine learning', 'tensorflow', 'django', 'flask', 'angular',
            'vue', 'mongodb', 'postgresql', 'redis', 'git', 'linux', 'html', 'css'
        ]
        
        job_text_lower = job_text.lower()
        found_skills = []
        
        for skill in common_skills:
            if skill in job_text_lower:
                found_skills.append({
                    'name': skill,
                    'priority': 'important',
                    'proficiency_required': 7
                })
        
        return {
            'company_name': None,
            'position_title': 'Software Developer',
            'salary_range': {'min_salary': None, 'max_salary': None, 'currency': 'INR'},
            'experience_level': 'mid',
            'required_skills': found_skills,
            'preferred_skills': [],
            'technology_domains': ['backend', 'frontend']
        }
    
    def _create_empty_analysis(self) -> Dict:
        """Create empty analysis structure"""
        return {
            'company_name': None,
            'position_title': None,
            'salary_range': {'min_salary': None, 'max_salary': None, 'currency': 'INR'},
            'experience_level': None,
            'required_skills': [],
            'preferred_skills': [],
            'technology_domains': []
        }