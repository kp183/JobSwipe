import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  MicrophoneIcon,
  VideoCameraIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  HeartIcon,
  BoltIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  UserIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface InterviewQuestion {
  id: string;
  category: 'behavioral' | 'technical' | 'situational' | 'company-specific';
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string[];
  sampleAnswer: string;
  commonMistakes: string[];
}

interface InterviewFeedback {
  overallScore: number;
  confidence: number;
  clarity: number;
  eyeContact: number;
  pacing: number;
  fillerWords: number;
  strengths: string[];
  improvements: string[];
  detailedAnalysis: {
    voiceAnalysis: {
      tone: 'confident' | 'nervous' | 'monotone';
      pace: 'too-fast' | 'good' | 'too-slow';
      volume: 'too-quiet' | 'good' | 'too-loud';
    };
    bodyLanguage: {
      eyeContact: number;
      posture: 'good' | 'slouching' | 'tense';
      gestures: 'natural' | 'excessive' | 'minimal';
    };
    contentAnalysis: {
      structure: 'excellent' | 'good' | 'poor';
      examples: number;
      starMethod: boolean;
    };
  };
}

const mockQuestions: InterviewQuestion[] = [
  {
    id: '1',
    category: 'behavioral',
    question: 'Tell me about a time when you had to work with a difficult team member.',
    difficulty: 'medium',
    tips: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Focus on your actions and problem-solving',
      'Show emotional intelligence and professionalism',
      'End with a positive outcome or lesson learned'
    ],
    sampleAnswer: 'In my previous role, I worked with a colleague who consistently missed deadlines, affecting our team\'s deliverables. I approached them privately to understand their challenges and discovered they were overwhelmed with their workload. I suggested we redistribute some tasks and implemented a daily check-in system. This improved their performance by 40% and strengthened our working relationship.',
    commonMistakes: [
      'Badmouthing the difficult person',
      'Not taking any responsibility',
      'Focusing only on the problem, not the solution',
      'Being too vague about actions taken'
    ]
  },
  {
    id: '2',
    category: 'technical',
    question: 'How would you optimize a slow-loading web application?',
    difficulty: 'hard',
    tips: [
      'Start with identifying bottlenecks',
      'Mention both frontend and backend optimizations',
      'Include specific tools and metrics',
      'Show systematic problem-solving approach'
    ],
    sampleAnswer: 'I\'d start by analyzing performance metrics using tools like Lighthouse and Chrome DevTools. For frontend optimization, I\'d implement code splitting, lazy loading, and image optimization. On the backend, I\'d examine database queries, add caching layers, and consider CDN implementation. I\'d also set up monitoring to track improvements and ensure the optimizations are effective.',
    commonMistakes: [
      'Jumping to solutions without analysis',
      'Only mentioning one type of optimization',
      'Not explaining the reasoning behind choices',
      'Forgetting to mention measurement and monitoring'
    ]
  },
  {
    id: '3',
    category: 'company-specific',
    question: 'Why do you want to work at Google specifically?',
    difficulty: 'medium',
    tips: [
      'Research the company\'s mission and values',
      'Mention specific products or initiatives',
      'Connect your skills to their needs',
      'Show genuine enthusiasm'
    ],
    sampleAnswer: 'I\'m drawn to Google\'s mission of organizing the world\'s information and making it universally accessible. I\'m particularly excited about your work in AI and machine learning, especially projects like TensorFlow that democratize AI development. My background in distributed systems and passion for scalable solutions align perfectly with Google\'s technical challenges. I want to contribute to products that impact billions of users while working alongside some of the brightest minds in tech.',
    commonMistakes: [
      'Generic answers that could apply to any company',
      'Only mentioning salary or prestige',
      'Not connecting personal skills to company needs',
      'Showing lack of research about the company'
    ]
  }
];

const mockFeedback: InterviewFeedback = {
  overallScore: 78,
  confidence: 82,
  clarity: 75,
  eyeContact: 68,
  pacing: 85,
  fillerWords: 23,
  strengths: [
    'Strong use of specific examples with numbers',
    'Good structure using STAR method',
    'Confident tone throughout the response',
    'Maintained good pace and didn\'t rush'
  ],
  improvements: [
    'Increase eye contact - looked down 32% of the time',
    'Reduce filler words ("um", "uh") - used 23 times in 3 minutes',
    'Improve posture - slouching detected in middle section',
    'Add more specific metrics to strengthen examples'
  ],
  detailedAnalysis: {
    voiceAnalysis: {
      tone: 'confident',
      pace: 'good',
      volume: 'good'
    },
    bodyLanguage: {
      eyeContact: 68,
      posture: 'good',
      gestures: 'natural'
    },
    contentAnalysis: {
      structure: 'excellent',
      examples: 3,
      starMethod: true
    }
  }
};

export default function InterviewZen() {
  const [activeTab, setActiveTab] = useState<'practice' | 'anxiety' | 'feedback'>('practice');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState(7);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | null>(null);
  const breathingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecording(true);
      setRecordingTime(0);
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
    setIsPaused(false);
    setShowFeedback(true);
  };

  const startBreathingExercise = () => {
    setBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingCount(4);

    breathingIntervalRef.current = setInterval(() => {
      setBreathingCount(prev => {
        if (prev === 1) {
          setBreathingPhase(current => {
            if (current === 'inhale') return 'hold';
            if (current === 'hold') return 'exhale';
            return 'inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopBreathingExercise = () => {
    setBreathingActive(false);
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <>
      <Head>
        <title>Interview Zen™ - Master Job Interviews with AI</title>
        <meta name="description" content="Practice interviews with AI, reduce anxiety, and get detailed feedback" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interview Zen™</h1>
              <p className="text-gray-600">Master interviews with AI practice and anxiety management</p>
              <div className="mt-2 text-sm text-blue-600">
                🧘‍♀️ 93% of job seekers experience interview anxiety - we're here to help
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'practice', label: 'AI Mock Interview', icon: MicrophoneIcon },
                  { key: 'anxiety', label: 'Anxiety Relief', icon: HeartIcon },
                  { key: 'feedback', label: 'Performance Analysis', icon: ChartBarIcon }
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

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Question Selection */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Questions</h3>
                  <div className="space-y-3">
                    {mockQuestions.map((question) => (
                      <button
                        key={question.id}
                        onClick={() => setSelectedQuestion(question)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedQuestion?.id === question.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            question.category === 'behavioral' ? 'bg-blue-100 text-blue-800' :
                            question.category === 'technical' ? 'bg-green-100 text-green-800' :
                            question.category === 'situational' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {question.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                        <div className="text-sm text-gray-900 font-medium">
                          {question.question}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interview Practice */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  {selectedQuestion ? (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Mock Interview</h3>
                          {isRecording && (
                            <div className="flex items-center space-x-2 text-red-600">
                              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                              <span className="font-medium">Recording: {formatTime(recordingTime)}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                          <div className="flex items-start space-x-3">
                            <UserIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-blue-900">AI Interviewer:</div>
                              <div className="text-blue-800 mt-1">{selectedQuestion.question}</div>
                            </div>
                          </div>
                        </div>

                        {/* Video Recording Area */}
                        <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                          <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className="w-full h-full object-cover"
                          />
                          {!isRecording && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center text-white">
                                <VideoCameraIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <div className="text-sm opacity-75">Click Start to begin recording</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Recording Controls */}
                        <div className="flex items-center justify-center space-x-4">
                          {!isRecording ? (
                            <button
                              onClick={startRecording}
                              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <PlayIcon className="w-5 h-5 mr-2" />
                              Start Recording
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                              >
                                {isPaused ? <PlayIcon className="w-4 h-4 mr-2" /> : <PauseIcon className="w-4 h-4 mr-2" />}
                                {isPaused ? 'Resume' : 'Pause'}
                              </button>
                              <button
                                onClick={stopRecording}
                                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                              >
                                <StopIcon className="w-4 h-4 mr-2" />
                                Stop & Analyze
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Question Tips */}
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-2">💡 Tips for this question:</h4>
                        <ul className="space-y-1">
                          {selectedQuestion.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-green-800 flex items-start">
                              <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <MicrophoneIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Question to Practice</h3>
                      <p className="text-gray-600">Choose from behavioral, technical, or company-specific questions</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Anxiety Relief Tab */}
          {activeTab === 'anxiety' && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Anxiety Level Check */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling right now?</h3>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Calm</span>
                    <span className="text-sm text-gray-600">Anxious</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={anxietyLevel}
                    onChange={(e) => setAnxietyLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2">
                    <span className={`text-lg font-semibold ${
                      anxietyLevel <= 3 ? 'text-green-600' :
                      anxietyLevel <= 6 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {anxietyLevel}/10
                    </span>
                  </div>
                </div>

                {anxietyLevel >= 7 && (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-4">
                    <div className="flex items-start space-x-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-900">High Anxiety Detected</div>
                        <div className="text-red-800 text-sm mt-1">
                          Let's work on reducing your anxiety before the interview. Try the breathing exercise below.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Breathing Exercise */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">4-4-4 Breathing Exercise</h3>
                <p className="text-gray-600 mb-6">
                  This technique helps calm your nervous system and reduce interview anxiety
                </p>

                <div className="text-center">
                  {breathingActive ? (
                    <div className="space-y-6">
                      <div className="relative">
                        <div className={`w-32 h-32 mx-auto rounded-full border-4 transition-all duration-1000 ${
                          breathingPhase === 'inhale' ? 'border-blue-500 scale-110' :
                          breathingPhase === 'hold' ? 'border-yellow-500 scale-110' :
                          'border-green-500 scale-90'
                        }`}>
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{breathingCount}</div>
                              <div className="text-sm text-gray-600 capitalize">{breathingPhase}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-lg font-medium text-gray-900">
                        {breathingPhase === 'inhale' && 'Breathe in slowly...'}
                        {breathingPhase === 'hold' && 'Hold your breath...'}
                        {breathingPhase === 'exhale' && 'Breathe out slowly...'}
                      </div>

                      <button
                        onClick={stopBreathingExercise}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Stop Exercise
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto rounded-full border-4 border-gray-300 flex items-center justify-center">
                        <HeartIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <button
                        onClick={startBreathingExercise}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Breathing Exercise
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Confidence Boosters */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confidence Boosters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">🎯 Remember Your Strengths</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• You have 5+ years of relevant experience</li>
                      <li>• You've successfully completed 15+ projects</li>
                      <li>• Your skills match 89% of the job requirements</li>
                      <li>• You've been invited to this interview for a reason</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">💪 Positive Affirmations</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• "I am qualified and capable"</li>
                      <li>• "I belong in this interview"</li>
                      <li>• "I have valuable skills to offer"</li>
                      <li>• "I will do my best and that's enough"</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pre-Interview Checklist */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Pre-Interview Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Researched the company and role</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Prepared STAR method examples</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Practiced common questions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Prepared questions to ask them</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Tested video/audio setup</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Chose professional outfit</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Planned arrival time</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Did breathing exercises</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="max-w-4xl mx-auto">
              {showFeedback ? (
                <div className="space-y-8">
                  {/* Overall Score */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Interview Performance Analysis</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(mockFeedback.overallScore)}`}>
                          {mockFeedback.overallScore}
                        </div>
                        <div className="text-sm text-gray-500">Overall Score</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(mockFeedback.confidence)}`}>
                          {mockFeedback.confidence}
                        </div>
                        <div className="text-sm text-gray-500">Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(mockFeedback.clarity)}`}>
                          {mockFeedback.clarity}
                        </div>
                        <div className="text-sm text-gray-500">Clarity</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(mockFeedback.eyeContact)}`}>
                          {mockFeedback.eyeContact}
                        </div>
                        <div className="text-sm text-gray-500">Eye Contact</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(mockFeedback.pacing)}`}>
                          {mockFeedback.pacing}
                        </div>
                        <div className="text-sm text-gray-500">Pacing</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-medium text-green-900 mb-3">✅ What You Did Well</h4>
                        <ul className="space-y-2">
                          {mockFeedback.strengths.map((strength, index) => (
                            <li key={index} className="text-sm text-green-800 flex items-start">
                              <CheckCircleIcon className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-3">⚠️ Areas for Improvement</h4>
                        <ul className="space-y-2">
                          {mockFeedback.improvements.map((improvement, index) => (
                            <li key={index} className="text-sm text-yellow-800 flex items-start">
                              <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Analysis</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">🎤 Voice Analysis</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Tone:</span>
                            <span className="capitalize font-medium">{mockFeedback.detailedAnalysis.voiceAnalysis.tone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pace:</span>
                            <span className="capitalize font-medium">{mockFeedback.detailedAnalysis.voiceAnalysis.pace}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Volume:</span>
                            <span className="capitalize font-medium">{mockFeedback.detailedAnalysis.voiceAnalysis.volume}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Filler Words:</span>
                            <span className="font-medium text-red-600">{mockFeedback.fillerWords} times</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">👁️ Body Language</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Eye Contact:</span>
                            <span className="font-medium">{mockFeedback.detailedAnalysis.bodyLanguage.eyeContact}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Posture:</span>
                            <span className="capitalize font-medium">{mockFeedback.detailedAnalysis.bodyLanguage.posture}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gestures:</span>
                            <span className="capitalize font-medium">{mockFeedback.detailedAnalysis.bodyLanguage.gestures}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">📝 Content Analysis</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Structure:</span>
                            <span className="capitalize font-medium">{mockFeedback.detailedAnalysis.contentAnalysis.structure}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Examples Used:</span>
                            <span className="font-medium">{mockFeedback.detailedAnalysis.contentAnalysis.examples}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>STAR Method:</span>
                            <span className="font-medium text-green-600">
                              {mockFeedback.detailedAnalysis.contentAnalysis.starMethod ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Plan */}
                  <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">🎯 Your Improvement Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-primary-900 mb-2">Immediate Actions:</h4>
                        <ul className="space-y-1 text-sm text-primary-800">
                          <li>• Practice maintaining eye contact for 3-5 seconds at a time</li>
                          <li>• Record yourself answering questions to reduce filler words</li>
                          <li>• Practice the STAR method with 3 more examples</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-900 mb-2">Long-term Goals:</h4>
                        <ul className="space-y-1 text-sm text-primary-800">
                          <li>• Aim for 80%+ eye contact in next practice session</li>
                          <li>• Reduce filler words to under 10 per 3-minute response</li>
                          <li>• Increase overall confidence score to 85+</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-8">
                  <div className="text-center">
                    <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Available</h3>
                    <p className="text-gray-600">Complete a mock interview to see your performance analysis</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}