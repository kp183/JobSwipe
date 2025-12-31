import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  EyeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

interface Application {
  id: string;
  jobTitle: string;
  company: {
    name: string;
    logo?: string;
  };
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'interview' | 'offered' | 'rejected' | 'accepted';
  salary?: string;
  location?: string;
  matchScore: number;
  aiScore: number;
  nextStep?: string;
  interviewDate?: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior React Developer',
    company: { name: 'TechCorp Inc.' },
    appliedDate: '2024-10-23',
    status: 'interview',
    salary: '$120k - $160k',
    location: 'San Francisco, CA',
    matchScore: 94,
    aiScore: 8.7,
    nextStep: 'Technical Interview',
    interviewDate: '2024-10-28T14:00:00Z'
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    company: { name: 'StartupXYZ' },
    appliedDate: '2024-10-22',
    status: 'reviewing',
    salary: '$100k - $140k',
    location: 'New York, NY',
    matchScore: 87,
    aiScore: 8.2,
    nextStep: 'HR Review'
  },
  {
    id: '3',
    jobTitle: 'Frontend Developer',
    company: { name: 'DesignStudio Pro' },
    appliedDate: '2024-10-20',
    status: 'offered',
    salary: '$80k - $110k',
    location: 'Remote',
    matchScore: 76,
    aiScore: 7.9,
    nextStep: 'Offer Decision'
  },
  {
    id: '4',
    jobTitle: 'DevOps Engineer',
    company: { name: 'CloudScale Solutions' },
    appliedDate: '2024-10-18',
    status: 'rejected',
    salary: '$130k - $180k',
    location: 'Seattle, WA',
    matchScore: 82,
    aiScore: 7.5
  },
  {
    id: '5',
    jobTitle: 'Mobile App Developer',
    company: { name: 'MobileFirst Inc.' },
    appliedDate: '2024-10-15',
    status: 'pending',
    salary: '$95k - $130k',
    location: 'Los Angeles, CA',
    matchScore: 91,
    aiScore: 8.4,
    nextStep: 'Initial Screening'
  }
];

export default function Applications() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [applications] = useState<Application[]>(mockApplications);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewing': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'offered': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      case 'reviewing': return <EyeIcon className="w-4 h-4" />;
      case 'interview': return <CalendarIcon className="w-4 h-4" />;
      case 'offered': return <CheckCircleIcon className="w-4 h-4" />;
      case 'rejected': return <XCircleIcon className="w-4 h-4" />;
      case 'accepted': return <CheckCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'pending') return app.status === 'pending';
    if (filter === 'active') return ['reviewing', 'interview'].includes(app.status);
    if (filter === 'completed') return ['offered', 'rejected', 'accepted'].includes(app.status);
    return true;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    active: applications.filter(a => ['reviewing', 'interview'].includes(a.status)).length,
    interviews: applications.filter(a => a.status === 'interview').length,
    offers: applications.filter(a => a.status === 'offered').length
  };

  return (
    <>
      <Head>
        <title>My Applications - JobSwipe</title>
        <meta name="description" content="Track your job applications and interview progress" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                <p className="text-gray-600">Track your job applications and interview progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Applied</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
              <div className="text-sm text-gray-600">In Review</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{stats.interviews}</div>
              <div className="text-sm text-gray-600">Interviews</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.offers}</div>
              <div className="text-sm text-gray-600">Offers</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'all', label: 'All Applications', count: stats.total },
                  { key: 'pending', label: 'Pending', count: stats.pending },
                  { key: 'active', label: 'Active', count: stats.active },
                  { key: 'completed', label: 'Completed', count: applications.filter(a => ['offered', 'rejected', 'accepted'].includes(a.status)).length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
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
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Company Logo */}
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BuildingOfficeIcon className="w-6 h-6 text-white" />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">{application.status}</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{application.company.name}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                            {application.salary}
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            {application.location}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            Applied {formatDate(application.appliedDate)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match & AI Scores */}
                    <div className="text-right">
                      <div className="mb-2">
                        <div className="text-lg font-bold text-primary-600">{application.matchScore}%</div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{application.aiScore}/10</div>
                        <div className="text-xs text-gray-500">AI Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Next Step & Actions */}
                  {application.nextStep && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Next Step: {application.nextStep}</div>
                          {application.interviewDate && (
                            <div className="text-sm text-gray-600 mt-1">
                              <CalendarIcon className="w-4 h-4 inline mr-1" />
                              {formatDateTime(application.interviewDate)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                          {application.status === 'interview' && (
                            <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                              Prepare Interview
                            </button>
                          )}
                          {application.status === 'offered' && (
                            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                              Review Offer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' 
                  ? "You haven't applied to any jobs yet. Start swiping to find opportunities!"
                  : `No applications in the ${filter} category.`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}