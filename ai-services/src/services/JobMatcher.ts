import OpenAI from 'openai';
import { Candidate, Job, AIMatchResult } from 'jobswipe-shared/src/types';

export class JobMatcher {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async calculateMatchScore(candidate: Candidate, job: Job): Promise<AIMatchResult> {
    try {
      // Calculate individual match scores
      const skillsMatch = this.calculateSkillsMatch(candidate.skills, job.skills);
      const experienceMatch = this.calculateExperienceMatch(candidate.experienceLevel, job.experienceLevel);
      const locationMatch = this.calculateLocationMatch(candidate.location, job.location, job.remote);
      
      // Use AI to get overall assessment and reasons
      const aiAnalysis = await this.getAIMatchAnalysis(candidate, job);
      
      // Calculate weighted overall score
      const overallScore = (
        skillsMatch * 0.4 +
        experienceMatch * 0.3 +
        locationMatch * 0.2 +
        aiAnalysis.culturalFit * 0.1
      );

      return {
        jobId: job.id,
        matchScore: Math.round(overallScore * 100) / 100,
        reasons: aiAnalysis.reasons,
        skillsMatch: Math.round(skillsMatch * 100),
        experienceMatch: Math.round(experienceMatch * 100),
        locationMatch: Math.round(locationMatch * 100),
      };
    } catch (error) {
      console.error('Error calculating match score:', error);
      // Return a basic match score if AI fails
      return {
        jobId: job.id,
        matchScore: 0.5,
        reasons: ['Unable to calculate detailed match'],
        skillsMatch: 50,
        experienceMatch: 50,
        locationMatch: 50,
      };
    }
  }

  private calculateSkillsMatch(candidateSkills: string[], jobSkills: string[]): number {
    if (jobSkills.length === 0) return 1;
    
    const normalizedCandidateSkills = candidateSkills.map(skill => skill.toLowerCase());
    const normalizedJobSkills = jobSkills.map(skill => skill.toLowerCase());
    
    let matchCount = 0;
    let partialMatchCount = 0;
    
    for (const jobSkill of normalizedJobSkills) {
      if (normalizedCandidateSkills.includes(jobSkill)) {
        matchCount++;
      } else {
        // Check for partial matches (e.g., "React" matches "React.js")
        const hasPartialMatch = normalizedCandidateSkills.some(candidateSkill => 
          candidateSkill.includes(jobSkill) || jobSkill.includes(candidateSkill)
        );
        if (hasPartialMatch) {
          partialMatchCount++;
        }
      }
    }
    
    return (matchCount + partialMatchCount * 0.5) / jobSkills.length;
  }

  private calculateExperienceMatch(candidateLevel: string, jobLevel: string): number {
    const levels = ['ENTRY', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE'];
    const candidateIndex = levels.indexOf(candidateLevel);
    const jobIndex = levels.indexOf(jobLevel);
    
    if (candidateIndex === -1 || jobIndex === -1) return 0.5;
    
    const difference = Math.abs(candidateIndex - jobIndex);
    
    // Perfect match
    if (difference === 0) return 1;
    // One level difference
    if (difference === 1) return 0.8;
    // Two levels difference
    if (difference === 2) return 0.6;
    // More than two levels
    return 0.3;
  }

  private calculateLocationMatch(candidateLocation?: string, jobLocation?: string, isRemote?: boolean): number {
    // Remote jobs always match
    if (isRemote) return 1;
    
    // If no location data, assume moderate match
    if (!candidateLocation || !jobLocation) return 0.7;
    
    // Exact location match
    if (candidateLocation.toLowerCase() === jobLocation.toLowerCase()) return 1;
    
    // Check if same city/state (basic string matching)
    const candidateParts = candidateLocation.toLowerCase().split(',').map(s => s.trim());
    const jobParts = jobLocation.toLowerCase().split(',').map(s => s.trim());
    
    // Check for any common parts
    const hasCommonPart = candidateParts.some(part => 
      jobParts.some(jobPart => part.includes(jobPart) || jobPart.includes(part))
    );
    
    return hasCommonPart ? 0.8 : 0.3;
  }

  private async getAIMatchAnalysis(candidate: Candidate, job: Job): Promise<{
    culturalFit: number;
    reasons: string[];
  }> {
    const prompt = `
Analyze the match between this candidate and job opportunity:

CANDIDATE:
- Name: ${candidate.firstName} ${candidate.lastName}
- Title: ${candidate.title || 'Not specified'}
- Bio: ${candidate.bio || 'Not provided'}
- Skills: ${candidate.skills.join(', ')}
- Experience Level: ${candidate.experienceLevel}
- Recent Experience: ${candidate.experience.slice(0, 2).map(exp => 
    `${exp.title} at ${exp.company}`
  ).join(', ')}

JOB:
- Title: ${job.title}
- Company: ${job.company?.name}
- Description: ${job.description}
- Required Skills: ${job.skills.join(', ')}
- Requirements: ${job.requirements.join(', ')}
- Experience Level: ${job.experienceLevel}

Please provide:
1. A cultural fit score from 0-1 (how well the candidate's background aligns with the role)
2. 3-5 specific reasons why this is a good or poor match

Respond in JSON format:
{
  "culturalFit": 0.85,
  "reasons": ["Reason 1", "Reason 2", "Reason 3"]
}
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert recruiter analyzing job-candidate matches. Provide objective, specific assessments.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const analysis = JSON.parse(content);
        return {
          culturalFit: Math.max(0, Math.min(1, analysis.culturalFit)),
          reasons: Array.isArray(analysis.reasons) ? analysis.reasons : ['AI analysis unavailable']
        };
      }
    } catch (error) {
      console.error('Error in AI match analysis:', error);
    }

    return {
      culturalFit: 0.5,
      reasons: ['Unable to perform detailed analysis']
    };
  }

  async getJobRecommendations(candidate: Candidate, availableJobs: Job[]): Promise<Job[]> {
    // Calculate match scores for all jobs
    const jobsWithScores = await Promise.all(
      availableJobs.map(async (job) => {
        const matchResult = await this.calculateMatchScore(candidate, job);
        return {
          job,
          matchScore: matchResult.matchScore
        };
      })
    );

    // Sort by match score and return top matches
    return jobsWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .map(item => item.job);
  }
}