import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  StarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

interface SkillTask {
  id: string;
  skill: string;
  task: string;
  description: string;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  matchImpact: number;
  completed: boolean;
}

interface SkillBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  company: string;
  currentMatchScore: number;
  onTaskComplete: (taskId: string) => void;
}

export default function SkillBoostModal({ 
  isOpen, 
  onClose, 
  jobTitle, 
  company, 
  currentMatchScore,
  onTaskComplete 
}: SkillBoostModalProps) {
  const [matchScore, setMatchScore] = useState(currentMatchScore);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  const skillTasks: SkillTask[] = [
    {
      id: '1',
      skill: 'React Native',
      task: 'Complete React Native Tutorial',
      description: 'Build your first mobile app with React Native',
      estimatedTime: '4 hours',
      difficulty: 'medium',
      matchImpact: 8,
      completed: false
    },
    {
      id: '2',
      skill: 'React Native',
      task: 'Dockerize React App',
      description: 'Create Docker container for React Native development',
      estimatedTime: '2 hours',
      difficulty: 'hard',
      matchImpact: 12,
      completed: false
    },
    {
      id: '3',
      skill: 'TypeScript',
      task: 'TypeScript Fundamentals',
      description: 'Learn TypeScript basics and type definitions',
      estimatedTime: '3 hours',
      difficulty: 'easy',
      matchImpact: 6,
      completed: false
    },
    {
      id: '4',
      skill: 'GraphQL',
      task: 'Build GraphQL API',
      description: 'Create a simple GraphQL API with queries and mutations',
      estimatedTime: '5 hours',
      difficulty: 'medium',
      matchImpact: 10,
      completed: false
    },
    {
      id: '5',
      skill: 'Testing',
      task: 'Write Unit Tests',
      description: 'Add comprehensive unit tests to your React Native app',
      estimatedTime: '3 hours',
      difficulty: 'medium',
      matchImpact: 7,
      completed: false
    }
  ];

  const handleTaskComplete = (taskId: string) => {
    const task = skillTasks.find(t => t.id === taskId);
    if (!task || completedTasks.has(taskId)) return;

    const newCompletedTasks = new Set(completedTasks);
    newCompletedTasks.add(taskId);
    setCompletedTasks(newCompletedTasks);

    // Animate match score increase
    const newScore = Math.min(100, matchScore + task.matchImpact);
    setMatchScore(newScore);

    // Show celebration if reaching 80%
    if (newScore >= 80 && matchScore < 80) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    onTaskComplete(taskId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedCount = completedTasks.size;
  const totalTasks = skillTasks.length;
  const isInterviewReady = matchScore >= 80;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                      🚀 Skill Boost
                    </Dialog.Title>
                    <p className="text-gray-600">{jobTitle} at {company}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Live Match Score */}
                <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Match Score</h3>
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="text-4xl font-bold text-primary-600"
                          key={matchScore}
                          initial={{ scale: 1.2, color: '#10b981' }}
                          animate={{ scale: 1, color: '#2563eb' }}
                          transition={{ duration: 0.5 }}
                        >
                          {matchScore}%
                        </motion.div>
                        {matchScore > currentMatchScore && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center text-green-600"
                          >
                            <ArrowTrendingUpIcon className="w-5 h-5 mr-1" />
                            <span className="font-semibold">+{matchScore - currentMatchScore}%</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    {isInterviewReady && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                      >
                        <TrophyIcon className="w-5 h-5" />
                        <span className="font-semibold">Interview Ready!</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{completedCount}/{totalTasks} tasks completed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedCount / totalTasks) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Celebration Animation */}
                {showCelebration && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                  >
                    <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
                      <TrophyIcon className="w-8 h-8" />
                      <div>
                        <div className="text-xl font-bold">🎉 Interview Ready!</div>
                        <div className="text-sm opacity-90">You've reached 80% match score</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Interactive Learning Roadmap */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Learning Roadmap</h3>
                  
                  {skillTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-4 transition-all ${
                        completedTasks.has(task.id) 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <button
                              onClick={() => handleTaskComplete(task.id)}
                              disabled={completedTasks.has(task.id)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                completedTasks.has(task.id)
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-primary-500'
                              }`}
                            >
                              {completedTasks.has(task.id) && (
                                <CheckCircleIcon className="w-4 h-4" />
                              )}
                            </button>
                            
                            <div>
                              <h4 className={`font-semibold ${
                                completedTasks.has(task.id) ? 'text-green-900 line-through' : 'text-gray-900'
                              }`}>
                                {task.task}
                              </h4>
                              <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500 ml-9">
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {task.estimatedTime}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                              {task.difficulty}
                            </span>
                            <div className="flex items-center text-primary-600">
                              <StarIcon className="w-4 h-4 mr-1" />
                              +{task.matchImpact}% match
                            </div>
                          </div>
                        </div>

                        {!completedTasks.has(task.id) && (
                          <button
                            onClick={() => handleTaskComplete(task.id)}
                            className="ml-4 bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                          >
                            Mark Done
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-600">
                    Complete tasks to see your match score increase in real-time
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Close
                    </button>
                    {isInterviewReady && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <TrophyIcon className="w-4 h-4" />
                        <span>Apply Now!</span>
                      </button>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}