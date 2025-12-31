"""
Skill Gap Analyzer Flask Application

This application provides job posting analysis, skill comparison, and personalized
learning path generation using Google AI Studio tools (Gemini API, Nano Banana Pro, NotebookLM).
"""

import os
from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
import logging
from datetime import datetime
import json

# Import our custom modules (to be created)
from services.job_analyzer import JobAnalyzer
from services.skill_comparator import SkillComparator
from services.learning_path_generator import LearningPathGenerator
from services.firebase_service import FirebaseService
from config import Config

def create_app():
    """Application factory pattern for Flask app creation"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(Config)
    
    # Enable CORS for cross-origin requests
    CORS(app)
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Initialize services
    job_analyzer = JobAnalyzer()
    skill_comparator = SkillComparator()
    learning_path_generator = LearningPathGenerator()
    firebase_service = FirebaseService()
    
    @app.route('/')
    def index():
        """Main landing page for skill gap analyzer"""
        return render_template('index.html')
    
    @app.route('/analyze', methods=['GET', 'POST'])
    def analyze_job():
        """Job posting analysis interface"""
        if request.method == 'GET':
            return render_template('analyze.html')
        
        try:
            # Get job posting text from form
            job_posting = request.json.get('job_posting', '')
            user_skills = request.json.get('user_skills', [])
            
            if not job_posting:
                return jsonify({'error': 'Job posting text is required'}), 400
            
            # Analyze job posting
            job_analysis = job_analyzer.extract_job_skills(job_posting)
            
            # Compare with user skills
            skill_comparison = skill_comparator.compare_skills(user_skills, job_analysis)
            
            # Generate learning path
            learning_path = learning_path_generator.generate_path(skill_comparison)
            
            # Store results in Firebase
            analysis_id = firebase_service.store_analysis({
                'job_analysis': job_analysis,
                'skill_comparison': skill_comparison,
                'learning_path': learning_path,
                'timestamp': datetime.now().isoformat()
            })
            
            return jsonify({
                'analysis_id': analysis_id,
                'job_analysis': job_analysis,
                'skill_comparison': skill_comparison,
                'learning_path': learning_path
            })
            
        except Exception as e:
            app.logger.error(f"Error in job analysis: {str(e)}")
            return jsonify({'error': 'Analysis failed. Please try again.'}), 500
    
    @app.route('/results/<analysis_id>')
    def view_results(analysis_id):
        """Display analysis results"""
        try:
            results = firebase_service.get_analysis(analysis_id)
            if not results:
                return render_template('error.html', message='Analysis not found'), 404
            
            return render_template('results.html', results=results)
        except Exception as e:
            app.logger.error(f"Error retrieving results: {str(e)}")
            return render_template('error.html', message='Failed to load results'), 500
    
    @app.route('/progress/<user_id>')
    def track_progress(user_id):
        """User progress tracking dashboard"""
        try:
            progress_data = firebase_service.get_user_progress(user_id)
            return render_template('progress.html', progress=progress_data)
        except Exception as e:
            app.logger.error(f"Error loading progress: {str(e)}")
            return render_template('error.html', message='Failed to load progress'), 500
    
    @app.route('/api/update-progress', methods=['POST'])
    def update_progress():
        """API endpoint for updating learning progress"""
        try:
            user_id = request.json.get('user_id')
            skill_name = request.json.get('skill_name')
            new_proficiency = request.json.get('proficiency_level')
            
            if not all([user_id, skill_name, new_proficiency]):
                return jsonify({'error': 'Missing required fields'}), 400
            
            # Update progress in Firebase
            firebase_service.update_skill_progress(user_id, skill_name, new_proficiency)
            
            return jsonify({'success': True, 'message': 'Progress updated successfully'})
            
        except Exception as e:
            app.logger.error(f"Error updating progress: {str(e)}")
            return jsonify({'error': 'Failed to update progress'}), 500
    
    @app.route('/health')
    def health_check():
        """Health check endpoint for deployment monitoring"""
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.now().isoformat(),
            'version': '1.0.0'
        })
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)