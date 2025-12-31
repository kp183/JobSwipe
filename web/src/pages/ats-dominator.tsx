import { useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpIcon,
  EyeIcon,
  CpuChipIcon,
  LightBulbIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface ATSAnalysis {
  overallScore: number;
  issues: ATSIssue[];
  keywords: KeywordAnalysis;
  formatting: FormattingCheck;
  recommendations: string[];
  beforeAfter: {
    before: string;
    after: string;
  };
}

interface ATSIssue {
  type: 'critical' | 'warning' | 'suggestion';
  category: 'keywords' | 'formatting' | 'content' | 'length';
  title: string;
  description: string;
  impact: string;
  fix: string;
}

interface KeywordAnalysis {
  required: string[];
  missing: string[];
  present: string[];
  density: { [key: string]: number };
  suggestions: { original: string; improved: string; }[];
}

interface FormattingCheck {
  fileType: 'good' | 'warning' | 'bad';
  layout: 'good' | 'warning' | 'bad';
  fonts: 'good' | 'warning' | 'bad';
  sections: 'good' | 'warning' | 'bad';
  length: 'good' | 'warning' | 'bad';
}

const mockATSAnalysis: ATSAnalysis = {
  overallScore: 72,
  issues: [
    {
      type: 'critical',
      category: 'keywords',
      title: 'Missing Critical Keywords',
      description: 'Your resume is missing 5 keywords that appear in 90% of similar job postings',
      impact: 'ATS will likely filter out your application',
      fix: 'Add: "project management", "stakeholder communication", "agile methodology", "cross-functional", "data analysis"'
    },
    {
      type: 'critical',
      category: 'formatting',
      title: 'Two-Column Layout Detected',
      description: 'ATS systems struggle to parse two-column layouts correctly',
      impact: 'Your experience section may not be read properly',
      fix: 'Convert to single-column layout with clear section headers'
    },
    {
      type: 'warning',
      category: 'content',
      title: 'Weak Action Verbs',
      description: 'Using generic verbs like "responsible for" instead of impact-driven language',
      impact: 'Lower keyword matching and weaker impression',
      fix: 'Replace with: "Led", "Implemented", "Optimized", "Delivered", "Achieved"'
    },
    {
      type: 'warning',
      category: 'length',
      title: 'Resume Too Long',
      description: 'Your 3-page resume exceeds recommended length for your experience level',
      impact: 'ATS may truncate content or recruiters may lose interest',
      fix: 'Condense to 2 pages by removing older or less relevant experience'
    },
    {
      type: 'suggestion',
      category: 'formatting',
      title: 'Inconsistent Date Formatting',
      description: 'Mix of "Jan 2020" and "January 2020" formats',
      impact: 'Minor parsing confusion for some ATS systems',
      fix: 'Use consistent format: "January 2020 - March 2022"'
    }
  ],
  keywords: {
    required: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST API', 'Git', 'Agile', 'Project Management'],
    missing: ['project management', 'stakeholder communication', 'agile methodology', 'cross-functional', 'data analysis'],
    present: ['JavaScript', 'React', 'Node.js'],
    density: {
      'JavaScript': 0.8,
      'React': 1.2,
      'Node.js': 0.6,
      'project management': 0.0,
      'agile': 0.0
    },
    suggestions: [
      {
        original: 'Worked on various projects using JavaScript',
        improved: 'Led cross-functional teams in developing JavaScript applications with focus on stakeholder communication and agile project management'
      },
      {
        original: 'Built web applications',
        improved: 'Architected and delivered scalable web applications using React and Node.js, implementing data analysis for performance optimization'
      }
    ]
  },
  formatting: {
    fileType: 'warning',
    layout: 'bad',
    fonts: 'good',
    sections: 'good',
    length: 'warning'
  },
  recommendations: [
    'Convert to single-column layout for better ATS parsing',
    'Add missing keywords naturally throughout your experience descriptions',
    'Reduce resume length from 3 pages to 2 pages',
    'Use stronger action verbs to start each bullet point',
    'Ensure consistent date formatting throughout',
    'Add a skills section with exact keyword matches',
    'Include metrics and numbers to demonstrate impact'
  ],
  beforeAfter: {
    before: 'Responsible for managing projects and working with teams to deliver software solutions.',
    after: 'Led cross-functional teams of 8+ developers in agile project management, delivering 15+ software solutions while maintaining stakeholder communication and conducting data analysis to optimize performance by 40%.'
  }
};

const atsSystemLogos = [
  { name: 'Workday', logo: '🏢' },
  { name: 'Taleo', logo: '🎯' },
  { name: 'Greenhouse', logo: '🌱' },
  { name: 'Lever', logo: '⚡' },
  { name: 'BambooHR', logo: '🎋' },
  { name: 'iCIMS', logo: '💼' }
];

export default function ATSDominator() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'results' | 'simulator'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setActiveTab('results');
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysis(mockATSAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircleIcon className="w-5 h-5 text-red-600" />;
      case 'warning': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      case 'suggestion': return <LightBulbIcon className="w-5 h-5 text-blue-600" />;
      default: return <ExclamationTriangleIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getFormatIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'warning': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      case 'bad': return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default: return <ExclamationTriangleIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <>
      <Head>
        <title>ATS Dominator™ - Beat Applicant Tracking Systems</title>
        <meta name="description" content="Test your resume against real ATS systems and fix issues before applying" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ATS Dominator™</h1>
              <p className="text-gray-600">Beat the robots. Get your resume seen by humans.</p>
              <div className="mt-2 text-sm text-red-600">
                ⚠️ 75% of resumes are rejected by ATS before humans see them
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
                  { key: 'upload', label: 'Upload & Test', icon: DocumentTextIcon },
                  { key: 'results', label: 'Analysis Results', icon: CpuChipIcon },
                  { key: 'simulator', label: 'ATS Simulator', icon: EyeIcon }
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

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="text-center">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-primary-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Your Resume Against ATS</h3>
                  <p className="text-gray-600 mb-6">
                    Upload your resume and we'll test it against 6 major ATS systems used by 90% of companies
                  </p>

                  {/* ATS Systems */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {atsSystemLogos.map((system) => (
                      <div key={system.name} className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-2xl mr-2">{system.logo}</span>
                        <span className="text-sm font-medium text-gray-700">{system.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Upload Area */}
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-primary-500 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    {uploadedFile ? (
                      <div className="text-center">
                        <CheckCircleIcon className="mx-auto h-8 w-8 text-green-600 mb-2" />
                        <div className="font-medium text-gray-900">{uploadedFile.name}</div>
                        <div className="text-sm text-gray-500">Ready to analyze</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ArrowUpIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <div className="font-medium text-gray-900">Drop your resume here</div>
                        <div className="text-sm text-gray-500">or click to browse</div>
                        <div className="text-xs text-gray-400 mt-2">Supports PDF, DOC, DOCX</div>
                      </div>
                    )}
                  </div>

                  {uploadedFile && (
                    <button
                      onClick={startAnalysis}
                      className="mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      🚀 Start ATS Analysis
                    </button>
                  )}
                </div>

                {/* What We Check */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">What We Analyze:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Keyword Matching</div>
                        <div className="text-sm text-gray-600">Required vs. present keywords</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Format Compatibility</div>
                        <div className="text-sm text-gray-600">Layout, fonts, and structure</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Content Parsing</div>
                        <div className="text-sm text-gray-600">How ATS reads your content</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Optimization Tips</div>
                        <div className="text-sm text-gray-600">Specific fixes to improve score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="space-y-8">
              {isAnalyzing ? (
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Resume...</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>✅ Testing against Workday ATS</div>
                      <div>✅ Checking keyword density</div>
                      <div>🔄 Analyzing format compatibility</div>
                      <div className="text-gray-400">⏳ Generating optimization recommendations</div>
                    </div>
                  </div>
                </div>
              ) : analysis ? (
                <>
                  {/* Score Overview */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility Score</h3>
                        <p className="text-gray-600">How likely your resume is to pass ATS screening</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getScoreColor(analysis.overallScore)}`}>
                          {analysis.overallScore}/100
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {analysis.overallScore >= 90 ? 'Excellent' : 
                           analysis.overallScore >= 70 ? 'Needs Work' : 'Critical Issues'}
                        </div>
                      </div>
                    </div>

                    {/* Format Checks */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getFormatIcon(analysis.formatting.fileType)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">File Type</div>
                        <div className="text-xs text-gray-500 capitalize">{analysis.formatting.fileType}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getFormatIcon(analysis.formatting.layout)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Layout</div>
                        <div className="text-xs text-gray-500 capitalize">{analysis.formatting.layout}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getFormatIcon(analysis.formatting.fonts)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Fonts</div>
                        <div className="text-xs text-gray-500 capitalize">{analysis.formatting.fonts}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getFormatIcon(analysis.formatting.sections)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Sections</div>
                        <div className="text-xs text-gray-500 capitalize">{analysis.formatting.sections}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getFormatIcon(analysis.formatting.length)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Length</div>
                        <div className="text-xs text-gray-500 capitalize">{analysis.formatting.length}</div>
                      </div>
                    </div>
                  </div>

                  {/* Issues */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues Found</h3>
                    <div className="space-y-4">
                      {analysis.issues.map((issue, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{issue.title}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  issue.type === 'critical' ? 'bg-red-100 text-red-800' :
                                  issue.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {issue.type.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
                              <div className="bg-red-50 rounded p-3 mb-2">
                                <div className="text-sm font-medium text-red-900">Impact:</div>
                                <div className="text-sm text-red-800">{issue.impact}</div>
                              </div>
                              <div className="bg-green-50 rounded p-3">
                                <div className="text-sm font-medium text-green-900">How to Fix:</div>
                                <div className="text-sm text-green-800">{issue.fix}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keyword Analysis */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Analysis</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-green-900 mb-2">✅ Keywords Found</h4>
                        <div className="space-y-1">
                          {analysis.keywords.present.map((keyword, index) => (
                            <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2 mb-1">
                              {keyword} ({analysis.keywords.density[keyword]}x)
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-red-900 mb-2">❌ Missing Keywords</h4>
                        <div className="space-y-1">
                          {analysis.keywords.missing.map((keyword, index) => (
                            <span key={index} className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm mr-2 mb-1">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Before/After Examples */}
                    <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Smart Keyword Integration</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-red-900 mb-2">❌ Before (Weak)</div>
                          <div className="bg-white p-3 rounded border border-red-200 text-sm text-gray-700">
                            {analysis.beforeAfter.before}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-900 mb-2">✅ After (Optimized)</div>
                          <div className="bg-white p-3 rounded border border-green-200 text-sm text-gray-700">
                            {analysis.beforeAfter.after}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Plan */}
                  <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">🎯 Your Action Plan</h3>
                    <div className="space-y-3">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="text-primary-800">{rec}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex space-x-4">
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Download Optimized Resume
                      </button>
                      <button className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                        Get Professional Review ($49)
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Yet</h3>
                  <p className="text-gray-600">Upload your resume to see detailed ATS analysis</p>
                </div>
              )}
            </div>
          )}

          {/* ATS Simulator Tab */}
          {activeTab === 'simulator' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ATS Simulator - See What Robots See</h3>
                <p className="text-gray-600 mb-6">
                  This shows exactly how ATS systems parse and read your resume
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Resume */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">👁️ What You See</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 min-h-[400px]">
                      <div className="text-center text-gray-500 mt-20">
                        Upload a resume to see the comparison
                      </div>
                    </div>
                  </div>

                  {/* ATS View */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">🤖 What ATS Sees</h4>
                    <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200 min-h-[400px]">
                      <div className="text-center text-red-600 mt-20">
                        ATS parsing results will appear here
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-900">Common ATS Parsing Issues:</div>
                      <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                        <li>• Two-column layouts get scrambled</li>
                        <li>• Graphics and images are ignored</li>
                        <li>• Tables break section parsing</li>
                        <li>• Headers and footers are often missed</li>
                        <li>• Creative fonts become unreadable</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}