import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { formatRelativeTime } from '../utils/dateUtils';
import { 
  BellIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  TrashIcon,
  BriefcaseIcon,
  CalendarIcon,
  HeartIcon,
  UserIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'job_match' | 'application_update' | 'interview' | 'message' | 'achievement' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  metadata?: any;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'interview',
    title: 'Interview Reminder',
    message: 'Your interview with TechCorp Inc. is scheduled for tomorrow at 2:00 PM',
    timestamp: '2024-10-25T10:00:00Z',
    read: false,
    actionUrl: '/applications',
    actionText: 'View Details',
    priority: 'high',
    metadata: { company: 'TechCorp Inc.', time: '2:00 PM' }
  },
  {
    id: '2',
    type: 'job_match',
    title: 'New Job Match',
    message: 'We found 3 new jobs that match your preferences with 90%+ compatibility',
    timestamp: '2024-10-25T08:30:00Z',
    read: false,
    actionUrl: '/',
    actionText: 'View Jobs',
    priority: 'medium',
    metadata: { count: 3, matchScore: 90 }
  },
  {
    id: '3',
    type: 'application_update',
    title: 'Application Status Update',
    message: 'Your application for Full Stack Engineer at StartupXYZ has been reviewed',
    timestamp: '2024-10-24T16:45:00Z',
    read: true,
    actionUrl: '/applications',
    actionText: 'Check Status',
    priority: 'medium',
    metadata: { company: 'StartupXYZ', status: 'reviewed' }
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'Congratulations! You\'ve reached a 5-day application streak',
    timestamp: '2024-10-24T12:00:00Z',
    read: true,
    priority: 'low',
    metadata: { achievement: 'streak', days: 5 }
  },
  {
    id: '5',
    type: 'message',
    title: 'Message from Recruiter',
    message: 'Sarah from CloudScale Solutions sent you a message about the DevOps Engineer position',
    timestamp: '2024-10-23T14:20:00Z',
    read: false,
    actionUrl: '/messages',
    actionText: 'Read Message',
    priority: 'high',
    metadata: { sender: 'Sarah', company: 'CloudScale Solutions' }
  },
  {
    id: '6',
    type: 'job_match',
    title: 'Perfect Match Alert',
    message: 'Found a 98% match: Senior React Developer at InnovateTech',
    timestamp: '2024-10-23T09:15:00Z',
    read: true,
    actionUrl: '/',
    actionText: 'View Job',
    priority: 'high',
    metadata: { matchScore: 98, company: 'InnovateTech' }
  },
  {
    id: '7',
    type: 'system',
    title: 'Profile Optimization Tip',
    message: 'Add 2 more skills to increase your match rate by 15%',
    timestamp: '2024-10-22T11:30:00Z',
    read: true,
    actionUrl: '/profile',
    actionText: 'Update Profile',
    priority: 'low',
    metadata: { improvement: '15%' }
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'job_match' | 'application_update' | 'interview'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job_match': return HeartIcon;
      case 'application_update': return BriefcaseIcon;
      case 'interview': return CalendarIcon;
      case 'message': return UserIcon;
      case 'achievement': return StarIcon;
      case 'system': return BellIcon;
      default: return BellIcon;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-600';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-600';
    
    switch (type) {
      case 'job_match': return 'bg-green-100 text-green-600';
      case 'application_update': return 'bg-blue-100 text-blue-600';
      case 'interview': return 'bg-purple-100 text-purple-600';
      case 'message': return 'bg-indigo-100 text-indigo-600';
      case 'achievement': return 'bg-yellow-100 text-yellow-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimestamp = (timestamp: string) => {
    return formatRelativeTime(timestamp);
  };

  return (
    <>
      <Head>
        <title>Notifications - JobSwipe</title>
        <meta name="description" content="Stay updated with your job search notifications" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Mark All Read
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'all', label: 'All', count: notifications.length },
                  { key: 'unread', label: 'Unread', count: unreadCount },
                  { key: 'job_match', label: 'Job Matches', count: notifications.filter(n => n.type === 'job_match').length },
                  { key: 'application_update', label: 'Applications', count: notifications.filter(n => n.type === 'application_update').length },
                  { key: 'interview', label: 'Interviews', count: notifications.filter(n => n.type === 'interview').length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      filter === tab.key
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md ${
                    !notification.read ? 'border-l-4 border-l-primary-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`p-2 rounded-full ${getNotificationColor(notification.type, notification.priority)}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            )}
                            {notification.priority === 'high' && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                Urgent
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'} mb-2`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {formatTimestamp(notification.timestamp)}
                            </div>
                            {notification.actionText && (
                              <button className="text-primary-600 hover:text-primary-700 font-medium">
                                {notification.actionText} →
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-gray-600 rounded"
                              title="Mark as read"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded"
                            title="Delete notification"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === 'all' 
                    ? "You're all caught up! No notifications to show."
                    : `No ${filter.replace('_', ' ')} notifications found.`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            <p className="text-gray-600 mb-4">
              Manage how you receive notifications about job matches, applications, and more.
            </p>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Manage Preferences
            </button>
          </div>
        </div>
      </div>
    </>
  );
}