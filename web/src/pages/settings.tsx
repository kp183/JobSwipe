import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
  GlobeAltIcon,
  EyeSlashIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  jobMatches: boolean;
  applicationUpdates: boolean;
  interviewReminders: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'companies-only';
  showSalaryExpectations: boolean;
  showLocation: boolean;
  allowCompanyMessages: boolean;
  showOnlineStatus: boolean;
}

interface PreferenceSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  currency: string;
  jobAlertFrequency: 'instant' | 'daily' | 'weekly';
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'privacy' | 'preferences' | 'account' | 'billing'>('notifications');
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    jobMatches: true,
    applicationUpdates: true,
    interviewReminders: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'companies-only',
    showSalaryExpectations: true,
    showLocation: true,
    allowCompanyMessages: true,
    showOnlineStatus: false
  });

  const [preferences, setPreferences] = useState<PreferenceSettings>({
    theme: 'system',
    language: 'en',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    jobAlertFrequency: 'daily'
  });

  const tabs = [
    { key: 'notifications', label: 'Notifications', icon: BellIcon },
    { key: 'privacy', label: 'Privacy & Security', icon: ShieldCheckIcon },
    { key: 'preferences', label: 'Preferences', icon: ComputerDesktopIcon },
    { key: 'account', label: 'Account', icon: UserIcon },
    { key: 'billing', label: 'Billing', icon: CreditCardIcon }
  ];

  const updateNotification = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updatePrivacy = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const updatePreferences = (key: keyof PreferenceSettings, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Head>
        <title>Settings - JobSwipe</title>
        <meta name="description" content="Manage your account settings and preferences" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <nav className="bg-white rounded-lg shadow-sm p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.key
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Settings</h2>
                      <p className="text-gray-600">Choose how you want to be notified about job opportunities and updates.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Email & Push Notifications */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Methods</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="font-medium text-gray-900">Email Notifications</div>
                                <div className="text-sm text-gray-500">Receive notifications via email</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications.emailNotifications}
                                onChange={(e) => updateNotification('emailNotifications', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="font-medium text-gray-900">Push Notifications</div>
                                <div className="text-sm text-gray-500">Receive push notifications on your devices</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications.pushNotifications}
                                onChange={(e) => updateNotification('pushNotifications', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Notification Types */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">What to notify me about</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'jobMatches', label: 'New Job Matches', description: 'When new jobs match your preferences' },
                            { key: 'applicationUpdates', label: 'Application Updates', description: 'Status changes on your applications' },
                            { key: 'interviewReminders', label: 'Interview Reminders', description: 'Reminders about upcoming interviews' },
                            { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Weekly summary of your job search activity' },
                            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Tips, features, and product updates' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{item.label}</div>
                                <div className="text-sm text-gray-500">{item.description}</div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={notifications[item.key as keyof NotificationSettings] as boolean}
                                  onChange={(e) => updateNotification(item.key as keyof NotificationSettings, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy & Security Tab */}
                {activeTab === 'privacy' && (
                  <div className="p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy & Security</h2>
                      <p className="text-gray-600">Control who can see your information and how it's used.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Profile Visibility */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                        <div className="space-y-3">
                          {[
                            { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
                            { value: 'companies-only', label: 'Companies Only', description: 'Only verified companies can view your profile' },
                            { value: 'private', label: 'Private', description: 'Your profile is hidden from search results' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-start cursor-pointer">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value={option.value}
                                checked={privacy.profileVisibility === option.value}
                                onChange={(e) => updatePrivacy('profileVisibility', e.target.value)}
                                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                              />
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">{option.label}</div>
                                <div className="text-sm text-gray-500">{option.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Information Sharing */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Information Sharing</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'showSalaryExpectations', label: 'Show Salary Expectations', description: 'Display your expected salary range to companies' },
                            { key: 'showLocation', label: 'Show Location', description: 'Display your current location on your profile' },
                            { key: 'allowCompanyMessages', label: 'Allow Company Messages', description: 'Let companies send you direct messages' },
                            { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Display when you were last active' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{item.label}</div>
                                <div className="text-sm text-gray-500">{item.description}</div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={privacy[item.key as keyof PrivacySettings] as boolean}
                                  onChange={(e) => updatePrivacy(item.key as keyof PrivacySettings, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Security Actions */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                        <div className="space-y-3">
                          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center">
                              <LockClosedIcon className="w-5 h-5 text-gray-400 mr-3" />
                              <div className="text-left">
                                <div className="font-medium text-gray-900">Change Password</div>
                                <div className="text-sm text-gray-500">Update your account password</div>
                              </div>
                            </div>
                            <div className="text-primary-600">Change</div>
                          </button>

                          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center">
                              <ShieldCheckIcon className="w-5 h-5 text-gray-400 mr-3" />
                              <div className="text-left">
                                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                                <div className="text-sm text-gray-500">Add an extra layer of security</div>
                              </div>
                            </div>
                            <div className="text-primary-600">Enable</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Preferences</h2>
                      <p className="text-gray-600">Customize your JobSwipe experience.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Appearance */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
                        <div className="space-y-3">
                          {[
                            { value: 'light', label: 'Light', icon: SunIcon },
                            { value: 'dark', label: 'Dark', icon: MoonIcon },
                            { value: 'system', label: 'System', icon: ComputerDesktopIcon }
                          ].map((option) => {
                            const Icon = option.icon;
                            return (
                              <label key={option.value} className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name="theme"
                                  value={option.value}
                                  checked={preferences.theme === option.value}
                                  onChange={(e) => updatePreferences('theme', e.target.value)}
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                />
                                <Icon className="ml-3 mr-2 h-5 w-5 text-gray-400" />
                                <span className="font-medium text-gray-900">{option.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Localization */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Localization</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <select
                              value={preferences.language}
                              onChange={(e) => updatePreferences('language', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="en">English</option>
                              <option value="es">Español</option>
                              <option value="fr">Français</option>
                              <option value="de">Deutsch</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <select
                              value={preferences.currency}
                              onChange={(e) => updatePreferences('currency', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="CAD">CAD (C$)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Job Alerts */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Job Alerts</h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Frequency</label>
                          <select
                            value={preferences.jobAlertFrequency}
                            onChange={(e) => updatePreferences('jobAlertFrequency', e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="instant">Instant</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Tab */}
                {activeTab === 'account' && (
                  <div className="p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Settings</h2>
                      <p className="text-gray-600">Manage your account information and data.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Account Information */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Email:</span>
                              <span className="ml-2 font-medium">john.doe@example.com</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Member since:</span>
                              <span className="ml-2 font-medium">October 2024</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Account type:</span>
                              <span className="ml-2 font-medium">Free</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Profile completion:</span>
                              <span className="ml-2 font-medium">85%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Data Management */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                        <div className="space-y-3">
                          <button className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="text-left">
                              <div className="font-medium text-gray-900">Download Your Data</div>
                              <div className="text-sm text-gray-500">Get a copy of all your JobSwipe data</div>
                            </div>
                            <div className="text-primary-600">Download</div>
                          </button>

                          <button className="flex items-center justify-between w-full p-4 border border-red-200 rounded-lg hover:bg-red-50">
                            <div className="text-left">
                              <div className="font-medium text-red-900">Delete Account</div>
                              <div className="text-sm text-red-600">Permanently delete your account and all data</div>
                            </div>
                            <div className="text-red-600">Delete</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div className="p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Billing & Subscription</h2>
                      <p className="text-gray-600">Manage your subscription and billing information.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Current Plan */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
                        <div className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900">Free Plan</h4>
                              <p className="text-gray-600">Basic job search features</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">$0</div>
                              <div className="text-sm text-gray-500">per month</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Up to 10 job applications per month
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Basic AI resume generation
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Standard job matching
                            </div>
                          </div>

                          <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                            Upgrade to Pro
                          </button>
                        </div>
                      </div>

                      {/* Upgrade Options */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Upgrade Options</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Pro Plan</h4>
                            <div className="text-3xl font-bold text-gray-900 mb-4">$19<span className="text-lg text-gray-500">/month</span></div>
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Unlimited job applications
                              </li>
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Advanced AI features
                              </li>
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Priority job matching
                              </li>
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Interview preparation tools
                              </li>
                            </ul>
                            <button className="w-full border border-primary-600 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors">
                              Choose Pro
                            </button>
                          </div>

                          <div className="border border-primary-200 rounded-lg p-6 bg-primary-50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">Enterprise</h4>
                              <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded-full">Popular</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-4">$49<span className="text-lg text-gray-500">/month</span></div>
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Everything in Pro
                              </li>
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Personal career coach
                              </li>
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Direct company connections
                              </li>
                              <li className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Salary negotiation support
                              </li>
                            </ul>
                            <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                              Choose Enterprise
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}