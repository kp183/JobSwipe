#!/bin/bash

echo "🚀 Setting up JobSwipe development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install dependencies for all workspaces
echo "📦 Installing workspace dependencies..."
npm run install:all

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual configuration values"
fi

# Setup database
echo "🗄️  Setting up database..."
cd backend
npx prisma generate
npx prisma migrate dev --name init

# Seed database with sample data
echo "🌱 Seeding database..."
npx prisma db seed

cd ..

# Setup mobile development
echo "📱 Setting up mobile development..."
cd mobile
if ! command -v expo &> /dev/null; then
    npm install -g @expo/cli
fi
cd ..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your API keys and configuration"
echo "2. Start the development servers:"
echo "   npm run dev"
echo ""
echo "3. For mobile development:"
echo "   cd mobile && npm start"
echo ""
echo "4. Open http://localhost:3000 for web app"
echo "5. Use Expo Go app to test mobile version"