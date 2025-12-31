import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, HeartIcon, BriefcaseIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen welcome modal before
    const hasSeenWelcome = localStorage.getItem('jobswipe-welcome-seen');
    if (!hasSeenWelcome) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('jobswipe-welcome-seen', 'true');
  };

  const features = [
    {
      icon: HeartIcon,
      title: 'Swipe to Apply',
      description: 'Swipe right on jobs you love, left to pass. AI generates your resume instantly!'
    },
    {
      icon: BriefcaseIcon,
      title: 'Track Applications',
      description: 'Monitor your application progress from submission to interview to offer.'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Dashboard',
      description: 'Get insights on your job search performance and AI-powered recommendations.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Welcome to JobSwipe!</h3>
                    <p className="text-sm text-gray-600">Your AI-powered job search starts here</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Demo Stats */}
              <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Demo Features Available</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary-600">10</div>
                    <div className="text-xs text-gray-600">Sample Jobs</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-600">8</div>
                    <div className="text-xs text-gray-600">Full Pages</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-600">100%</div>
                    <div className="text-xs text-gray-600">Functional</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Skip Tour
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    window.location.href = '/demo';
                  }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Take Demo Tour
                </button>
              </div>

              {/* Keyboard Hint */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  💡 <strong>Pro tip:</strong> Use arrow keys or Enter/X to swipe jobs on desktop!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}