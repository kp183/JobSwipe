// User types
export interface User {
  id: string;
  email: string;
  role: 'CANDIDATE' | 'COMPANY' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  profilePic?: string;
  bio?: string;
  title?: string;
  experienceLevel: ExperienceLevel;
  expectedSalary?: number;
  preferredRoles: string[];
  skills: string[];
  education: Education[];
  experience: WorkExperience[];
  projects: Project[];
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  industry?: string;
  size?: CompanySize;
  location?: string;
}

export interface Job {
  id: string;
  companyId: string;
  company?: Company;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  location?: string;
  remote: boolean;
  type: JobType;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  experienceLevel: ExperienceLevel;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobSwipe {
  id: string;
  candidateId: string;
  jobId: string;
  direction: 'LEFT' | 'RIGHT';
  matchScore?: number;
  createdAt: string;
}

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  companyId: string;
  status: ApplicationStatus;
  resume?: string;
  coverLetter?: string;
  screeningScore?: number;
  appliedAt: string;
  updatedAt: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  candidateId: string;
  type: InterviewType;
  status: InterviewStatus;
  scheduledAt?: string;
  completedAt?: string;
  aiScore?: number;
  recordingUrl?: string;
}

// Supporting types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
}

// Enums
export type ExperienceLevel = 'ENTRY' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';
export type CompanySize = 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE';
export type ApplicationStatus = 'PENDING' | 'SCREENING' | 'INTERVIEWING' | 'OFFERED' | 'REJECTED' | 'ACCEPTED' | 'WITHDRAWN';
export type InterviewType = 'AI_SCREENING' | 'TECHNICAL' | 'BEHAVIORAL' | 'FINAL';
export type InterviewStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// AI types
export interface AIMatchResult {
  jobId: string;
  matchScore: number;
  reasons: string[];
  skillsMatch: number;
  experienceMatch: number;
  locationMatch: number;
}

export interface AIResumeData {
  summary: string;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
}

export interface AIInterviewQuestion {
  id: string;
  question: string;
  type: 'technical' | 'behavioral' | 'situational';
  expectedAnswer?: string;
  skillsAssessed: string[];
}