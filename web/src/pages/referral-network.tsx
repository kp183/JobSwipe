import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Connection {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  relationship: 'direct' | 'second-degree' | 'third-degree' | 'alumni';
  connectionPath?: string[];
  mutualConnections: number;
  responseRate: number;
  canIntroduce: boolean;
  commonInterests: string[];
}

const mockConnections: Connection[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://via.placeholder.com/40x40/6366f1/ffffff?text=SC',
    title: 'Senior Engineering Manager',
    company: 'Google',
    relationship: 'direct',
    mutualConnections: 12,
    responseRate: 85,
    canIntroduce: true,
    commonInterests: ['React', 'Machine Learning', 'Hiking']
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    avatar: 'https://via.placeholder.com/40x40/10b981/ffffff?text=MR',
    title: 'Product Manager',
    company: 'Meta',
    relationship: 'second-degree',
    connectionPath: ['Jennifer Kim', 'Mike Rodriguez'],
    mutualConnections: 8,
    responseRate: 72,
    canIntroduce: true,
    commonInterests: ['Product Strategy', 'Basketball']
  }
];

export default function ReferralNetwork() {
  const [activeTab, setActiveTab] = useState<'network' | 'companies' | 'outreach'>('network');

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'direct': return 'text-green-600 bg-green-100';
      case 'second-degree': return 'text-blue-600 bg-blue-100';
      case 'alumni': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Head>
        <title>Instant Referral Network Builder™</title>
        <meta name="description" content="Get referrals with zero connections" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Instant Referral Network Builder™</h1>
            <p className="text-gray-600">Get referrals with zero connections - AI finds your path to any company</p>
            <div className="mt-2 text-sm text-blue-600">
              🎯 80% of jobs filled through referrals - but most people have zero insider connections
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserGroupIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">247</div>
                  <div className="text-sm text-gray-500">Direct Connections</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <LinkIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">1,847</div>
                  <div className="text-sm text-gray-500">2nd Degree Connections</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <AcademicCapIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">423</div>
                  <div className="text-sm text-gray-500">Alumni Network</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <StarIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">78%</div>
                  <div className="text-sm text-gray-500">Response Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Network Map</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockConnections.map((connection) => (
                <motion.div
                  key={connection.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={connection.avatar} alt={connection.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{connection.name}</h4>
                      <p className="text-sm text-gray-600">{connection.title}</p>
                      <p className="text-sm text-gray-500">{connection.company}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getRelationshipColor(connection.relationship)}`}>
                      {connection.relationship}
                    </div>
                  </div>

                  {connection.connectionPath && (
                    <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                      <div className="font-medium text-blue-900">Path:</div>
                      <div className="text-blue-800">You → {connection.connectionPath.join(' → ')}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <div className="text-gray-500">Mutual</div>
                      <div className="font-medium">{connection.mutualConnections}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Response Rate</div>
                      <div className="font-medium text-green-600">{connection.responseRate}%</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Common Interests:</div>
                    <div className="flex flex-wrap gap-1">
                      {connection.commonInterests.slice(0, 2).map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    💬 Request Intro
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">🤖 AI Network Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Best Path to Google</h4>
                <p className="text-sm text-blue-800">Sarah Chen (direct) → Engineering Manager</p>
                <div className="text-xs text-blue-600 mt-1">85% response rate</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Strongest Alumni Network</h4>
                <p className="text-sm text-blue-800">UC Berkeley: 23 connections at top companies</p>
                <div className="text-xs text-blue-600 mt-1">91% average response rate</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Untapped Opportunity</h4>
                <p className="text-sm text-blue-800">47 second-degree connections at Meta</p>
                <div className="text-xs text-blue-600 mt-1">Request introductions through 8 mutual friends</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}