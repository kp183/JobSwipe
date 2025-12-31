import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
  PlusIcon,
  XMarkIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

interface OnboardingData {
  role: string;
  experience: string;
  skills: string[];
  location: string;
  remote: boolean;
  salaryRange: { min: number; max: number };
  jobTypes: string[];
  interests: string[];
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    role: '',
    experience: '',
    skills: [],
    location: '',
    remote: false,
    salaryRange: { min: 50000, max: 150000 },
    jobTypes: [],
    interests: []
  });

  const steps = [
    { title: 'What do you do?', subtitle: 'Tell us about your role' },
    { title: 'Experience Level', subtitle: 'How experienced are you?' },
    { title: 'Your Skills', subtitle: 'What technologies do you know?' },
    { title: 'Location & Remote', subtitle: 'Where do you want to work?' },
    { title: 'Salary Expectations', subtitle: 'What are you looking for?' },
    { title: 'Job Preferences', subtitle: 'What type of work interests you?' }
  ];

  const roles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Mobile Developer', 'DevOps Engineer', 'Data Scientist',
    'Product Manager', 'UI/UX Designer', 'QA Engineer'
  ];

  const experienceLevels = [
    { id: 'entry', label: 'Entry Level', desc: '0-2 years' },
    { id: 'junior', label: 'Junior', desc: '2-4 years' },
    { id: 'mid', label: 'Mid Level', desc: '4-7 years' },
    { id: 'senior', label: 'Senior', desc: '7+ years' },
    { id: 'lead', label: 'Lead/Principal', desc: '10+ years' }
  ];

  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
    'Java', 'C++', 'Go', 'Rust', 'PHP',
    'Vue.js', 'Angular', 'Django', 'Flask', 'Express',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker',
    'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git'
  ];

  const jobTypes = [
    { id: 'full-time', label: 'Full Time', icon: BriefcaseIcon },
    { id: 'part-time', label: 'Part Time', icon: BriefcaseIcon },
    { id: 'contract', label: 'Contract', icon: BriefcaseIcon },
    { id: 'freelance', label: 'Freelance', icon: BriefcaseIcon },
    { id: 'internship', label: 'Internship', icon: AcademicCapIcon }
  ];

  const interests = [
    'Startup Environment', 'Large Corporation', 'Remote First',
    'Cutting-edge Technology', 'Social Impact', 'High Growth',
    'Work-Life Balance', 'Learning & Development', 'Team Leadership'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Save onboarding data
    const user = JSON.parse(localStorage.getItem('jobswipe-user') || '{}');
    localStorage.setItem('jobswipe-user', JSON.stringify({
      ...user,
      hasCompletedOnboarding: true,
      profile: data
    }));
    
    // Redirect to main app
    window.location.href = '/';
  };

  const toggleSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleJobType = (type: string) => {
    setData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const toggleInterest = (interest: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.role !== '';
      case 1: return data.experience !== '';
      case 2: return data.skills.length > 0;
      case 3: return data.location !== '';
      case 4: return true; // Salary always has default values
      case 5: return data.jobTypes.length > 0;
      default: return true;
    }
  };

  return (
    <>
      <Head>
        <title>Welcome to JobSwipe - Let's Get Started</title>
        <meta name="description" content="Complete your profile to get personalized job recommendations" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-50">
        {/* Progress Bar */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold text-gray-900">Complete Your Profile</h1>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* Step Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              {/* Step Content */}
              <div className="mb-8">
                {/* Step 0: Role */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => setData(prev => ({ ...prev, role }))}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          data.role === role
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{role}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 1: Experience */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    {experienceLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setData(prev => ({ ...prev, experience: level.id }))}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          data.experience === level.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{level.label}</div>
                            <div className="text-sm text-gray-600">{level.desc}</div>
                          </div>
                          {data.experience === level.id && (
                            <CheckIcon className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2: Skills */}
                {currentStep === 2 && (
                  <div>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-4">Select all technologies you're comfortable with:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularSkills.map((skill) => (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                              data.skills.includes(skill)
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {skill}
                            {data.skills.includes(skill) && (
                              <XMarkIcon className="w-4 h-4 inline ml-1" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    {data.skills.length > 0 && (
                      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                        <h4 className="font-medium text-primary-900 mb-2">Selected Skills ({data.skills.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-primary-600 text-white rounded text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Location */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPinIcon className="w-4 h-4 inline mr-1" />
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        value={data.location}
                        onChange={(e) => setData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., San Francisco, CA or New York, NY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remote"
                        checked={data.remote}
                        onChange={(e) => setData(prev => ({ ...prev, remote: e.target.checked }))}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
                        I'm open to remote work opportunities
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 4: Salary */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        <CurrencyDollarIcon className="w-4 h-4 inline mr-1" />
                        Expected Salary Range (USD)
                      </label>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                          <input
                            type="range"
                            min="30000"
                            max="300000"
                            step="5000"
                            value={data.salaryRange.min}
                            onChange={(e) => setData(prev => ({
                              ...prev,
                              salaryRange: { ...prev.salaryRange, min: parseInt(e.target.value) }
                            }))}
                            className="w-full"
                          />
                          <div className="text-center font-medium text-primary-600">
                            ${data.salaryRange.min.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                          <input
                            type="range"
                            min="50000"
                            max="500000"
                            step="5000"
                            value={data.salaryRange.max}
                            onChange={(e) => setData(prev => ({
                              ...prev,
                              salaryRange: { ...prev.salaryRange, max: parseInt(e.target.value) }
                            }))}
                            className="w-full"
                          />
                          <div className="text-center font-medium text-primary-600">
                            ${data.salaryRange.max.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-gray-900">
                          ${data.salaryRange.min.toLocaleString()} - ${data.salaryRange.max.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Your expected salary range</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Job Types & Interests */}
                {currentStep === 5 && (
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Job Types (select all that interest you)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {jobTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.id}
                              onClick={() => toggleJobType(type.id)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                data.jobTypes.includes(type.id)
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Icon className="w-5 h-5 mx-auto mb-2 text-gray-600" />
                              <div className="text-sm font-medium">{type.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">What interests you most?</h4>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`px-3 py-2 rounded-full text-sm transition-all ${
                              data.interests.includes(interest)
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-1" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                    canProceed()
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}