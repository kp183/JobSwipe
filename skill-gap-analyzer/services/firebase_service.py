"""
Firebase Service

Handles data persistence and retrieval using Firebase Realtime Database.
"""

import json
import logging
import uuid
from typing import Dict, List, Optional
from datetime import datetime

try:
    import firebase_admin
    from firebase_admin import credentials, db
    FIREBASE_AVAILABLE = True
except ImportError:
    FIREBASE_AVAILABLE = False
    logging.warning("Firebase Admin SDK not available. Using local storage fallback.")

from config import Config

logger = logging.getLogger(__name__)

class FirebaseService:
    """Service for Firebase Realtime Database operations"""
    
    def __init__(self):
        self.db_url = Config.FIREBASE_DATABASE_URL
        self.project_id = Config.FIREBASE_PROJECT_ID
        self.service_account_key = Config.FIREBASE_SERVICE_ACCOUNT_KEY
        
        # Local storage fallback
        self.local_storage = {}
        
        if FIREBASE_AVAILABLE and self.db_url and self.project_id:
            self._initialize_firebase()
        else:
            logger.warning("Firebase not configured. Using local storage fallback.")
            self.firebase_initialized = False
    
    def _initialize_firebase(self):
        """Initialize Firebase Admin SDK"""
        try:
            # Check if Firebase app is already initialized
            if not firebase_admin._apps:
                if self.service_account_key:
                    # Initialize with service account key
                    cred = credentials.Certificate(self.service_account_key)
                else:
                    # Initialize with default credentials (for Cloud Run deployment)
                    cred = credentials.ApplicationDefault()
                
                firebase_admin.initialize_app(cred, {
                    'databaseURL': self.db_url,
                    'projectId': self.project_id
                })
            
            self.firebase_initialized = True
            logger.info("Firebase initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {str(e)}")
            self.firebase_initialized = False
    
    def store_analysis(self, analysis_data: Dict) -> str:
        """
        Store job analysis results
        
        Args:
            analysis_data: Complete analysis results
            
        Returns:
            Analysis ID for retrieval
        """
        analysis_id = str(uuid.uuid4())
        
        # Add metadata
        analysis_data.update({
            'analysis_id': analysis_id,
            'created_at': datetime.now().isoformat(),
            'version': '1.0'
        })
        
        try:
            if self.firebase_initialized:
                ref = db.reference(f'analyses/{analysis_id}')
                ref.set(analysis_data)
                logger.info(f"Analysis stored in Firebase: {analysis_id}")
            else:
                # Fallback to local storage
                self.local_storage[f'analyses/{analysis_id}'] = analysis_data
                logger.info(f"Analysis stored locally: {analysis_id}")
            
            return analysis_id
            
        except Exception as e:
            logger.error(f"Error storing analysis: {str(e)}")
            # Fallback to local storage
            self.local_storage[f'analyses/{analysis_id}'] = analysis_data
            return analysis_id
    
    def get_analysis(self, analysis_id: str) -> Optional[Dict]:
        """
        Retrieve analysis results by ID
        
        Args:
            analysis_id: Analysis identifier
            
        Returns:
            Analysis data or None if not found
        """
        try:
            if self.firebase_initialized:
                ref = db.reference(f'analyses/{analysis_id}')
                data = ref.get()
                if data:
                    logger.info(f"Analysis retrieved from Firebase: {analysis_id}")
                    return data
            
            # Check local storage
            data = self.local_storage.get(f'analyses/{analysis_id}')
            if data:
                logger.info(f"Analysis retrieved from local storage: {analysis_id}")
                return data
            
            logger.warning(f"Analysis not found: {analysis_id}")
            return None
            
        except Exception as e:
            logger.error(f"Error retrieving analysis: {str(e)}")
            return None
    
    def store_user_profile(self, user_id: str, profile_data: Dict) -> bool:
        """
        Store or update user profile
        
        Args:
            user_id: User identifier
            profile_data: User profile information
            
        Returns:
            Success status
        """
        try:
            profile_data.update({
                'user_id': user_id,
                'updated_at': datetime.now().isoformat()
            })
            
            if self.firebase_initialized:
                ref = db.reference(f'users/{user_id}/profile')
                ref.set(profile_data)
                logger.info(f"User profile stored in Firebase: {user_id}")
            else:
                self.local_storage[f'users/{user_id}/profile'] = profile_data
                logger.info(f"User profile stored locally: {user_id}")
            
            return True
            
        except Exception as e:
            logger.error(f"Error storing user profile: {str(e)}")
            return False
    
    def get_user_profile(self, user_id: str) -> Optional[Dict]:
        """
        Retrieve user profile
        
        Args:
            user_id: User identifier
            
        Returns:
            User profile data or None if not found
        """
        try:
            if self.firebase_initialized:
                ref = db.reference(f'users/{user_id}/profile')
                data = ref.get()
                if data:
                    return data
            
            # Check local storage
            return self.local_storage.get(f'users/{user_id}/profile')
            
        except Exception as e:
            logger.error(f"Error retrieving user profile: {str(e)}")
            return None
    
    def update_skill_progress(self, user_id: str, skill_name: str, new_proficiency: int) -> bool:
        """
        Update user's skill proficiency level
        
        Args:
            user_id: User identifier
            skill_name: Name of the skill
            new_proficiency: New proficiency level (1-10)
            
        Returns:
            Success status
        """
        try:
            progress_entry = {
                'skill_name': skill_name,
                'proficiency_level': new_proficiency,
                'updated_at': datetime.now().isoformat()
            }
            
            if self.firebase_initialized:
                # Update skill in user profile
                ref = db.reference(f'users/{user_id}/skills/{skill_name.replace(" ", "_")}')
                ref.set(progress_entry)
                
                # Add to progress history
                history_ref = db.reference(f'users/{user_id}/progress_history')
                history_ref.push(progress_entry)
                
                logger.info(f"Skill progress updated in Firebase: {user_id} - {skill_name}")
            else:
                # Local storage update
                user_key = f'users/{user_id}'
                if user_key not in self.local_storage:
                    self.local_storage[user_key] = {'skills': {}, 'progress_history': []}
                
                skill_key = skill_name.replace(" ", "_")
                self.local_storage[user_key]['skills'][skill_key] = progress_entry
                self.local_storage[user_key]['progress_history'].append(progress_entry)
                
                logger.info(f"Skill progress updated locally: {user_id} - {skill_name}")
            
            return True
            
        except Exception as e:
            logger.error(f"Error updating skill progress: {str(e)}")
            return False
    
    def get_user_progress(self, user_id: str) -> Dict:
        """
        Get user's learning progress and history
        
        Args:
            user_id: User identifier
            
        Returns:
            Progress data including skills and history
        """
        try:
            if self.firebase_initialized:
                # Get current skills
                skills_ref = db.reference(f'users/{user_id}/skills')
                skills_data = skills_ref.get() or {}
                
                # Get progress history
                history_ref = db.reference(f'users/{user_id}/progress_history')
                history_data = history_ref.get() or {}
                
                # Convert history to list
                history_list = list(history_data.values()) if isinstance(history_data, dict) else []
                
            else:
                # Local storage retrieval
                user_data = self.local_storage.get(f'users/{user_id}', {})
                skills_data = user_data.get('skills', {})
                history_list = user_data.get('progress_history', [])
            
            # Calculate progress statistics
            total_skills = len(skills_data)
            avg_proficiency = 0
            if total_skills > 0:
                avg_proficiency = sum(skill.get('proficiency_level', 0) for skill in skills_data.values()) / total_skills
            
            return {
                'user_id': user_id,
                'current_skills': skills_data,
                'progress_history': sorted(history_list, key=lambda x: x.get('updated_at', ''), reverse=True),
                'statistics': {
                    'total_skills': total_skills,
                    'average_proficiency': round(avg_proficiency, 1),
                    'last_updated': max([skill.get('updated_at', '') for skill in skills_data.values()], default='')
                }
            }
            
        except Exception as e:
            logger.error(f"Error retrieving user progress: {str(e)}")
            return {
                'user_id': user_id,
                'current_skills': {},
                'progress_history': [],
                'statistics': {'total_skills': 0, 'average_proficiency': 0, 'last_updated': ''},
                'error': 'Failed to retrieve progress data'
            }
    
    def store_learning_milestone(self, user_id: str, milestone_data: Dict) -> bool:
        """
        Store completed learning milestone
        
        Args:
            user_id: User identifier
            milestone_data: Milestone completion information
            
        Returns:
            Success status
        """
        try:
            milestone_data.update({
                'completed_at': datetime.now().isoformat(),
                'milestone_id': str(uuid.uuid4())
            })
            
            if self.firebase_initialized:
                ref = db.reference(f'users/{user_id}/milestones')
                ref.push(milestone_data)
            else:
                user_key = f'users/{user_id}'
                if user_key not in self.local_storage:
                    self.local_storage[user_key] = {}
                if 'milestones' not in self.local_storage[user_key]:
                    self.local_storage[user_key]['milestones'] = []
                
                self.local_storage[user_key]['milestones'].append(milestone_data)
            
            logger.info(f"Learning milestone stored: {user_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error storing learning milestone: {str(e)}")
            return False
    
    def get_user_analyses(self, user_id: str, limit: int = 10) -> List[Dict]:
        """
        Get user's recent job analyses
        
        Args:
            user_id: User identifier
            limit: Maximum number of analyses to return
            
        Returns:
            List of recent analyses
        """
        try:
            analyses = []
            
            if self.firebase_initialized:
                # Query analyses by user_id (would need to be indexed in real implementation)
                ref = db.reference('analyses')
                all_analyses = ref.order_by_child('user_id').equal_to(user_id).limit_to_last(limit).get()
                
                if all_analyses:
                    analyses = list(all_analyses.values())
            else:
                # Local storage search
                for key, data in self.local_storage.items():
                    if key.startswith('analyses/') and data.get('user_id') == user_id:
                        analyses.append(data)
            
            # Sort by creation date (most recent first)
            analyses.sort(key=lambda x: x.get('created_at', ''), reverse=True)
            
            return analyses[:limit]
            
        except Exception as e:
            logger.error(f"Error retrieving user analyses: {str(e)}")
            return []
    
    def cleanup_old_data(self, days_old: int = 30) -> bool:
        """
        Clean up old analysis data (for storage management)
        
        Args:
            days_old: Remove data older than this many days
            
        Returns:
            Success status
        """
        try:
            cutoff_date = datetime.now().timestamp() - (days_old * 24 * 60 * 60)
            
            if self.firebase_initialized:
                # This would require a more sophisticated cleanup process in production
                logger.info("Firebase cleanup would be implemented with Cloud Functions")
            else:
                # Local storage cleanup
                keys_to_remove = []
                for key, data in self.local_storage.items():
                    if key.startswith('analyses/'):
                        created_at = data.get('created_at', '')
                        if created_at:
                            try:
                                data_timestamp = datetime.fromisoformat(created_at.replace('Z', '+00:00')).timestamp()
                                if data_timestamp < cutoff_date:
                                    keys_to_remove.append(key)
                            except ValueError:
                                continue
                
                for key in keys_to_remove:
                    del self.local_storage[key]
                
                logger.info(f"Cleaned up {len(keys_to_remove)} old analyses")
            
            return True
            
        except Exception as e:
            logger.error(f"Error during cleanup: {str(e)}")
            return False