import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { mockJobs } from '../services/mockData';

interface SearchFilters {
  query: string;
  location: string;
  jobType: string[];
  experienceLevel: string[];
  salaryRange: { min: number; max: number };
  remote: boolean;
  companySize: string[];
}

export default function Search() {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    jobType: [],
    experienceLevel: [],
    salaryRange: { min: 0, max: 200000 },
    remote: false,
    companySize: []
  });

  const jobTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'];
  const experienceLevels = ['ENTRY', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE'];
  const companySizes = ['STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE'];

  useEffect(() => {
    filterJobs();
  }, [filters]);

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.name.toLowerCase().includes(query);
        const matchesSkills = job.skills.some(skill => skill.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
      }

      // Location
      if (filters.location && job.location) {
        if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      }

      // Job Type
      if (filters.jobType.length > 0 && !filters.jobType.includes(job.type)) return false;

      // Remote
      if (filters.remote && !job.remote) return false;

      // Salary Range
      if (job.salaryMin && job.salaryMax) {
        if (job.salaryMax < filters.salaryRange.min || job.salaryMin > filters.salaryRange.max) return false;
      }

      return true;
    });

    setFilteredJobs(filtered);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'jobType' | 'experienceLevel' | 'companySize', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      location: '',
      jobType: [],
      experienceLevel: [],
      salaryRange: { min: 0, max: 200000 },
      remote: false,
      companySize: []
    });
  };

  const activeFilterCount = 
    (filters.jobType.length > 0 ? 1 : 0) +
    (filters.experienceLevel.length > 0 ? 1 : 0) +
    (filters.companySize.length > 0 ? 1 : 0) +
    (filters.remote ? 1 : 0) +
    (filters.location ? 1 : 0);

  return (
    <>
      <Head>
        <title>Search Jobs - JobSwipe</title>
        <meta name="description" content="Search and filter job opportunities" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies, or skills..."
                    value={filters.query}
                    onChange={(e) => updateFilter('query', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-4 py-3 border rounded-lg transition-colors ${
                    showFilters || activeFilterCount > 0
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FunnelIcon className="w-5 h-5 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredJobs.length} jobs found
                {filters.query && ` for "${filters.query}"`}
                {filters.location && ` in ${filters.location}`}
              </p>
              
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Job Type */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                    <div className="space-y-2">
                      {jobTypes.map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.jobType.includes(type)}
                            onChange={() => toggleArrayFilter('jobType', type)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Experience Level</h4>
                    <div className="space-y-2">
                      {experienceLevels.map(level => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.experienceLevel.includes(level)}
                            onChange={() => toggleArrayFilter('experienceLevel', level)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">
                            {level.toLowerCase()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Remote Work */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.remote}
                        onChange={(e) => updateFilter('remote', e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Remote work only</span>
                    </label>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Salary Range</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                        <input
                          type="range"
                          min="0"
                          max="200000"
                          step="10000"
                          value={filters.salaryRange.min}
                          onChange={(e) => updateFilter('salaryRange', { ...filters.salaryRange, min: parseInt(e.target.value) })}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-700">${filters.salaryRange.min.toLocaleString()}</div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                        <input
                          type="range"
                          min="0"
                          max="200000"
                          step="10000"
                          value={filters.salaryRange.max}
                          onChange={(e) => updateFilter('salaryRange', { ...filters.salaryRange, max: parseInt(e.target.value) })}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-700">${filters.salaryRange.max.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Job Results */}
            <div className="flex-1">
              <div className="space-y-4">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Company Logo */}
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BuildingOfficeIcon className="w-6 h-6 text-white" />
                        </div>

                        {/* Job Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 cursor-pointer">
                                {job.title}
                              </h3>
                              <p className="text-gray-600">{job.company.name}</p>
                            </div>
                            {job.matchScore && (
                              <div className="text-right">
                                <div className="text-lg font-bold text-primary-600">{job.matchScore}%</div>
                                <div className="text-xs text-gray-500">Match</div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <MapPinIcon className="w-4 h-4 mr-1" />
                              {job.remote ? 'Remote' : job.location}
                            </div>
                            <div className="flex items-center">
                              <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                              ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {job.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.slice(0, 5).map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 5 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{job.skills.length - 5} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Posted 2 days ago
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                                Save
                              </button>
                              <button 
                                onClick={() => window.location.href = '/skill-gap-analysis'}
                                className="px-3 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                              >
                                Skill Gap
                              </button>
                              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                                Quick Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search criteria or filters.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}