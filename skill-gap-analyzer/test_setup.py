#!/usr/bin/env python3
"""
Basic setup test for Skill Gap Analyzer
Tests that all modules can be imported and basic functionality works
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test that all modules can be imported successfully"""
    try:
        # Test Flask app creation
        from app import create_app
        print("✓ Flask app import successful")
        
        # Test configuration
        from config import Config
        print("✓ Configuration import successful")
        
        # Test services
        from services.job_analyzer import JobAnalyzer
        from services.skill_comparator import SkillComparator
        from services.learning_path_generator import LearningPathGenerator
        from services.firebase_service import FirebaseService
        print("✓ All service imports successful")
        
        return True
    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False

def test_app_creation():
    """Test Flask app creation"""
    try:
        from app import create_app
        app = create_app()
        
        # Test that app was created
        assert app is not None
        print("✓ Flask app creation successful")
        
        # Test basic routes exist
        with app.test_client() as client:
            response = client.get('/')
            assert response.status_code == 200
            print("✓ Home route accessible")
            
            response = client.get('/health')
            assert response.status_code == 200
            print("✓ Health check endpoint working")
        
        return True
    except Exception as e:
        print(f"✗ App creation error: {e}")
        return False

def test_services():
    """Test basic service functionality"""
    try:
        from services.job_analyzer import JobAnalyzer
        from services.skill_comparator import SkillComparator
        from services.learning_path_generator import LearningPathGenerator
        from services.firebase_service import FirebaseService
        
        # Test service instantiation
        job_analyzer = JobAnalyzer()
        skill_comparator = SkillComparator()
        learning_path_generator = LearningPathGenerator()
        firebase_service = FirebaseService()
        
        print("✓ All services instantiated successfully")
        
        # Test basic functionality without API calls
        test_skills = [{'name': 'Python', 'proficiency_level': 7}]
        test_job_analysis = {
            'required_skills': [
                {'name': 'Python', 'priority': 'critical', 'proficiency_required': 8},
                {'name': 'Django', 'priority': 'important', 'proficiency_required': 6}
            ]
        }
        
        # Test skill comparison
        comparison = skill_comparator.compare_skills(test_skills, test_job_analysis)
        assert 'confidence_score' in comparison
        assert 'missing_skills' in comparison
        print("✓ Skill comparison working")
        
        # Test learning path generation
        learning_path = learning_path_generator.generate_path(comparison)
        assert 'total_duration_days' in learning_path
        print("✓ Learning path generation working")
        
        return True
    except Exception as e:
        print(f"✗ Service test error: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting Skill Gap Analyzer Setup Tests\n")
    
    tests = [
        ("Module Imports", test_imports),
        ("Flask App Creation", test_app_creation),
        ("Service Functionality", test_services)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n📋 Testing {test_name}:")
        if test_func():
            passed += 1
            print(f"✅ {test_name} PASSED")
        else:
            print(f"❌ {test_name} FAILED")
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The Skill Gap Analyzer is ready to use.")
        print("\n🚀 To start the application:")
        print("   python app.py")
        print("\n🌐 Then visit: http://localhost:5000")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())