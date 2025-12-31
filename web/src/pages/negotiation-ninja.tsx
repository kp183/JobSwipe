import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
  MicrophoneIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface SalaryData {
  role: string;
  location: string;
  experience: number;
  percentile25: number;
  median: number;
  percentile75: number;
  percentile90: number;
  yourTarget: { min: number; max: number };
  marketTrend: 'up' | 'down' | 'stable';
  demandLevel: 'low' | 'medium' | 'high';
}

interface NegotiationScript {
  id: string;
  scenario: string;
  recruiterLine: string;
  badResponse: string;
  goodResponse: string;
  explanation: string;
  tips: string[];
}

interface OfferComparison {
  company: string;
  baseSalary: number;
  bonus: number;
  equity: number;
  benefits: number;
  totalComp: number;
  risk: 'low' | 'medium' | 'high';
  pros: string[];
  cons: string[];
}

const mockSalaryData: SalaryData = {
  role: 'Senior Software Engineer',
  location: 'San Francisco, CA',
  experience: 5,
  percentile25: 140000,
  median: 165000,
  percentile75: 195000,
  percentile90: 230000,
  yourTarget: { min: 170000, max: 185000 },
  marketTrend: 'up',
  demandLevel: 'high'
};

const negotiationScripts: NegotiationScript[] = [
  {
    id: '1',
    scenario: 'Recruiter asks for salary expectations',
    recruiterLine: '"What salary are you looking for?"',
    badResponse: '"I\'m hoping for around $100-120k"',
    goodResponse: '"I\'m more focused on finding the right fit than salary at this stage. I\'m seeking opportunities for growth and believe this role aligns with my goals. What\'s the salary range for this position?"',
    explanation: 'Never anchor yourself to a low number. Always try to get them to reveal their range first.',
    tips: [
      'Deflect the question back to them',
      'Show interest in the role, not just money',
      'Make them give you their range first',
      'This prevents you from anchoring too low'
    ]
  },
  {
    id: '2',
    scenario: 'They give you a lowball offer',
    recruiterLine: '"We can offer you $90,000 for this position"',
    badResponse: '"That seems low, can you do better?"',
    goodResponse: '"Thank you for the offer. I\'m excited about the opportunity. Based on my research and experience, the market rate for this role is typically $105-115k. Given my 5 years of experience and the value I can bring, I was hoping we could discuss something in the $110k range."',
    explanation: 'Use market data to justify your counter. Be specific and confident.',
    tips: [
      'Thank them first (shows professionalism)',
      'Use market data to support your ask',
      'Be specific with your counter-offer',
      'Highlight your unique value'
    ]
  },
  {
    id: '3',
    scenario: 'They say budget is fixed',
    recruiterLine: '"Unfortunately, our budget for this role is fixed at $95k"',
    badResponse: '"Okay, I guess I\'ll take it"',
    goodResponse: '"I understand budget constraints. Are there other components we could explore? Perhaps additional vacation days, professional development budget, flexible work arrangements, or a performance review in 6 months to discuss salary adjustment?"',
    explanation: 'If salary is fixed, negotiate other valuable benefits or future opportunities.',
    tips: [
      'Show understanding of their constraints',
      'Suggest alternative compensation',
      'Ask for future review opportunities',
      'Get creative with benefits'
    ]
  }
];

const mockOffers: OfferComparison[] = [
  {
    company: 'Google',
    baseSalary: 150000,
    bonus: 25000,
    equity: 40000,
    benefits: 15000,
    totalComp: 230000,
    risk: 'low',
    pros: ['Stable company', 'Great benefits', 'Brand recognition', 'Career growth'],
    cons: ['Bureaucratic', 'High pressure', 'Long hours']
  },
  {
    company: 'Hot Startup',
    baseSalary: 160000,
    bonus: 20000,
    equity: 80000,
    benefits: 12000,
    totalComp: 272000,
    risk: 'high',
    pros: ['High equity upside', 'Fast growth', 'Learning opportunities', 'Impact'],
    cons: ['Equity may be worthless', 'Job security risk', 'Long hours', 'Stress']
  }
];

export default function NegotiationNinja() {
  const [activeTab, setActiveTab] = useState<'salary' | 'scripts' | 'offers' | 'practice'>('salary');
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceStep, setPracticeStep] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const startPractice = (scriptId: string) => {
    setSelectedScript(scriptId);
    setIsPracticing(true);
    setPracticeStep(0);
  };

  return (
    <>
      <Head>
        <title>Negotiation Ninja™ - Master Salary Negotiations</title>
        <meta name="description" content="Master salary negotiations and earn $80-100k more over your career" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Negotiation Ninja™</h1>
              <p className="text-gray-600">Master salary negotiations and earn $80-100k more over your career</p>
              <div className="mt-2 text-sm text-green-600">
                💰 Effective negotiation increases lifetime earnings by $80,000-$100,000
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
                  { key: 'salary', label: 'Market Data', icon: ChartBarIcon },
                  { key: 'scripts', label: 'Negotiation Scripts', icon: DocumentTextIcon },
                  { key: 'offers', label: 'Offer Comparison', icon: TrophyIcon },
                  { key: 'practice', label: 'Live Practice', icon: MicrophoneIcon }
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

          {/* Salary Data Tab */}
          {activeTab === 'salary' && (
            <div className="space-y-8">
              {/* Market Overview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Market Rate Analysis</h3>
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDemandColor(mockSalaryData.demandLevel)}`}>
                      {mockSalaryData.demandLevel.toUpperCase()} DEMAND
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-1">{getTrendIcon(mockSalaryData.marketTrend)}</span>
                      Market trending {mockSalaryData.marketTrend}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{formatCurrency(mockSalaryData.percentile25)}</div>
                    <div className="text-sm text-gray-500">25th Percentile</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(mockSalaryData.median)}</div>
                    <div className="text-sm text-blue-600">Median (50th)</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(mockSalaryData.percentile75)}</div>
                    <div className="text-sm text-green-600">75th Percentile</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(mockSalaryData.percentile90)}</div>
                    <div className="text-sm text-purple-600">90th Percentile</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold text-primary-900 mb-2">🎯 Your Target Range</h4>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {formatCurrency(mockSalaryData.yourTarget.min)} - {formatCurrency(mockSalaryData.yourTarget.max)}
                  </div>
                  <p className="text-primary-700 text-sm">
                    Based on your {mockSalaryData.experience} years of experience in {mockSalaryData.location}
                  </p>
                </div>
              </div>

              {/* Negotiation Strategy */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🥷 Your Negotiation Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Opening Ask</h4>
                    <div className="text-2xl font-bold text-green-600 mb-2">{formatCurrency(185000)}</div>
                    <p className="text-sm text-green-700">Start high to anchor the negotiation</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Acceptable Range</h4>
                    <div className="text-lg font-bold text-blue-600 mb-2">
                      {formatCurrency(170000)} - {formatCurrency(180000)}
                    </div>
                    <p className="text-sm text-blue-700">Your realistic target zone</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900 mb-2">Walk Away Point</h4>
                    <div className="text-2xl font-bold text-red-600 mb-2">{formatCurrency(160000)}</div>
                    <p className="text-sm text-red-700">Below this, consider other offers</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scripts Tab */}
          {activeTab === 'scripts' && (
            <div className="space-y-6">
              {negotiationScripts.map((script, index) => (
                <motion.div
                  key={script.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{script.scenario}</h3>
                      <div className="bg-gray-100 rounded-lg p-3 mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-1">Recruiter says:</div>
                        <div className="text-gray-900 italic">{script.recruiterLine}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => startPractice(script.id)}
                      className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <PlayIcon className="w-4 h-4 mr-1" />
                      Practice
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                        <h4 className="font-medium text-red-900">❌ Don't Say This</h4>
                      </div>
                      <p className="text-sm text-red-800 italic mb-2">{script.badResponse}</p>
                      <p className="text-xs text-red-700">This anchors you to a low salary</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-medium text-green-900">✅ Say This Instead</h4>
                      </div>
                      <p className="text-sm text-green-800 italic mb-2">{script.goodResponse}</p>
                      <p className="text-xs text-green-700">{script.explanation}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
                    <ul className="space-y-1">
                      {script.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-blue-800 flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Offer Comparison Tab */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Compare Job Offers</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockOffers.map((offer, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{offer.company}</h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          offer.risk === 'low' ? 'bg-green-100 text-green-800' :
                          offer.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {offer.risk.toUpperCase()} RISK
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Salary</span>
                          <span className="font-medium">{formatCurrency(offer.baseSalary)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bonus</span>
                          <span className="font-medium">{formatCurrency(offer.bonus)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Equity (annual)</span>
                          <span className="font-medium">{formatCurrency(offer.equity)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Benefits</span>
                          <span className="font-medium">{formatCurrency(offer.benefits)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-3">
                          <span className="font-semibold text-gray-900">Total Comp</span>
                          <span className="font-bold text-primary-600 text-lg">{formatCurrency(offer.totalComp)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-green-900 mb-2">✅ Pros</h5>
                          <ul className="space-y-1">
                            {offer.pros.map((pro, proIndex) => (
                              <li key={proIndex} className="text-sm text-green-800">
                                • {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-900 mb-2">❌ Cons</h5>
                          <ul className="space-y-1">
                            {offer.cons.map((con, conIndex) => (
                              <li key={conIndex} className="text-sm text-red-800">
                                • {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <h4 className="font-medium text-primary-900 mb-2">🏆 Recommendation</h4>
                  <p className="text-primary-800 text-sm">
                    The Google offer provides {formatCurrency(mockOffers[0].totalComp - mockOffers[1].totalComp)} less total compensation 
                    but offers significantly lower risk and better long-term career stability. 
                    The startup offer has higher upside potential but comes with execution risk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🎭 Live Negotiation Practice</h3>
                
                {!isPracticing ? (
                  <div className="text-center">
                    <MicrophoneIcon className="mx-auto h-12 w-12 text-primary-600 mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Practice with AI Recruiter</h4>
                    <p className="text-gray-600 mb-6">
                      Have a realistic negotiation conversation with our AI recruiter. 
                      Get real-time feedback on your responses.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {negotiationScripts.map((script) => (
                        <button
                          key={script.id}
                          onClick={() => startPractice(script.id)}
                          className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900">{script.scenario}</div>
                          <div className="text-sm text-gray-600 mt-1">{script.recruiterLine}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MicrophoneIcon className="w-8 h-8 text-primary-600" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">AI Recruiter is Speaking...</h4>
                      <p className="text-gray-600">
                        Listen carefully and respond when prompted
                      </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">AI Recruiter:</div>
                      <div className="text-gray-900">
                        {negotiationScripts.find(s => s.id === selectedScript)?.recruiterLine}
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                        🎤 Start Recording Your Response
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        AI will analyze your tone, confidence, and negotiation technique
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsPracticing(false);
                        setSelectedScript(null);
                      }}
                      className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      End Practice Session
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}