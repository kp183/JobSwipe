import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  VideoCameraIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  HeartIcon,
  ClockIcon,
  FireIcon,
  SparklesIcon,
  HandRaisedIcon,
  FaceSmileIcon,
  BoltIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  searchDuration: number; // weeks
  applications: number;
  interviews: number;
  isOnline: boolean;
  lastActivity: string;
  mood: 'great' | 'good' | 'okay' | 'struggling';
  todayGoal: string;
  achievements: string[];
}

interface CoWorkingRoom {
  id: string;
  name: string;
  description: string;
  currentMembers: number;
  maxMembers: number;
  focus: string;
  mood: 'focused' | 'supportive' | 'celebratory';
  members: CommunityMember[];
}

interface SupportGroup {
  id: string;
  title: string;
  description: string;
  nextSession: string;
  participants: number;
  coach: string;
  topics: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface VictoryPost {
  id: string;
  member: CommunityMember;
  type: 'interview' | 'callback' | 'offer' | 'milestone';
  message: string;
  timestamp: string;
  reactions: number;
  comments: number;
}

const mockMembers: CommunityMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://via.placeholder.com/40x40/6366f1/ffffff?text=SC',
    role: 'Frontend Developer',
    location: 'San Francisco, CA',
    searchDuration: 8,
    applications: 47,
    interviews: 3,
    isOnline: true,
    lastActivity: '2 minutes ago',
    mood: 'good',
    todayGoal: 'Apply to 5 React positions',
    achievements: ['Hot Streak', 'Interview Warrior']
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://via.placeholder.com/40x40/10b981/ffffff?text=MJ',
    role: 'Product Manager',
    location: 'Austin, TX',
    searchDuration: 12,
    applications: 89,
    interviews: 7,
    isOnline: true,
    lastActivity: '5 minutes ago',
    mood: 'struggling',
    todayGoal: 'Follow up on 3 interviews',
    achievements: ['Persistence Master', 'Century Club']
  },
  {
    id: '3',
    name: 'Alex Rivera',
    avatar: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=AR',
    role: 'UX Designer',
    location: 'Seattle, WA',
    searchDuration: 4,
    applications: 23,
    interviews: 2,
    isOnline: false,
    lastActivity: '1 hour ago',
    mood: 'great',
    todayGoal: 'Revamp portfolio based on feedback',
    achievements: ['First Steps', 'Design Guru']
  }
];

const mockCoWorkingRooms: CoWorkingRoom[] = [
  {
    id: '1',
    name: 'Morning Grind ☕',
    description: 'Early birds applying together 6-10 AM PST',
    currentMembers: 8,
    maxMembers: 12,
    focus: 'Application Sprint',
    mood: 'focused',
    members: mockMembers.slice(0, 2)
  },
  {
    id: '2',
    name: 'Tech Careers 💻',
    description: 'Software engineers, designers, PMs',
    currentMembers: 15,
    maxMembers: 20,
    focus: 'Tech Industry',
    mood: 'supportive',
    members: mockMembers
  },
  {
    id: '3',
    name: 'Victory Lap 🎉',
    description: 'Celebrating wins and supporting each other',
    currentMembers: 6,
    maxMembers: 10,
    focus: 'Celebration & Support',
    mood: 'celebratory',
    members: mockMembers.slice(1, 3)
  }
];

const mockSupportGroups: SupportGroup[] = [
  {
    id: '1',
    title: 'Overcoming Interview Anxiety',
    description: 'Safe space to practice and build confidence',
    nextSession: '2024-10-28 18:00',
    participants: 12,
    coach: 'Dr. Jennifer Martinez, Career Therapist',
    topics: ['Breathing techniques', 'Confidence building', 'Mock interviews'],
    level: 'beginner'
  },
  {
    id: '2',
    title: 'Dealing with Rejection & Ghosting',
    description: 'Process disappointment and stay motivated',
    nextSession: '2024-10-29 19:00',
    participants: 18,
    coach: 'Michael Thompson, Executive Coach',
    topics: ['Reframing rejection', 'Building resilience', 'Next steps'],
    level: 'intermediate'
  },
  {
    id: '3',
    title: 'Career Pivot Support Circle',
    description: 'For those changing industries or roles',
    nextSession: '2024-10-30 17:30',
    participants: 8,
    coach: 'Lisa Park, Transition Specialist',
    topics: ['Identity shifts', 'Transferable skills', 'New narratives'],
    level: 'advanced'
  }
];

const mockVictoryPosts: VictoryPost[] = [
  {
    id: '1',
    member: mockMembers[0],
    type: 'callback',
    message: 'Just got a callback from Stripe after 47 applications! The persistence is paying off! 🚀',
    timestamp: '2 hours ago',
    reactions: 24,
    comments: 8
  },
  {
    id: '2',
    member: mockMembers[1],
    type: 'interview',
    message: 'Had my first interview in 3 months today. Feeling nervous but proud I made it this far! 💪',
    timestamp: '5 hours ago',
    reactions: 31,
    comments: 12
  },
  {
    id: '3',
    member: mockMembers[2],
    type: 'milestone',
    message: 'Applied to 20 jobs this week! My highest ever. This community keeps me motivated! 🔥',
    timestamp: '1 day ago',
    reactions: 18,
    comments: 6
  }
];

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState<'coworking' | 'buddies' | 'support' | 'victories'>('coworking');
  const [selectedRoom, setSelectedRoom] = useState<CoWorkingRoom | null>(null);
  const [isInRoom, setIsInRoom] = useState(false);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'okay': return 'text-yellow-600 bg-yellow-100';
      case 'struggling': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'great': return '😄';
      case 'good': return '😊';
      case 'okay': return '😐';
      case 'struggling': return '😔';
      default: return '🙂';
    }
  };

  const getRoomMoodIcon = (mood: string) => {
    switch (mood) {
      case 'focused': return '🎯';
      case 'supportive': return '🤗';
      case 'celebratory': return '🎉';
      default: return '💼';
    }
  };

  const joinRoom = (room: CoWorkingRoom) => {
    setSelectedRoom(room);
    setIsInRoom(true);
  };

  const leaveRoom = () => {
    setIsInRoom(false);
    setSelectedRoom(null);
  };

  return (
    <>
      <Head>
        <title>JobSwipe Community Hub™ - End Job Search Loneliness</title>
        <meta name="description" content="Connect with other job seekers, work together, and support each other" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">JobSwipe Community Hub™</h1>
              <p className="text-gray-600">You're not alone in this journey. Connect, support, celebrate together.</p>
              <div className="mt-2 text-sm text-purple-600">
                💜 Solving the loneliness epidemic - 50% of job seekers suffer in isolation
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserGroupIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">2,847</div>
                  <div className="text-sm text-gray-500">Active Members</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrophyIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">143</div>
                  <div className="text-sm text-gray-500">Jobs Landed This Week</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <VideoCameraIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">47</div>
                  <div className="text-sm text-gray-500">Live Co-working Sessions</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <HeartIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-sm text-gray-500">Feel Less Lonely</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'coworking', label: 'Live Co-working', icon: VideoCameraIcon },
                  { key: 'buddies', label: 'Job Search Buddies', icon: UserGroupIcon },
                  { key: 'support', label: 'Support Groups', icon: ChatBubbleLeftRightIcon },
                  { key: 'victories', label: 'Victory Board', icon: TrophyIcon }
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

          {/* Live Co-working Tab */}
          {activeTab === 'coworking' && (
            <div className="space-y-8">
              {!isInRoom ? (
                <>
                  {/* Available Rooms */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Live Co-working Rooms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockCoWorkingRooms.map((room) => (
                        <motion.div
                          key={room.id}
                          whileHover={{ scale: 1.02 }}
                          className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors cursor-pointer"
                          onClick={() => joinRoom(room)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{room.name}</h4>
                            <span className="text-2xl">{getRoomMoodIcon(room.mood)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-500">Focus: {room.focus}</span>
                            <span className="text-sm font-medium text-primary-600">
                              {room.currentMembers}/{room.maxMembers} members
                            </span>
                          </div>
                          <div className="flex -space-x-2 mb-3">
                            {room.members.slice(0, 4).map((member, index) => (
                              <img
                                key={index}
                                src={member.avatar}
                                alt={member.name}
                                className="w-8 h-8 rounded-full border-2 border-white"
                              />
                            ))}
                            {room.members.length > 4 && (
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                                +{room.members.length - 4}
                              </div>
                            )}
                          </div>
                          <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                            Join Room
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* How It Works */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">How Live Co-working Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                          1
                        </div>
                        <h4 className="font-medium text-purple-900 mb-2">Join a Room</h4>
                        <p className="text-sm text-purple-800">Choose a room that matches your focus and energy</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                          2
                        </div>
                        <h4 className="font-medium text-purple-900 mb-2">Work Together</h4>
                        <p className="text-sm text-purple-800">See others applying to jobs in real-time via video</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                          3
                        </div>
                        <h4 className="font-medium text-purple-900 mb-2">Celebrate Wins</h4>
                        <p className="text-sm text-purple-800">Cheer each other on and share victories</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* In Room View */
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedRoom?.name}</h3>
                      <p className="text-gray-600">{selectedRoom?.description}</p>
                    </div>
                    <button
                      onClick={leaveRoom}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Leave Room
                    </button>
                  </div>

                  {/* Video Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {/* Your Video */}
                    <div className="relative bg-gray-900 rounded-lg aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center">
                          <VideoCameraIcon className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-sm">You</div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        🎯 Applying to jobs
                      </div>
                    </div>

                    {/* Other Members */}
                    {selectedRoom?.members.map((member, index) => (
                      <div key={member.id} className="relative bg-gray-900 rounded-lg aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="text-center">
                            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full mx-auto mb-2" />
                            <div className="text-sm">{member.name}</div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {member.todayGoal}
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="text-lg">{getMoodEmoji(member.mood)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Room Chat */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Room Chat</h4>
                    <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
                      <div className="flex items-start space-x-2">
                        <img src={mockMembers[0].avatar} alt="" className="w-6 h-6 rounded-full" />
                        <div>
                          <span className="text-sm font-medium text-gray-900">{mockMembers[0].name}:</span>
                          <span className="text-sm text-gray-700 ml-1">Just submitted to 3 companies! 🚀</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <img src={mockMembers[1].avatar} alt="" className="w-6 h-6 rounded-full" />
                        <div>
                          <span className="text-sm font-medium text-gray-900">{mockMembers[1].name}:</span>
                          <span className="text-sm text-gray-700 ml-1">Nice work! I'm on application #2 today</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Encourage your roommates..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Job Search Buddies Tab */}
          {activeTab === 'buddies' && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Job Search Buddies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockMembers.slice(0, 2).map((buddy) => (
                    <div key={buddy.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="relative">
                          <img src={buddy.avatar} alt={buddy.name} className="w-12 h-12 rounded-full" />
                          {buddy.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{buddy.name}</h4>
                          <p className="text-sm text-gray-600">{buddy.role} • {buddy.location}</p>
                        </div>
                        <div className={`ml-auto px-2 py-1 rounded text-xs ${getMoodColor(buddy.mood)}`}>
                          {getMoodEmoji(buddy.mood)} {buddy.mood}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-900">{buddy.applications}</div>
                          <div className="text-xs text-gray-500">Applications</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{buddy.interviews}</div>
                          <div className="text-xs text-gray-500">Interviews</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{buddy.searchDuration}w</div>
                          <div className="text-xs text-gray-500">Searching</div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="text-sm font-medium text-blue-900">Today's Goal:</div>
                        <div className="text-sm text-blue-800">{buddy.todayGoal}</div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                          💬 Chat
                        </button>
                        <button className="flex-1 border border-primary-600 text-primary-600 py-2 px-3 rounded-lg hover:bg-primary-50 transition-colors text-sm">
                          📞 Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    🤝 Find New Buddy
                  </button>
                  <p className="text-sm text-gray-500 mt-2">AI matches you with 2-3 people in similar situations</p>
                </div>
              </div>

              {/* Buddy Matching Algorithm */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">How Buddy Matching Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                      🎯
                    </div>
                    <div className="text-sm font-medium text-green-900">Same Industry</div>
                    <div className="text-xs text-green-700">Similar roles & skills</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                      📊
                    </div>
                    <div className="text-sm font-medium text-green-900">Similar Progress</div>
                    <div className="text-xs text-green-700">Applications & timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                      🌍
                    </div>
                    <div className="text-sm font-medium text-green-900">Compatible Timezone</div>
                    <div className="text-xs text-green-700">Can check in together</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                      💪
                    </div>
                    <div className="text-sm font-medium text-green-900">Mutual Support</div>
                    <div className="text-xs text-green-700">Accountability & encouragement</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Groups Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Anonymous Support Groups</h3>
                <div className="space-y-6">
                  {mockSupportGroups.map((group) => (
                    <div key={group.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{group.title}</h4>
                          <p className="text-gray-600 mb-3">{group.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>👥 {group.participants} participants</span>
                            <span>🎓 {group.coach}</span>
                            <span className={`px-2 py-1 rounded ${
                              group.level === 'beginner' ? 'bg-green-100 text-green-800' :
                              group.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {group.level}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">Next Session</div>
                          <div className="text-sm text-gray-600">{new Date(group.nextSession).toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">Topics Covered:</div>
                        <div className="flex flex-wrap gap-2">
                          {group.topics.map((topic, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Join Group (Anonymous)
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safe Space Promise */}
              <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">🛡️ Our Safe Space Promise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-900 mb-2">Complete Anonymity</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• First names only (or pseudonyms)</li>
                      <li>• No recording or screenshots</li>
                      <li>• What's shared here, stays here</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900 mb-2">Professional Support</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Licensed therapists and coaches</li>
                      <li>• Evidence-based techniques</li>
                      <li>• Crisis support available 24/7</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Victory Board Tab */}
          {activeTab === 'victories' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">🏆 Community Victory Board</h3>
                <div className="space-y-6">
                  {mockVictoryPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-6 hover:border-primary-500 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <img src={post.member.avatar} alt={post.member.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{post.member.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              post.type === 'offer' ? 'bg-green-100 text-green-800' :
                              post.type === 'interview' ? 'bg-blue-100 text-blue-800' :
                              post.type === 'callback' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.type === 'offer' ? '🎉 JOB OFFER' :
                               post.type === 'interview' ? '📞 INTERVIEW' :
                               post.type === 'callback' ? '☎️ CALLBACK' :
                               '🎯 MILESTONE'}
                            </span>
                            <span className="text-sm text-gray-500">{post.timestamp}</span>
                          </div>
                          <p className="text-gray-800 mb-3">{post.message}</p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                              <HeartIcon className="w-4 h-4" />
                              <span>{post.reactions}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                              <ChatBubbleLeftRightIcon className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors">
                    🎉 Share Your Victory
                  </button>
                </div>
              </div>

              {/* Celebration Stats */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">🎊 This Week's Celebrations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">47</div>
                    <div className="text-sm text-yellow-700">Job Offers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">189</div>
                    <div className="text-sm text-orange-700">Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">312</div>
                    <div className="text-sm text-red-700">Callbacks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1,247</div>
                    <div className="text-sm text-purple-700">Applications</div>
                  </div>
                </div>
                <p className="text-center text-yellow-800 mt-4 font-medium">
                  Every victory inspires others. Your success story could be next! 🌟
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}