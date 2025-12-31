// Mock data for testing the mobile app
export const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: {
      name: 'TechCorp Inc.',
    },
    location: 'San Francisco, CA',
    remote: true,
    type: 'FULL_TIME',
    salaryMin: 120000,
    salaryMax: 160000,
    currency: 'USD',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
    description: 'We are looking for a Senior React Developer to join our growing team. You will be responsible for building scalable web applications using modern React patterns and best practices.',
    requirements: [
      '5+ years of React development experience',
      'Strong TypeScript and JavaScript skills',
      'Experience with modern React patterns (hooks, context)',
      'Knowledge of GraphQL and REST APIs',
      'Experience with testing frameworks (Jest, React Testing Library)'
    ],
    matchScore: 94
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: {
      name: 'StartupXYZ',
    },
    location: 'New York, NY',
    remote: false,
    type: 'FULL_TIME',
    salaryMin: 100000,
    salaryMax: 140000,
    currency: 'USD',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Redis', 'Kubernetes'],
    description: 'Join our fast-paced startup as a Full Stack Engineer! You\'ll work on both frontend and backend systems, helping us scale our platform to millions of users.',
    requirements: [
      '3+ years of full-stack development',
      'Proficiency in Python and Django',
      'Frontend experience with React or Vue.js',
      'Database design and optimization skills',
      'Experience with cloud platforms (AWS, GCP, or Azure)'
    ],
    matchScore: 87
  },
  {
    id: '3',
    title: 'Mobile App Developer',
    company: {
      name: 'MobileFirst Inc.',
    },
    location: 'Los Angeles, CA',
    remote: false,
    type: 'FULL_TIME',
    salaryMin: 95000,
    salaryMax: 130000,
    currency: 'USD',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux', 'Jest'],
    description: 'Build amazing mobile experiences for iOS and Android platforms. You\'ll work on consumer-facing apps used by millions of people worldwide.',
    requirements: [
      '3+ years of mobile development experience',
      'Proficiency in React Native or native development',
      'Experience with app store deployment processes',
      'Knowledge of mobile UI/UX best practices',
      'Experience with push notifications and analytics'
    ],
    matchScore: 91
  }
];

export const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  title: 'Full Stack Developer',
  skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
  experienceLevel: 'MID' as const,
  location: 'San Francisco, CA',
  hasCompletedOnboarding: true
};