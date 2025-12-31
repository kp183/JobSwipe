import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon,
  HeartIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    console.log(`Logging in with ${provider}...`);
    // In real app, this would redirect to OAuth provider
    setTimeout(() => {
      localStorage.setItem('jobswipe-user', JSON.stringify({
        id: '1',
        name: provider === 'github' ? 'John Developer' : provider === 'google' ? 'John Doe' : 'John Professional',
        email: `john@${provider}.com`,
        provider: provider,
        avatar: `https://via.placeholder.com/100x100/6366f1/ffffff?text=${provider.charAt(0).toUpperCase()}`,
        hasCompletedOnboarding: false
      }));
      window.location.href = '/onboarding';
    }, 1500);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email login:', { email, password, name });
    // Simulate email login
    setTimeout(() => {
      localStorage.setItem('jobswipe-user', JSON.stringify({
        id: '1',
        name: name || 'John Doe',
        email: email,
        provider: 'email',
        avatar: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=JD',
        hasCompletedOnboarding: false
      }));
      window.location.href = '/onboarding';
    }, 1000);
  };

  const socialProviders = [
    {
      name: 'GitHub',
      id: 'github',
      icon: '🐙',
      color: 'bg-gray-900 hover:bg-gray-800',
      description: 'Import your coding projects and skills'
    },
    {
      name: 'Google',
      id: 'google',
      icon: '🔍',
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Quick sign up with your Google account'
    },
    {
      name: 'LinkedIn',
      id: 'linkedin',
      icon: '💼',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Import your professional experience'
    },
    {
      name: 'Stack Overflow',
      id: 'stackoverflow',
      icon: '📚',
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Showcase your technical expertise'
    }
  ];

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Sign Up' : 'Sign In'} - JobSwipe</title>
        <meta name="description" content="Join JobSwipe - AI-powered job matching platform" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-indigo-700 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <HeartIcon className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">JobSwipe</h1>
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  Find Your Dream Job with AI
                </h2>
                <p className="text-xl text-primary-100">
                  Swipe right on opportunities, let AI handle the rest
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HeartIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Smart Job Matching</h3>
                    <p className="text-primary-100">AI analyzes your skills and finds perfect job matches</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CodeBracketIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Skill Gap Analysis</h3>
                    <p className="text-primary-100">Learn what skills you need and get personalized learning paths</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BriefcaseIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Auto-Apply</h3>
                    <p className="text-primary-100">AI generates tailored resumes and applies for you instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 text-primary-200">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="lg:hidden flex items-center justify-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <HeartIcon className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">JobSwipe</h1>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h2>
                <p className="text-gray-600">
                  {isSignUp 
                    ? 'Join thousands of professionals finding their dream jobs'
                    : 'Sign in to continue your job search journey'
                  }
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                {socialProviders.map((provider) => (
                  <motion.button
                    key={provider.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSocialLogin(provider.id)}
                    className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium transition-colors ${provider.color}`}
                  >
                    <span className="text-xl mr-3">{provider.icon}</span>
                    Continue with {provider.name}
                  </motion.button>
                ))}
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                      required={isSignUp}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              {/* Toggle Sign Up/Sign In */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"
                  }
                </button>
              </div>

              {/* Terms */}
              {isSignUp && (
                <p className="mt-4 text-xs text-gray-500 text-center">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
                </p>
              )}
            </motion.div>

            {/* Demo Access */}
            <div className="mt-6 text-center">
              <button
                onClick={() => window.location.href = '/demo'}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                🎯 View Demo Without Signing Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}