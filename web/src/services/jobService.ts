import { mockJobs } from './mockData';

// Mock API service for testing
export const jobService = {
  async getRecommendedJobs() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: mockJobs,
      total: mockJobs.length
    };
  },

  async getJobById(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const job = mockJobs.find(j => j.id === id);
    if (!job) {
      throw new Error('Job not found');
    }
    
    return {
      success: true,
      data: job
    };
  }
};