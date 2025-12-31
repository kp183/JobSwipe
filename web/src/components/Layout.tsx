import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  BriefcaseIcon, 
  UserIcon, 
  Cog6ToothIcon,
  BellIcon,
  MagnifyingGlassIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  BriefcaseIcon as BriefcaseIconSolid, 
  UserIcon as UserIconSolid, 
  Cog6ToothIcon as Cog6ToothIconSolid 
} from '@heroicons/react/24/solid';
import QuickNav from './QuickNav';

import WelcomeModal from './WelcomeModal';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications] = useState(3); // Mock notification count

  const navigation = [
    { 
      name: 'Discover', 
      href: '/', 
      icon: HomeIcon, 
      iconSolid: HomeIconSolid,
      description: 'Swipe jobs'
    },
    { 
      name: 'Search', 
      href: '/search', 
      icon: MagnifyingGlassIcon, 
      iconSolid: MagnifyingGlassIcon,
      description: 'Find jobs'
    },
    { 
      name: 'Applications', 
      href: '/applications', 
      icon: BriefcaseIcon, 
      iconSolid: BriefcaseIconSolid,
      description: 'Track progress'
    },
    { 
      name: 'Profile', 
      href: '/profile', 
      icon: UserIcon, 
      iconSolid: UserIconSolid,
      description: 'Your info'
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Cog6ToothIcon, 
      iconSolid: Cog6ToothIconSolid,
      description: 'Preferences'
    },
  ];

  // AI Tools for solving job search problems
  const aiTools = [
    { 
      name: 'Application Pulse™', 
      href: '/application-pulse', 
      icon: '📊',
      description: 'Real-time application tracking with read receipts'
    },
    { 
      name: 'ATS Dominator™', 
      href: '/ats-dominator', 
      icon: '🤖',
      description: 'Beat applicant tracking systems'
    },
    { 
      name: 'Interview Zen™', 
      href: '/interview-zen', 
      icon: '🧘‍♀️',
      description: 'AI interview practice & anxiety relief'
    },
    { 
      name: 'Negotiation Ninja™', 
      href: '/negotiation-ninja', 
      icon: '🥷',
      description: 'Master salary negotiations'
    },
    { 
      name: 'JobSwipe Wellness™', 
      href: '/jobswipe-wellness', 
      icon: '💚',
      description: 'Mental health & motivation support'
    },
  ];

  // Revolutionary Features - Never Built Before
  const revolutionaryFeatures = [
    { 
      name: 'Community Hub™', 
      href: '/community-hub', 
      icon: '🤝',
      description: 'End job search loneliness - live co-working & support'
    },
    { 
      name: 'Referral Network™', 
      href: '/referral-network', 
      icon: '🎯',
      description: 'Get referrals with zero connections - AI finds your path'
    },
    { 
      name: 'Identity Coach™', 
      href: '/identity-transition-coach', 
      icon: '🧠',
      description: 'Navigate career identity crisis with AI therapy'
    },
    { 
      name: 'Authentic Portfolio™', 
      href: '/authentic-portfolio', 
      icon: '🎨',
      description: 'Skills-first portfolio beyond perfect resumes'
    },
    { 
      name: 'Experience Builder™', 
      href: '/experience-builder', 
      icon: '💼',
      description: 'Solve "need experience to get experience" paradox'
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <HeartIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">JobSwipe</h1>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Link href="/notifications" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <BellIcon className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Link>

              {/* Profile Avatar */}
              <Link href="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <img 
                  src={user?.avatar || 'https://via.placeholder.com/32x32/6366f1/ffffff?text=U'} 
                  alt={user?.name || 'User'}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-20 lg:pb-4 lg:bg-white lg:border-r lg:border-gray-200">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = isActive(item.href) ? item.iconSolid : item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Revolutionary Features Section */}
            <div className="mt-8 px-4">
              <h3 className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-3">
                🌟 REVOLUTIONARY - Never Built Before
              </h3>
              <div className="space-y-1">
                {revolutionaryFeatures.map((feature) => (
                  <Link
                    key={feature.name}
                    href={feature.href}
                    className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive(feature.href)
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border-l-2 border-red-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{feature.icon}</span>
                    <div>
                      <div className="font-medium text-xs">{feature.name}</div>
                      <div className="text-xs text-gray-500 leading-tight">{feature.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Tools Section */}
            <div className="mt-8 px-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                🚀 AI Problem Solvers
              </h3>
              <div className="space-y-1">
                {aiTools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive(tool.href)
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-l-2 border-purple-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{tool.icon}</span>
                    <div>
                      <div className="font-medium text-xs">{tool.name}</div>
                      <div className="text-xs text-gray-500 leading-tight">{tool.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 px-4">
              <Link href="/dashboard" className="block bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white hover:from-primary-600 hover:to-primary-700 transition-all">
                <h3 className="font-semibold mb-2">Your Progress</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Jobs Viewed</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applications</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interviews</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
                <div className="mt-3 text-xs opacity-75">View Dashboard →</div>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4">
          {navigation.map((item) => {
            const Icon = isActive(item.href) ? item.iconSolid : item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 text-xs transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile padding for bottom nav */}
      <div className="lg:hidden h-16"></div>

      {/* Quick Navigation for Testing */}
      <QuickNav />



      {/* Welcome Modal for New Users */}
      <WelcomeModal />
    </div>
  );
}