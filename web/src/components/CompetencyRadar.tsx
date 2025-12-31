import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface CompetencyData {
  skill: string;
  current: number;
  target: number;
  fullMark: number;
}

interface CompetencyRadarProps {
  className?: string;
}

export default function CompetencyRadar({ className = '' }: CompetencyRadarProps) {
  const competencyData: CompetencyData[] = [
    {
      skill: 'Frontend',
      current: 85,
      target: 90,
      fullMark: 100,
    },
    {
      skill: 'Backend',
      current: 70,
      target: 85,
      fullMark: 100,
    },
    {
      skill: 'Mobile Dev',
      current: 45,
      target: 80,
      fullMark: 100,
    },
    {
      skill: 'DevOps',
      current: 60,
      target: 75,
      fullMark: 100,
    },
    {
      skill: 'AI/ML',
      current: 30,
      target: 70,
      fullMark: 100,
    },
    {
      skill: 'Communication',
      current: 80,
      target: 85,
      fullMark: 100,
    },
    {
      skill: 'Leadership',
      current: 65,
      target: 80,
      fullMark: 100,
    },
    {
      skill: 'Problem Solving',
      current: 90,
      target: 95,
      fullMark: 100,
    },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Competency Radar</h3>
          <p className="text-sm text-gray-600">Technical vs Soft Skills Balance</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Current</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Target</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={competencyData}>
            <PolarGrid 
              stroke="#e5e7eb" 
              strokeWidth={1}
            />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ 
                fontSize: 12, 
                fill: '#6b7280',
                fontWeight: 500
              }}
              className="text-gray-600"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ 
                fontSize: 10, 
                fill: '#9ca3af' 
              }}
              tickCount={6}
            />
            
            {/* Current Skills */}
            <Radar
              name="Current"
              dataKey="current"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
              dot={{ 
                r: 4, 
                fill: '#3b82f6',
                strokeWidth: 2,
                stroke: '#ffffff'
              }}
            />
            
            {/* Target Skills */}
            <Radar
              name="Target"
              dataKey="target"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.05}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ 
                r: 3, 
                fill: '#10b981',
                strokeWidth: 1,
                stroke: '#ffffff'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Technical Skills</h4>
          <div className="space-y-2">
            {competencyData.slice(0, 5).map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between text-sm">
                <span className="text-blue-700">{skill.skill}</span>
                <span className="font-medium text-blue-900">{skill.current}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Soft Skills</h4>
          <div className="space-y-2">
            {competencyData.slice(5).map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between text-sm">
                <span className="text-green-700">{skill.skill}</span>
                <span className="font-medium text-green-900">{skill.current}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Balance Score */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">Skill Balance Score</h4>
            <p className="text-sm text-gray-600">Technical vs Soft Skills harmony</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">8.5/10</div>
            <div className="text-xs text-gray-500">Well Balanced</div>
          </div>
        </div>
      </div>
    </div>
  );
}