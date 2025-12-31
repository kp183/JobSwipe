import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  TrophyIcon, 
  BriefcaseIcon,
  XMarkIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface LearningCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedSkills: string[];
  jobTitle: string;
  company: string;
  newMatchScore: number;
  oldMatchScore: number;
}

export default function LearningCompleteModal({
  isOpen,
  onClose,
  completedSkills,
  jobTitle,
  company,
  newMatchScore,
  oldMatchScore
}: LearningCompleteModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleApplyNow = () => {
    // Simulate application
    alert('🎉 Application submitted with your new skills! The company will be impressed.');
    onClose();
  };

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
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              {/* Celebration Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4"
                >
                  <TrophyIcon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  🎉 Congratulations!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600"
                >
                  You've completed your learning plan and are now ready to apply!
                </motion.p>
              </div>

              {/* Skills Completed */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Skills Mastered</h4>
                <div className="flex flex-wrap gap-2">
                  {completedSkills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Match Score Improvement */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Match Score Improved!</h4>
                    <p className="text-sm text-gray-600">{jobTitle} at {company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-500">{oldMatchScore}%</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-2xl font-bold text-green-600">{newMatchScore}%</span>
                    </div>
                    <div className="text-xs text-gray-500">+{newMatchScore - oldMatchScore}% improvement</div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start">
                  <SparklesIcon className="w-5 h-5 text-purple-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-purple-900">AI Analysis</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Your profile now shows strong expertise in the required technologies. 
                      You're in the top 15% of candidates for this position!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Apply Later
                </button>
                <button
                  onClick={handleApplyNow}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center"
                >
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  Apply Now!
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}