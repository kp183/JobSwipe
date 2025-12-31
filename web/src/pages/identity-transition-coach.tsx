import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  HeartIcon,
  LightBulbIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface IdentityAssessment {
  currentIdentity: string;
  desiredIdentity: string;
  coreValues: string[];
  transferableSkills: string[];
  identityGaps: string[];
  confidenceLevel: number;
  stage: 'grief' | 'discovery' | 'building' | 'transformation';
}

interface ReinventionWeek {
  week: number;
  title: string;
  description: string;
  activities: Activity[];
  completed: boolean;
  insights: string[];
}

interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'journaling' | 'assessment' | 'exercise' | 'reflection';
  timeRequired: string;
  completed: boolean;
  response?: string;
}

interface SkillTranslation {
  oldRole: string;
  newRoles: string[];
  transferableSkills: {
    skill: string;
    oldContext: string;
    newContext: string;
    examples: string[];
  }[];
}

const mockAssessment: IdentityAssessment = {
  currentIdentity: 'Marketing Manager',
  desiredIdentity: 'UX Designer',
  coreValues: ['Creativity', 'User-centricity', 'Problem-solving', 'Collaboration'],
  transferableSkills: ['User research', 'Data analysis', 'Project management', 'Communication'],
  identityGaps: ['Technical design skills', 'Portfolio development', 'Design thinking process'],
  confidenceLevel: 65,
  stage: 'discovery'
};

const reinventionRoadmap: ReinventionWeek[] = [
  {
    week: 1,
    title: 'Grieve the Old Identity',
    description: 'Acknowledge what you\'re leaving behind and give yourself permission to feel the loss',
    completed: true,
    activities: [
      {
        id: '1-1',
        title: 'Identity Eulogy',
        description: 'Write a letter to your old professional self, acknowledging what that identity gave you',
        type: 'journaling',
        timeRequired: '30 minutes',
        completed: true,
        response: 'Dear Marketing Manager Me, you taught me to understand customers deeply and communicate value clearly. Thank you for 8 years of growth.'
      },
      {
        id: '1-2',
        title: 'Loss Acknowledgment',
        description: 'List what you\'ll miss about your old career and what you won\'t miss',
        type: 'reflection',
        timeRequired: '20 minutes',
        completed: true
      },
      {
        id: '1-3',
        title: 'Permission to Grieve',
        description: 'Allow yourself to feel sad, confused, or uncertain about the change',
        type: 'reflection',
        timeRequired: '15 minutes',
        completed: true
      }
    ],
    insights: [
      'It\'s normal to feel grief when changing careers - you\'re losing part of your identity',
      'Acknowledging the loss helps you move forward without regret',
      'Your old career wasn\'t wasted - it was preparation for what\'s next'
    ]
  },
  {
    week: 2,
    title: 'Discover Core Values',
    description: 'Identify what truly matters to you beyond job titles and external validation',
    completed: true,
    activities: [
      {
        id: '2-1',
        title: 'Values Archaeology',
        description: 'Dig deep into moments when you felt most fulfilled at work',
        type: 'assessment',
        timeRequired: '45 minutes',
        completed: true
      },
      {
        id: '2-2',
        title: 'Legacy Visioning',
        description: 'Imagine your retirement party - what impact do you want to be remembered for?',
        type: 'exercise',
        timeRequired: '30 minutes',
        completed: true
      },
      {
        id: '2-3',
        title: 'Problem Passion',
        description: 'What problems in the world make you angry enough to want to solve them?',
        type: 'reflection',
        timeRequired: '25 minutes',
        completed: true
      }
    ],
    insights: [
      'Your core values remain constant even when your job title changes',
      'The problems you\'re passionate about solving point to your true calling',
      'Fulfillment comes from alignment between values and daily work'
    ]
  },
  {
    week: 3,
    title: 'Build New Identity',
    description: 'Craft your new professional story and practice introducing yourself',
    completed: false,
    activities: [
      {
        id: '3-1',
        title: 'Identity Story Crafting',
        description: 'Write your new professional narrative connecting your past to your future',
        type: 'journaling',
        timeRequired: '60 minutes',
        completed: false
      },
      {
        id: '3-2',
        title: 'Elevator Pitch Practice',
        description: 'Practice introducing yourself with your new identity in 30 seconds',
        type: 'exercise',
        timeRequired: '30 minutes',
        completed: false
      },
      {
        id: '3-3',
        title: 'Visual Identity Board',
        description: 'Create a vision board representing your new professional self',
        type: 'exercise',
        timeRequired: '45 minutes',
        completed: false
      }
    ],
    insights: [
      'Your story should show evolution, not abandonment of your past',
      'Practice makes the new identity feel more natural and confident',
      'Visual representation helps solidify the mental shift'
    ]
  },
  {
    week: 4,
    title: 'Embrace Transformation',
    description: 'Live your new identity in real situations and celebrate the evolution',
    completed: false,
    activities: [
      {
        id: '4-1',
        title: 'Identity Test Drive',
        description: 'Introduce yourself with your new identity in 3 professional situations',
        type: 'exercise',
        timeRequired: '1 week',
        completed: false
      },
      {
        id: '4-2',
        title: 'Digital Identity Update',
        description: 'Update LinkedIn, resume, and all professional materials with new identity',
        type: 'exercise',
        timeRequired: '2 hours',
        completed: false
      },
      {
        id: '4-3',
        title: 'Transformation Celebration',
        description: 'Acknowledge and celebrate your courage to reinvent yourself',
        type: 'reflection',
        timeRequired: '30 minutes',
        completed: false
      }
    ],
    insights: [
      'Living the new identity makes it real and builds confidence',
      'Updating your digital presence signals commitment to the change',
      'Celebrating the transformation reinforces your new professional self'
    ]
  }
];

const skillTranslations: SkillTranslation[] = [
  {
    oldRole: 'Teacher',
    newRoles: ['Trainer', 'Instructional Designer', 'Learning & Development Specialist', 'Curriculum Developer'],
    transferableSkills: [
      {
        skill: 'Curriculum Development',
        oldContext: 'Creating lesson plans for students',
        newContext: 'Designing training programs for employees',
        examples: ['Adult learning principles', 'Learning objectives', 'Assessment design']
      },
      {
        skill: 'Public Speaking',
        oldContext: 'Teaching classes of 30+ students',
        newContext: 'Presenting to executives and leading workshops',
        examples: ['Audience engagement', 'Complex concept explanation', 'Q&A facilitation']
      },
      {
        skill: 'Behavioral Psychology',
        oldContext: 'Managing classroom behavior',
        newContext: 'Understanding user behavior and motivation',
        examples: ['Motivation techniques', 'Habit formation', 'Performance feedback']
      }
    ]
  },
  {
    oldRole: 'Sales Manager',
    newRoles: ['Product Manager', 'Customer Success Manager', 'Business Development', 'Marketing Manager'],
    transferableSkills: [
      {
        skill: 'Customer Insights',
        oldContext: 'Understanding buyer needs and objections',
        newContext: 'Product market fit and user research',
        examples: ['Pain point identification', 'Value proposition', 'Customer interviews']
      },
      {
        skill: 'Relationship Building',
        oldContext: 'Building trust with prospects and clients',
        newContext: 'Stakeholder management and partnerships',
        examples: ['Trust building', 'Conflict resolution', 'Long-term relationships']
      }
    ]
  }
];

export default function IdentityTransitionCoach() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'roadmap' | 'translator' | 'therapy'>('assessment');
  const [currentWeek, setCurrentWeek] = useState(2);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [journalEntry, setJournalEntry] = useState('');

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'grief': return 'text-red-600 bg-red-100';
      case 'discovery': return 'text-blue-600 bg-blue-100';
      case 'building': return 'text-purple-600 bg-purple-100';
      case 'transformation': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStageEmoji = (stage: string) => {
    switch (stage) {
      case 'grief': return '💔';
      case 'discovery': return '🔍';
      case 'building': return '🏗️';
      case 'transformation': return '🦋';
      default: return '🎯';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'journaling': return '📝';
      case 'assessment': return '📊';
      case 'exercise': return '💪';
      case 'reflection': return '🤔';
      default: return '📋';
    }
  };

  return (
    <>
      <Head>
        <title>Identity Transition Coach™ - Navigate Career Identity Crisis</title>
        <meta name="description" content="AI-powered career identity therapy for smooth career transitions" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Identity Transition Coach™</h1>
              <p className="text-gray-600">Navigate career identity crisis with AI-powered therapeutic guidance</p>
              <div className="mt-2 text-sm text-purple-600">
                🧠 Career changes trigger identity loss - "Who am I if I don't do my old work?"
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Current Identity Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Identity Transition Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl mb-2">👋</div>
                <div className="font-semibold text-red-900">Leaving Behind</div>
                <div className="text-red-800">{mockAssessment.currentIdentity}</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl mb-2">{getStageEmoji(mockAssessment.stage)}</div>
                <div className="font-semibold text-blue-900">Current Stage</div>
                <div className={`inline-block px-2 py-1 rounded text-sm ${getStageColor(mockAssessment.stage)}`}>
                  {mockAssessment.stage}
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-green-900">Becoming</div>
                <div className="text-green-800">{mockAssessment.desiredIdentity}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Identity Confidence</span>
                <span className="text-sm text-gray-600">{mockAssessment.confidenceLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${mockAssessment.confidenceLevel}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {mockAssessment.confidenceLevel < 50 ? 'Building confidence in new identity' :
                 mockAssessment.confidenceLevel < 80 ? 'Growing more comfortable with change' :
                 'Strong confidence in new direction'}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'assessment', label: 'Identity Assessment', icon: UserIcon },
                  { key: 'roadmap', label: 'Reinvention Roadmap', icon: ArrowRightIcon },
                  { key: 'translator', label: 'Skills Translator', icon: SparklesIcon },
                  { key: 'therapy', label: 'AI Therapy Session', icon: HeartIcon }
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

          {/* Identity Assessment Tab */}
          {activeTab === 'assessment' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Core Values Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Your Core Values</h4>
                    <div className="space-y-2">
                      {mockAssessment.coreValues.map((value, index) => (
                        <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3" />
                          <span className="text-blue-900 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Transferable Skills</h4>
                    <div className="space-y-2">
                      {mockAssessment.transferableSkills.map((skill, index) => (
                        <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                          <StarIcon className="w-5 h-5 text-green-600 mr-3" />
                          <span className="text-green-900 font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Identity Gaps to Bridge</h3>
                <div className="space-y-4">
                  {mockAssessment.identityGaps.map((gap, index) => (
                    <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium text-yellow-900">{gap}</div>
                        <div className="text-sm text-yellow-800 mt-1">
                          Recommended action: {
                            gap.includes('Technical') ? 'Take online courses and build practice projects' :
                            gap.includes('Portfolio') ? 'Create 3-5 portfolio pieces showcasing your new skills' :
                            'Join design thinking workshops and practice the methodology'
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reinvention Roadmap Tab */}
          {activeTab === 'roadmap' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">4-Week Reinvention Roadmap</h3>
                <div className="space-y-6">
                  {reinventionRoadmap.map((week) => (
                    <motion.div
                      key={week.week}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: week.week * 0.1 }}
                      className={`border rounded-lg p-6 ${
                        week.completed ? 'border-green-200 bg-green-50' :
                        currentWeek === week.week ? 'border-blue-200 bg-blue-50' :
                        'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            week.completed ? 'bg-green-600' :
                            currentWeek === week.week ? 'bg-blue-600' :
                            'bg-gray-400'
                          }`}>
                            {week.completed ? '✓' : week.week}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{week.title}</h4>
                            <p className="text-sm text-gray-600">{week.description}</p>
                          </div>
                        </div>
                        {currentWeek === week.week && (
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                            Current Week
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {week.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              activity.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}
                            onClick={() => setSelectedActivity(activity)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg">{getActivityIcon(activity.type)}</span>
                              {activity.completed && <CheckCircleIcon className="w-5 h-5 text-green-600" />}
                            </div>
                            <h5 className="font-medium text-gray-900 text-sm">{activity.title}</h5>
                            <p className="text-xs text-gray-600 mt-1">{activity.timeRequired}</p>
                          </div>
                        ))}
                      </div>

                      {week.insights.length > 0 && (
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h5 className="font-medium text-purple-900 mb-2">💡 Key Insights</h5>
                          <ul className="space-y-1">
                            {week.insights.map((insight, index) => (
                              <li key={index} className="text-sm text-purple-800 flex items-start">
                                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Activity Detail Modal */}
              {selectedActivity && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getActivityIcon(selectedActivity.type)}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{selectedActivity.title}</h3>
                            <p className="text-gray-600">{selectedActivity.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedActivity(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>

                      {selectedActivity.type === 'journaling' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Your Response:
                            </label>
                            <textarea
                              value={selectedActivity.response || journalEntry}
                              onChange={(e) => setJournalEntry(e.target.value)}
                              placeholder="Take your time to reflect and write your thoughts..."
                              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                            Save Response
                          </button>
                        </div>
                      )}

                      {selectedActivity.response && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-900 mb-2">Your Previous Response:</h4>
                          <p className="text-green-800 text-sm">{selectedActivity.response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Skills Translator Tab */}
          {activeTab === 'translator' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Transferable Skills Translator</h3>
                <div className="space-y-8">
                  {skillTranslations.map((translation, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{translation.oldRole}</h4>
                          <p className="text-gray-600">You're not "just" a {translation.oldRole.toLowerCase()}</p>
                        </div>
                        <ArrowRightIcon className="w-8 h-8 text-primary-600" />
                      </div>

                      <div className="mb-6">
                        <h5 className="font-medium text-gray-900 mb-3">You're Also:</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {translation.newRoles.map((role, roleIndex) => (
                            <div key={roleIndex} className="p-3 bg-blue-50 rounded-lg text-center">
                              <div className="font-medium text-blue-900 text-sm">{role}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {translation.transferableSkills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                            <h6 className="font-semibold text-green-900 mb-2">✨ {skill.skill}</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <div className="text-sm font-medium text-gray-700">Previous Context:</div>
                                <div className="text-sm text-gray-600">{skill.oldContext}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-700">New Context:</div>
                                <div className="text-sm text-gray-600">{skill.newContext}</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-1">Specific Examples:</div>
                              <div className="flex flex-wrap gap-2">
                                {skill.examples.map((example, exampleIndex) => (
                                  <span key={exampleIndex} className="px-2 py-1 bg-white text-gray-700 rounded text-xs border">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">🎯 Your Value Proposition</h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-purple-800 font-medium">
                    "I bring a unique combination of {mockAssessment.transferableSkills.join(', ')} from my {mockAssessment.currentIdentity} background. 
                    This gives me a distinctive perspective on {mockAssessment.desiredIdentity} challenges that pure industry insiders might miss. 
                    My diverse experience allows me to bridge gaps between different stakeholders and bring fresh solutions to complex problems."
                  </p>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    📋 Copy Value Proposition
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Therapy Session Tab */}
          {activeTab === 'therapy' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Career Identity Therapist</h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        AI
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">Dr. Identity (AI Therapist)</div>
                        <div className="text-blue-800 mt-1">
                          I understand you're transitioning from {mockAssessment.currentIdentity} to {mockAssessment.desiredIdentity}. 
                          This kind of career change can feel like losing part of yourself. It's completely normal to feel uncertain or even grieve your old professional identity.
                          
                          What aspect of this transition feels most challenging for you right now?
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <div className="font-medium text-gray-900">💔 "I feel like I'm throwing away years of experience"</div>
                      <div className="text-sm text-gray-600 mt-1">Explore feelings about "wasted" time and reframe your experience</div>
                    </button>
                    
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <div className="font-medium text-gray-900">😰 "I don't know who I am without my job title"</div>
                      <div className="text-sm text-gray-600 mt-1">Work on separating identity from job title and discovering core self</div>
                    </button>
                    
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <div className="font-medium text-gray-900">🤔 "What if I'm making a huge mistake?"</div>
                      <div className="text-sm text-gray-600 mt-1">Address fear of change and build confidence in decision-making</div>
                    </button>
                    
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <div className="font-medium text-gray-900">😔 "I feel like I'm starting over from scratch"</div>
                      <div className="text-sm text-gray-600 mt-1">Recognize transferable skills and build on existing foundation</div>
                    </button>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">🌱 Daily Affirmations for Identity Transition</h4>
                    <div className="space-y-2 text-sm text-green-800">
                      <div>• "My past experience is not wasted - it's the foundation for my future success"</div>
                      <div>• "I am more than my job title - my core values and skills remain constant"</div>
                      <div>• "Change is growth, and growth requires courage - I am brave enough to evolve"</div>
                      <div>• "My unique background gives me a competitive advantage in my new field"</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                      🎯 Start Personalized Therapy Session
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      AI will provide personalized guidance based on your specific transition challenges
                    </p>
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