#!/usr/bin/env python3
"""
Interactive API test for Skill Gap Analyzer
"""

import requests
import json
import time

BASE_URL = "http://localhost:5000"

def test_health_check():
    """Test health check endpoint"""
    print("🏥 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_job_analysis():
    """Test job analysis API"""
    print("\n🔍 Testing job analysis...")
    
    # Sample job posting
    job_posting = """
    Software Developer - Python/React
    Company: TechCorp India
    Location: Bangalore, India
    Salary: ₹8,00,000 - ₹12,00,000 per annum

    We are looking for a skilled Software Developer to join our team.

    Requirements:
    - 3+ years of experience in Python development
    - Strong knowledge of Django or Flask frameworks
    - Experience with React.js and modern JavaScript
    - Proficiency in SQL and database design
    - Knowledge of AWS cloud services
    - Experience with Docker and containerization
    - Git version control
    - Strong problem-solving skills

    Nice to have:
    - Experience with Kubernetes
    - Knowledge of machine learning
    - Redis caching experience
    """
    
    # Sample user skills
    user_skills = [
        {"name": "Python", "proficiency_level": 8},
        {"name": "Django", "proficiency_level": 7},
        {"name": "JavaScript", "proficiency_level": 6},
        {"name": "SQL", "proficiency_level": 7},
        {"name": "Git", "proficiency_level": 8}
    ]
    
    try:
        print("📤 Sending analysis request...")
        response = requests.post(f"{BASE_URL}/analyze", json={
            "job_posting": job_posting,
            "user_skills": user_skills
        })
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Analysis completed successfully!")
            
            # Display results
            skill_comparison = data.get('skill_comparison', {})
            print(f"\n📊 Results Summary:")
            print(f"   Confidence Score: {skill_comparison.get('confidence_score', 0)}%")
            print(f"   Readiness Status: {skill_comparison.get('readiness_status', 'Unknown')}")
            print(f"   Missing Skills: {len(skill_comparison.get('missing_skills', []))}")
            print(f"   Learning Time: {skill_comparison.get('total_learning_time_days', 0)} days")
            
            # Show missing skills
            missing_skills = skill_comparison.get('missing_skills', [])
            if missing_skills:
                print(f"\n🎯 Skills to Develop:")
                for skill in missing_skills[:3]:  # Show first 3
                    print(f"   • {skill.get('skill_name')} ({skill.get('priority')} priority)")
            
            # Show learning path
            learning_path = data.get('learning_path', {})
            if learning_path.get('milestones'):
                print(f"\n🛤️  Learning Path: {len(learning_path['milestones'])} milestones")
                print(f"   Total Duration: {learning_path.get('total_duration_days', 0)} days")
            
            return True
        else:
            print(f"❌ Analysis failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Analysis error: {e}")
        return False

def test_progress_update():
    """Test progress update API"""
    print("\n📈 Testing progress update...")
    
    try:
        response = requests.post(f"{BASE_URL}/api/update-progress", json={
            "user_id": "test_user",
            "skill_name": "React",
            "proficiency_level": 7
        })
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Progress update successful: {data}")
            return True
        else:
            print(f"❌ Progress update failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Progress update error: {e}")
        return False

def main():
    """Run all API tests"""
    print("🚀 Skill Gap Analyzer - API Testing")
    print("=" * 50)
    
    # Wait a moment for server to be ready
    print("⏳ Waiting for server to be ready...")
    time.sleep(2)
    
    tests = [
        ("Health Check", test_health_check),
        ("Job Analysis", test_job_analysis),
        ("Progress Update", test_progress_update)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        if test_func():
            passed += 1
        time.sleep(1)  # Brief pause between tests
    
    print("\n" + "=" * 50)
    print(f"📊 API Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All API tests passed!")
        print("\n🌐 You can now test the web interface at:")
        print(f"   • Home: {BASE_URL}")
        print(f"   • Analysis: {BASE_URL}/analyze")
        print(f"   • Progress: {BASE_URL}/progress/demo")
    else:
        print(f"\n⚠️  {total - passed} tests failed.")
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    exit(main())