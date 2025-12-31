import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  HeartIcon,
  TrophyIcon,
  FireIcon,
  StarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  LightBulbIcon,
  FaceSmileIcon,
  HandRaisedIcon,
  SparklesIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface WellnessData {
  currentStreak: number;
  totalApplications: number;
  weeklyGoal: number;
  moodHistory: MoodEntry[];
  achievements: Achievement[];
  dailyMotivation: string;
  realityCheck: RealityCheck;
  burnoutRisk: 'low' | 'medium' | 'high';
}

interface MoodEntry {
  date: string;
  mood: number; // 1-10 scale
  energy: number;
  confidence: number;
  note?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface RealityCheck {
  averageApplicationsNeeded: number;
  averageTimeToHire: string;
  interviewRate: string;
  yourProgress: {
    applications: number;
    timeSearching: number;
    interviews: number;
  };
  encouragement: string;
}

const mockWellnessData: WellnessData = {
  currentStreak: 5,
  totalApplications: 45,
  weeklyGoal: 10,
  moodHistory: [
    { date: '2024-10-21', mood: 6, energy: 7, confidence: 5 },
    { date: '2024-10-22', mood: 7, energy: 8, confidence: 6 },
    { date: '2024-10-23', mood: 5, energy: 6, confidence: 4, note: 'Got rejected from dream job' },
    { date: '2024-10-24', mood: 8, energy: 9, confidence: 7, note: 'Had great interview!' },
    { date: '2024-10-25', mood: 7, energy: 8, confidence: 6 }
  ],
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Applied to your first job',
      icon: '👶',
      unlockedAt: '2024-10-15',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Hot Streak',
      description: '5 days in a row applying to jobs',
      icon: '🔥',
      unlockedAt: '2024-10-25',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Interview Warrior',
      description: 'Completed 3 interviews this week',
      icon: '⚔️',
      unlockedAt: '2024-10-24',
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Resilience Master',
      description: 'Bounced back after 10 rejections',
      icon: '💪',
      unlockedAt: '2024-10-20',
      rarity: 'legendary'
    }
  ],
  dailyMotivation: "Every rejection brings you closer to your perfect job. You're not failing - you're learning and growing stronger! 💪",
  realityCheck: {
    averageApplicationsNeeded: 250,
    averageTimeToHire: '3-6 months',
    interviewRate: '2-4%',
    yourProgress: {
      applications: 45,
      timeSearching: 3,
      interviews: 3
    },
    encouragement: "You're doing AMAZING! Most people need 250+ applications. You're only 18% through the journey - keep going! 🚀"
  },
  burnoutRisk: 'medium'
};

const motivationalQuotes = [
  "Your dream job is looking for you too! 🌟",
  "Every 'no' gets you closer to your 'yes' 💫",
  "You're not behind - you're exactly where you need to be ⏰",
  "Your skills are valuable. Your experience matters. You belong here! 👑",
  "The right opportunity is worth the wait 🎯",
  "You've overcome challenges before - you'll overcome this too 💪",
  "Your future self is cheering you on! 🎉"
];

export default function JobSwipeWellness() {
  const [activeTab, setActiveTab] = useState<'mood' | 'achievements' | 'reality' | 'motivation'>('mood');
  const [currentMood, setCurrentMood] = useState(7);
  const [currentEnergy, setCurrentEnergy] = useState(6);
  const [currentConfidence, setCurrentConfidence] = useState(5);
  const [moodNote, setMoodNote] = useState('');
  const [dailyQuote, setDailyQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    // Rotate daily quote
    const quoteIndex = new Date().getDate() % motivationalQuotes.length;
    setDailyQuote(motivationalQuotes[quoteIndex]);
  }, []);

  const getMoodEmoji = (mood: number) => {
    if (mood >= 9) return '😄';
    if (mood >= 7) return '😊';
    if (mood >= 5) return '😐';
    if (mood >= 3) return '😔';
    return '😢';
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600 bg-green-100';
    if (mood >= 6) return 'text-yellow-600 bg-yellow-100';
    if (mood >= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateProgress = () => {
    const { applications, timeSearching, interviews } = mockWellnessData.realityCheck.yourProgress;
    const avgApplications = mockWellnessData.realityCheck.averageApplicationsNeeded;
    const progressPercent = Math.min((applications / avgApplications) * 100, 100);
    return Math.round(progressPercent);
  };

  return (
    <>
      <Head>
        <title>JobSwipe Wellness™ - Mental Health & Motivation</title>
        <meta name="description" content="Stay motivated and mentally healthy during your job search journey" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">JobSwipe Wellness™</h1>
                <p className="text-gray-600">Your mental health and motivation companion</p>
                <div className="mt-2 text-sm text-green-600">
                  💚 Job searching is hard - we're here to support you every step of the way
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">{mockWellnessData.currentStreak}</div>
                <div className="text-sm text-gray-500">Day Streak 🔥</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Daily Motivation Banner */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">✨ Daily Motivation</h3>
                <p className="text-purple-100">{dailyQuote}</p>
              </div>
              <SparklesIcon className="w-12 h-12 text-purple-200" />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'mood', label: 'Mood Tracker', icon: FaceSmileIcon },
                  { key: 'achievements', label: 'Achievements', icon: TrophyIcon },
                  { key: 'reality', label: 'Reality Check', icon: ChartBarIcon },
                  { key: 'motivation', label: 'Motivation Boost', icon: BoltIcon }
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

          {/* Mood Tracker Tab */}
          {activeTab === 'mood' && (
            <div className="space-y-8">
              {/* Current Mood Input */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">How are you feeling today?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mood {getMoodEmoji(currentMood)}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentMood}
                      onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Terrible</span>
                      <span className="font-medium">{currentMood}/10</span>
                      <span>Amazing</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Energy Level ⚡
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentEnergy}
                      onChange={(e) => setCurrentEnergy(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Exhausted</span>
                      <span className="font-medium">{currentEnergy}/10</span>
                      <span>Energized</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confidence 💪
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentConfidence}
                      onChange={(e) => setCurrentConfidence(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low</span>
                      <span className="font-medium">{currentConfidence}/10</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's on your mind? (Optional)
                  </label>
                  <textarea
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="Had a great interview today! Feeling optimistic..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Save Today's Mood
                </button>
              </div>

              {/* Mood History */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Mood Journey</h3>
                <div className="space-y-4">
                  {mockWellnessData.moodHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                          {entry.note && (
                            <div className="text-sm text-gray-600">{entry.note}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <div className={`px-2 py-1 rounded ${getMoodColor(entry.mood)}`}>
                          Mood: {entry.mood}/10
                        </div>
                        <div className="text-gray-500">
                          Energy: {entry.energy}/10
                        </div>
                        <div className="text-gray-500">
                          Confidence: {entry.confidence}/10
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Burnout Warning */}
              {mockWellnessData.burnoutRisk !== 'low' && (
                <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Burnout Risk: {mockWellnessData.burnoutRisk.toUpperCase()}</h4>
                      <p className="text-yellow-800 mt-1">
                        You've been pushing hard lately. Remember to take breaks, practice self-care, and celebrate small wins. 
                        Your mental health is more important than any job.
                      </p>
                      <div className="mt-4 space-x-3">
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                          Schedule Break Day
                        </button>
                        <button className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors text-sm">
                          Self-Care Tips
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Achievements 🏆</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockWellnessData.achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          achievement.rarity === 'common' ? 'bg-gray-200 text-gray-800' :
                          achievement.rarity === 'rare' ? 'bg-blue-200 text-blue-800' :
                          achievement.rarity === 'epic' ? 'bg-purple-200 text-purple-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress Towards Next Achievement */}
              <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg border border-primary-200 p-6">
                <h4 className="font-semibold text-primary-900 mb-4">🎯 Next Achievement</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary-800">Century Club (100 Applications)</span>
                  <span className="text-primary-600 font-medium">45/100</span>
                </div>
                <div className="w-full bg-primary-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-primary-700 mt-2">55 more applications to unlock this epic achievement! 🚀</p>
              </div>
            </div>
          )}

          {/* Reality Check Tab */}
          {activeTab === 'reality' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Job Search Reality Check 📊</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{mockWellnessData.realityCheck.averageApplicationsNeeded}</div>
                    <div className="text-sm text-blue-600">Average Applications Needed</div>
                    <div className="text-xs text-blue-500 mt-1">Industry standard for 2024</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{mockWellnessData.realityCheck.averageTimeToHire}</div>
                    <div className="text-sm text-green-600">Average Time to Hire</div>
                    <div className="text-xs text-green-500 mt-1">Be patient with the process</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{mockWellnessData.realityCheck.interviewRate}</div>
                    <div className="text-sm text-purple-600">Typical Interview Rate</div>
                    <div className="text-xs text-purple-500 mt-1">You're not alone in this</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-4">🎯 Your Progress</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{mockWellnessData.realityCheck.yourProgress.applications}</div>
                      <div className="text-sm text-green-700">Applications Sent</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{mockWellnessData.realityCheck.yourProgress.timeSearching}</div>
                      <div className="text-sm text-green-700">Weeks Searching</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{mockWellnessData.realityCheck.yourProgress.interviews}</div>
                      <div className="text-sm text-green-700">Interviews Completed</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-800">Journey Progress</span>
                      <span className="text-green-600 font-medium">{calculateProgress()}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                    </div>
                  </div>
                  
                  <p className="text-green-800 font-medium">{mockWellnessData.realityCheck.encouragement}</p>
                </div>
              </div>

              {/* Comparison with Others */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">You're Not Alone 🤝</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Job seekers who get discouraged after 20 applications</span>
                    <span className="font-bold text-red-600">67%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Average applications before first interview</span>
                    <span className="font-bold text-blue-600">50-100</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Job seekers who experience anxiety</span>
                    <span className="font-bold text-yellow-600">89%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-700 font-medium">You (still actively searching after {mockWellnessData.realityCheck.yourProgress.applications} applications)</span>
                    <span className="font-bold text-green-600">TOP 33% 🏆</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Motivation Boost Tab */}
          {activeTab === 'motivation' && (
            <div className="space-y-8">
              {/* Inspirational Stories */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Success Stories 🌟</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        S
                      </div>
                      <div>
                        <h4 className="font-medium text-green-900">Sarah, Software Engineer</h4>
                        <p className="text-green-800 text-sm mt-1">
                          "I applied to 143 jobs over 4 months. Got rejected from my dream company twice. 
                          On application #144, I finally got my dream job at Google with a 40% salary increase! 
                          The key was persistence and learning from each rejection."
                        </p>
                        <div className="text-xs text-green-600 mt-2">Hired after 143 applications • 4 months</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        M
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">Marcus, Product Manager</h4>
                        <p className="text-blue-800 text-sm mt-1">
                          "After being laid off, I was depressed and applied to only 5 jobs in 2 months. 
                          Then I changed my mindset, treated job searching like a full-time job, and applied to 
                          200+ positions. Got 3 offers in month 6!"
                        </p>
                        <div className="text-xs text-blue-600 mt-2">Hired after 200+ applications • 6 months</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900">Alex, UX Designer</h4>
                        <p className="text-purple-800 text-sm mt-1">
                          "I was rejected 50 times before I realized my portfolio wasn't showcasing the right skills. 
                          After revamping it based on feedback, I got 5 interviews in 2 weeks and 2 job offers!"
                        </p>
                        <div className="text-xs text-purple-600 mt-2">Hired after portfolio revamp • 3 months total</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Affirmations */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200 p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Daily Affirmations 💫</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-purple-800 font-medium">"I am qualified and capable"</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-purple-800 font-medium">"Every rejection teaches me something valuable"</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-purple-800 font-medium">"My dream job is looking for me too"</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-purple-800 font-medium">"I am resilient and persistent"</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-purple-800 font-medium">"I deserve a job that values my skills"</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-purple-800 font-medium">"I am exactly where I need to be"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Motivation */}
              <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">🚨 Emergency Motivation</h3>
                <p className="text-red-800 mb-4">
                  Feeling like giving up? Remember: J.K. Rowling was rejected by 12 publishers before Harry Potter became a global phenomenon. 
                  Colonel Sanders was rejected 1,009 times before KFC became successful. Your breakthrough is coming!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    🎯 Set Small Goal
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    📞 Call Support Buddy
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    🧘‍♀️ Take Mental Break
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}