import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellIcon,
  FireIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

interface ApplicationStatus {
  id: string;
  company: string;
  position: string;
  appliedDate: string;
  status: 'applied' | 'viewed' | 'screening' | 'shortlisted' | 'interview' | 'offer' | 'rejected';
  lastUpdate: string;
  readReceipt?: {
    viewedBy: string;
    viewedAt: string;
    timeSpent: string;
  };
  timeline: {
    stage: string;
    date: string;
    person?: string;
    note?: string;
  }[];
  prediction: {
    likelyResponse: string;
    confidence: number;
    reasoning: string;
  };
  companyStats: {
    responseRate: number;
    avgResponseTime: string;
    hiringVelocity: 'fast' | 'medium' | 'slow';
    ghostJobRisk: number;
  };
}

const mockApplications: ApplicationStatus[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Senior Frontend Developer',
    appliedDate: '2024-10-23',
    status: 'viewed',
    lastUpdate: '2 hours ago',
    readReceipt: {
      viewedBy: 'Sarah Chen (Senior Engineering Manager)',
      viewedAt: '2024-10-25 14:30',
      timeSpent: '3 minutes 45 seconds'
    },
    timeline: [
      { stage: 'Applied', date: '2024-10-23 09:15', note: 'Application submitted successfully' },
      { stage: 'ATS Screening', date: '2024-10-23 09:16', note: 'Passed automated screening (Score: 94/100)' },
      { stage: 'Viewed by HR', date: '2024-10-25 14:30', person: 'Sarah Chen', note: 'Spent 3m 45s reviewing your profile' }
    ],
    prediction: {
      likelyResponse: 'You\'ll likely hear back in 3-5 days',
      confidence: 78,
      reasoning: 'Google typically responds within 1 week. Your profile matches 89% of requirements.'
    },
    companyStats: {
      responseRate: 67,
      avgResponseTime: '5-7 days',
      hiringVelocity: 'medium',
      ghostJobRisk: 15
    }
  },
  {
    id: '2',
    company: 'Meta',
    position: 'Product Manager',
    appliedDate: '2024-10-20',
    status: 'shortlisted',
    lastUpdate: '1 day ago',
    timeline: [
      { stage: 'Applied', date: '2024-10-20 11:22' },
      { stage: 'Viewed by Recruiter', date: '2024-10-21 16:45', person: 'Mike Rodriguez' },
      { stage: 'Technical Screening', date: '2024-10-22 10:00', note: 'Passed initial screening' },
      { stage: 'Shortlisted', date: '2024-10-24 14:20', note: 'You\'re in the top 8 candidates!' }
    ],
    prediction: {
      likelyResponse: 'Interview invitation expected within 2-3 days',
      confidence: 85,
      reasoning: 'You\'re shortlisted! Meta schedules interviews quickly for top candidates.'
    },
    companyStats: {
      responseRate: 72,
      avgResponseTime: '3-5 days',
      hiringVelocity: 'fast',
      ghostJobRisk: 8
    }
  },
  {
    id: '3',
    company: 'TechCorp Solutions',
    position: 'Full Stack Developer',
    appliedDate: '2024-09-15',
    status: 'applied',
    lastUpdate: '41 days ago',
    timeline: [
      { stage: 'Applied', date: '2024-09-15 13:45' },
      { stage: 'ATS Processing', date: '2024-09-15 13:46', note: 'Application received' }
    ],
    prediction: {
      likelyResponse: '⚠️ Likely a ghost job - no response expected',
      confidence: 92,
      reasoning: 'No activity for 41 days. This company has 12% response rate and posts fake jobs.'
    },
    companyStats: {
      responseRate: 12,
      avgResponseTime: 'Never responds',
      hiringVelocity: 'slow',
      ghostJobRisk: 89
    }
  },
  {
    id: '4',
    company: 'Stripe',
    position: 'Senior Backend Engineer',
    appliedDate: '2024-10-24',
    status: 'interview',
    lastUpdate: '6 hours ago',
    timeline: [
      { stage: 'Applied', date: '2024-10-24 10:30' },
      { stage: 'Viewed by Engineering', date: '2024-10-24 15:20', person: 'Alex Kim (CTO)' },
      { stage: 'Phone Screen Scheduled', date: '2024-10-25 09:15', note: 'Interview with Alex Kim on Oct 28, 2:00 PM' }
    ],
    prediction: {
      likelyResponse: 'Prepare for technical interview - high success probability',
      confidence: 91,
      reasoning: 'CTO personally reviewed your profile. Stripe has 89% offer rate after phone screens.'
    },
    companyStats: {
      responseRate: 84,
      avgResponseTime: '1-2 days',
      hiringVelocity: 'fast',
      ghostJobRisk: 5
    }
  },
  {
    id: '5',
    company: 'Amazon',
    position: 'Software Development Engineer',
    appliedDate: '2024-10-22',
    status: 'rejected',
    lastUpdate: '12 hours ago',
    timeline: [
      { stage: 'Applied', date: '2024-10-22 14:15' },
      { stage: 'ATS Screening', date: '2024-10-22 14:16', note: 'Failed keyword matching (Score: 45/100)' },
      { stage: 'Rejected', date: '2024-10-25 08:30', note: 'Not selected for this position' }
    ],
    prediction: {
      likelyResponse: 'Rejection reason: ATS keyword mismatch',
      confidence: 95,
      reasoning: 'Your resume missed key terms: "AWS", "microservices", "distributed systems"'
    },
    companyStats: {
      responseRate: 45,
      avgResponseTime: '2-3 days',
      hiringVelocity: 'medium',
      ghostJobRisk: 25
    }
  }
];

export default function ApplicationPulse() {
  const [applications, setApplications] = useState<ApplicationStatus[]>(mockApplications);
  const [selectedApp, setSelectedApp] = useState<ApplicationStatus | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-gray-100 text-gray-800';
      case 'viewed': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-purple-100 text-purple-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'offer': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <ClockIcon className="w-4 h-4" />;
      case 'viewed': return <EyeIcon className="w-4 h-4" />;
      case 'screening': return <UserGroupIcon className="w-4 h-4" />;
      case 'shortlisted': return <CheckCircleIcon className="w-4 h-4" />;
      case 'interview': return <BellIcon className="w-4 h-4" />;
      case 'offer': return <HeartIcon className="w-4 h-4" />;
      case 'rejected': return <XCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600 bg-green-100';
    if (risk < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'active') return !['rejected', 'offer'].includes(app.status);
    if (filter === 'ghost') return app.companyStats.ghostJobRisk > 70;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    viewed: applications.filter(a => ['viewed', 'screening', 'shortlisted', 'interview', 'offer'].includes(a.status)).length,
    interviews: applications.filter(a => a.status === 'interview').length,
    ghostJobs: applications.filter(a => a.companyStats.ghostJobRisk > 70).length
  };

  return (
    <>
      <Head>
        <title>Application Pulse™ - Real-Time Job Application Tracking</title>
        <meta name="description" content="See exactly when employers view your applications with read receipts and timeline tracking" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Application Pulse™</h1>
                <p className="text-gray-600">Real-time tracking with read receipts and timeline visibility</p>
                <div className="mt-2 text-sm text-primary-600">
                  📊 Solving the #1 job search problem: "Why don't employers respond?"
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">{stats.viewed}/{stats.total}</div>
                <div className="text-sm text-gray-500">Applications Viewed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <EyeIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.viewed}</div>
                  <div className="text-sm text-gray-500">Applications Viewed</div>
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600">
                {Math.round((stats.viewed / stats.total) * 100)}% view rate (Industry avg: 23%)
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BellIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.interviews}</div>
                  <div className="text-sm text-gray-500">Interviews Scheduled</div>
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600">
                {Math.round((stats.interviews / stats.total) * 100)}% interview rate (Industry avg: 2-4%)
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stats.ghostJobs}</div>
                  <div className="text-sm text-gray-500">Ghost Jobs Detected</div>
                </div>
              </div>
              <div className="mt-2 text-sm text-red-600">
                Saved you {stats.ghostJobs * 45} minutes of wasted time
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">78%</div>
                  <div className="text-sm text-gray-500">Success Prediction</div>
                </div>
              </div>
              <div className="mt-2 text-sm text-purple-600">
                AI confidence in your next offer
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'all', label: 'All Applications', count: stats.total },
                  { key: 'active', label: 'Active', count: applications.filter(a => !['rejected', 'offer'].includes(a.status)).length },
                  { key: 'viewed', label: 'Viewed', count: stats.viewed },
                  { key: 'interview', label: 'Interviews', count: stats.interviews },
                  { key: 'ghost', label: 'Ghost Jobs', count: stats.ghostJobs }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      filter === tab.key
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{app.position}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span className="ml-1 capitalize">{app.status}</span>
                      </span>
                      {app.companyStats.ghostJobRisk > 70 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          👻 Ghost Job
                        </span>
                      )}
                    </div>
                    
                    <div className="text-gray-600 mb-2">{app.company}</div>
                    
                    {/* Read Receipt */}
                    {app.readReceipt && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-3 border border-blue-200">
                        <div className="flex items-center text-blue-800">
                          <EyeIcon className="w-4 h-4 mr-2" />
                          <span className="font-medium">Read Receipt</span>
                        </div>
                        <div className="text-sm text-blue-700 mt-1">
                          Viewed by <strong>{app.readReceipt.viewedBy}</strong> {app.lastUpdate}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Time spent reviewing: {app.readReceipt.timeSpent}
                        </div>
                      </div>
                    )}

                    {/* AI Prediction */}
                    <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-primary-900">AI Prediction</div>
                          <div className="text-sm text-primary-800">{app.prediction.likelyResponse}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">{app.prediction.confidence}%</div>
                          <div className="text-xs text-primary-600">Confidence</div>
                        </div>
                      </div>
                    </div>

                    {/* Company Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Response Rate</div>
                        <div className="font-medium">{app.companyStats.responseRate}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Avg Response</div>
                        <div className="font-medium">{app.companyStats.avgResponseTime}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Ghost Risk</div>
                        <div className={`font-medium px-2 py-1 rounded text-xs ${getRiskColor(app.companyStats.ghostJobRisk)}`}>
                          {app.companyStats.ghostJobRisk}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <div className="text-sm text-gray-500">Applied</div>
                    <div className="font-medium">{new Date(app.appliedDate).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400 mt-1">Updated {app.lastUpdate}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Timeline Modal */}
          {selectedApp && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedApp.position}</h2>
                      <p className="text-gray-600">{selectedApp.company}</p>
                    </div>
                    <button
                      onClick={() => setSelectedApp(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircleIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Application Timeline</h3>
                    {selectedApp.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900">{event.stage}</div>
                            <div className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</div>
                          </div>
                          {event.person && (
                            <div className="text-sm text-gray-600">by {event.person}</div>
                          )}
                          {event.note && (
                            <div className="text-sm text-gray-700 mt-1">{event.note}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Analysis */}
                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <h4 className="font-medium text-primary-900 mb-2">🤖 AI Analysis</h4>
                    <p className="text-primary-800 text-sm">{selectedApp.prediction.reasoning}</p>
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