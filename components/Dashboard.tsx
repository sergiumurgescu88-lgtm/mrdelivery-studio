import React from 'react';
import { TrendingUp, Users, Eye, Share2, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

const mockData = [
  { name: 'Mon', views: 4000, engagement: 2400 },
  { name: 'Tue', views: 3000, engagement: 1398 },
  { name: 'Wed', views: 2000, engagement: 9800 },
  { name: 'Thu', views: 2780, engagement: 3908 },
  { name: 'Fri', views: 1890, engagement: 4800 },
  { name: 'Sat', views: 2390, engagement: 3800 },
  { name: 'Sun', views: 3490, engagement: 4300 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-studio-900 text-white">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-2">Marketing Overview</h2>
          <p className="text-gray-400">Campaign performance & AI insights for MrDelivery</p>
        </div>
        <div className="flex space-x-3">
            <div className="bg-studio-800 px-4 py-2 rounded-lg border border-studio-700">
                <span className="text-xs text-gray-500 block">Viral Score</span>
                <span className="text-xl font-bold text-green-400">92/100</span>
            </div>
            <div className="bg-studio-800 px-4 py-2 rounded-lg border border-studio-700">
                <span className="text-xs text-gray-500 block">Weekly Videos</span>
                <span className="text-xl font-bold text-studio-accent">24</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard icon={Eye} label="Total Views" value="1.2M" trend="+12%" color="text-blue-400" />
        <StatsCard icon={Users} label="Follower Growth" value="45.2K" trend="+5.4%" color="text-green-400" />
        <StatsCard icon={Share2} label="Shares" value="892K" trend="+22%" color="text-purple-400" />
        <StatsCard icon={Activity} label="Engagement Rate" value="8.4%" trend="-1%" color="text-pink-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-96 mb-8">
        <div className="bg-studio-800 p-6 rounded-2xl border border-studio-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-6">Views Analysis</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff' }} 
                itemStyle={{ color: '#8b5cf6' }}
              />
              <Bar dataKey="views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-studio-800 p-6 rounded-2xl border border-studio-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-6">Engagement Trends</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff' }}
              />
              <Line type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-studio-800 p-6 rounded-xl border border-studio-700 hover:border-studio-600 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg bg-studio-900 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
      </span>
    </div>
    <h4 className="text-gray-400 text-sm font-medium">{label}</h4>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

export default Dashboard;