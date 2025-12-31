import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BriefcaseIcon, 
  ChartBarIcon, 
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface AppliedJob {
  id: string;
  title: string;
  company: string;
  appliedAt: string;
  matchStrength: number;
  status: 'applied' | 'viewed' | 'interview' | 'rejected' | 'offer';
  skillGapTasks: {
    completed: number;
    total: number;
  };
  estimatedResponse: string;
}

interface AppliedJobsTrackerProps {
  appliedJobs: AppliedJob[];
  onViewDetails: (jobId: string) => void;
}

export default function AppliedJobsTracker({ appliedJobs, onViewDetails }: AppliedJobsTrackerProps) {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'viewed': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'offer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <BriefcaseIcon className="w-4 h-4" />;
      case 'viewed': return <EyeIcon className="w-4 h-4" />;
      case 'interview': return <CheckCircleIcon className="w-4 h-4" />;
      case 'rejected': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'offer': return <CheckCircleIcon className="w-4 h-4" />;
      default: return <BriefcaseIcon className="w-4 h-4" />;
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  if (appliedJobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BriefcaseIcon className="w-5 h-5 mr-2" />
          Applied Jobs
        </h3>
        <div className="text-center py-8">
          <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h4 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h4>
          <p className="mt-1 text-sm text-gray-500">
            Start swiping right to apply for jobs!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2" />
            Applied Jobs ({appliedJobs.length})
          </h3>
          <div className="text-sm text-gray-500">
            Live tracking • Real-time updates
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {appliedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="border-b last:border-b-0"
            >
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                        <span className="ml-1 capitalize">{job.status}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span>Applied {new Date(job.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-lg font-bold ${getMatchColor(job.matchStrength)}`}>
                      {job.matchStrength}%
                    </div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>

                {/* Progress Bar for Skill Gap Tasks */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Skill Gap Progress</span>
                    <span>{job.skillGapTasks.completed}/{job.skillGapTasks.total} tasks</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(job.skillGapTasks.completed / job.skillGapTasks.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 bg-gray-50 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Match Strength Details */}
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <ChartBarIcon className="w-4 h-4 text-primary-600" />
                            <span className="font-medium text-gray-900">Match Analysis</span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Skills Match:</span>
                              <span className="font-medium">{job.matchStrength - 10}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Experience:</span>
                              <span className="font-medium">85%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium">100%</span>
                            </div>
                          </div>
                        </div>

                        {/* Skill Gap Tasks */}
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <ClockIcon className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium text-gray-900">Learning Tasks</span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">React Native</span>
                              <span className="text-green-600">✓</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">TypeScript</span>
                              <span className="text-yellow-600">⏳</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">GraphQL</span>
                              <span className="text-gray-400">○</span>
                            </div>
                          </div>
                        </div>

                        {/* Response Timeline */}
                        <div className="bg-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <ClockIcon className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-gray-900">Timeline</span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="text-gray-600">Expected Response:</div>
                            <div className="font-medium">{job.estimatedResponse}</div>
                            <div className="text-xs text-gray-500 mt-2">
                              Based on company's avg response time
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 mt-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(job.id);
                          }}
                          className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-primary-700 transition-colors"
                        >
                          View Full Analysis
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                          Update Skills
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">
              {appliedJobs.filter(j => j.status === 'applied').length}
            </div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {appliedJobs.filter(j => j.status === 'interview').length}
            </div>
            <div className="text-xs text-gray-600">Interviews</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {Math.round(appliedJobs.reduce((acc, job) => acc + job.matchStrength, 0) / appliedJobs.length)}%
            </div>
            <div className="text-xs text-gray-600">Avg Match</div>
          </div>
        </div>
      </div>
    </div>
  );
}