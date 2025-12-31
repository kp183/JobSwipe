import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import LearningCompleteModal from '../components/LearningCompleteModal';
import { formatDate } from '../utils/dateUtils';
import { 
  ClockIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  LinkIcon,
  PlayIcon,
  StarIcon,
  TrophyIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface SkillGap {
  skill: string;
  currentLevel: 'none' | 'beginner' | 'intermediate' | 'advanced';
  requiredLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
  priority: 'high' | 'medium' | 'low';
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
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
}

interface JobAnalysis {
  jobId: string;
  jobTitle: string;
  company: string;
  applicationDeadline: string;
  daysUntilDeadline: number;
  currentMatchScore: number;
  potentialMatchScore: number;
  skillGaps: SkillGap[];
  totalLearningHours: number;
  recommendedStartDate: string;
  canCompleteInTime: boolean;
}

const mockJobAnalysis: JobAnalysis = {
  jobId: '1',
  jobTitle: 'Senior Full Stack Developer',
  company: 'Microsoft',
  applicationDeadline: '2024-11-20',
  daysUntilDeadline: 19,
  currentMatchScore: 72,
  potentialMatchScore: 94,
  totalLearningHours: 45,
  recommendedStartDate: '2024-11-01',
  canCompleteInTime: true,
  skillGaps: [
    {
      skill: 'Java',
      currentLevel: 'none',
      requiredLevel: 'intermediate',
      estimatedHours: 25,
      priority: 'high',
      courses: [
        {
          id: '1',
          title: 'Java Programming Masterclass',
          provider: 'Udemy',
          duration: '25 hours',
          rating: 4.6,
          price: 89.99,
          url: 'https://udemy.com/java-masterclass',
          difficulty: 'beginner',
          skills: ['Java', 'OOP', 'Spring Boot']
        },
        {
          id: '2',
          title: 'Java Fundamentals',
          provider: 'Coursera',
          duration: '20 hours',
          rating: 4.4,
          price: 49.99,
          url: 'https://coursera.org/java-fundamentals',
          difficulty: 'beginner',
          skills: ['Java', 'Data Structures']
        }
      ]
    },
    {
      skill: 'Spring Boot',
      currentLevel: 'none',
      requiredLevel: 'intermediate',
      estimatedHours: 15,
      priority: 'high',
      courses: [
        {
          id: '3',
          title: 'Spring Boot Complete Guide',
          provider: 'Pluralsight',
          duration: '15 hours',
          rating: 4.7,
          price: 29.99,
          url: 'https://pluralsight.com/spring-boot',
          difficulty: 'intermediate',
          skills: ['Spring Boot', 'REST APIs', 'Microservices']
        }
      ]
    },
    {
      skill: 'Docker',
      currentLevel: 'beginner',
      requiredLevel: 'intermediate',
      estimatedHours: 5,
      priority: 'medium',
      courses: [
        {
          id: '4',
          title: 'Docker for Developers',
          provider: 'Docker',
          duration: '5 hours',
          rating: 4.5,
          price: 0,
          url: 'https://docker.com/learning',
          difficulty: 'intermediate',
          skills: ['Docker', 'Containerization', 'DevOps']
        }
      ]
    }
  ]
};

export default function SkillGapAnalysis() {
  const [analysis, setAnalysis] = useState<JobAnalysis>(mockJobAnalysis);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [learningPlan, setLearningPlan] = useState<{ [key: string]: boolean }>({});
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'none': return 'text-red-600';
      case 'beginner': return 'text-yellow-600';
      case 'intermediate': return 'text-blue-600';
      case 'advanced': return 'text-green-600';
      case 'expert': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const toggleSkillInPlan = (skill: string) => {
    setLearningPlan(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  const selectedSkillsCount = Object.values(learningPlan).filter(Boolean).length;
  const selectedHours = analysis.skillGaps
    .filter(gap => learningPlan[gap.skill])
    .reduce((total, gap) => total + gap.estimatedHours, 0);

  return (
    <>
      <Head>
        <title>Skill Gap Analysis - JobSwipe</title>
        <meta name="description" content="AI-powered skill gap analysis and learning recommendations" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Skill Gap Analysis</h1>
                <p className="text-gray-600">Get ready for your dream job with personalized learning recommendations</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Analysis for</div>
                <div className="font-semibold text-gray-900">{analysis.jobTitle}</div>
                <div className="text-sm text-gray-600">{analysis.company}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Job Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{analysis.daysUntilDeadline}</div>
                <div className="text-sm text-gray-600">Days Until Deadline</div>
                <div className="text-xs text-gray-500 mt-1">
                  Deadline: {formatDate(analysis.applicationDeadline)}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analysis.currentMatchScore}%</div>
                <div className="text-sm text-gray-600">Current Match</div>
                <div className="text-xs text-gray-500 mt-1">Your current compatibility</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analysis.potentialMatchScore}%</div>
                <div className="text-sm text-gray-600">Potential Match</div>
                <div className="text-xs text-gray-500 mt-1">After completing learning</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{analysis.totalLearningHours}h</div>
                <div className="text-sm text-gray-600">Total Learning Time</div>
                <div className="text-xs text-gray-500 mt-1">Estimated study hours</div>
              </div>
            </div>

            {/* Timeline Indicator */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {analysis.canCompleteInTime ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  ) : (
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {analysis.canCompleteInTime ? '✅ You can complete this in time!' : '⚠️ Tight timeline ahead'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {analysis.canCompleteInTime 
                        ? `Start learning by ${formatDate(analysis.recommendedStartDate)} to finish comfortably`
                        : 'Consider focusing on high-priority skills first'
                      }
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Recommended Start</div>
                  <div className="text-sm text-gray-600">
                    {formatDate(analysis.recommendedStartDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Skill Gaps */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills to Learn</h3>
                
                <div className="space-y-4">
                  {analysis.skillGaps.map((gap, index) => (
                    <motion.div
                      key={gap.skill}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-4 transition-all cursor-pointer ${
                        selectedSkill === gap.skill ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSkill(selectedSkill === gap.skill ? null : gap.skill)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{gap.skill}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(gap.priority)}`}>
                              {gap.priority} priority
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div>
                              Current: <span className={`font-medium ${getLevelColor(gap.currentLevel)}`}>
                                {gap.currentLevel}
                              </span>
                            </div>
                            <ArrowRightIcon className="w-4 h-4" />
                            <div>
                              Required: <span className={`font-medium ${getLevelColor(gap.requiredLevel)}`}>
                                {gap.requiredLevel}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {gap.estimatedHours} hours
                            </div>
                            <div className="flex items-center">
                              <BookOpenIcon className="w-4 h-4 mr-1" />
                              {gap.courses.length} courses available
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={learningPlan[gap.skill] || false}
                              onChange={() => toggleSkillInPlan(gap.skill)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className="ml-2 text-sm text-gray-600">Add to plan</span>
                          </label>
                        </div>
                      </div>

                      {/* Course Recommendations */}
                      {selectedSkill === gap.skill && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <h5 className="font-medium text-gray-900 mb-3">Recommended Courses</h5>
                          <div className="space-y-3">
                            {gap.courses.map((course) => (
                              <div key={course.id} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h6 className="font-medium text-gray-900">{course.title}</h6>
                                    <p className="text-sm text-gray-600">{course.provider}</p>
                                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                      <div className="flex items-center">
                                        <ClockIcon className="w-3 h-3 mr-1" />
                                        {course.duration}
                                      </div>
                                      <div className="flex items-center">
                                        <StarIcon className="w-3 h-3 mr-1" />
                                        {course.rating}
                                      </div>
                                      <div className="font-medium">
                                        {course.price === 0 ? 'Free' : `$${course.price}`}
                                      </div>
                                    </div>
                                  </div>
                                  <a
                                    href={course.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <PlayIcon className="w-3 h-3 mr-1" />
                                    Start
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Plan Summary */}
            <div className="space-y-6">
              {/* My Learning Plan */}
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Learning Plan</h3>
                
                {selectedSkillsCount > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary-600">{selectedSkillsCount}</div>
                          <div className="text-xs text-gray-600">Skills Selected</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary-600">{selectedHours}h</div>
                          <div className="text-xs text-gray-600">Total Hours</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {analysis.skillGaps
                        .filter(gap => learningPlan[gap.skill])
                        .map((gap) => (
                          <div key={gap.skill} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="font-medium text-gray-900">{gap.skill}</span>
                            <span className="text-sm text-gray-600">{gap.estimatedHours}h</span>
                          </div>
                        ))}
                    </div>

                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                      Start Learning Plan
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h4 className="mt-2 text-sm font-medium text-gray-900">No skills selected</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Select skills above to create your learning plan
                    </p>
                  </div>
                )}
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-start">
                      <TrophyIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-blue-900">Focus on Java First</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Java is the highest priority skill. Master this first to maximize your chances.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-start">
                      <CalendarIcon className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-green-900">Perfect Timing</h4>
                        <p className="text-sm text-green-700 mt-1">
                          You have enough time to learn all required skills before the deadline.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex items-start">
                      <StarIcon className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Skill Synergy</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Learning Java will also help with Spring Boot - they work together!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply When Ready */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
                <p className="text-sm opacity-90 mb-4">
                  We'll notify you when you've completed enough skills to significantly improve your match score.
                </p>
                <div className="space-y-2">
                  <button className="w-full bg-white text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Set Application Reminder
                  </button>
                  <button 
                    onClick={() => setShowCompleteModal(true)}
                    className="w-full bg-white/20 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/30 transition-colors text-sm"
                  >
                    🎯 Demo: Complete Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Complete Modal */}
        <LearningCompleteModal
          isOpen={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          completedSkills={['Java', 'Spring Boot', 'Docker']}
          jobTitle={analysis.jobTitle}
          company={analysis.company}
          newMatchScore={94}
          oldMatchScore={72}
        />
      </div>
    </>
  );
}