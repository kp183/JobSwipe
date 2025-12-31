import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  LinkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  StarIcon,
  EyeIcon,
  CalendarIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  isPrivate: boolean;
  skills: string[];
}

interface GitHubProfile {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  contributions: number;
  joinDate: string;
  topLanguages: { name: string; percentage: number; color: string }[];
  repos: GitHubRepo[];
  skillsExtracted: string[];
  codeQualityScore: number;
}

const mockGitHubProfile: GitHubProfile = {
  username: 'johndeveloper',
  name: 'John Developer',
  avatar: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=JD',
  bio: 'Full-stack developer passionate about React and Node.js',
  followers: 234,
  following: 189,
  publicRepos: 42,
  contributions: 1247,
  joinDate: '2019-03-15',
  topLanguages: [
    { name: 'JavaScript', percentage: 45, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 25, color: '#3178c6' },
    { name: 'Python', percentage: 15, color: '#3776ab' },
    { name: 'CSS', percentage: 10, color: '#1572b6' },
    { name: 'HTML', percentage: 5, color: '#e34f26' }
  ],
  skillsExtracted: [
    'React', 'Node.js', 'TypeScript', 'Express', 'MongoDB', 
    'PostgreSQL', 'Docker', 'AWS', 'Jest', 'Webpack'
  ],
  codeQualityScore: 87,
  repos: [
    {
      id: '1',
      name: 'awesome-react-app',
      description: 'A modern React application with TypeScript and Redux',
      language: 'TypeScript',
      stars: 156,
      forks: 23,
      lastUpdated: '2024-10-20',
      isPrivate: false,
      skills: ['React', 'TypeScript', 'Redux', 'Styled Components']
    },
    {
      id: '2',
      name: 'node-api-server',
      description: 'RESTful API server built with Node.js and Express',
      language: 'JavaScript',
      stars: 89,
      forks: 12,
      lastUpdated: '2024-10-18',
      isPrivate: false,
      skills: ['Node.js', 'Express', 'MongoDB', 'JWT']
    },
    {
      id: '3',
      name: 'ml-data-analysis',
      description: 'Machine learning project for data analysis and visualization',
      language: 'Python',
      stars: 67,
      forks: 8,
      lastUpdated: '2024-10-15',
      isPrivate: false,
      skills: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib']
    }
  ]
};

export default function Integrations() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const platforms = [
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐙',
      color: 'bg-gray-900',
      description: 'Import your repositories, contributions, and coding activity',
      benefits: [
        'Auto-extract skills from your code',
        'Showcase your best projects',
        'Calculate code quality score',
        'Import contribution history'
      ],
      connected: connectedPlatforms.includes('github')
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      icon: '🧩',
      color: 'bg-orange-500',
      description: 'Show your problem-solving skills and coding interview readiness',
      benefits: [
        'Display coding challenge scores',
        'Show problem-solving patterns',
        'Interview readiness assessment',
        'Algorithm expertise ranking'
      ],
      connected: connectedPlatforms.includes('leetcode')
    },
    {
      id: 'stackoverflow',
      name: 'Stack Overflow',
      icon: '📚',
      color: 'bg-orange-600',
      description: 'Highlight your technical expertise and community contributions',
      benefits: [
        'Import reputation and badges',
        'Show expertise in technologies',
        'Community contribution score',
        'Thought leadership indicators'
      ],
      connected: connectedPlatforms.includes('stackoverflow')
    },
    {
      id: 'codepen',
      name: 'CodePen',
      icon: '✏️',
      color: 'bg-black',
      description: 'Showcase your frontend skills and creative coding projects',
      benefits: [
        'Display interactive demos',
        'Frontend skill demonstration',
        'Creative coding portfolio',
        'UI/UX implementation skills'
      ],
      connected: connectedPlatforms.includes('codepen')
    }
  ];

  const handleConnect = async (platformId: string) => {
    setIsConnecting(platformId);
    
    // Simulate connection process
    setTimeout(() => {
      setConnectedPlatforms(prev => [...prev, platformId]);
      setIsConnecting(null);
      
      // If connecting GitHub, load mock profile
      if (platformId === 'github') {
        setGithubProfile(mockGitHubProfile);
      }
    }, 2000);
  };

  const handleDisconnect = (platformId: string) => {
    setConnectedPlatforms(prev => prev.filter(p => p !== platformId));
    if (platformId === 'github') {
      setGithubProfile(null);
    }
  };

  return (
    <>
      <Head>
        <title>Platform Integrations - JobSwipe</title>
        <meta name="description" content="Connect your coding platforms to enhance your profile" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Platform Integrations</h1>
              <p className="text-gray-600">Connect your coding platforms to showcase your skills and experience</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Integration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                      <p className="text-sm text-gray-600">{platform.description}</p>
                    </div>
                  </div>
                  
                  {platform.connected ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Connected</span>
                    </div>
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {platform.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2">
                  {platform.connected ? (
                    <>
                      <button
                        onClick={() => handleDisconnect(platform.id)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                      >
                        Disconnect
                      </button>
                      <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                        View Data
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting === platform.id}
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm flex items-center justify-center"
                    >
                      {isConnecting === platform.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Connect {platform.name}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub Profile Display */}
          {githubProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">GitHub Profile Analysis</h2>
                <div className="flex items-center space-x-2">
                  <TrophyIcon className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-gray-900">Code Quality: {githubProfile.codeQualityScore}/100</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="lg:col-span-1">
                  <div className="text-center mb-6">
                    <img
                      src={githubProfile.avatar}
                      alt={githubProfile.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">{githubProfile.name}</h3>
                    <p className="text-gray-600">@{githubProfile.username}</p>
                    <p className="text-sm text-gray-500 mt-2">{githubProfile.bio}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{githubProfile.followers}</div>
                      <div className="text-xs text-gray-600">Followers</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{githubProfile.publicRepos}</div>
                      <div className="text-xs text-gray-600">Repositories</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{githubProfile.contributions}</div>
                      <div className="text-xs text-gray-600">Contributions</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">
                        {new Date().getFullYear() - new Date(githubProfile.joinDate).getFullYear()}
                      </div>
                      <div className="text-xs text-gray-600">Years Active</div>
                    </div>
                  </div>
                </div>

                {/* Languages & Skills */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Languages</h4>
                  <div className="space-y-3 mb-6">
                    {githubProfile.topLanguages.map((lang, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-900">{lang.name}</span>
                          <span className="text-gray-600">{lang.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${lang.percentage}%`, 
                              backgroundColor: lang.color 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-4">Extracted Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {githubProfile.skillsExtracted.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Repositories */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-gray-900 mb-4">Top Repositories</h4>
                  <div className="space-y-4">
                    {githubProfile.repos.map((repo) => (
                      <div key={repo.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{repo.name}</h5>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <StarIcon className="w-4 h-4" />
                            <span>{repo.stars}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{repo.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                              {repo.language}
                            </span>
                            <span className="flex items-center">
                              <CodeBracketIcon className="w-3 h-3 mr-1" />
                              {repo.forks}
                            </span>
                          </div>
                          <span>Updated {new Date(repo.lastUpdated).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {repo.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-2">🤖 AI Profile Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-primary-800">Coding Activity</div>
                    <div className="text-primary-700">Highly active contributor with consistent commits</div>
                  </div>
                  <div>
                    <div className="font-medium text-primary-800">Skill Diversity</div>
                    <div className="text-primary-700">Strong full-stack capabilities across multiple languages</div>
                  </div>
                  <div>
                    <div className="font-medium text-primary-800">Project Quality</div>
                    <div className="text-primary-700">Well-documented projects with good community engagement</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}