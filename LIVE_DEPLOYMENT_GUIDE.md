# 🚀 Deploy JobSwipe AI Live - Step by Step

## Problem: GitHub Shows README, Not the Web App
GitHub repositories show code by default. To make your web app **live and accessible**, you need to deploy it to a hosting platform.

## 🎯 Quick Deploy Options

### Option 1: Vercel (Recommended - 5 minutes)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign up with your GitHub account

2. **Import Your Repository**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `kp183/JobSwipe`

3. **Configure Deployment**
   - Root Directory: `web`
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get live URL: `https://jobswipe-ai.vercel.app`

### Option 2: Netlify (Alternative)

1. **Go to Netlify**
   - Visit: https://netlify.com
   - Sign up with GitHub

2. **Deploy Settings**
   - Base directory: `web`
   - Build command: `npm run build && npm run export`
   - Publish directory: `web/out`

### Option 3: Railway (For Backend)

1. **Deploy Skill Gap Analyzer**
   - Visit: https://railway.app
   - Connect GitHub repo
   - Select `skill-gap-analyzer` folder
   - Auto-deploys Python Flask app

## 🔧 Environment Variables Setup

### For Vercel (Web App):
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
```

### For Railway (Backend):
```env
GOOGLE_AI_API_KEY=your_gemini_key
FIREBASE_PROJECT_ID=your_project
FLASK_ENV=production
```

## 🎉 Expected Result

After deployment, you'll have:
- **Live Web App**: `https://jobswipe-ai.vercel.app`
- **Live API**: `https://jobswipe-backend.railway.app`
- **Fully Functional**: Users can swipe jobs, see AI reports, book mentors

## 🚨 Quick Fix for Immediate Demo

If you need it working RIGHT NOW:

1. **Enable GitHub Pages**
   - Go to your repo settings
   - Scroll to "Pages"
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`

2. **Create Simple Demo Page**
   - This will show a basic version
   - Full app needs proper hosting (Vercel)

## 📱 What Users Will See

Instead of README, users will see:
- ✅ JobSwipe AI interface
- ✅ Job swiping functionality  
- ✅ AI Match Reports
- ✅ Mentors marketplace
- ✅ Progress dashboard

## 🔗 Share Your Live App

Once deployed, share:
- **Live Demo**: `https://your-app.vercel.app`
- **GitHub Code**: `https://github.com/kp183/JobSwipe`
- **API Docs**: `https://your-backend.railway.app/docs`

---

**Need help with deployment? Follow the Vercel option - it's the fastest way to get your app live!**