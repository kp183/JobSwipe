import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import SwipeActions from '../components/SwipeActions';
import AppliedJobsTracker from '../components/AppliedJobsTracker';
import AIMatchReportModal from '../components/AIMatchReportModal';
import SkillBoostModal from '../components/SkillBoostModal';
import Toast from '../components/Toast';
import { jobService } from '../services/jobService';
import { swipeService } from '../services/swipeService';

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
  deadline?: string;
}

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

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [loading, setLoading] = useState(false); // Set to false for static deployment
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // New JobSwipe AI features
  const [rewindCredits, setRewindCredits] = useState(3);
  const [rewindHistory, setRewindHistory] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [showAIReport, setShowAIReport] = useState(false);
  const [showSkillBoost, setShowSkillBoost] = useState(false);
  const [selectedJobForReport, setSelectedJobForReport] = useState<Job | null>(null);

  useEffect(() => {
    // Use mock data for static deployment - set immediately
    const mockJobs = [
      {
        id: '1',
        title: 'Senior Full Stack Developer',
        company: {
          name: 'Microsoft',
          logo: 'https://via.placeholder.com/48x48/0078d4/ffffff?text=M'
        },
        location: 'Bangalore, India',
        remote: true,
        type: 'Full-time',
        salaryMin: 2500000,
        salaryMax: 3500000,
        currency: 'INR',
        skills: ['React', 'TypeScript', 'Node.js', 'React Native', 'AWS'],
        description: 'Join Microsoft\'s innovative team building next-generation cloud solutions. Work on cutting-edge projects with React, TypeScript, and Azure technologies.',
        requirements: ['5+ years React experience', 'TypeScript expertise', 'Node.js backend experience'],
        matchScore: 67,
        deadline: '2024-02-15'
      },
      {
        id: '2',
        title: 'Senior React Developer',
        company: {
          name: 'Google',
          logo: 'https://via.placeholder.com/48x48/4285f4/ffffff?text=G'
        },
        location: 'Hyderabad, India',
        remote: false,
        type: 'Full-time',
        salaryMin: 3000000,
        salaryMax: 4500000,
        currency: 'INR',
        skills: ['React', 'JavaScript', 'GraphQL', 'Material-UI', 'Firebase'],
        description: 'Build user-facing features for Google\'s next-generation products. Work with cutting-edge technologies and impact billions of users.',
        requirements: ['Expert React skills', 'GraphQL experience', 'Material Design knowledge'],
        matchScore: 89,
        deadline: '2024-02-20'
      },
      {
        id: '3',
        title: 'Full Stack Engineer',
        company: {
          name: 'Zomato',
          logo: 'https://via.placeholder.com/48x48/e23744/ffffff?text=Z'
        },
        location: 'Mumbai, India',
        remote: true,
        type: 'Full-time',
        salaryMin: 1800000,
        salaryMax: 2800000,
        currency: 'INR',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Redis'],
        description: 'Help build India\'s largest food delivery platform. Work on high-scale systems serving millions of users daily.',
        requirements: ['Full-stack experience', 'Database design', 'High-scale systems'],
        matchScore: 76,
        deadline: '2024-02-10'
      }
    ];

    // Mock applied jobs
    const mockAppliedJobs = [
      {
        id: '4',
        title: 'Frontend Developer',
        company: 'Swiggy',
        appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        matchStrength: 94,
        status: 'interview' as const,
        skillGapTasks: {
          completed: 3,
          total: 5
        },
        estimatedResponse: '2 days'
      },
      {
        id: '5',
        title: 'Backend Engineer',
        company: 'CRED',
        appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        matchStrength: 78,
        status: 'applied' as const,
        skillGapTasks: {
          completed: 1,
          total: 5
        },
        estimatedResponse: '3 days'
      },
      {
        id: '6',
        title: 'DevOps Engineer',
        company: 'Razorpay',
        appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        matchStrength: 85,
        status: 'viewed' as const,
        skillGapTasks: {
          completed: 2,
          total: 5
        },
        estimatedResponse: '5 days'
      }
    ];

    // Set data immediately for static deployment
    setJobs(mockJobs);
    setAppliedJobs(mockAppliedJobs);
    // No need to set loading to false since it starts as false
  }, []);

  // Keyboard shortcuts for testing
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (swipeDirection) return; // Don't allow keyboard input during animation
      
      if (e.key === 'ArrowLeft' || e.key === 'x') {
        handleSwipe('left');
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleSwipe('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentJobIndex, swipeDirection]);

  const loadJobs = async () => {
    try {
      const response = await jobService.getRecommendedJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (currentJobIndex >= jobs.length) return;

    const currentJob = jobs[currentJobIndex];
    setSwipeDirection(direction);

    // Add to rewind history for left swipes
    if (direction === 'left') {
      setRewindHistory(prev => [currentJob, ...prev.slice(0, 4)]);
    }

    try {
      await swipeService.swipeJob(currentJob.id, direction);
      
      // Add to applied jobs if right swipe
      if (direction === 'right') {
        const newAppliedJob: AppliedJob = {
          id: currentJob.id,
          title: currentJob.title,
          company: currentJob.company.name,
          appliedAt: new Date().toISOString(),
          matchStrength: currentJob.matchScore || 67,
          status: 'applied',
          skillGapTasks: {
            completed: Math.floor(Math.random() * 3),
            total: 5
          },
          estimatedResponse: `${Math.floor(Math.random() * 7) + 3} days`
        };
        setAppliedJobs(prev => [newAppliedJob, ...prev]);
      }
      
      // Wait for animation to complete
      setTimeout(() => {
        setCurrentJobIndex(prev => prev + 1);
        setSwipeDirection(null);
        
        if (direction === 'right') {
          setToast({ message: '🎉 Application submitted! AI generated your resume.', type: 'success' });
          setTimeout(() => setToast(null), 4000);
        } else {
          setToast({ message: 'Job passed. Keep swiping!', type: 'success' });
          setTimeout(() => setToast(null), 2000);
        }
      }, 300);
    } catch (error) {
      console.error('Failed to swipe:', error);
      setSwipeDirection(null);
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleRewind = () => {
    if (rewindCredits <= 0 || rewindHistory.length === 0) return;

    const lastJob = rewindHistory[0];
    setRewindHistory(prev => prev.slice(1));
    setRewindCredits(prev => prev - 1);
    
    // Insert the job back into the current position
    setJobs(prev => [
      ...prev.slice(0, currentJobIndex),
      lastJob,
      ...prev.slice(currentJobIndex)
    ]);

    setToast({ message: `🔄 Job brought back! ${rewindCredits - 1} rewinds left today.`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAIReport = (job: Job) => {
    setSelectedJobForReport(job);
    setShowAIReport(true);
  };

  const handleSkillBoost = (jobId: string) => {
    const job = appliedJobs.find(j => j.id === jobId);
    if (job) {
      setShowSkillBoost(true);
    }
  };

  const handleTaskComplete = (taskId: string) => {
    // Update applied job's skill gap progress
    setAppliedJobs(prev => prev.map(job => ({
      ...job,
      skillGapTasks: {
        ...job.skillGapTasks,
        completed: Math.min(job.skillGapTasks.total, job.skillGapTasks.completed + 1)
      },
      matchStrength: Math.min(100, job.matchStrength + Math.floor(Math.random() * 10) + 5)
    })));
  };

  const currentJob = jobs[currentJobIndex];
  const hasMoreJobs = currentJobIndex < jobs.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Jobs...</h2>
          <p className="text-gray-600">Finding the perfect matches for you 🤖</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>JobSwipe - Find Your Perfect Job</title>
        <meta name="description" content="AI-powered job matching platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Discover Jobs</h1>
                <p className="text-gray-600">Find your perfect match with AI-powered recommendations</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">{jobs.length - currentJobIndex}</div>
                <div className="text-sm text-gray-500">jobs remaining</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Swipe Section */}
            <div className="lg:col-span-2">
              {hasMoreJobs ? (
                <div className="flex flex-col items-center">
                  {/* Job Card */}
                  <div className="relative w-full max-w-md mb-8">
                    <motion.div
                      key={currentJob?.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0,
                        rotate: swipeDirection === 'left' ? -30 : swipeDirection === 'right' ? 30 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {currentJob && (
                        <div className="relative">
                          <JobCard job={currentJob} />
                          
                          {/* AI Match Report Button */}
                          <div className="absolute top-4 right-4">
                            <button
                              onClick={() => handleAIReport(currentJob)}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                            >
                              🤖 AI Match Report
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Swipe Indicators with Enhanced Labels */}
                    {swipeDirection && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          px-8 py-4 rounded-2xl text-white font-bold text-2xl z-10 shadow-2xl ${
                          swipeDirection === 'left' 
                            ? 'bg-gradient-to-r from-red-500 to-red-600' 
                            : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                        }`}
                      >
                        {swipeDirection === 'left' ? 'PASS' : 'APPLY'}
                      </motion.div>
                    )}
                  </div>

                  {/* Enhanced Swipe Actions with Rewind */}
                  <SwipeActions
                    onPass={() => handleSwipe('left')}
                    onApply={() => handleSwipe('right')}
                    onRewind={handleRewind}
                    disabled={!!swipeDirection}
                    rewindCredits={rewindCredits}
                    canRewind={rewindHistory.length > 0 && rewindCredits > 0}
                  />

                  {/* Job Queue Preview */}
                  <div className="mt-8 w-full max-w-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Up</h3>
                    <div className="space-y-2">
                      {jobs.slice(currentJobIndex + 1, currentJobIndex + 4).map((job, index) => (
                        <div
                          key={job.id}
                          className="bg-white p-3 rounded-lg shadow-sm border opacity-60"
                          style={{ transform: `scale(${1 - (index + 1) * 0.05})` }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{job.title}</h4>
                              <p className="text-sm text-gray-500">{job.company.name}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                ₹{job.salaryMin?.toLocaleString()} - ₹{job.salaryMax?.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">{job.location}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No more jobs</h3>
                  <p className="mt-2 text-gray-500">Check back later for new opportunities!</p>
                  <button
                    onClick={loadJobs}
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Refresh Jobs
                  </button>
                </div>
              )}
            </div>

            {/* Applied Jobs Tracker Sidebar */}
            <div className="lg:col-span-1">
              <AppliedJobsTracker 
                appliedJobs={appliedJobs}
                onViewDetails={handleSkillBoost}
              />
            </div>
          </div>
        </main>

        {/* Toast Notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={!!toast}
            onClose={() => setToast(null)}
          />
        )}

        {/* AI Match Report Modal */}
        {showAIReport && selectedJobForReport && (
          <AIMatchReportModal
            isOpen={showAIReport}
            onClose={() => setShowAIReport(false)}
            job={selectedJobForReport}
          />
        )}

        {/* Skill Boost Modal */}
        {showSkillBoost && (
          <SkillBoostModal
            isOpen={showSkillBoost}
            onClose={() => setShowSkillBoost(false)}
            jobTitle="Senior Full Stack Developer"
            company="Microsoft"
            currentMatchScore={67}
            onTaskComplete={handleTaskComplete}
          />
        )}
      </div>
    </>
  );
}