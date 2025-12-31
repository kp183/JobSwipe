// Mock data for testing the frontend
export const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: {
      name: 'TechCorp Inc.',
      logo: 'https://via.placeholder.com/40x40/6366f1/ffffff?text=TC'
    },
    location: 'San Francisco, CA',
    remote: true,
    type: 'FULL_TIME',
    salaryMin: 120000,
    salaryMax: 160000,
    currency: 'USD',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
    description: 'We are looking for a Senior React Developer to join our growing team. You will be responsible for building scalable web applications using modern React patterns and best practices. Our tech stack includes React, TypeScript, Node.js, and AWS.',
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
      logo: 'https://via.placeholder.com/40x40/10b981/ffffff?text=SX'
    },
    location: 'New York, NY',
    remote: false,
    type: 'FULL_TIME',
    salaryMin: 100000,
    salaryMax: 140000,
    currency: 'USD',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Redis', 'Kubernetes'],
    description: 'Join our fast-paced startup as a Full Stack Engineer! You\'ll work on both frontend and backend systems, helping us scale our platform to millions of users. We value innovation, collaboration, and continuous learning.',
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
    title: 'Frontend Developer',
    company: {
      name: 'DesignStudio Pro',
      logo: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=DS'
    },
    location: 'Austin, TX',
    remote: true,
    type: 'CONTRACT',
    salaryMin: 80000,
    salaryMax: 110000,
    currency: 'USD',
    skills: ['Vue.js', 'Nuxt.js', 'SCSS', 'Figma', 'Animation', 'WebGL'],
    description: 'We\'re seeking a creative Frontend Developer to bring beautiful designs to life. You\'ll work closely with our design team to create engaging, interactive web experiences that delight our users.',
    requirements: [
      '4+ years of frontend development experience',
      'Expert-level Vue.js and Nuxt.js skills',
      'Strong CSS/SCSS and responsive design skills',
      'Experience with animation libraries (GSAP, Framer Motion)',
      'Knowledge of WebGL and Three.js is a plus'
    ],
    matchScore: 76
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: {
      name: 'CloudScale Solutions',
      logo: 'https://via.placeholder.com/40x40/8b5cf6/ffffff?text=CS'
    },
    location: 'Seattle, WA',
    remote: true,
    type: 'FULL_TIME',
    salaryMin: 130000,
    salaryMax: 180000,
    currency: 'USD',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins', 'Monitoring'],
    description: 'Help us build and maintain scalable infrastructure that powers millions of applications. You\'ll work with cutting-edge technologies and help shape our cloud-native architecture.',
    requirements: [
      '5+ years of DevOps/Infrastructure experience',
      'Expert knowledge of Kubernetes and Docker',
      'Experience with Infrastructure as Code (Terraform, CloudFormation)',
      'Strong scripting skills (Python, Bash)',
      'Experience with monitoring and logging tools'
    ],
    matchScore: 82
  },
  {
    id: '5',
    title: 'Mobile App Developer',
    company: {
      name: 'MobileFirst Inc.',
      logo: 'https://via.placeholder.com/40x40/ef4444/ffffff?text=MF'
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
  },
  {
    id: '6',
    title: 'Backend Engineer',
    company: {
      name: 'DataFlow Systems',
      logo: 'https://via.placeholder.com/40x40/06b6d4/ffffff?text=DF'
    },
    location: 'Chicago, IL',
    remote: true,
    type: 'FULL_TIME',
    salaryMin: 110000,
    salaryMax: 150000,
    currency: 'USD',
    skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Microservices', 'GraphQL'],
    description: 'Design and build robust backend systems that handle high-volume data processing. You\'ll work on microservices architecture and help optimize our API performance.',
    requirements: [
      '4+ years of backend development experience',
      'Strong Node.js and Express.js skills',
      'Experience with NoSQL databases (MongoDB, DynamoDB)',
      'Knowledge of microservices architecture',
      'Experience with message queues and caching systems'
    ],
    matchScore: 88
  },
  {
    id: '7',
    title: 'AI/ML Engineer',
    company: {
      name: 'AI Innovations Lab',
      logo: 'https://via.placeholder.com/40x40/7c3aed/ffffff?text=AI'
    },
    location: 'Boston, MA',
    remote: true,
    type: 'FULL_TIME',
    salaryMin: 140000,
    salaryMax: 200000,
    currency: 'USD',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'AWS', 'MLOps'],
    description: 'Join our AI team to develop cutting-edge machine learning models and deploy them at scale. Work on computer vision, NLP, and recommendation systems.',
    requirements: [
      'PhD or Masters in Computer Science, AI, or related field',
      '3+ years of ML engineering experience',
      'Strong Python and ML framework skills',
      'Experience with model deployment and MLOps',
      'Knowledge of deep learning and neural networks'
    ],
    matchScore: 79
  },
  {
    id: '8',
    title: 'Product Manager',
    company: {
      name: 'Growth Dynamics',
      logo: 'https://via.placeholder.com/40x40/059669/ffffff?text=GD'
    },
    location: 'Remote',
    remote: true,
    type: 'FULL_TIME',
    salaryMin: 120000,
    salaryMax: 170000,
    currency: 'USD',
    skills: ['Product Strategy', 'Analytics', 'Agile', 'User Research', 'SQL', 'Figma'],
    description: 'Lead product development for our B2B SaaS platform. Define product roadmap, work with engineering teams, and drive user adoption through data-driven decisions.',
    requirements: [
      '4+ years of product management experience',
      'Experience with B2B SaaS products',
      'Strong analytical and data interpretation skills',
      'Excellent communication and leadership abilities',
      'Experience with user research and A/B testing'
    ],
    matchScore: 72
  },
  {
    id: '9',
    title: 'Cybersecurity Analyst',
    company: {
      name: 'SecureNet Corp',
      logo: 'https://via.placeholder.com/40x40/dc2626/ffffff?text=SN'
    },
    location: 'Washington, DC',
    remote: false,
    type: 'FULL_TIME',
    salaryMin: 90000,
    salaryMax: 130000,
    currency: 'USD',
    skills: ['Network Security', 'SIEM', 'Incident Response', 'Penetration Testing', 'Python', 'Linux'],
    description: 'Protect our organization from cyber threats by monitoring security events, conducting investigations, and implementing security measures.',
    requirements: [
      '3+ years of cybersecurity experience',
      'Knowledge of security frameworks (NIST, ISO 27001)',
      'Experience with SIEM tools and log analysis',
      'Understanding of network protocols and security',
      'Security certifications (CISSP, CEH, etc.) preferred'
    ],
    matchScore: 68
  },
  {
    id: '10',
    title: 'UX/UI Designer',
    company: {
      name: 'Creative Solutions',
      logo: 'https://via.placeholder.com/40x40/f97316/ffffff?text=CS'
    },
    location: 'Portland, OR',
    remote: true,
    type: 'FULL_TIME',
    salaryMin: 85000,
    salaryMax: 120000,
    currency: 'USD',
    skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
    description: 'Create intuitive and beautiful user experiences for our digital products. Collaborate with product and engineering teams to bring designs to life.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in design tools (Figma, Sketch, Adobe)',
      'Strong portfolio showcasing design process',
      'Experience with user research and usability testing',
      'Knowledge of design systems and accessibility'
    ],
    matchScore: 85
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
  location: 'San Francisco, CA'
};