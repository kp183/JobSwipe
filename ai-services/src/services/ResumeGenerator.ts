import OpenAI from 'openai';
import { Candidate, Job } from 'jobswipe-shared/src/types';

export class ResumeGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResume(candidate: Candidate, job: Job): Promise<string> {
    const prompt = this.buildResumePrompt(candidate, job);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert resume writer. Create professional, ATS-friendly resumes tailored to specific job requirements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('Failed to generate resume');
    }
  }

  async generateCoverLetter(candidate: Candidate, job: Job): Promise<string> {
    const prompt = this.buildCoverLetterPrompt(candidate, job);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert cover letter writer. Create compelling, personalized cover letters that highlight relevant experience and enthusiasm for the role.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.8,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating cover letter:', error);
      throw new Error('Failed to generate cover letter');
    }
  }

  private buildResumePrompt(candidate: Candidate, job: Job): string {
    return `
Create a professional resume for the following candidate applying to this specific job:

CANDIDATE PROFILE:
Name: ${candidate.firstName} ${candidate.lastName}
Title: ${candidate.title || 'Professional'}
Location: ${candidate.location || 'Not specified'}
Bio: ${candidate.bio || 'Not provided'}
Experience Level: ${candidate.experienceLevel}
Skills: ${candidate.skills.join(', ')}

EDUCATION:
${candidate.education.map(edu => 
  `- ${edu.degree} in ${edu.field} from ${edu.institution} (${new Date(edu.startDate).getFullYear()}${edu.endDate ? ` - ${new Date(edu.endDate).getFullYear()}` : ' - Present'})`
).join('\n')}

WORK EXPERIENCE:
${candidate.experience.map(exp => 
  `- ${exp.title} at ${exp.company} (${new Date(exp.startDate).getFullYear()}${exp.endDate ? ` - ${new Date(exp.endDate).getFullYear()}` : ' - Present'})
  ${exp.description || ''}`
).join('\n')}

PROJECTS:
${candidate.projects.map(project => 
  `- ${project.name}: ${project.description || ''}
  Technologies: ${project.technologies.join(', ')}`
).join('\n')}

JOB REQUIREMENTS:
Position: ${job.title}
Company: ${job.company?.name}
Required Skills: ${job.skills.join(', ')}
Requirements: ${job.requirements.join(', ')}
Experience Level: ${job.experienceLevel}

Please create a tailored resume that:
1. Highlights relevant skills and experience for this specific job
2. Uses keywords from the job description for ATS optimization
3. Quantifies achievements where possible
4. Follows a clean, professional format
5. Emphasizes the most relevant qualifications first

Format the resume in a clean, structured way with clear sections.
`;
  }

  private buildCoverLetterPrompt(candidate: Candidate, job: Job): string {
    return `
Write a compelling cover letter for the following candidate applying to this job:

CANDIDATE: ${candidate.firstName} ${candidate.lastName}
Current Title: ${candidate.title || 'Professional'}
Bio: ${candidate.bio || ''}

JOB DETAILS:
Position: ${job.title}
Company: ${job.company?.name}
Job Description: ${job.description}
Required Skills: ${job.skills.join(', ')}

RELEVANT EXPERIENCE:
${candidate.experience.slice(0, 2).map(exp => 
  `- ${exp.title} at ${exp.company}: ${exp.description || ''}`
).join('\n')}

KEY SKILLS: ${candidate.skills.join(', ')}

Please write a cover letter that:
1. Shows genuine interest in the company and role
2. Highlights 2-3 most relevant experiences/skills
3. Demonstrates knowledge of the company/industry
4. Explains why they're a great fit
5. Has a professional yet personable tone
6. Is concise (3-4 paragraphs)

Make it engaging and specific to this opportunity.
`;
  }
}