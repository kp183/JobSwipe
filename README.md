# JobSwipe AI - Revolutionary Job Matching Platform

🚀 **India's First AI-Powered Job Discovery Platform with Tinder-Style Swiping**

JobSwipe AI transforms job hunting into an engaging, gamified experience while providing intelligent career guidance through advanced AI analysis and expert mentorship.

## 🌟 Key Features

### 🎯 Core Experience
- **Tinder-Style Job Swiping**: Intuitive left/right swipe interface for job discovery
- **AI Match Reports**: Detailed compatibility analysis with skill gap identification
- **Rewind Engine**: 3 daily credits to bring back accidentally passed opportunities
- **Real-Time Tracking**: Live monitoring of applications and match strength

### 🤖 AI-Powered Intelligence
- **Skill Gap Analysis**: Personalized learning roadmaps with course recommendations
- **Live Match Recalculation**: Dynamic score updates as you complete learning tasks
- **30-Day Learning Blueprints**: AI-generated career advancement plans
- **Competency Radar**: Visual skill assessment across technical and soft skills

### 👥 Expert Mentorship
- **Verified Mentors**: Industry experts from Google, Zomato, Swiggy, CRED
- **India-First Approach**: INR pricing, Hindi/English support, local market focus
- **Trust Indicators**: Response times, session counts, verified badges
- **Flexible Scheduling**: Weekend, evening, and flexible availability options

### 📊 Progress Tracking
- **Milestone Journey**: Visual career progression tracking
- **Achievement System**: Skill certifications and interview success tracking
- **Growth Insights**: Salary improvement potential and career trajectory analysis

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with glassmorphism design
- **Animations**: Framer Motion for smooth interactions
- **UI Components**: Headless UI for accessible modals and forms
- **Charts**: Recharts for data visualization

### Backend Services
- **Skill Gap Analyzer**: Flask application with Google AI integrations
- **AI Services**: Gemini API, Nano Banana Pro, NotebookLM
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth (configured)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kp183/JobSwipe.git
cd JobSwipe
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install web app dependencies
cd web
npm install
cd ..

# Install AI services dependencies
cd ai-services
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..

# Install skill gap analyzer dependencies
cd skill-gap-analyzer
pip install -r requirements.txt
cd ..
```

3. **Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Configure your environment variables:
# - Google AI API keys
# - Firebase configuration
# - Database URLs
```

4. **Start Development Servers**

**Web Application:**
```bash
cd web
npm run dev
# Runs on http://localhost:3000
```

**Skill Gap Analyzer:**
```bash
cd skill-gap-analyzer
python app.py
# Runs on http://localhost:5000
```

## 🎮 Usage Guide

### Job Swiping
- **Pass**: Press ← or click red X button
- **Apply**: Press → or click green heart button
- **Rewind**: Click yellow rewind button (3 credits/day)

### AI Features
1. **Match Reports**: Click "🤖 AI Match Report" on any job card
2. **Skill Boost**: Click "View Full Analysis" on applied jobs
3. **Learning Tasks**: Complete tasks to see live match score updates

### Navigation
- **Home**: Job discovery and swiping interface
- **Mentors**: Browse and book expert mentorship sessions
- **Progress**: Track career growth and skill development
- **Applications**: Monitor job application status

## 🛠️ Development

### Project Structure
```
JobSwipe/
├── web/                    # Next.js frontend application
├── backend/               # Node.js backend services
├── ai-services/          # AI processing services
├── skill-gap-analyzer/   # Flask AI analysis service
├── mobile/              # React Native mobile app
├── shared/              # Shared utilities and types
├── docs/                # Documentation
└── scripts/             # Setup and deployment scripts
```

### Key Technologies
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Prisma
- **AI/ML**: Google AI Studio, Gemini API, Python Flask
- **Database**: Firebase, PostgreSQL
- **Mobile**: React Native, Expo
- **Deployment**: Docker, Vercel, Railway

## 🌍 India-First Features

- **Currency**: All pricing in INR
- **Companies**: Focus on Indian startups and FAANG India offices
- **Languages**: Hindi/English support
- **Mentors**: Verified experts from top Indian tech companies
- **Market**: Tailored for Indian job market dynamics

## 📱 Mobile App

React Native mobile application with:
- Native job swiping experience
- Push notifications for matches
- Offline capability
- Biometric authentication

## 🔧 Configuration

### Environment Variables
```env
# Google AI
GOOGLE_AI_API_KEY=your_gemini_api_key
NOTEBOOK_LM_API_KEY=your_notebook_lm_key

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Database
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
```

## 🚀 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Manual Deployment
- **Frontend**: Deploy to Vercel or Netlify
- **Backend**: Deploy to Railway or Heroku
- **AI Services**: Deploy to Google Cloud Run

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google AI Studio for advanced AI capabilities
- Indian tech community for inspiration
- Open source contributors

## 📞 Support

For support, email support@jobswipe.ai or join our Discord community.

---

**Made with ❤️ for the Indian tech community**

🌟 **Star this repo if you find it helpful!**