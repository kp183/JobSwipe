import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  LightBulbIcon,
  CpuChipIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface ATSAnalysis {
  overallScore: number;
  compatibility: 'excellent' | 'good' | 'fair' | 'poor';
  issues: ATSIssue[];
  keywords: KeywordAnalysis;
  formatting: FormattingAnalysis;
  parsing: ParsingAnalysis;
  recommendations: string[];
}

interface ATSIssue {
  id: string;
  type: 'critical' | 'warning' | 'suggestion';
  category: 'keywords' | 'formatting' | 'parsing' | 'content';
  title: string;
  description: string;
  impact: string;
  fix: string;
  before?: string;
  after?: string;
}

interface KeywordAnalysis {
  required: string[];
  missing: string[];
  present: string[];
  density: { [key: string]: number };
  suggestions: string[];
}

interface FormattingAnalysis {
  fileType: string;
  isATSFriendly: boolean;
  issues: string[];
  layout: 'single-column' | 'two-column' | 'complex';
  fonts: string[];
  hasImages: boolean;
  hasGraphics: boolean;
}

interface ParsingAnalysis {
  sections: {
    name: 'found' | 'missing' | 'unclear';
    contact: 'found' | 'missing' | 'unclear';
    experience: 'found' | 'missing' | 'unclear';
    education: 'found' | 'missing' | 'unclear';
    skills: 'found' | 'missing' | 'unclear';
  };
  extractedText: string;
  confidence: number;
}

const mockATSAnalysis: ATSAnalysis = {
  overallScore: 72,
  compatibility: 'fair',
  issues: [
    {
      id: '1',
      type: 'critical',
      category: 'keywords',
      title: 'Missing Critical Keywords',
      description: 'Your resume is missing 5 critical keywords from the job description',
      impact: 'High chance of ATS rejection',
      fix: 'Add these keywords naturally to your experience descriptions',
      before: 'Led development projects using modern frameworks',
      after: 'Led cross-functional development projects using React and Node.js frameworks with agile project management'
    },
    {
      id: '2',
      type: 'critical',
      category: 'formatting',
      title: 'Two-Column Layout Detected',
      description: 'Your resume uses a two-column layout that many ATS systems cannot parse correctly',
      impact: 'ATS may miss 40-60% of your content',
      fix: 'Convert to single-column layout with clear section headers'
    },
    {
      id: '3',
      type: 'warning',
      category: 'parsing',
      title: 'Work Experience Section Unclear',
      description: 'ATS had difficulty identifying your work experience section',
      impact: 'Your experience may not be properly categorized',
      fix: 'Use standard header "Work Experience" or "Professional Experience"'
    },
    {
      id: '4',
      type: 'warning',
      category: 'content',
      title: 'Resume Length Suboptimal',
      description: 'Your 3-page resume may be too long for entry-level positions',
      impact: 'Some ATS systems truncate after 2 pages',
      fix: 'Condense to 1-2 pages by removing older or less relevant experience'
    },
    {
      id: '5',
      type: 'suggestion',
      category: 'keywords',
      title: 'Keyword Density Too Low',
      description: 'Important keywords appear only once, reducing match score',
      impact: 'Lower ranking in ATS scoring',
      fix: 'Naturally repeat key skills 2-3 times throughout resume'
    }
  ],
  keywords: {
    required: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Agile', 'Project Management', 'Team Leadership', 'Problem Solving'],
    missing: ['Agile', 'Project Management', 'Team Leadership', 'Problem Solving', 'Stakeholder Communication'],
    present: ['React', 'Node.js', 'JavaScript'],
    density: {
      'React': 2,
      'Node.js': 1,
      'JavaScript': 3,
      'TypeScript': 0,
      'Agile': 0,
      'Project Management': 0
    },
    suggestions: [
      'Add "Agile methodology" to project descriptions',
      'Include "stakeholder communication" in leadership examples',
      'Mention "cross-functional team leadership" in management roles'
    ]
  },
  formatting: {
    fileType: 'PDF',
    isATSFriendly: false,
    issues: [
      'Two-column layout detected',
      'Custom fonts may not render correctly',
      'Graphics and icons present',
      'Text boxes used for contact information'
    ],
    layout: 'two-column',
    fonts: ['Custom Sans', 'Arial'],
    hasImages: true,
    hasGraphics: true
  },
  parsing: {
    sections: {
      name: 'found',
      contact: 'unclear',
      experience: 'unclear',
      education: 'found',
      skills: 'missing'
    },
    extractedText: 'John Developer\nSoftware Engineer\nExperience:\n- Built web applications\n- Worked with teams\nEducation:\nBS Computer Science',
    confidence: 68
  },
  recommendations: [
    'Convert to single-column layout immediately',
    'Add missing keywords naturally throughout resume',
    'Use standard section headers (Work Experience, Education, Skills)',
    'Remove graphics and use plain text formatting',
    'Increase keyword density for top 5 required skills',
    'Test with multiple ATS systems before applying'
  ]
};

export default function ATSOptimizer() {
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const analyzeResume = async () => {
    if (!selectedFile || !jobDescription) return;
    
    setIsAnalyzing(true);
    
    // Simulate ATS analysis
    setTimeout(() => {
      setAnalysis(mockATSAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-yellow-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return XCircleIcon;
      case 'warning': return ExclamationTriangleIcon;
      case 'suggestion': return LightBulbIcon;
      default: return ExclamationTriangleIcon;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'suggestion': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <Head>
        <title>ATS Dominator™ - Beat the Bots</title>
        <meta name="description" content="Optimize your resume to pass ATS screening and reach human recruiters" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ATS Dominator™</h1>
              <p className="text-gray-600">Beat the bots and get your resume seen by humans</p>
              <div className="mt-2 text-sm text-red-600">
                ⚠️ 75% of resumes are rejected by ATS before humans see them
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!analysis ? (
            /* Upload Section */
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <div className="text-center mb-8">
                  <CpuChipIcon className="mx-auto h-12 w-12 text-primary-600 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Test Your Resume Against Real ATS Systems
                  </h2>
                  <p className="text-gray-600">
                    Upload your resume and job description to see exactly what ATS systems see
                  </p>
                </div>

                <div className="space-y-6">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Your Resume
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                      <DocumentTextIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer text-primary-600 hover:text-primary-700"
                      >
                        Click to upload
                      </label>
                      <span className="text-gray-500"> or drag and drop</span>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                      {selectedFile && (
                        <p className="text-sm text-green-600 mt-2">✓ {selectedFile.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description here to analyze keyword matching..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Analyze Button */}
                  <button
                    onClick={analyzeResume}
                    disabled={!selectedFile || !jobDescription || isAnalyzing}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Resume Against ATS Systems...
                      </div>
                    ) : (
                      'Analyze My Resume'
                    )}
                  </button>
                </div>

                {/* What We Test */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">What We Test Against:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>• Workday ATS</div>
                    <div>• Taleo</div>
                    <div>• Greenhouse</div>
                    <div>• Lever</div>
                    <div>• BambooHR</div>
                    <div>• SmartRecruiters</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Analysis Results */
            <div className="space-y-8">
              {/* Overall Score */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">ATS Compatibility Analysis</h2>
                  <button
                    onClick={() => setAnalysis(null)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Test Another Resume
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </div>
                    <div className="text-sm text-gray-600">ATS Score</div>
                    <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${getScoreBackground(analysis.overallScore)} ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.compatibility.charAt(0).toUpperCase() + analysis.compatibility.slice(1)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      {analysis.overallScore < 75 ? 'LIKELY REJECTED' : 'LIKELY ACCEPTED'}
                    </div>
                    <div className="text-sm text-gray-600">ATS Prediction</div>
                    <div className="mt-2 text-xs text-gray-500">
                      {analysis.overallScore < 75 
                        ? 'Your resume will likely be filtered out before humans see it'
                        : 'Your resume should pass initial ATS screening'
                      }
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {analysis.issues.filter(i => i.type === 'critical').length}
                    </div>
                    <div className="text-sm text-gray-600">Critical Issues</div>
                    <div className="mt-2 text-xs text-gray-500">
                      Must fix to improve ATS score
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues List */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues Found</h3>
                <div className="space-y-4">
                  {analysis.issues.map((issue, index) => {
                    const Icon = getIssueIcon(issue.type);
                    return (
                      <motion.div
                        key={issue.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-lg p-4 ${getIssueColor(issue.type)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{issue.title}</h4>
                              <span className="text-xs uppercase font-medium px-2 py-1 rounded">
                                {issue.type}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{issue.description}</p>
                            <div className="text-sm">
                              <div className="font-medium mb-1">Impact: {issue.impact}</div>
                              <div className="font-medium mb-2">Fix: {issue.fix}</div>
                              {issue.before && issue.after && (
                                <div className="mt-3 p-3 bg-white/50 rounded border">
                                  <div className="text-xs font-medium text-red-600 mb-1">❌ Before:</div>
                                  <div className="text-xs mb-2 font-mono">{issue.before}</div>
                                  <div className="text-xs font-medium text-green-600 mb-1">✅ After:</div>
                                  <div className="text-xs font-mono">{issue.after}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Keyword Analysis */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyword Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-red-900 mb-3">❌ Missing Keywords ({analysis.keywords.missing.length})</h4>
                    <div className="space-y-2">
                      {analysis.keywords.missing.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                          <span className="text-red-800 font-medium">{keyword}</span>
                          <span className="text-xs text-red-600">0 mentions</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-900 mb-3">✅ Present Keywords ({analysis.keywords.present.length})</h4>
                    <div className="space-y-2">
                      {analysis.keywords.present.map((keyword, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                          <span className="text-green-800 font-medium">{keyword}</span>
                          <span className="text-xs text-green-600">
                            {analysis.keywords.density[keyword] || 1} mentions
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-blue-900 mb-3">💡 Keyword Suggestions</h4>
                  <div className="space-y-2">
                    {analysis.keywords.suggestions.map((suggestion, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                        <div className="text-blue-800">{suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ATS Parsing Preview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">What ATS Actually Sees</h3>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    {showComparison ? 'Hide' : 'Show'} Side-by-Side
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  {Object.entries(analysis.parsing.sections).map(([section, status]) => (
                    <div key={section} className="text-center p-3 rounded-lg border">
                      <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                        status === 'found' ? 'bg-green-500' :
                        status === 'unclear' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div className="text-sm font-medium capitalize">{section}</div>
                      <div className={`text-xs ${
                        status === 'found' ? 'text-green-600' :
                        status === 'unclear' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {status}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Extracted Text (Confidence: {analysis.parsing.confidence}%)
                  </div>
                  <div className="text-sm text-gray-700 font-mono whitespace-pre-line">
                    {analysis.parsing.extractedText}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Action Plan</h3>
                <div className="space-y-3">
                  {analysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="text-primary-800">{recommendation}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-900 mb-2">
                    🎯 Estimated Score After Fixes: 94/100
                  </div>
                  <div className="text-green-700 text-sm">
                    Following these recommendations should increase your ATS compatibility to "Excellent" 
                    and significantly improve your chances of reaching human recruiters.
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