import React, { useState } from 'react';
import { TrendingUp, Users, Rocket, DollarSign, BarChart3, PieChart, Activity, Award, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('30days');

  // Dynamic data based on time range
  const dataByRange = {
    '7days': {
      totalIdeas: 89,
      ideasGrowth: 15.2,
      businessesInitiated: 16,
      businessGrowth: 14.3,
      investorMatches: 28,
      matchGrowth: 18.5,
      totalFunding: 0.6,
      fundingGrowth: 25.0,
      weeklyData: [
        { week: 'Day 1-2', ideas: 22, businesses: 3 },
        { week: 'Day 3-4', ideas: 25, businesses: 5 },
        { week: 'Day 5-6', ideas: 20, businesses: 4 },
        { week: 'Day 7', ideas: 22, businesses: 4 }
      ],
      recentBusinesses: [
        { name: 'AI Health Diagnostics', category: 'HealthTech', funding: '$150K', date: '2 days ago', status: 'Active' },
        { name: 'Smart Payment Gateway', category: 'FinTech', funding: '$200K', date: '5 days ago', status: 'Active' },
        { name: 'EduLearn Platform', category: 'EdTech', funding: '$120K', date: '7 days ago', status: 'Active' }
      ]
    },
    '30days': {
      totalIdeas: 324,
      ideasGrowth: 12.5,
      businessesInitiated: 47,
      businessGrowth: 8.3,
      investorMatches: 89,
      matchGrowth: 15.7,
      totalFunding: 2.4,
      fundingGrowth: 22.1,
      weeklyData: [
        { week: 'Week 1', ideas: 72, businesses: 8 },
        { week: 'Week 2', ideas: 85, businesses: 12 },
        { week: 'Week 3', ideas: 78, businesses: 11 },
        { week: 'Week 4', ideas: 89, businesses: 16 }
      ],
      recentBusinesses: [
        { name: 'AI Health Diagnostics', category: 'HealthTech', funding: '$150K', date: '2 days ago', status: 'Active' },
        { name: 'Smart Payment Gateway', category: 'FinTech', funding: '$200K', date: '5 days ago', status: 'Active' },
        { name: 'EduLearn Platform', category: 'EdTech', funding: '$120K', date: '1 week ago', status: 'Active' },
        { name: 'Green Energy Manager', category: 'CleanTech', funding: '$180K', date: '1 week ago', status: 'Active' },
        { name: 'Fashion Marketplace', category: 'E-commerce', funding: '$90K', date: '2 weeks ago', status: 'Active' }
      ]
    },
    '90days': {
      totalIdeas: 892,
      ideasGrowth: 18.7,
      businessesInitiated: 124,
      businessGrowth: 12.9,
      investorMatches: 248,
      matchGrowth: 21.3,
      totalFunding: 6.8,
      fundingGrowth: 28.4,
      weeklyData: [
        { week: 'Month 1', ideas: 245, businesses: 32 },
        { week: 'Month 2', ideas: 298, businesses: 41 },
        { week: 'Month 3', ideas: 349, businesses: 51 }
      ],
      recentBusinesses: [
        { name: 'AI Health Diagnostics', category: 'HealthTech', funding: '$150K', date: '2 days ago', status: 'Active' },
        { name: 'Smart Payment Gateway', category: 'FinTech', funding: '$200K', date: '5 days ago', status: 'Active' },
        { name: 'EduLearn Platform', category: 'EdTech', funding: '$120K', date: '1 week ago', status: 'Active' },
        { name: 'Green Energy Manager', category: 'CleanTech', funding: '$180K', date: '2 weeks ago', status: 'Active' },
        { name: 'Fashion Marketplace', category: 'E-commerce', funding: '$90K', date: '3 weeks ago', status: 'Active' },
        { name: 'Remote Team Hub', category: 'SaaS', funding: '$220K', date: '1 month ago', status: 'Active' },
        { name: 'Mental Wellness App', category: 'HealthTech', funding: '$95K', date: '1 month ago', status: 'Active' }
      ]
    },
    'year': {
      totalIdeas: 3847,
      ideasGrowth: 24.6,
      businessesInitiated: 512,
      businessGrowth: 19.8,
      investorMatches: 1024,
      matchGrowth: 31.2,
      totalFunding: 28.5,
      fundingGrowth: 35.7,
      weeklyData: [
        { week: 'Q1', ideas: 842, businesses: 98 },
        { week: 'Q2', ideas: 956, businesses: 124 },
        { week: 'Q3', ideas: 1018, businesses: 142 },
        { week: 'Q4', ideas: 1031, businesses: 148 }
      ],
      recentBusinesses: [
        { name: 'AI Health Diagnostics', category: 'HealthTech', funding: '$150K', date: '2 days ago', status: 'Active' },
        { name: 'Smart Payment Gateway', category: 'FinTech', funding: '$200K', date: '5 days ago', status: 'Active' },
        { name: 'EduLearn Platform', category: 'EdTech', funding: '$120K', date: '1 week ago', status: 'Active' },
        { name: 'Green Energy Manager', category: 'CleanTech', funding: '$180K', date: '2 weeks ago', status: 'Active' },
        { name: 'Fashion Marketplace', category: 'E-commerce', funding: '$90K', date: '3 weeks ago', status: 'Active' },
        { name: 'Remote Team Hub', category: 'SaaS', funding: '$220K', date: '1 month ago', status: 'Active' },
        { name: 'Mental Wellness App', category: 'HealthTech', funding: '$95K', date: '2 months ago', status: 'Active' },
        { name: 'NFT Art Platform', category: 'Web3', funding: '$310K', date: '3 months ago', status: 'Active' }
      ]
    }
  };

  const stats = dataByRange[timeRange];

  const categoryData = [
    { name: 'HealthTech', count: 68, color: 'bg-purple-500' },
    { name: 'FinTech', count: 52, color: 'bg-pink-500' },
    { name: 'E-commerce', count: 45, color: 'bg-orange-500' },
    { name: 'SaaS', count: 41, color: 'bg-blue-500' },
    { name: 'EdTech', count: 38, color: 'bg-emerald-500' },
    { name: 'CleanTech', count: 32, color: 'bg-teal-500' },
    { name: 'Others', count: 48, color: 'bg-slate-500' }
  ];

  const weeklyData = stats.weeklyData;
  const recentBusinesses = stats.recentBusinesses;

  const maxIdeas = Math.max(...weeklyData.map(d => d.ideas));
  const maxBusinesses = Math.max(...weeklyData.map(d => d.businesses));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Reports</span>
            </h1>
            <p className="text-lg text-slate-400">
              Track startup ideas, businesses initiated, and funding trends
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2">
            {['7days', '30days', '90days', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  timeRange === range
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {range === '7days' ? 'Last 7 Days' : 
                 range === '30days' ? 'Last 30 Days' :
                 range === '90days' ? 'Last 90 Days' : 
                 'This Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Ideas Analyzed */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Activity className="text-purple-400" size={24} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                stats.ideasGrowth > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {stats.ideasGrowth > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stats.ideasGrowth}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.totalIdeas}</div>
            <div className="text-sm text-slate-400">Ideas Analyzed</div>
          </div>

          {/* Businesses Initiated */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Rocket className="text-pink-400" size={24} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                stats.businessGrowth > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {stats.businessGrowth > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stats.businessGrowth}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.businessesInitiated}</div>
            <div className="text-sm text-slate-400">Businesses Initiated</div>
          </div>

          {/* Investor Matches */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Users className="text-orange-400" size={24} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                stats.matchGrowth > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {stats.matchGrowth > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stats.matchGrowth}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stats.investorMatches}</div>
            <div className="text-sm text-slate-400">Investor Matches</div>
          </div>

          {/* Total Funding */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="text-emerald-400" size={24} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                stats.fundingGrowth > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {stats.fundingGrowth > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stats.fundingGrowth}%
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">${stats.totalFunding}M</div>
            <div className="text-sm text-slate-400">Funding Facilitated</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Weekly Activity Chart */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-purple-400" size={24} />
              <h3 className="text-xl font-bold text-white">Weekly Activity</h3>
            </div>
            <div className="space-y-4">
              {weeklyData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-slate-300 font-semibold">{data.week}</span>
                    <div className="flex gap-4">
                      <span className="text-purple-300">{data.ideas} ideas</span>
                      <span className="text-pink-300">{data.businesses} businesses</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-900/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${(data.ideas / maxIdeas) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-slate-900/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-500"
                        style={{ width: `${(data.businesses / maxBusinesses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="text-pink-400" size={24} />
              <h3 className="text-xl font-bold text-white">Ideas by Category</h3>
            </div>
            <div className="space-y-3">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-slate-300">{category.name}</span>
                      <span className="text-sm text-slate-400">{category.count}</span>
                    </div>
                    <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${category.color} transition-all duration-500`}
                        style={{ width: `${(category.count / 324) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Businesses Table */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-orange-400" size={24} />
            <h3 className="text-xl font-bold text-white">Recently Initiated Businesses</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Business Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Funding</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Initiated</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBusinesses.map((business, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                          {business.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">{business.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                        {business.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">{business.funding}</td>
                    <td className="py-4 px-4 text-slate-400 text-sm">{business.date}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold">
                        {business.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}