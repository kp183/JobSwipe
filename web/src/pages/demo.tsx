import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { mockJobs } from '../services/mockData';

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const demoSteps = [
    {
      title: "Welcome to JobSwipe! 👋",
      description: "The AI-powered job matching platform that works like Tinder for jobs.",
      action: "Get Started"
    },
    {
      title: "Swipe Through Jobs 📱",
      description: "Browse personalized job recommendations. Swipe right to apply, left to pass.",
      action: "Try Swiping"
    },
    {
      title: "AI Generates Your Resume 🤖",
      description: "When you swipe right, our AI instantly creates a tailored resume and applies for you.",
      action: "See Magic"
    },
    {
      title: "Companies See Pre-Screened Candidates 🎯",
      description: "Employers only see qualified, interested candidates with AI-generated match scores.",
      action: "View Dashboard"
    },
    {
      title: "Ready to Find Your Dream Job? 🚀",
      description: "Join thousands of professionals who've found their perfect match with JobSwipe.",
      action: "Start Swiping"
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      <Head>
        <title>JobSwipe Demo - See How It Works</title>
        <meta name="description" content="Interactive demo of JobSwipe's AI-powered job matching" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">JobSwipe Demo</h1>
            <p className="text-gray-600">Experience the future of job searching</p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between mb-2">
              {demoSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Demo Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {demoSteps[currentStep].title}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {demoSteps[currentStep].description}
              </p>

              {/* Demo Visual */}
              <div className="mb-8">
                {currentStep === 0 && (
                  <div className="text-6xl mb-4">💼</div>
                )}
                {currentStep === 1 && (
                  <div className="relative">
                    <div className="bg-gray-100 rounded-lg p-6 mb-4">
                      <div className="text-left">
                        <h3 className="font-bold text-lg">Senior React Developer</h3>
                        <p className="text-gray-600">TechCorp Inc.</p>
                        <p className="text-sm text-gray-500">$120k - $160k • San Francisco</p>
                        <div className="mt-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">React</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">TypeScript</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Node.js</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                        ✕
                      </div>
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                        ♥
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="text-center">
                    <div className="text-4xl mb-4">🤖</div>
                    <div className="bg-gray-100 rounded-lg p-4 text-left max-w-md mx-auto">
                      <div className="text-sm text-gray-600 mb-2">AI Generated Resume:</div>
                      <div className="text-xs text-gray-800">
                        <div className="font-bold">John Doe</div>
                        <div>Senior Full Stack Developer</div>
                        <div className="mt-2">
                          <div className="font-semibold">Experience:</div>
                          <div>• 5+ years React development</div>
                          <div>• TypeScript expert</div>
                          <div>• Node.js backend experience</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-left">
                      <div className="font-bold text-sm mb-2">Company Dashboard</div>
                      <div className="space-y-2">
                        <div className="bg-white p-2 rounded text-xs">
                          <div className="font-semibold">Sarah Johnson</div>
                          <div className="text-gray-600">Match: 96% • AI Score: 8.7/10</div>
                        </div>
                        <div className="bg-white p-2 rounded text-xs">
                          <div className="font-semibold">Mike Chen</div>
                          <div className="text-gray-600">Match: 91% • AI Score: 8.2/10</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="text-6xl mb-4">🚀</div>
                )}
              </div>

              <button
                onClick={nextStep}
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                {demoSteps[currentStep].action}
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">10,000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">500+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary-500 mb-2">85%</div>
              <div className="text-gray-600">Match Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}