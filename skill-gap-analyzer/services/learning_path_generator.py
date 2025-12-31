"""
Learning Path Generator Service

Integrates with NotebookLM to generate personalized learning roadmaps and course recommendations.
"""

import json
import logging
import requests
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from config import Config

logger = logging.getLogger(__name__)

class LearningPathGenerator:
    """Service for generating personalized learning paths using NotebookLM"""
    
    def __init__(self):
        self.notebooklm_api_key = Config.NOTEBOOKLM_API_KEY
        self.notebooklm_url = Config.NOTEBOOKLM_URL
        self.timeout = Config.API_TIMEOUT
        
        if not self.notebooklm_api_key:
            logger.warning("NotebookLM API key not configured. Using fallback learning path generation.")
    
    def generate_path(self, skill_comparison: Dict) -> Dict:
        """
        Generate personalized learning path based on skill gaps
        
        Args:
            skill_comparison: Result from SkillComparator
            
        Returns:
            Dictionary containing structured learning path
        """
        try:
            missing_skills = skill_comparison.get('missing_skills', [])
            
            if not missing_skills:
                return self._create_no_gaps_path()
            
            # Generate learning path using NotebookLM or fallback
            if self.notebooklm_api_key:
                learning_path = self._generate_with_notebooklm(missing_skills)
            else:
                learning_path = self._generate_fallback_path(missing_skills)
            
            # Add course recommendations
            learning_path['milestones'] = self._add_course_recommendations(learning_path['milestones'])
            
            # Calculate confidence projection
            learning_path['confidence_projection'] = self._calculate_confidence_projection(
                skill_comparison['confidence_score'], 
                missing_skills
            )
            
            return learning_path
            
        except Exception as e:
            logger.error(f"Error generating learning path: {str(e)}")
            return self._create_empty_path()
    
    def _generate_with_notebooklm(self, missing_skills: List[Dict]) -> Dict:
        """Generate learning path using NotebookLM API"""
        try:
            prompt = self._build_learning_path_prompt(missing_skills)
            response = self._call_notebooklm_api(prompt)
            
            if response:
                return self._parse_notebooklm_response(response, missing_skills)
            else:
                return self._generate_fallback_path(missing_skills)
                
        except Exception as e:
            logger.error(f"NotebookLM API error: {str(e)}")
            return self._generate_fallback_path(missing_skills)
    
    def _generate_fallback_path(self, missing_skills: List[Dict]) -> Dict:
        """Generate learning path using fallback logic"""
        logger.info("Using fallback learning path generation")
        
        # Sort skills by dependency and impact
        ordered_skills = self._order_skills_by_dependency(missing_skills)
        
        milestones = []
        current_date = datetime.now()
        
        for i, skill in enumerate(ordered_skills):
            milestone = {
                'week': i + 1,
                'skill_name': skill['skill_name'],
                'learning_objectives': self._get_learning_objectives(skill['skill_name']),
                'duration_days': skill['learning_time_days'],
                'start_date': current_date.strftime('%Y-%m-%d'),
                'end_date': (current_date + timedelta(days=skill['learning_time_days'])).strftime('%Y-%m-%d'),
                'priority': skill['priority'],
                'completion_criteria': self._get_completion_criteria(skill['skill_name']),
                'courses': []  # Will be populated by course recommendation service
            }
            
            milestones.append(milestone)
            current_date += timedelta(days=skill['learning_time_days'])
        
        total_duration = sum(skill['learning_time_days'] for skill in missing_skills)
        
        return {
            'total_duration_days': total_duration,
            'estimated_completion_date': (datetime.now() + timedelta(days=total_duration)).strftime('%Y-%m-%d'),
            'milestones': milestones,
            'learning_strategy': self._get_learning_strategy(missing_skills),
            'success_metrics': self._get_success_metrics()
        }
    
    def _order_skills_by_dependency(self, skills: List[Dict]) -> List[Dict]:
        """Order skills by learning dependency and impact"""
        # Define skill dependencies
        dependencies = {
            'html': [],
            'css': ['html'],
            'javascript': ['html', 'css'],
            'react': ['javascript'],
            'vue': ['javascript'],
            'angular': ['javascript'],
            'node.js': ['javascript'],
            'express': ['node.js'],
            'python': [],
            'django': ['python'],
            'flask': ['python'],
            'sql': [],
            'mongodb': [],
            'docker': [],
            'kubernetes': ['docker'],
            'aws': [],
            'machine learning': ['python'],
            'tensorflow': ['python', 'machine learning'],
            'pytorch': ['python', 'machine learning']
        }
        
        # Create dependency graph
        skill_names = [skill['skill_name'].lower() for skill in skills]
        ordered = []
        remaining = skills.copy()
        
        while remaining:
            # Find skills with no unmet dependencies
            ready_skills = []
            for skill in remaining:
                skill_deps = dependencies.get(skill['skill_name'].lower(), [])
                if all(dep in [s['skill_name'].lower() for s in ordered] or dep not in skill_names for dep in skill_deps):
                    ready_skills.append(skill)
            
            if not ready_skills:
                # No dependencies found, add by priority
                ready_skills = [max(remaining, key=lambda x: {'critical': 3, 'important': 2, 'optional': 1}.get(x['priority'], 0))]
            
            # Sort ready skills by priority and impact
            ready_skills.sort(key=lambda x: (
                {'critical': 0, 'important': 1, 'optional': 2}.get(x['priority'], 3),
                -x['proficiency_gap']
            ))
            
            # Add the highest priority skill
            next_skill = ready_skills[0]
            ordered.append(next_skill)
            remaining.remove(next_skill)
        
        return ordered
    
    def _add_course_recommendations(self, milestones: List[Dict]) -> List[Dict]:
        """Add course recommendations to each milestone"""
        for milestone in milestones:
            skill_name = milestone['skill_name']
            milestone['courses'] = self._get_course_recommendations(skill_name)
        
        return milestones
    
    def _get_course_recommendations(self, skill_name: str) -> List[Dict]:
        """Get course recommendations for a specific skill"""
        # This is a simplified version - in a real implementation,
        # this would integrate with course APIs (Udemy, Coursera, etc.)
        
        course_templates = {
            'python': [
                {
                    'title': 'Complete Python Bootcamp',
                    'provider': 'Udemy',
                    'duration': '40 hours',
                    'rating': 4.6,
                    'price_inr': 3499,
                    'language': 'English',
                    'url': 'https://www.udemy.com/course/complete-python-bootcamp/',
                    'is_free': False
                },
                {
                    'title': 'Python for Everybody Specialization',
                    'provider': 'Coursera',
                    'duration': '32 hours',
                    'rating': 4.8,
                    'price_inr': 0,
                    'language': 'English',
                    'url': 'https://www.coursera.org/specializations/python',
                    'is_free': True
                }
            ],
            'javascript': [
                {
                    'title': 'The Complete JavaScript Course',
                    'provider': 'Udemy',
                    'duration': '69 hours',
                    'rating': 4.7,
                    'price_inr': 3999,
                    'language': 'English',
                    'url': 'https://www.udemy.com/course/the-complete-javascript-course/',
                    'is_free': False
                },
                {
                    'title': 'JavaScript Algorithms and Data Structures',
                    'provider': 'freeCodeCamp',
                    'duration': '300 hours',
                    'rating': 4.9,
                    'price_inr': 0,
                    'language': 'English',
                    'url': 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
                    'is_free': True
                }
            ],
            'react': [
                {
                    'title': 'React - The Complete Guide',
                    'provider': 'Udemy',
                    'duration': '48 hours',
                    'rating': 4.6,
                    'price_inr': 4499,
                    'language': 'English',
                    'url': 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
                    'is_free': False
                }
            ]
        }
        
        skill_lower = skill_name.lower()
        courses = course_templates.get(skill_lower, [])
        
        # If no specific courses found, create generic recommendations
        if not courses:
            courses = [
                {
                    'title': f'Learn {skill_name}',
                    'provider': 'Multiple Platforms',
                    'duration': 'Varies',
                    'rating': 4.5,
                    'price_inr': 0,
                    'language': 'English',
                    'url': f'https://www.google.com/search?q=learn+{skill_name.replace(" ", "+")}+course',
                    'is_free': True
                }
            ]
        
        # Prioritize free courses for India market
        courses.sort(key=lambda x: (not x['is_free'], -x['rating']))
        
        return courses[:5]  # Return top 5 courses
    
    def _calculate_confidence_projection(self, current_confidence: int, missing_skills: List[Dict]) -> Dict[str, int]:
        """Calculate confidence score projection over time"""
        projection = {}
        total_days = sum(skill['learning_time_days'] for skill in missing_skills)
        
        if total_days == 0:
            return {'week_0': current_confidence}
        
        # Calculate weekly confidence improvements
        confidence_per_day = (100 - current_confidence) / total_days
        
        current_day = 0
        week = 0
        
        projection[f'week_{week}'] = current_confidence
        
        for skill in missing_skills:
            current_day += skill['learning_time_days']
            week = current_day // 7
            
            new_confidence = min(100, current_confidence + int(confidence_per_day * current_day))
            projection[f'week_{week}'] = new_confidence
        
        return projection
    
    def _get_learning_objectives(self, skill_name: str) -> List[str]:
        """Get learning objectives for a skill"""
        objectives_map = {
            'python': [
                'Understand Python syntax and basic programming concepts',
                'Work with data structures (lists, dictionaries, sets)',
                'Handle file operations and error handling',
                'Build simple applications and scripts'
            ],
            'javascript': [
                'Master JavaScript fundamentals and ES6+ features',
                'Understand DOM manipulation and event handling',
                'Work with asynchronous programming (Promises, async/await)',
                'Build interactive web applications'
            ],
            'react': [
                'Understand React components and JSX',
                'Master state management and props',
                'Implement hooks and lifecycle methods',
                'Build responsive single-page applications'
            ]
        }
        
        return objectives_map.get(skill_name.lower(), [
            f'Understand core concepts of {skill_name}',
            f'Apply {skill_name} in practical projects',
            f'Follow best practices and industry standards',
            f'Build portfolio projects using {skill_name}'
        ])
    
    def _get_completion_criteria(self, skill_name: str) -> List[str]:
        """Get completion criteria for a skill"""
        return [
            'Complete all course modules and assignments',
            'Build at least one practical project',
            'Pass skill assessment or quiz',
            'Demonstrate proficiency in real-world scenarios'
        ]
    
    def _get_learning_strategy(self, missing_skills: List[Dict]) -> Dict:
        """Get personalized learning strategy"""
        total_skills = len(missing_skills)
        critical_skills = len([s for s in missing_skills if s['priority'] == 'critical'])
        
        return {
            'approach': 'Sequential skill building with hands-on projects',
            'focus_areas': [
                'Critical skills first for immediate job readiness',
                'Practical projects to reinforce learning',
                'Regular progress assessment and adjustment'
            ],
            'time_management': {
                'daily_hours': 2,
                'weekly_hours': 14,
                'weekend_intensive': True
            },
            'success_tips': [
                'Practice coding daily, even if just 30 minutes',
                'Build projects to apply new skills immediately',
                'Join online communities for support and networking',
                'Take regular breaks to avoid burnout'
            ]
        }
    
    def _get_success_metrics(self) -> List[Dict]:
        """Get success metrics for tracking progress"""
        return [
            {
                'metric': 'Course Completion Rate',
                'target': '100%',
                'measurement': 'Percentage of courses completed'
            },
            {
                'metric': 'Project Portfolio',
                'target': '1 project per skill',
                'measurement': 'Number of completed projects'
            },
            {
                'metric': 'Skill Assessment Score',
                'target': '80%+',
                'measurement': 'Average score on skill assessments'
            },
            {
                'metric': 'Job Application Readiness',
                'target': '80%+ confidence score',
                'measurement': 'Updated confidence score after learning'
            }
        ]
    
    def _build_learning_path_prompt(self, missing_skills: List[Dict]) -> str:
        """Build prompt for NotebookLM learning path generation"""
        skills_text = "\n".join([
            f"- {skill['skill_name']} (Priority: {skill['priority']}, Gap: {skill['proficiency_gap']}/10, Time: {skill['learning_time_days']} days)"
            for skill in missing_skills
        ])
        
        return f"""
        Create a personalized learning roadmap for acquiring these skills:
        
        {skills_text}
        
        Generate a structured learning path with:
        1. Optimal skill learning sequence (considering dependencies)
        2. Weekly milestones with specific learning objectives
        3. Realistic timeline with completion dates
        4. Learning strategy tailored for working professionals in India
        5. Success metrics and progress tracking methods
        
        Focus on practical, project-based learning that builds job-ready skills.
        Consider the Indian job market and prioritize cost-effective learning resources.
        
        Return as structured JSON with milestones, timeline, and strategy.
        """
    
    def _call_notebooklm_api(self, prompt: str) -> Optional[Dict]:
        """Make API call to NotebookLM"""
        try:
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.notebooklm_api_key}'
            }
            
            payload = {
                'query': prompt,
                'research_depth': 'comprehensive',
                'output_format': 'structured_json'
            }
            
            response = requests.post(
                self.notebooklm_url,
                headers=headers,
                json=payload,
                timeout=self.timeout
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"NotebookLM API error: {response.status_code} - {response.text}")
                return None
                
        except requests.exceptions.Timeout:
            logger.error("NotebookLM API request timed out")
            return None
        except Exception as e:
            logger.error(f"NotebookLM API call failed: {str(e)}")
            return None
    
    def _parse_notebooklm_response(self, response: Dict, missing_skills: List[Dict]) -> Dict:
        """Parse NotebookLM API response"""
        try:
            # Extract learning path from NotebookLM response
            # This would depend on the actual NotebookLM API response format
            research_content = response.get('research_results', {})
            
            # For now, fall back to structured generation
            return self._generate_fallback_path(missing_skills)
            
        except Exception as e:
            logger.error(f"Error parsing NotebookLM response: {str(e)}")
            return self._generate_fallback_path(missing_skills)
    
    def _create_no_gaps_path(self) -> Dict:
        """Create learning path when no skill gaps exist"""
        return {
            'total_duration_days': 0,
            'estimated_completion_date': datetime.now().strftime('%Y-%m-%d'),
            'milestones': [],
            'message': 'Congratulations! You already have all the required skills for this job.',
            'recommendations': [
                'Consider applying for the position immediately',
                'Focus on interview preparation and portfolio enhancement',
                'Look for advanced courses to further improve your skills'
            ],
            'confidence_projection': {'week_0': 100}
        }
    
    def _create_empty_path(self) -> Dict:
        """Create empty learning path for error cases"""
        return {
            'total_duration_days': 0,
            'estimated_completion_date': datetime.now().strftime('%Y-%m-%d'),
            'milestones': [],
            'error': 'Failed to generate learning path',
            'confidence_projection': {}
        }