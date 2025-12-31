# Skill Gap Analyzer

AI-powered job posting analysis and personalized learning path generation using Google AI Studio tools.

## Features

- **Job Posting Analysis**: Extract skills, salary, and requirements using Gemini API
- **Skill Comparison**: Calculate job readiness scores and identify skill gaps
- **Visual Analytics**: Interactive skill meters and progress charts with Nano Banana Pro
- **Learning Paths**: Personalized roadmaps with course recommendations via NotebookLM
- **Progress Tracking**: Monitor skill development over time
- **India Market Focus**: INR pricing, Hindi/English courses, budget-conscious recommendations

## Technology Stack

- **Backend**: Python Flask
- **AI Services**: Google AI Studio (Gemini API, Nano Banana Pro, NotebookLM)
- **Database**: Firebase Realtime Database
- **Frontend**: HTML5 + Tailwind CSS
- **Deployment**: Google Cloud Run (Docker)

## Quick Start

### Prerequisites

- Python 3.11+
- Google AI Studio API keys
- Firebase project setup

### Installation

1. **Clone and setup**:
   ```bash
   cd skill-gap-analyzer
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Required Environment Variables**:
   ```env
   # Google AI Studio
   GEMINI_API_KEY=your-gemini-api-key
   NANO_BANANA_PRO_API_KEY=your-nano-banana-pro-key
   NOTEBOOKLM_API_KEY=your-notebooklm-key
   
   # Firebase
   FIREBASE_DATABASE_URL=https://your-project.firebaseio.com/
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_SERVICE_ACCOUNT_KEY=path/to/service-account.json
   ```

4. **Run Development Server**:
   ```bash
   python app.py
   ```

   Visit: http://localhost:5000

## API Endpoints

### Core Analysis
- `POST /analyze` - Analyze job posting and user skills
- `GET /results/<analysis_id>` - View analysis results
- `GET /progress/<user_id>` - User progress dashboard

### Progress Tracking
- `POST /api/update-progress` - Update skill proficiency
- `GET /health` - Health check endpoint

## Usage Example

### 1. Job Analysis
```python
import requests

response = requests.post('http://localhost:5000/analyze', json={
    'job_posting': 'Python Developer position requiring Django, React, AWS...',
    'user_skills': [
        {'name': 'Python', 'proficiency_level': 7},
        {'name': 'Django', 'proficiency_level': 5}
    ]
})

results = response.json()
print(f"Confidence Score: {results['skill_comparison']['confidence_score']}%")
```

### 2. Progress Update
```python
requests.post('http://localhost:5000/api/update-progress', json={
    'user_id': 'user123',
    'skill_name': 'React',
    'proficiency_level': 8
})
```

## Deployment

### Docker Deployment
```bash
# Build image
docker build -t skill-gap-analyzer .

# Run container
docker run -p 8080:8080 --env-file .env skill-gap-analyzer
```

### Google Cloud Run
```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT-ID/skill-gap-analyzer
gcloud run deploy --image gcr.io/PROJECT-ID/skill-gap-analyzer --platform managed
```

## Configuration

### Firebase Setup
1. Create Firebase project
2. Enable Realtime Database
3. Generate service account key
4. Set database rules for your use case

### Google AI Studio Setup
1. Get API keys from Google AI Studio
2. Enable required services:
   - Gemini API (job analysis)
   - Nano Banana Pro (visual generation)
   - NotebookLM (learning research)

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Input    │───▶│   Flask App      │───▶│  Gemini API     │
│  (Job Posting)  │    │                  │    │ (Job Analysis)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Skill Comparison│◀───│  Analysis Engine │───▶│ NotebookLM API  │
│   & Gap Calc    │    │                  │    │(Learning Paths) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Visual Results  │◀───│ Nano Banana Pro  │───▶│ Firebase DB     │
│  (UI Components)│    │ (Visual Gen)     │    │ (Persistence)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Development

### Project Structure
```
skill-gap-analyzer/
├── app.py                 # Flask application
├── config.py             # Configuration settings
├── requirements.txt      # Python dependencies
├── Dockerfile           # Container configuration
├── services/            # Core business logic
│   ├── job_analyzer.py     # Gemini API integration
│   ├── skill_comparator.py # Skill gap analysis
│   ├── learning_path_generator.py # NotebookLM integration
│   └── firebase_service.py # Data persistence
└── templates/           # HTML templates
    ├── base.html           # Base template
    ├── index.html          # Landing page
    ├── analyze.html        # Analysis interface
    ├── results.html        # Results display
    ├── progress.html       # Progress tracking
    └── error.html          # Error handling
```

### Adding New Features

1. **New Analysis Type**: Extend `JobAnalyzer` class
2. **Additional Visualizations**: Update templates and Nano Banana Pro integration
3. **Course Providers**: Add to `LearningPathGenerator.get_course_recommendations()`
4. **Progress Metrics**: Extend `FirebaseService` progress tracking

## Testing

```bash
# Install test dependencies
pip install pytest pytest-flask hypothesis

# Run tests
pytest

# Run with coverage
pytest --cov=services
```

## Performance Considerations

- **API Rate Limits**: Implemented exponential backoff
- **Caching**: Redis integration for repeated requests
- **Timeouts**: 10-second analysis completion target
- **Fallbacks**: Local processing when APIs unavailable

## Security

- **Input Validation**: All user inputs sanitized
- **API Keys**: Environment variables only
- **CORS**: Configured for production domains
- **Firebase Rules**: Restrict data access appropriately

## Monitoring

- **Health Checks**: `/health` endpoint for uptime monitoring
- **Logging**: Structured logging for debugging
- **Error Tracking**: Integration ready for Sentry/similar
- **Metrics**: Performance and usage analytics

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Use GitHub Issues for bug reports
- **Email**: support@jobswipe.com for direct support

## Roadmap

- [ ] Multi-language support (Hindi UI)
- [ ] Mobile app integration
- [ ] Advanced analytics dashboard
- [ ] AI-powered interview preparation
- [ ] Salary negotiation insights
- [ ] Company culture matching