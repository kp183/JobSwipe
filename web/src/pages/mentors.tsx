import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  currency: string;
  location: string;
  expertise: string[];
  experience: string;
  languages: string[];
  availability: string;
  verified: boolean;
  responseTime: string;
  sessionCount: number;
  bio: string;
  specialties: string[];
}

const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    title: 'Senior Software Engineer',
    company: 'Google',
    avatar: '/api/placeholder/64/64',
    rating: 4.9,
    reviewCount: 127,
    pricePerSession: 2500,
    currency: 'INR',
    location: 'Bangalore, India',
    expertise: ['React', 'Node.js', 'System Design', 'Career Growth'],
    experience: '8+ years',
    languages: ['English', 'Hindi', 'Kannada'],
    availability: 'Weekends',
    verified: true,
    responseTime: '< 2 hours',
    sessionCount: 340,
    bio: 'Passionate about helping developers transition into FAANG companies. Specialized in system design and technical interviews.',
    specialties: ['FAANG Interview Prep', 'System Design', 'Career Transition']
  },
  {
    id: '2',
    name: 'Arjun Patel',
    title: 'Tech Lead',
    company: 'Zomato',
    avatar: '/api/placeholder/64/64',
    rating: 4.8,
    reviewCount: 89,
    pricePerSession: 1800,
    currency: 'INR',
    location: 'Gurugram, India',
    expertise: ['React Native', 'Mobile Architecture', 'Team Leadership'],
    experience: '6+ years',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: 'Evenings',
    verified: true,
    responseTime: '< 4 hours',
    sessionCount: 156,
    bio: 'Leading mobile engineering at Zomato. Expert in React Native and scaling mobile applications.',
    specialties: ['Mobile Development', 'React Native', 'Startup Culture']
  },
  {
    id: '3',
    name: 'Sneha Reddy',
    title: 'Principal Engineer',
    company: 'Swiggy',
    avatar: '/api/placeholder/64/64',
    rating: 4.9,
    reviewCount: 203,
    pricePerSession: 3000,
    currency: 'INR',
    location: 'Hyderabad, India',
    expertise: ['Microservices', 'AWS', 'DevOps', 'Scalability'],
    experience: '10+ years',
    languages: ['English', 'Hindi', 'Telugu'],
    availability: 'Flexible',
    verified: true,
    responseTime: '< 1 hour',
    sessionCount: 445,
    bio: 'Building scalable systems at Swiggy. Passionate about mentoring engineers in system architecture and cloud technologies.',
    specialties: ['System Architecture', 'Cloud Computing', 'Performance Optimization']
  },
  {
    id: '4',
    name: 'Rahul Kumar',
    title: 'Senior Product Manager',
    company: 'CRED',
    avatar: '/api/placeholder/64/64',
    rating: 4.7,
    reviewCount: 156,
    pricePerSession: 2200,
    currency: 'INR',
    location: 'Mumbai, India',
    expertise: ['Product Strategy', 'User Research', 'Growth Hacking'],
    experience: '7+ years',
    languages: ['English', 'Hindi'],
    availability: 'Weekdays',
    verified: true,
    responseTime: '< 3 hours',
    sessionCount: 234,
    bio: 'Product leader at CRED with experience in fintech and consumer products. Helping engineers transition to product roles.',
    specialties: ['Product Management', 'Career Transition', 'Fintech']
  }
];

export default function Mentors() {
  const [selectedExpertise, setSelectedExpertise] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const allExpertise = Array.from(new Set(mockMentors.flatMap(m => m.expertise)));

  const filteredMentors = mockMentors.filter(mentor => {
    const expertiseMatch = !selectedExpertise || mentor.expertise.includes(selectedExpertise);
    const priceMatch = !priceRange || 
      (priceRange === 'low' && mentor.pricePerSession <= 2000) ||
      (priceRange === 'medium' && mentor.pricePerSession > 2000 && mentor.pricePerSession <= 2500) ||
      (priceRange === 'high' && mentor.pricePerSession > 2500);
    
    return expertiseMatch && priceMatch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <Head>
        <title>Mentors - JobSwipe</title>
        <meta name="description" content="Connect with industry experts from top companies" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Expert Mentors</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with industry experts from top Indian tech companies. 
                Get personalized guidance for your career growth.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Expertise</option>
                {allExpertise.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="low">₹0 - ₹2,000</option>
                <option value="medium">₹2,000 - ₹2,500</option>
                <option value="high">₹2,500+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <CheckBadgeIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Verified Experts</div>
              <div className="text-sm text-gray-600">All mentors are verified professionals</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <StarIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">4.8+ Rating</div>
              <div className="text-sm text-gray-600">Average mentor rating</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <UserGroupIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">1000+ Sessions</div>
              <div className="text-sm text-gray-600">Completed successfully</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <ClockIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">&lt; 2 Hours</div>
              <div className="text-sm text-gray-600">Average response time</div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMentor(mentor)}
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {mentor.verified && (
                        <CheckBadgeIcon className="w-5 h-5 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{mentor.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="flex items-center">
                      {renderStars(mentor.rating)}
                    </div>
                    <span className="font-semibold text-gray-900">{mentor.rating}</span>
                    <span className="text-sm text-gray-600">({mentor.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Details */}
                <div className="px-6 pb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price per session:</span>
                      <span className="font-semibold text-gray-900 flex items-center">
                        <CurrencyRupeeIcon className="w-4 h-4" />
                        {mentor.pricePerSession.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium text-gray-900">{mentor.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Response time:</span>
                      <span className="font-medium text-green-600">{mentor.responseTime}</span>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{mentor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {mentor.location}
                    </div>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition-colors">
                      Book Session
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No mentors found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters to see more mentors.
              </p>
            </div>
          )}
        </div>

        {/* Mentor Detail Modal */}
        {selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedMentor.avatar}
                      alt={selectedMentor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h2>
                      <p className="text-gray-600">{selectedMentor.title} at {selectedMentor.company}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          {renderStars(selectedMentor.rating)}
                        </div>
                        <span className="font-semibold">{selectedMentor.rating}</span>
                        <span className="text-sm text-gray-600">({selectedMentor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600">{selectedMentor.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Session Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">₹{selectedMentor.pricePerSession.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">60 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sessions completed:</span>
                          <span className="font-medium">{selectedMentor.sessionCount}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Availability</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Schedule:</span>
                          <span className="font-medium">{selectedMentor.availability}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Response time:</span>
                          <span className="font-medium text-green-600">{selectedMentor.responseTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Languages:</span>
                          <span className="font-medium">{selectedMentor.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setSelectedMentor(null)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                    <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                      <CalendarIcon className="w-5 h-5" />
                      <span>Book Session</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}