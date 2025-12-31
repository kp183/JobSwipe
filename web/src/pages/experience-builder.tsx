import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  TrophyIcon,
  BoltIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface VirtualInternship {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  tasks: Task[];
  skills: string[];
  progress: number;
  completed: boolean;
  certificate?: string;
  aiMentor: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'analysis' | 'creation' | 'presentation' | 'research';
  timeEstimate: string;
  completed: boolean;
  feedback?: string;
  score?: number;
}

interface MicroApprenticeship {
  id: string;
  company: string;
  project: string;
  duration: string;
  payment: number;
  description: string;
  requirements: string[];
  applicants: number;
  status: 'open' | 'applied' | 'selected' | 'completed';
  conversionRate: number;
}

interface OpenSourceProject {
  id: string;
  name: string;
  description: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  contributors: number;
  issues: number;
  company: string;
  mentorAvailable: boolean;
  estimatedTime: string;
}

const mockInternships: VirtualInternship[] = [
  {
    id: '1',
    title: 'Marketing Coordinator',
    company: 'TechStart Inc',
    duration: '4 weeks',
    description: 'Complete real marketing tasks including campaign creation, data analysis, and presentation to stakeholders',
    tasks: [
      {
        id: '1-1',
        title: 'Email Campaign Creation',
        description: 'Design and write a 5-email nurture sequence for new users',
        type: 'creation',
        timeEstimate: '6 hours',
        completed: true,
        feedback: 'Excellent subject lines and clear CTAs. Open rates would likely be above average.',
        score: 92
      },
      {
        id: '1-2',
        title: 'Campaign Performance Analysis',
        description: 'Analyze last quarter\'s email performance and identify improvement opportunities',
        type: 'analysis',
        timeEstimate: '4 hours',
        completed: true,
        feedback: 'Great insights on segmentation. Your recommendations could increase CTR by 15%.',
        score: 88
      },
      {
        id: '1-3',
        title: 'Stakeholder Presentation',
        description: 'Present campaign strategy and results to marketing team',
        type: 'presentation',
        timeEstimate: '3 hours',
        completed: false
      }
    ],
    skills: ['Email Marketing', 'Data Analysis', 'Presentation', 'Campaign Strategy'],
    progress: 67,
    completed: false,
    aiMentor: 'Sarah (AI Marketing Director)'
  },
  {
    id: '2',
    title: 'Junior Data Analyst',
    company: 'DataCorp',
    duration: '6 weeks',
    description: 'Work with real datasets to create insights and dashboards for business decisions',
    tasks: [
      {
        id: '2-1',
        title: 'Customer Segmentation Analysis',
        description: 'Segment customers based on behavior and create actionable insights',
        type: 'analysis',
        timeEstimate: '8 hours',
        completed: true,
        score: 95
      },
      {
        id: '2-2',
        title: 'Dashboard Creation',
        description: 'Build interactive dashboard showing key business metrics',
        type: 'creation',
        timeEstimate: '10 hours',
        completed: true,
        score: 91
      }
    ],
    skills: ['SQL', 'Python', 'Data Visualization', 'Business Intelligence'],
    progress: 100,
    completed: true,
    certificate: 'Equivalent to 6 months entry-level experience',
    aiMentor: 'Alex (AI Data Science Lead)'
  }
];

const mockApprenticeships: MicroApprenticeship[] = [
  {
    id: '1',
    company: 'Stripe',
    project: 'Payment Flow Optimization',
    duration: '2 weeks',
    payment: 2500,
    description: 'Analyze current payment flow and propose UX improvements to reduce cart abandonment',
    requirements: ['UX/UI experience', 'Analytics knowledge', 'Figma proficiency'],
    applicants: 23,
    status: 'open',
    conversionRate: 65
  },
  {
    id: '2',
    company: 'Airbnb',
    project: 'Host Onboarding Research',
    duration: '3 weeks',
    payment: 3800,
    description: 'Conduct user research on host onboarding experience and create improvement recommendations',
    requirements: ['User Research', 'Interview skills', 'Data analysis'],
    applicants: 31,
    status: 'applied',
    conversionRate: 78
  },
  {
    id: '3',
    company: 'Shopify',
    project: 'Mobile App Feature Design',
    duration: '4 weeks',
    payment: 4200,
    description: 'Design new mobile app feature for small business inventory management',
    requirements: ['Mobile design', 'Prototyping', 'User testing'],
    applicants: 18,
    status: 'selected',
    conversionRate: 82
  }
];

const mockOpenSource: OpenSourceProject[] = [
  {
    id: '1',
    name: 'React UI Components',
    description: 'Accessible, customizable React components used by 200+ companies',
    language: 'TypeScript',
    difficulty: 'intermediate',
    contributors: 45,
    issues: 12,
    company: 'Sponsored by Vercel',
    mentorAvailable: true,
    estimatedTime: '2-4 weeks'
  },
  {
    id: '2',
    name: 'ML Model Optimization',
    description: 'Tools for optimizing machine learning models for production deployment',
    language: 'Python',
    difficulty: 'advanced',
    contributors: 23,
    issues: 8,
    company: 'Backed by Google',
    mentorAvailable: true,
    estimatedTime: '4-6 weeks'
  },
  {
    id: '3',
    name: 'Documentation Generator',
    description: 'Automatically generate beautiful documentation from code comments',
    language: 'JavaScript',
    difficulty: 'beginner',
    contributors: 67,
    issues: 15,
    company: 'Used by Microsoft',
    mentorAvailable: false,
    estimatedTime: '1-2 weeks'
  }
];

export default function ExperienceBuilder() {
  const [activeTab, setActiveTab] = useState<'internships' | 'apprenticeships' | 'opensource' | 'certificates'>('internships');
  const [selectedInternship, setSelectedInternship] = useState<VirtualInternship | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'applied': return 'text-blue-600 bg-blue-100';
      case 'selected': return 'text-purple-600 bg-purple-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'analysis': return '📊';
      case 'creation': return '🎨';
      case 'presentation': return '📽️';
      case 'research': return '🔍';
      default: return '📋';
    }
  };

  return (
    <>
      <Head>
        <title>Experience Builder™ - Solve "Need Experience to Get Experience"</title>
        <meta name="description" content="Build real experience through virtual internships and micro-apprenticeships" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Experience Builder™</h1>
              <p className="text-gray-600">Build real experience through virtual internships and micro-apprenticeships</p>
              <div className="mt-2 text-sm text-red-600">
                ⚠️ AI replacing entry-level jobs - fewer starting positions. Career ladders disappearing.
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BriefcaseIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">47</div>
                  <div className="text-sm text-gray-500">Virtual Internships</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BoltIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">23</div>
                  <div className="text-sm text-gray-500">Micro-Apprenticeships</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CodeBracketIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">156</div>
                  <div className="text-sm text-gray-500">Open Source Projects</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrophyIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'internships', label: 'Virtual Internships', icon: BriefcaseIcon },
                  { key: 'apprenticeships', label: 'Micro-Apprenticeships', icon: BoltIcon },
                  { key: 'opensource', label: 'Open Source', icon: CodeBracketIcon },
                  { key: 'certificates', label: 'Certificates', icon: AcademicCapIcon }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                        activeTab === tab.key
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Virtual Internships Tab */}
          {activeTab === 'internships' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Virtual Internship Simulator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockInternships.map((internship) => (
                    <motion.div
                      key={internship.id}
                      whileHover={{ scale: 1.02 }}
                      className="border border-gray-200 rounded-lg p-6 hover:border-primary-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedInternship(internship)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                          <p className="text-sm text-gray-600">{internship.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{internship.duration}</div>
                          {internship.completed && <CheckCircleIcon className="w-5 h-5 text-green-600 mt-1" />}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{internship.description}</p>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-gray-600">{internship.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${internship.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {internship.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {internship.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{internship.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          AI Mentor: {internship.aiMentor}
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          {internship.completed ? 'View Certificate' : 'Continue →'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Internship Detail Modal */}
              {selectedInternship && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{selectedInternship.title}</h3>
                          <p className="text-gray-600">{selectedInternship.company} • {selectedInternship.duration}</p>
                        </div>
                        <button
                          onClick={() => setSelectedInternship(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Tasks & Progress</h4>
                          <div className="space-y-4">
                            {selectedInternship.tasks.map((task) => (
                              <div key={task.id} className={`p-4 rounded-lg border ${
                                task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                              }`}>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg">{getTaskIcon(task.type)}</span>
                                    <h5 className="font-medium text-gray-900">{task.title}</h5>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{task.timeEstimate}</span>
                                    {task.completed && <CheckCircleIcon className="w-5 h-5 text-green-600" />}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                {task.feedback && (
                                  <div className="bg-blue-50 rounded p-3 border border-blue-200">
                                    <div className="text-sm font-medium text-blue-900">AI Feedback:</div>
                                    <div className="text-sm text-blue-800">{task.feedback}</div>
                                    {task.score && (
                                      <div className="text-sm text-blue-700 mt-1">Score: {task.score}/100</div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {selectedInternship.certificate && (
                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                            <div className="flex items-center space-x-3">
                              <TrophyIcon className="w-8 h-8 text-yellow-600" />
                              <div>
                                <div className="font-semibold text-yellow-900">Certificate Earned!</div>
                                <div className="text-sm text-yellow-800">{selectedInternship.certificate}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* How It Works */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">💼 How Virtual Internships Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      1
                    </div>
                    <h4 className="font-medium text-blue-900 mb-2">Choose Role</h4>
                    <p className="text-sm text-blue-800">Select internship matching your career goals</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      2
                    </div>
                    <h4 className="font-medium text-blue-900 mb-2">Complete Tasks</h4>
                    <p className="text-sm text-blue-800">Work on real projects with AI mentor guidance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      3
                    </div>
                    <h4 className="font-medium text-blue-900 mb-2">Get Feedback</h4>
                    <p className="text-sm text-blue-800">Receive detailed AI feedback on your work</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      4
                    </div>
                    <h4 className="font-medium text-blue-900 mb-2">Earn Certificate</h4>
                    <p className="text-sm text-blue-800">Get verified experience certificate</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Micro-Apprenticeships Tab */}
          {activeTab === 'apprenticeships' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Paid Micro-Apprenticeships</h3>
                <div className="space-y-6">
                  {mockApprenticeships.map((apprenticeship) => (
                    <div key={apprenticeship.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{apprenticeship.project}</h4>
                          <p className="text-sm text-gray-600">{apprenticeship.company} • {apprenticeship.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">${apprenticeship.payment.toLocaleString()}</div>
                          <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(apprenticeship.status)}`}>
                            {apprenticeship.status}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{apprenticeship.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Requirements:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {apprenticeship.requirements.map((req, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Applicants:</div>
                          <div className="text-sm text-gray-600">{apprenticeship.applicants} applied</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Conversion Rate:</div>
                          <div className="text-sm text-green-600">{apprenticeship.conversionRate}% to full-time</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          {apprenticeship.status === 'selected' ? 'Congratulations! You were selected.' :
                           apprenticeship.status === 'applied' ? 'Application under review' :
                           'Application deadline in 5 days'}
                        </div>
                        <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          apprenticeship.status === 'open' ? 'bg-primary-600 text-white hover:bg-primary-700' :
                          apprenticeship.status === 'applied' ? 'bg-gray-300 text-gray-600 cursor-not-allowed' :
                          apprenticeship.status === 'selected' ? 'bg-green-600 text-white hover:bg-green-700' :
                          'bg-gray-600 text-white'
                        }`}>
                          {apprenticeship.status === 'open' ? 'Apply Now' :
                           apprenticeship.status === 'applied' ? 'Applied' :
                           apprenticeship.status === 'selected' ? 'Start Project' :
                           'View Results'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">⚡ Micro-Apprenticeship Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">For You:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Get paid while gaining experience</li>
                      <li>• Work on real company projects</li>
                      <li>• High conversion rate to full-time (65-82%)</li>
                      <li>• Build professional network</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">For Companies:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Test candidates before hiring</li>
                      <li>• Get real work done</li>
                      <li>• Reduce hiring risk</li>
                      <li>• Access diverse talent pool</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Open Source Tab */}
          {activeTab === 'opensource' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Open Source Contribution Matching</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockOpenSource.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <div className="text-gray-500">Language</div>
                          <div className="font-medium">{project.language}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Contributors</div>
                          <div className="font-medium">{project.contributors}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Open Issues</div>
                          <div className="font-medium">{project.issues}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Time Est.</div>
                          <div className="font-medium">{project.estimatedTime}</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">{project.company}</div>
                        {project.mentorAvailable && (
                          <div className="flex items-center text-xs text-green-600">
                            <UserGroupIcon className="w-3 h-3 mr-1" />
                            Mentor available
                          </div>
                        )}
                      </div>

                      <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                        Start Contributing
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">🌟 Open Source Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Build Real Portfolio</h4>
                    <p className="text-sm text-purple-800">Contribute to projects used by thousands of developers</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Learn from Experts</h4>
                    <p className="text-sm text-purple-800">Get code reviews from senior developers</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Network Building</h4>
                    <p className="text-sm text-purple-800">Connect with developers at top companies</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">"Experience Without a Job" Certificates</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border-2 border-yellow-300 rounded-lg p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <TrophyIcon className="w-8 h-8 text-yellow-600" />
                      <div>
                        <h4 className="font-bold text-yellow-900">Marketing Coordinator Certificate</h4>
                        <p className="text-sm text-yellow-800">Equivalent to 6 months entry-level experience</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-yellow-800">
                      <div>✅ Completed 40 hours of simulated work</div>
                      <div>✅ AI evaluated across 10 dimensions</div>
                      <div>✅ Accepted by 150+ partner employers</div>
                      <div>✅ Score: 92/100 (Top 15%)</div>
                    </div>
                  </div>

                  <div className="border-2 border-blue-300 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <AcademicCapIcon className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-bold text-blue-900">Data Analyst Certificate</h4>
                        <p className="text-sm text-blue-800">Equivalent to 8 months entry-level experience</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div>✅ Completed 60 hours of real projects</div>
                      <div>✅ Portfolio of 5 data analysis projects</div>
                      <div>✅ Verified by industry professionals</div>
                      <div>✅ Score: 95/100 (Top 5%)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-4">🏆 Certificate Recognition</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-green-900 mb-2">Partner Employers (150+):</h5>
                      <div className="text-sm text-green-800 space-y-1">
                        <div>• Google, Microsoft, Amazon</div>
                        <div>• Stripe, Airbnb, Shopify</div>
                        <div>• 100+ startups and scale-ups</div>
                        <div>• Government agencies</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-900 mb-2">What Employers Say:</h5>
                      <div className="text-sm text-green-800 italic">
                        "These certificates give us confidence that candidates have real, practical experience. 
                        It's like they've already worked for us for 6 months."
                        <div className="text-xs mt-1">- Sarah Chen, Hiring Manager at Google</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200 p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">🚨 The Experience Paradox - SOLVED</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">The Problem:</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Need experience to get experience</li>
                      <li>• AI replacing entry-level jobs</li>
                      <li>• Career ladders disappearing</li>
                      <li>• Unpaid internships not accessible</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">Our Solution:</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Virtual internships with real work</li>
                      <li>• Paid micro-apprenticeships</li>
                      <li>• Verified experience certificates</li>
                      <li>• 90% success rate in job placement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}