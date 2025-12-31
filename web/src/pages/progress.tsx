import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import CompetencyRadar from '../components/CompetencyRadar';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrophyIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  UserIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface Milestone {
  id: string;
  title: string;
  description: string;
  completedAt: string;
  type: 'skill' | 'achievement' | 'certification';
  icon: string;
}

interface MentorSession {
  id: string;
  mentorName: string;
  mentorTitle: string;
  scheduledAt: string;
  topic: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'React Native Mastery',
    description: 'Completed advanced React Native course and built 3 mobile apps',
    completedAt: '2024-10-20',
    type: 'skill',
    icon: '📱'
  },
  {
    id: '2',
    title: 'First FAANG Interview',
    description: 'Successfully completed technical interview at Google',
    completedAt: '2024-10-15',
    type: 'achievement',
    icon: '🎯'
  },
  {
    id: '3',
    title: 'AWS Certified Developer',
    description: 'Earned AWS Certified Developer - Associate certification',
    completedAt: '2024-10-10',
    type: 'certification',
    icon: '🏆'
  },
  {
    id: '4',
    title: 'TypeScript Expert',
    description: 'Achieved advanced proficiency in TypeScript development',
    completedAt: '2024-10-05',
    type: 'skill',
    icon: '⚡'
  }
];

const mockMentorSession: MentorSession = {
  id: '1',
  mentorName: 'Priya Sharma',
  mentorTitle: 'Senior Software Engineer at Google',
  scheduledAt: '2024-10-28T15:00:00Z',
  topic: 'System Design Interview Preparation',
  status: 'upcoming'
};

export default function Progress() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const progressStats = {
    skillsLearned: 12,
    coursesCompleted: 8,
    certificationsEarned: 3,
    mentorSessions: 5,
    averageMatchScore: 84,
    interviewsScheduled: 2,
    jobApplications: 15,
    profileViews: 247
  };

  const StatCard = ({ title, value, change, icon: Icon, trend, color = 'primary' }: {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    trend?: 'up' | 'down' | 'neutral';
    color?: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-1 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' && <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />}
              {trend === 'down' && <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />}
              {change}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${
          color === 'primary' ? 'bg-primary-100' :
          color === 'green' ? 'bg-green-100' :
          color === 'yellow' ? 'bg-yellow-100' :
          color === 'purple' ? 'bg-purple-100' : 'bg-primary-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            color === 'primary' ? 'text-primary-600' :
            color === 'green' ? 'text-green-600' :
            color === 'yellow' ? 'text-yellow-600' :
            color === 'purple' ? 'text-purple-600' : 'text-primary-600'
          }`} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Progress - JobSwipe</title>
        <meta name="description" content="Track your career growth and skill development" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Career Progress</h1>
                <p className="text-gray-600 mt-2">Track your professional evolution and skill development</p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Skills Learned"
              value={progressStats.skillsLearned}
              change="+3 this month"
              icon={AcademicCapIcon}
              trend="up"
              color="primary"
            />
            <StatCard
              title="Avg Match Score"
              value={`${progressStats.averageMatchScore}%`}
              change="+12% improvement"
              icon={ChartBarIcon}
              trend="up"
              color="green"
            />
            <StatCard
              title="Interviews Scheduled"
              value={progressStats.interviewsScheduled}
              change="2 this week"
              icon={CalendarIcon}
              trend="up"
              color="yellow"
            />
            <StatCard
              title="Certifications"
              value={progressStats.certificationsEarned}
              change="1 new this month"
              icon={TrophyIcon}
              trend="up"
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Competency Radar Chart */}
            <div className="lg:col-span-2">
              <CompetencyRadar />
            </div>

            {/* Mentor Sync Status */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  Next Mentor Session
                </h3>
                
                <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      PS
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{mockMentorSession.mentorName}</h4>
                      <p className="text-sm text-gray-600">{mockMentorSession.mentorTitle}</p>
                      <p className="text-sm font-medium text-primary-600 mt-1">{mockMentorSession.topic}</p>
                      
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {new Date(mockMentorSession.scheduledAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {new Date(mockMentorSession.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-primary-700 transition-colors">
                      Join Session
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all">
                    🎯 Update Skills
                  </button>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all">
                    📚 Find Courses
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all">
                    👥 Book Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Journey */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <TrophyIcon className="w-5 h-5 mr-2" />
              Milestone Journey
            </h3>
            
            <div className="space-y-6">
              {mockMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      milestone.type === 'skill' ? 'bg-blue-100' :
                      milestone.type === 'achievement' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {milestone.icon}
                    </div>
                    {index < mockMilestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          milestone.type === 'skill' ? 'bg-blue-100 text-blue-800' :
                          milestone.type === 'achievement' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {milestone.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <CalendarIcon className="w-4 h-4 inline mr-1" />
                          {new Date(milestone.completedAt).toLocaleDateString()}
                        </div>
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Career Growth Insights */}
          <div className="mt-8 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">🚀 Career Growth Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">+47%</div>
                  <div className="text-sm opacity-90">Match Score Improvement</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">3x</div>
                  <div className="text-sm opacity-90">More Interview Invites</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">₹2.5L</div>
                  <div className="text-sm opacity-90">Avg Salary Increase Potential</div>
                </div>
              </div>
              <p className="mt-6 text-lg opacity-90">
                You're on track to achieve your career goals! Keep learning and growing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}