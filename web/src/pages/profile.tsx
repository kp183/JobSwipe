import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  PencilIcon, 
  PlusIcon,
  TrashIcon,
  CameraIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  title: string;
  bio?: string;
  profilePic?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  skills: string[];
  experienceLevel: string;
  expectedSalary?: { min: number; max: number };
  preferredLocations: string[];
  workPreferences: {
    remote: boolean;
    hybrid: boolean;
    onsite: boolean;
  };
}

interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  featured: boolean;
}

const mockProfile: UserProfile = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  title: 'Senior Full Stack Developer',
  bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Love working with React, Node.js, and cloud technologies.',
  website: 'https://johndoe.dev',
  linkedin: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe',
  skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
  experienceLevel: 'Senior',
  expectedSalary: { min: 120000, max: 160000 },
  preferredLocations: ['San Francisco, CA', 'New York, NY', 'Remote'],
  workPreferences: {
    remote: true,
    hybrid: true,
    onsite: false
  }
};

const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    title: 'Senior Full Stack Developer',
    startDate: '2022-01',
    current: true,
    description: 'Lead development of customer-facing web applications using React and Node.js. Implemented microservices architecture and improved system performance by 40%.',
    technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
  },
  {
    id: '2',
    company: 'StartupXYZ',
    title: 'Full Stack Developer',
    startDate: '2020-03',
    endDate: '2021-12',
    current: false,
    description: 'Built and maintained multiple web applications from scratch. Collaborated with design team to implement responsive UI components.',
    technologies: ['Vue.js', 'Python', 'Django', 'MySQL', 'Redis']
  }
];

const mockEducation: Education[] = [
  {
    id: '1',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2016-09',
    endDate: '2020-05',
    gpa: 3.8
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Full-stack e-commerce platform with real-time inventory management and payment processing.',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    url: 'https://ecommerce-demo.com',
    githubUrl: 'https://github.com/johndoe/ecommerce',
    featured: true
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team collaboration features.',
    technologies: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
    githubUrl: 'https://github.com/johndoe/taskapp',
    featured: false
  }
];

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [experience] = useState<Experience[]>(mockExperience);
  const [education] = useState<Education[]>(mockEducation);
  const [projects] = useState<Project[]>(mockProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'projects'>('overview');

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BriefcaseIcon },
    { key: 'experience', label: 'Experience', icon: BriefcaseIcon },
    { key: 'education', label: 'Education', icon: AcademicCapIcon },
    { key: 'projects', label: 'Projects', icon: CodeBracketIcon }
  ];

  return (
    <>
      <Head>
        <title>My Profile - JobSwipe</title>
        <meta name="description" content="Manage your professional profile and preferences" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-start space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </span>
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:bg-gray-50">
                  <CameraIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </h1>
                    <p className="text-xl text-gray-600">{profile.title}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {profile.location}
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    {profile.email}
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    {profile.phone}
                  </div>
                </div>

                {profile.bio && (
                  <p className="mt-4 text-gray-700 max-w-2xl">{profile.bio}</p>
                )}

                {/* Social Links */}
                <div className="flex space-x-4 mt-4">
                  {profile.website && (
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary-600 hover:text-primary-700">
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Website
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary-600 hover:text-primary-700">
                      <LinkIcon className="w-4 h-4 mr-1" />
                      LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary-600 hover:text-primary-700">
                      <LinkIcon className="w-4 h-4 mr-1" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Skills */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                  <button className="text-primary-600 hover:text-primary-700">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Preferences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Expected Salary</label>
                    <p className="text-gray-900">
                      ${profile.expectedSalary?.min.toLocaleString()} - ${profile.expectedSalary?.max.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Work Preferences</label>
                    <div className="mt-2 space-y-1">
                      {profile.workPreferences.remote && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs mr-2">Remote</span>
                      )}
                      {profile.workPreferences.hybrid && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-2">Hybrid</span>
                      )}
                      {profile.workPreferences.onsite && (
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">On-site</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Preferred Locations</label>
                    <div className="mt-2 space-y-1">
                      {profile.preferredLocations.map((location, index) => (
                        <div key={index} className="text-sm text-gray-600">{location}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as any)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                            activeTab === tab.key
                              ? 'border-primary-500 text-primary-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {profile.bio || 'No professional summary added yet.'}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Career Highlights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-primary-600">5+</div>
                            <div className="text-sm text-gray-600">Years Experience</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-primary-600">{profile.skills.length}</div>
                            <div className="text-sm text-gray-600">Technical Skills</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-primary-600">{projects.length}</div>
                            <div className="text-sm text-gray-600">Projects</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-primary-600">94%</div>
                            <div className="text-sm text-gray-600">Avg Match Score</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Experience Tab */}
                  {activeTab === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">Work Experience</h4>
                        <button className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Add Experience
                        </button>
                      </div>

                      {experience.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h5 className="text-lg font-semibold text-gray-900">{exp.title}</h5>
                              <p className="text-primary-600 font-medium">{exp.company}</p>
                              <p className="text-sm text-gray-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-gray-600">
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4">{exp.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Education Tab */}
                  {activeTab === 'education' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">Education</h4>
                        <button className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Add Education
                        </button>
                      </div>

                      {education.map((edu, index) => (
                        <motion.div
                          key={edu.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h5>
                              <p className="text-primary-600 font-medium">{edu.institution}</p>
                              <p className="text-sm text-gray-500">
                                {edu.startDate} - {edu.endDate}
                              </p>
                              {edu.gpa && (
                                <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-gray-600">
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Projects Tab */}
                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">Projects</h4>
                        <button className="flex items-center px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Add Project
                        </button>
                      </div>

                      {projects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h5 className="text-lg font-semibold text-gray-900">{project.name}</h5>
                                {project.featured && (
                                  <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
                                )}
                              </div>
                              <p className="text-gray-700 mb-4">{project.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>

                              <div className="flex space-x-4">
                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-700 text-sm"
                                  >
                                    View Live →
                                  </a>
                                )}
                                {project.githubUrl && (
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-700 text-sm"
                                  >
                                    View Code →
                                  </a>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-gray-600">
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}