# JobSwipe AI - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Local Development (Recommended for Testing)

1. **Clone and Setup**
```bash
git clone https://github.com/kp183/JobSwipe.git
cd JobSwipe
```

2. **Install Dependencies**
```bash
# Web App
cd web && npm install && cd ..

# Skill Gap Analyzer
cd skill-gap-analyzer && pip install -r requirements.txt && cd ..
```

3. **Environment Configuration**
```bash
# Copy environment files
cp .env.example .env
cp skill-gap-analyzer/.env.example skill-gap-analyzer/.env

# Edit .env files with your API keys:
# - GOOGLE_AI_API_KEY
# - FIREBASE_PROJECT_ID
# - FIREBASE_PRIVATE_KEY
# - FIREBASE_CLIENT_EMAIL
```

4. **Start Services**
```bash
# Terminal 1: Web App
cd web && npm run dev

# Terminal 2: AI Service
cd skill-gap-analyzer && python app.py
```

5. **Access Applications**
- Web App: http://localhost:3000
- AI Service: http://localhost:5000

### Option 2: Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 3: Cloud Deployment

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy web app
cd web
vercel --prod
```

#### Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy skill gap analyzer
cd skill-gap-analyzer
railway login
railway init
railway up
```

## 🔧 Environment Variables

### Web Application (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Skill Gap Analyzer (.env)
```env
GOOGLE_AI_API_KEY=your_gemini_api_key
NOTEBOOK_LM_API_KEY=your_notebook_lm_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com
FLASK_ENV=production
```

## 📊 Production Checklist

- [ ] Environment variables configured
- [ ] Firebase project setup
- [ ] Google AI API keys obtained
- [ ] Domain configured (if deploying to custom domain)
- [ ] SSL certificates setup
- [ ] Database migrations run
- [ ] Error monitoring setup (Sentry)
- [ ] Analytics setup (Google Analytics)
- [ ] Performance monitoring
- [ ] Backup strategy implemented

## 🔒 Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **CORS**: Configure proper CORS settings for production
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Input Validation**: Validate all user inputs
5. **HTTPS**: Always use HTTPS in production
6. **Firebase Rules**: Configure proper Firebase security rules

## 📈 Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Performance**: Vercel Analytics / New Relic
- **Uptime**: UptimeRobot
- **Logs**: LogRocket / DataDog

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Verify environment variables

2. **API Connection Issues**
   - Verify API endpoints
   - Check CORS configuration
   - Validate API keys

3. **Firebase Issues**
   - Verify Firebase configuration
   - Check service account permissions
   - Validate private key format

### Debug Commands
```bash
# Check build logs
npm run build

# Test API endpoints
curl http://localhost:5000/health

# Verify environment
echo $GOOGLE_AI_API_KEY
```

## 📞 Support

For deployment issues:
1. Check the troubleshooting section above
2. Review application logs
3. Create an issue on GitHub
4. Contact support@jobswipe.ai

---

**Happy Deploying! 🚀**