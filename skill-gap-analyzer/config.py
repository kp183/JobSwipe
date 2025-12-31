"""
Configuration settings for Skill Gap Analyzer application
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration class"""
    
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    # Google AI Studio API configurations
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
    GEMINI_API_URL = os.environ.get('GEMINI_API_URL', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent')
    
    # Nano Banana Pro configuration (Google AI Studio visual generation)
    NANO_BANANA_PRO_API_KEY = os.environ.get('NANO_BANANA_PRO_API_KEY')
    NANO_BANANA_PRO_URL = os.environ.get('NANO_BANANA_PRO_URL', 'https://nanobananapro.googleapis.com/v1/generate')
    
    # NotebookLM configuration (Google AI Studio research tool)
    NOTEBOOKLM_API_KEY = os.environ.get('NOTEBOOKLM_API_KEY')
    NOTEBOOKLM_URL = os.environ.get('NOTEBOOKLM_URL', 'https://notebooklm.googleapis.com/v1/research')
    
    # Firebase Realtime Database configuration
    FIREBASE_DATABASE_URL = os.environ.get('FIREBASE_DATABASE_URL')
    FIREBASE_SERVICE_ACCOUNT_KEY = os.environ.get('FIREBASE_SERVICE_ACCOUNT_KEY')
    FIREBASE_PROJECT_ID = os.environ.get('FIREBASE_PROJECT_ID')
    
    # Course integration APIs
    UDEMY_API_KEY = os.environ.get('UDEMY_API_KEY')
    COURSERA_API_KEY = os.environ.get('COURSERA_API_KEY')
    LINKEDIN_LEARNING_API_KEY = os.environ.get('LINKEDIN_LEARNING_API_KEY')
    
    # Performance and rate limiting settings
    API_TIMEOUT = int(os.environ.get('API_TIMEOUT', '10'))  # seconds
    MAX_RETRIES = int(os.environ.get('MAX_RETRIES', '3'))
    RATE_LIMIT_PER_MINUTE = int(os.environ.get('RATE_LIMIT_PER_MINUTE', '60'))
    
    # Cache settings
    CACHE_TIMEOUT = int(os.environ.get('CACHE_TIMEOUT', '3600'))  # 1 hour
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379')
    
    # India market specific settings
    DEFAULT_CURRENCY = 'INR'
    DEFAULT_LANGUAGES = ['english', 'hindi']
    MAX_COURSE_PRICE_INR = int(os.environ.get('MAX_COURSE_PRICE_INR', '5000'))
    
    @classmethod
    def validate_config(cls):
        """Validate that required configuration is present"""
        required_vars = [
            'GEMINI_API_KEY',
            'FIREBASE_DATABASE_URL',
            'FIREBASE_PROJECT_ID'
        ]
        
        missing_vars = []
        for var in required_vars:
            if not getattr(cls, var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
        
        return True

class DevelopmentConfig(Config):
    """Development environment configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production environment configuration"""
    DEBUG = False
    TESTING = False
    
    # Enhanced security for production
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

class TestingConfig(Config):
    """Testing environment configuration"""
    TESTING = True
    DEBUG = True
    
    # Use test database
    FIREBASE_DATABASE_URL = os.environ.get('TEST_FIREBASE_DATABASE_URL', Config.FIREBASE_DATABASE_URL)

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}