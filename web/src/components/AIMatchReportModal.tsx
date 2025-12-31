import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CalendarIcon,
  BookOpenIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  deadline?: string;
  matchScore?: number;
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'critical' | 'important' | 'nice-to-have';
  studyHours: number;
  courses: Course[];
}

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  rating: number;
  price: number;
  url: string;
}

interface AIMatchReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export default function AIMatchReportModal({ isOpen, onClose, job }: AIMatchReportModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'roadmap'>('overview');

  // Mock AI analysis data
  const analysisData = {
    currentMatch: job.matchScore || 67,
    potentialMatch: 94,
    totalStudyHours: 45,
    daysUntilDeadline: 23,
    canCompleteInTime: true,
    skillGaps: [
      {
        skill: 'React Native',
        currentLevel: 0,
        requiredLevel: 7,
        priority: 'critical' as const,
        studyHours: 25,
        courses: [
          {
            id: '1',
            title: 'React Native - The Practical Guide',
            provider: 'Udemy',
            duration: '25h',
            rating: 4.6,
            price: 89.99,
            url: '#'
          }
        ]
      },
      {
        skill: 'TypeScript',
        currentLevel: 4,
        requiredLevel: 8,
        priority: 'important' as const,
        studyHours: 15,
        courses: [
          {
            id: '2',
            title: 'TypeScript Complete Course',
            provider: 'Coursera',
            duration: '15h',
            rating: 4.7,
            price: 49.99,
            url: '#'
          }
        ]
      },
      {
        skill: 'GraphQL',
        currentLevel: 2,
        requiredLevel: 6,
        priority: 'nice-to-have' as const,
        studyHours: 5,
        courses: [
          {
            id: '3',
            title: 'GraphQL Fundamentals',
            provider: 'FreeCodeCamp',
            duration: '5h',
            rating: 4.5,
            price: 0,
            url: '#'
          }
        ]
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'important': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'nice-to-have': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const CircularProgress = ({ percentage, size = 120 }: { percentage: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            className={`transition-all duration-1000 ${
              percentage >= 80 ? 'text-green-500' : 
              percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
            <div className="text-xs text-gray-500">Match</div>
          </div>
        </div>
      </div>
    );
  };

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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                      🤖 AI Match Report
                    </Dialog.Title>
                    <p className="text-gray-600">{job.title} at {job.company.name}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                  {[
                    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
                    { id: 'skills', label: 'Skill Gaps', icon: BookOpenIcon },
                    { id: 'roadmap', label: '30-Day Blueprint', icon: CalendarIcon }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Match Score Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <CircularProgress percentage={analysisData.currentMatch} />
                          <h3 className="font-semibold text-gray-900 mt-3">Current Match</h3>
                          <p className="text-sm text-gray-600">Your current compatibility</p>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <ArrowRightIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        
                        <div className="text-center">
                          <CircularProgress percentage={analysisData.potentialMatch} />
                          <h3 className="font-semibold text-gray-900 mt-3">Potential Match</h3>
                          <p className="text-sm text-gray-600">After completing learning</p>
                        </div>
                      </div>

                      {/* Timeline Analysis */}
                      <div className={`p-4 rounded-lg border-l-4 ${
                        analysisData.canCompleteInTime 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50'
                      }`}>
                        <div className="flex items-start space-x-3">
                          {analysisData.canCompleteInTime ? (
                            <CheckCircleIcon className="w-6 h-6 text-green-600 mt-0.5" />
                          ) : (
                            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mt-0.5" />
                          )}
                          <div>
                            <h4 className={`font-semibold ${
                              analysisData.canCompleteInTime ? 'text-green-900' : 'text-red-900'
                            }`}>
                              {analysisData.canCompleteInTime 
                                ? '✅ You can complete this in time!' 
                                : '⚠️ Tight timeline ahead'
                              }
                            </h4>
                            <p className={`text-sm mt-1 ${
                              analysisData.canCompleteInTime ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {analysisData.totalStudyHours} hours of learning needed • {analysisData.daysUntilDeadline} days until deadline
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Key Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-primary-600">{analysisData.skillGaps.length}</div>
                          <div className="text-sm text-gray-600">Skills to Learn</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-yellow-600">{analysisData.totalStudyHours}h</div>
                          <div className="text-sm text-gray-600">Study Time</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">{analysisData.daysUntilDeadline}</div>
                          <div className="text-sm text-gray-600">Days Left</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600">+{analysisData.potentialMatch - analysisData.currentMatch}%</div>
                          <div className="text-sm text-gray-600">Improvement</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'skills' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {analysisData.skillGaps.map((gap, index) => (
                        <div key={gap.skill} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{gap.skill}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span>Current: {gap.currentLevel}/10</span>
                                <span>Required: {gap.requiredLevel}/10</span>
                                <span className="flex items-center">
                                  <ClockIcon className="w-4 h-4 mr-1" />
                                  {gap.studyHours}h
                                </span>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(gap.priority)}`}>
                              {gap.priority}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{Math.round((gap.currentLevel / gap.requiredLevel) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(gap.currentLevel / gap.requiredLevel) * 100}%` }}
                              />
                            </div>
                          </div>

                          {/* Recommended Course */}
                          {gap.courses[0] && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">{gap.courses[0].title}</h5>
                                  <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                                    <span>{gap.courses[0].provider}</span>
                                    <span>{gap.courses[0].duration}</span>
                                    <span className="flex items-center">
                                      <StarIcon className="w-3 h-3 mr-1" />
                                      {gap.courses[0].rating}
                                    </span>
                                    <span className="font-medium">
                                      {gap.courses[0].price === 0 ? 'Free' : `$${gap.courses[0].price}`}
                                    </span>
                                  </div>
                                </div>
                                <button className="flex items-center px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 transition-colors">
                                  <PlayIcon className="w-3 h-3 mr-1" />
                                  Start
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'roadmap' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Your 30-Day Learning Blueprint</h3>
                        <p className="text-gray-600">AI-generated roadmap to maximize your job readiness</p>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-4">
                        {analysisData.skillGaps.map((gap, index) => (
                          <div key={gap.skill} className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                gap.priority === 'critical' ? 'bg-red-500' :
                                gap.priority === 'important' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}>
                                {index + 1}
                              </div>
                              {index < analysisData.skillGaps.length - 1 && (
                                <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                              )}
                            </div>
                            
                            <div className="flex-1 pb-8">
                              <div className="bg-white border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900">{gap.skill}</h4>
                                  <span className="text-sm text-gray-500">Week {index + 1}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  Focus on mastering {gap.skill} fundamentals. Complete the recommended course and practice with real projects.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-gray-500">
                                    <ClockIcon className="w-4 h-4 inline mr-1" />
                                    {gap.studyHours} hours • {Math.ceil(gap.studyHours / 7)} hrs/day
                                  </div>
                                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                    View Details →
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Success Prediction */}
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                        <h4 className="text-lg font-semibold mb-2">🎯 Success Prediction</h4>
                        <p className="text-sm opacity-90 mb-4">
                          Following this roadmap will increase your match score to {analysisData.potentialMatch}%, 
                          putting you in the top 10% of candidates for this role.
                        </p>
                        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                          Start Learning Plan
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Save Report
                    </button>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Start Learning
                    </button>
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