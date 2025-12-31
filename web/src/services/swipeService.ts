// Mock swipe service for testing
export const swipeService = {
  async swipeJob(jobId: string, direction: 'left' | 'right') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log(`Swiped ${direction} on job ${jobId}`);
    
    if (direction === 'right') {
      // Simulate AI resume generation and application
      console.log('🤖 AI is generating your resume...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('✅ Application submitted successfully!');
    }
    
    return {
      success: true,
      message: direction === 'right' ? 'Application submitted!' : 'Job passed'
    };
  }
};