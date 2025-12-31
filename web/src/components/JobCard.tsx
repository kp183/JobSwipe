import { motion } from 'framer-motion';
import { MapPinIcon, CurrencyDollarIcon, ClockIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  location?: string;
  remote: boolean;
  type: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  skills: string[];
  description: string;
  requirements: string[];
  matchScore?: number;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number, max?: number, currency = 'USD') => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    }
    return min ? `$${min.toLocaleString()}+` : `Up to $${max?.toLocaleString()}`;
  };

  const getMatchColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getMatchEmoji = (score?: number) => {
    if (!score) return '🤔';
    if (score >= 90) return '🔥';
    if (score >= 75) return '⭐';
    return '👍';
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="card p-6 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            {job.company.logo ? (
              <img src={job.company.logo} alt={job.company.name} className="w-8 h-8 rounded" />
            ) : (
              <BuildingOfficeIcon className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">{job.title}</h3>
            <p className="text-gray-600 text-sm">{job.company.name}</p>
          </div>
        </div>
        {job.matchScore && (
          <div className="text-right">
            <div className={`font-bold text-lg ${getMatchColor(job.matchScore)}`}>
              {job.matchScore}% {getMatchEmoji(job.matchScore)}
            </div>
            <div className="text-xs text-gray-500">Match</div>
          </div>
        )}
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPinIcon className="w-4 h-4 mr-2" />
          <span>{job.remote ? 'Remote' : job.location || 'Location not specified'}</span>
          {job.remote && job.location && <span className="mx-1">•</span>}
          {job.remote && job.location && <span>{job.location}</span>}
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <CurrencyDollarIcon className="w-4 h-4 mr-2" />
          <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <ClockIcon className="w-4 h-4 mr-2" />
          <span>{job.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 6).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 6 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{job.skills.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Description Preview */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {job.description.length > 150 
            ? `${job.description.substring(0, 150)}...` 
            : job.description
          }
        </p>
      </div>

      {/* Key Requirements */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Key Requirements</h4>
        <ul className="space-y-1">
          {job.requirements.slice(0, 3).map((req, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              {req}
            </li>
          ))}
          {job.requirements.length > 3 && (
            <li className="text-sm text-gray-500 italic">
              +{job.requirements.length - 3} more requirements
            </li>
          )}
        </ul>
      </div>

      {/* Skill Gap Analysis */}
      <div className="border-t pt-3">
        <button 
          onClick={() => window.location.href = '/skill-gap-analysis'}
          className="w-full text-center text-xs text-primary-600 hover:text-primary-700 font-medium py-2 hover:bg-primary-50 rounded transition-colors"
        >
          🎯 Check Skill Gap & Learning Plan
        </button>
      </div>

      {/* Action Hint */}
      <div className="text-center text-xs text-gray-400 pt-2">
        ← Swipe left to pass • Swipe right to apply →
      </div>
    </motion.div>
  );
}