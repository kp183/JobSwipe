import { useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  VideoCameraIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  StarIcon,
  EyeIcon,
  PlayIcon,
  StopIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

interface Project {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'design' | 'writing';
  github?: string;
  thumbnail: string;
  skills: string[];
  metrics: {
    stars?: number;
    views?: number;
    impact?: string;
  };
  verified: boolean;
}

interface SkillVerification {
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verified: boolean;
  score: number;
  percentile: number;
  badge: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Chess AI That Beat Me',
    description: 'Built a chess engine using minimax algorithm. Started as learning project, ended up stronger than me!',
    type: 'code',
    github: 'https://github.com/user/chess-ai',
    thumbnail: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Chess+AI',
    skills: ['Python', 'AI/ML', 'Game Theory'],
    metrics: {
      stars: 1247,
      views: 8934,
      impact: 'Featured in AI newsletter with 50k subscribers'
    },
    verified: true
  },
  {
    id: '2',
    title: 'Personal Website from Scratch',
    description: 'No frameworks, no templates. Pure HTML, CSS, and JavaScript to prove I understand fundamentals.',
    type: 'code',
    github: 'https://github.com/user/personal-site',
    thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Website',
    skills: ['HTML', 'CSS', 'JavaScript'],
    metrics: {
      views: 2341,
      impact: 'Load time: 0.8s (faster than 95% of websites)'
    },
    verified: true
  }
];

const mockSkills: SkillVerification[] = [
  {
    skill: 'Python',
    level: 'advanced',
    verified: true,
    score: 94,
    percentile: 95,
    badge: '🐍'
  },
  {
    skill: 'React',
    level: 'expert',
    verified: true,
    score: 98,
    percentile: 99,
    badge: '⚛️'
  }
];

export default function AuthenticPortfolio() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'video'>('overview');
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'expert': return 'text-purple-600 bg-purple-100';
      case 'advanced': return 'text-blue-600 bg-blue-100';
      case 'intermediate': return 'text-green-600 bg-green-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  return (
    <>
      <Head>
        <title>Authentic You™ Portfolio - Beyond Perfect Resumes</title>
        <meta name="description" content="Skills-first portfolio that proves authentic capabilities" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Authentic You™ Portfolio</h1>
            <p className="text-gray-600">Skills-first portfolio that proves your authentic capabilities</p>
            <div className="mt-2 text-sm text-orange-600">
              🚨 AI makes every resume perfect → perfect becomes meaningless. Show REAL work instead.
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">96%</div>
                  <div className="text-sm text-gray-500">Authenticity Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrophyIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-500">Verified Skills</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <EyeIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">11.2k</div>
                  <div className="text-sm text-gray-500">Portfolio Views</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <StarIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">1.2k</div>
                  <div className="text-sm text-gray-500">GitHub Stars</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'overview', label: 'Overview', icon: EyeIcon },
                  { key: 'projects', label: 'Real Projects', icon: CodeBracketIcon },
                  { key: 'skills', label: 'Verified Skills', icon: ShieldCheckIcon },
                  { key: 'video', label: 'Video Intro', icon: VideoCameraIcon }
                ].map((tab) => {
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
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Traditional vs Authentic You™</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900 mb-3">❌ Traditional (AI-generated)</h4>
                    <div className="text-sm text-red-800 space-y-2">
                      <p className="italic">"Results-driven software engineer with expertise in Python, React, and cloud architecture."</p>
                      <p className="text-xs text-red-600">(Everyone's resume says this now)</p>
                      <ul className="space-y-1 text-xs">
                        <li>• No proof of actual skills</li>
                        <li>• Identical to thousands of others</li>
                        <li>• Can't back up claims in interview</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-3">✅ Authentic You™</h4>
                    <div className="text-sm text-green-800 space-y-2">
                      <div className="space-y-1">
                        <div>🎥 Video: "Hi, I'm Mike. I built a chess AI that beats me..."</div>
                        <div>💻 Projects: Chess AI (1,200 stars), Personal website</div>
                        <div>✅ Verified: Python (95th percentile), React (99th percentile)</div>
                        <div>📊 Proof: "Load time 0.8s (faster than 95% of sites)"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">🎯 Why It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Impossible to Fake</h4>
                    <p className="text-sm text-blue-800">Requires real work and real personality</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Shows Real Skills</h4>
                    <p className="text-sm text-blue-800">No gap between portfolio and interview</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Stands Out</h4>
                    <p className="text-sm text-blue-800">Unique in sea of identical AI resumes</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">📊 Impact Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-green-700">Reduction in resume-reality gap</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">70%</div>
                    <div className="text-sm text-blue-700">Increase in employer trust</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">3x</div>
                    <div className="text-sm text-purple-700">Interview-to-hire rate</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Real Projects Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary-500 transition-colors"
                  >
                    <img src={project.thumbnail} alt={project.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                        {project.verified && <ShieldCheckIcon className="w-5 h-5 text-green-600" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        {project.metrics.stars && (
                          <div className="flex items-center">
                            <StarIcon className="w-4 h-4 mr-1" />
                            {project.metrics.stars}
                          </div>
                        )}
                        {project.metrics.views && (
                          <div className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            {project.metrics.views}
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-gray-600 mb-3">{project.metrics.impact}</div>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-gray-900 text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors"
                        >
                          View Code
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Verified Skills</h3>
              <div className="space-y-4">
                {mockSkills.map((skill) => (
                  <div key={skill.skill} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.badge}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
                          <div className={`inline-block px-2 py-1 rounded text-sm ${getSkillColor(skill.level)}`}>
                            {skill.level}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl text-primary-600">{skill.score}</div>
                        <div className="text-sm text-gray-500">{skill.percentile}th percentile</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">30-Second Video Introduction</h3>
                
                <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <VideoCameraIcon className="w-16 h-16 mx-auto mb-4 opacity-75" />
                        <div className="text-lg mb-2">Record Your Introduction</div>
                        <div className="text-sm opacity-75">Show your authentic self in 30 seconds</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <PlayIcon className="w-5 h-5 mr-2" />
                      Start Recording
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <StopIcon className="w-5 h-5 mr-2" />
                      Stop & Analyze
                    </button>
                  )}
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">💡 Recording Tips</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Look directly at the camera</li>
                    <li>• Share a brief story that shows personality</li>
                    <li>• Mention what makes you unique</li>
                    <li>• Keep it under 30 seconds</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}