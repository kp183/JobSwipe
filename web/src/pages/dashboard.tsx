import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  HeartIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { 
  FireIcon
} from '@heroicons/react/24/solid';

interface DashboardStats {
  totalViews: number;
  totalSwipes: number;
  rightSwipes: number;
  applications: number;
  interviews: number;
  offers: number;
  responseRate: number;
  avgMatchScore: number;
}

interface ActivityData {
  date: string;
  views: number;
  swipes: number;
  applications: number;
}

const mockStats: DashboardStats = {
  totalViews: 247,
  totalSwipes: 89,
  rightSwipes: 34,
  applications: 12,
  interviews: 3,
  offers: 1,
  responseRate: 67,
  avgMatchScore: 84
};

const mockActivity: ActivityData[] = [
  { date: '2024-10-19', views: 15, swipes: 8, applications: 2 },
  { date: '2024-10-20', views: 23, swipes: 12, applications: 3 },
  { date: '2024-10-21', views: 18, swipes: 6, applications: 1 },
  { date: '2024-10-22', views: 31, swipes: 15, applications: 4 },
  { date: '2024-10-23', views: 28, swipes: 11, applications: 2 },
  { date: '2024-10-24', views: 19, swipes: 9, applications: 0 },
  { date: '2024-10-25', views: 12, swipes: 4, applications: 1 }
];

const mockRecommendations = [
  {
    type: 'skill',
    title: 'Add React Native to your skills',
    description: 'Jobs requiring React Native have 23% higher match rates',
    impact: '+15% match rate',
    priority: 'high'
  },
  {
    type: 'profile',
    title: 'Complete your work experience',
    description: 'Profiles with complete work history get 40% more views',
    impact: '+40% profile views',
    priority: 'medium'
  },
  {
    type: 'activity',
    title: 'Increase your daily swipes',
    description: 'Users who swipe 10+ jobs daily get 2x more interviews',
    impact: '+2x interviews',
    priority: 'low'
  }
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const StatCard = ({ title, value, change, icon: Icon, trend }: {
    title: string;
    value: string | number;
    change?: string;
    icon: any;
    trend?: 'up' | 'down' | 'neutral';
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
          trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-primary-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-primary-600'
          }`} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Dashboard - JobSwipe</title>
        <meta name="description" content="Your job search analytics and insights" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Track your job search progress and get insights</p>
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
              title="Jobs Viewed"
              value={mockStats.totalViews}
              change="+12% vs last week"
              icon={EyeIcon}
              trend="up"
            />
            <StatCard
              title="Applications Sent"
              value={mockStats.applications}
              change="+3 this week"
              icon={BriefcaseIcon}
              trend="up"
            />
            <StatCard
              title="Interview Rate"
              value={`${Math.round((mockStats.interviews / mockStats.applications) * 100)}%`}
              change="Above average"
              icon={CalendarIcon}
              trend="up"
            />
            <StatCard
              title="Avg Match Score"
              value={`${mockStats.avgMatchScore}%`}
              change="+5% improvement"
              icon={StarIcon}
              trend="up"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Activity Overview</h3>
                <ChartBarIcon className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {mockActivity.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-gray-900 w-20">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {day.views} views
                        </div>
                        <div className="flex items-center">
                          <HeartIcon className="w-4 h-4 mr-1" />
                          {day.swipes} swipes
                        </div>
                        <div className="flex items-center">
                          <BriefcaseIcon className="w-4 h-4 mr-1" />
                          {day.applications} apps
                        </div>
                      </div>
                    </div>
                    
                    {/* Simple bar chart */}
                    <div className="flex items-center space-x-1">
                      <div 
                        className="bg-blue-200 h-2 rounded"
                        style={{ width: `${(day.views / 35) * 60}px` }}
                      />
                      <div 
                        className="bg-green-200 h-2 rounded"
                        style={{ width: `${(day.swipes / 15) * 40}px` }}
                      />
                      <div 
                        className="bg-purple-200 h-2 rounded"
                        style={{ width: `${(day.applications / 4) * 20}px` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              {/* Swipe Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Swipe Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Swipes</span>
                    <span className="font-semibold">{mockStats.totalSwipes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Right Swipes</span>
                    <span className="font-semibold text-green-600">{mockStats.rightSwipes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-semibold">
                      {Math.round((mockStats.rightSwipes / mockStats.totalSwipes) * 100)}%
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Application Rate</span>
                      <span>{Math.round((mockStats.rightSwipes / mockStats.totalSwipes) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(mockStats.rightSwipes / mockStats.totalSwipes) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">First Interview!</div>
                      <div className="text-sm text-gray-500">Scheduled with TechCorp Inc.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FireIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Hot Streak</div>
                      <div className="text-sm text-gray-500">5 applications this week</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">High Scorer</div>
                      <div className="text-sm text-gray-500">84% avg match rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high' 
                      ? 'border-red-500 bg-red-50' 
                      : rec.priority === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-green-500 bg-green-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rec.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : rec.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-600">{rec.impact}</span>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      Take Action →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}