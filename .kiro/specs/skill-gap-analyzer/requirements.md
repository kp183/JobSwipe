# Requirements Document

## Introduction

The Skill Gap Analyzer is the core feature of JobSwipe that analyzes job postings, compares them to user skills, and generates personalized learning paths using Google AI Studio tools. This feature targets job seekers aged 18-30 in the India market, particularly career changers, and aims to provide real-time, job-specific skill analysis with gamified learning recommendations.

## Glossary

- **System**: The Skill Gap Analyzer feature within JobSwipe
- **Gemini_API**: Google's AI service for natural language processing and analysis
- **Nano_Banana_Pro**: Google's tool for visual interface generation
- **NotebookLM**: Google's AI-powered research and learning path generation tool
- **User**: Job seeker using the JobSwipe platform
- **Job_Posting**: Text input containing job description, requirements, and salary information
- **Skill_Profile**: User's current skills and proficiency levels
- **Learning_Path**: AI-generated roadmap with courses, timelines, and milestones
- **Skill_Gap**: Difference between required job skills and user's current skills
- **Confidence_Score**: Percentage indicating user's readiness for a specific job (0-100%)

## Requirements

### Requirement 1: Job Posting Analysis

**User Story:** As a job seeker, I want to input a job posting, so that the system can analyze the required skills and qualifications.

#### Acceptance Criteria

1. WHEN a user inputs a job posting text, THE System SHALL extract required skills using Gemini_API
2. WHEN a job posting contains salary information, THE System SHALL parse and store the salary range
3. WHEN a job posting contains company information, THE System SHALL identify and extract the company name
4. WHEN a job posting contains experience requirements, THE System SHALL extract minimum and preferred experience levels
5. WHEN a job posting contains technical skills, THE System SHALL categorize them by technology domain (frontend, backend, AI/ML, etc.)

### Requirement 2: Skill Comparison and Gap Analysis

**User Story:** As a job seeker, I want the system to compare my current skills with job requirements, so that I can understand my readiness level.

#### Acceptance Criteria

1. WHEN skill comparison is performed, THE System SHALL calculate a confidence score between 0-100%
2. WHEN skills are compared, THE System SHALL identify missing skills categorized by impact level (Critical, Important, Optional)
3. WHEN a skill gap is identified, THE System SHALL estimate the time required to acquire each missing skill
4. WHEN multiple skills are missing, THE System SHALL prioritize them by impact on job readiness
5. WHEN a user has partial knowledge of a required skill, THE System SHALL calculate the proficiency gap percentage

### Requirement 3: Visual Skill Analysis Display

**User Story:** As a job seeker, I want to see a visual representation of my skill match, so that I can quickly understand my job readiness.

#### Acceptance Criteria

1. WHEN displaying skill analysis, THE System SHALL show a skill match meter using Nano_Banana_Pro
2. WHEN showing skill comparison, THE System SHALL display side-by-side "What you need" vs "What you have" sections
3. WHEN displaying missing skills, THE System SHALL use color coding (Red=Critical, Yellow=Important, Green=Optional)
4. WHEN showing time estimates, THE System SHALL display learning recommendations with estimated completion times
5. WHEN confidence score is below 70%, THE System SHALL display "Not ready yet" status with improvement suggestions

### Requirement 4: Personalized Learning Path Generation

**User Story:** As a job seeker, I want a personalized learning roadmap, so that I can systematically close my skill gaps.

#### Acceptance Criteria

1. WHEN generating learning paths, THE System SHALL use NotebookLM to create structured roadmaps
2. WHEN creating roadmaps, THE System SHALL sequence skills by dependency and impact priority
3. WHEN estimating timelines, THE System SHALL provide realistic completion dates for each skill
4. WHEN suggesting courses, THE System SHALL link to 3-5 actual online courses from Udemy, Coursera, or LinkedIn Learning
5. WHEN calculating job readiness, THE System SHALL provide a target completion date with confidence percentage

### Requirement 5: Learning Resource Integration

**User Story:** As a job seeker, I want specific course recommendations, so that I can immediately start learning the required skills.

#### Acceptance Criteria

1. WHEN recommending courses, THE System SHALL provide direct links to relevant online courses
2. WHEN displaying course options, THE System SHALL show course duration, rating, and price information
3. WHEN multiple courses are available, THE System SHALL rank them by relevance and user learning style
4. WHEN courses are in different languages, THE System SHALL prioritize English and Hindi options for India market
5. WHEN free alternatives exist, THE System SHALL highlight free course options alongside paid ones

### Requirement 6: Progress Tracking and Motivation

**User Story:** As a job seeker, I want to track my learning progress, so that I stay motivated and can see my improvement over time.

#### Acceptance Criteria

1. WHEN a user completes a learning milestone, THE System SHALL update their skill proficiency level
2. WHEN progress is made, THE System SHALL recalculate and display updated confidence scores
3. WHEN deadlines approach, THE System SHALL provide motivational reminders and progress updates
4. WHEN skills are acquired, THE System SHALL update the visual skill match meter in real-time
5. WHEN job readiness improves, THE System SHALL celebrate milestones with positive feedback

### Requirement 7: Multi-Platform Compatibility

**User Story:** As a job seeker, I want to access the skill analyzer on different devices, so that I can use it anywhere.

#### Acceptance Criteria

1. WHEN accessing from mobile devices, THE System SHALL provide responsive design optimized for touch interaction
2. WHEN using on desktop, THE System SHALL display detailed analytics and expanded visual elements
3. WHEN switching between devices, THE System SHALL maintain user progress and analysis data
4. WHEN network connectivity is poor, THE System SHALL provide offline access to previously analyzed results
5. WHEN using different browsers, THE System SHALL maintain consistent functionality and appearance

### Requirement 8: Performance and Scalability

**User Story:** As a system administrator, I want the analyzer to handle multiple concurrent users, so that the platform can scale effectively.

#### Acceptance Criteria

1. WHEN processing job postings, THE System SHALL complete analysis within 10 seconds
2. WHEN multiple users access simultaneously, THE System SHALL maintain response times under 15 seconds
3. WHEN Gemini_API calls are made, THE System SHALL implement proper rate limiting and error handling
4. WHEN generating visual elements, THE System SHALL cache results to improve subsequent load times
5. WHEN system load is high, THE System SHALL gracefully degrade features while maintaining core functionality