"""
Skill Comparator Service

Compares user skills against job requirements and calculates skill gaps.
"""

import logging
from typing import Dict, List, Tuple
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class SkillComparator:
    """Service for comparing user skills with job requirements"""
    
    def __init__(self):
        pass
    
    def compare_skills(self, user_skills: List[Dict], job_analysis: Dict) -> Dict:
        """
        Compare user skills against job requirements
        
        Args:
            user_skills: List of user skills with proficiency levels
            job_analysis: Job analysis result from JobAnalyzer
            
        Returns:
            Dictionary containing skill comparison results
        """
        try:
            job_skills = job_analysis.get('required_skills', [])
            
            # Calculate confidence score
            confidence_score = self.calculate_confidence_score(user_skills, job_skills)
            
            # Identify skill gaps
            missing_skills = self.identify_skill_gaps(user_skills, job_skills)
            
            # Calculate learning time estimates
            total_learning_time = sum(skill.get('learning_time_days', 0) for skill in missing_skills)
            
            # Determine job readiness status
            readiness_status = self._determine_readiness_status(confidence_score)
            
            return {
                'confidence_score': confidence_score,
                'readiness_status': readiness_status,
                'missing_skills': missing_skills,
                'total_learning_time_days': total_learning_time,
                'skill_matches': self._find_skill_matches(user_skills, job_skills),
                'analysis_timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error in skill comparison: {str(e)}")
            return self._create_empty_comparison()
    
    def calculate_confidence_score(self, user_skills: List[Dict], job_skills: List[Dict]) -> int:
        """
        Calculate confidence score (0-100%) based on skill match
        
        Args:
            user_skills: User's current skills
            job_skills: Required job skills
            
        Returns:
            Confidence score as integer percentage
        """
        if not job_skills:
            return 100  # No requirements means 100% match
        
        # Create user skills lookup
        user_skill_map = {skill['name'].lower(): skill.get('proficiency_level', 5) for skill in user_skills}
        
        total_weight = 0
        matched_weight = 0
        
        for job_skill in job_skills:
            skill_name = job_skill['name'].lower()
            required_proficiency = job_skill.get('proficiency_required', 7)
            priority = job_skill.get('priority', 'important')
            
            # Weight based on priority
            weight = self._get_priority_weight(priority)
            total_weight += weight
            
            # Check if user has this skill
            if skill_name in user_skill_map:
                user_proficiency = user_skill_map[skill_name]
                
                # Calculate match percentage based on proficiency gap
                proficiency_match = min(1.0, user_proficiency / required_proficiency)
                matched_weight += weight * proficiency_match
        
        if total_weight == 0:
            return 100
        
        confidence_percentage = (matched_weight / total_weight) * 100
        return max(0, min(100, int(confidence_percentage)))
    
    def identify_skill_gaps(self, user_skills: List[Dict], job_skills: List[Dict]) -> List[Dict]:
        """
        Identify missing or insufficient skills
        
        Args:
            user_skills: User's current skills
            job_skills: Required job skills
            
        Returns:
            List of missing skills with learning estimates
        """
        user_skill_map = {skill['name'].lower(): skill.get('proficiency_level', 0) for skill in user_skills}
        missing_skills = []
        
        for job_skill in job_skills:
            skill_name = job_skill['name']
            skill_name_lower = skill_name.lower()
            required_proficiency = job_skill.get('proficiency_required', 7)
            priority = job_skill.get('priority', 'important')
            
            user_proficiency = user_skill_map.get(skill_name_lower, 0)
            
            # Check if skill is missing or insufficient
            if user_proficiency < required_proficiency:
                proficiency_gap = required_proficiency - user_proficiency
                learning_time = self._estimate_learning_time(skill_name, proficiency_gap)
                
                missing_skills.append({
                    'skill_name': skill_name,
                    'current_proficiency': user_proficiency,
                    'required_proficiency': required_proficiency,
                    'proficiency_gap': proficiency_gap,
                    'priority': priority,
                    'impact_level': self._determine_impact_level(priority, proficiency_gap),
                    'learning_time_days': learning_time,
                    'estimated_completion_date': self._calculate_completion_date(learning_time)
                })
        
        # Sort by impact level and priority
        return self.prioritize_missing_skills(missing_skills)
    
    def prioritize_missing_skills(self, missing_skills: List[Dict]) -> List[Dict]:
        """
        Prioritize missing skills by impact on job readiness
        
        Args:
            missing_skills: List of missing skills
            
        Returns:
            Sorted list of missing skills by priority
        """
        priority_order = {'critical': 0, 'important': 1, 'optional': 2}
        
        def sort_key(skill):
            priority_score = priority_order.get(skill['priority'], 3)
            proficiency_gap = skill['proficiency_gap']
            return (priority_score, -proficiency_gap)  # Negative gap for descending order
        
        return sorted(missing_skills, key=sort_key)
    
    def _get_priority_weight(self, priority: str) -> float:
        """Get weight multiplier based on skill priority"""
        weights = {
            'critical': 1.0,
            'important': 0.7,
            'optional': 0.3
        }
        return weights.get(priority, 0.7)
    
    def _determine_impact_level(self, priority: str, proficiency_gap: int) -> str:
        """Determine impact level based on priority and proficiency gap"""
        if priority == 'critical':
            return 'High'
        elif priority == 'important' and proficiency_gap >= 5:
            return 'High'
        elif priority == 'important':
            return 'Medium'
        else:
            return 'Low'
    
    def _estimate_learning_time(self, skill_name: str, proficiency_gap: int) -> int:
        """
        Estimate learning time based on skill complexity and proficiency gap
        
        Args:
            skill_name: Name of the skill
            proficiency_gap: Difference between current and required proficiency
            
        Returns:
            Estimated learning time in days
        """
        # Base learning time per proficiency point
        base_days_per_point = {
            # Frontend technologies
            'html': 2, 'css': 3, 'javascript': 5, 'react': 7, 'vue': 6, 'angular': 8,
            
            # Backend technologies
            'python': 5, 'java': 7, 'node.js': 6, 'django': 6, 'flask': 4, 'express': 5,
            
            # AI/ML (more complex)
            'machine learning': 12, 'tensorflow': 10, 'pytorch': 10, 'data science': 10,
            
            # DevOps
            'docker': 4, 'kubernetes': 8, 'aws': 10, 'azure': 9, 'terraform': 6,
            
            # Database
            'sql': 4, 'mongodb': 5, 'postgresql': 6, 'redis': 3
        }
        
        skill_lower = skill_name.lower()
        
        # Find base learning time
        base_time = base_days_per_point.get(skill_lower, 5)  # Default 5 days per point
        
        # Check for partial matches
        if base_time == 5:  # Default case, try partial matching
            for known_skill, time in base_days_per_point.items():
                if known_skill in skill_lower or skill_lower in known_skill:
                    base_time = time
                    break
        
        # Calculate total time with proficiency gap
        total_time = base_time * proficiency_gap
        
        # Apply realistic bounds (minimum 1 day, maximum 90 days per skill)
        return max(1, min(90, total_time))
    
    def _calculate_completion_date(self, learning_time_days: int) -> str:
        """Calculate estimated completion date"""
        completion_date = datetime.now() + timedelta(days=learning_time_days)
        return completion_date.strftime('%Y-%m-%d')
    
    def _find_skill_matches(self, user_skills: List[Dict], job_skills: List[Dict]) -> List[Dict]:
        """Find skills that match between user and job requirements"""
        user_skill_map = {skill['name'].lower(): skill for skill in user_skills}
        matches = []
        
        for job_skill in job_skills:
            skill_name_lower = job_skill['name'].lower()
            if skill_name_lower in user_skill_map:
                user_skill = user_skill_map[skill_name_lower]
                matches.append({
                    'skill_name': job_skill['name'],
                    'user_proficiency': user_skill.get('proficiency_level', 0),
                    'required_proficiency': job_skill.get('proficiency_required', 7),
                    'match_percentage': min(100, int((user_skill.get('proficiency_level', 0) / job_skill.get('proficiency_required', 7)) * 100))
                })
        
        return matches
    
    def _determine_readiness_status(self, confidence_score: int) -> str:
        """Determine job readiness status based on confidence score"""
        if confidence_score >= 80:
            return 'Ready to Apply'
        elif confidence_score >= 60:
            return 'Almost Ready'
        elif confidence_score >= 40:
            return 'Needs Preparation'
        else:
            return 'Not Ready Yet'
    
    def _create_empty_comparison(self) -> Dict:
        """Create empty comparison result"""
        return {
            'confidence_score': 0,
            'readiness_status': 'Analysis Failed',
            'missing_skills': [],
            'total_learning_time_days': 0,
            'skill_matches': [],
            'analysis_timestamp': datetime.now().isoformat()
        }