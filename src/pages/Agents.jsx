import React from 'react';
import { Rocket, BarChart3, Target, AlertTriangle, Heart } from 'lucide-react';

export default function AIModelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-300 text-sm font-semibold mb-6">
            <div className="w-3.5 h-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="5" x2="5" y2="19"></line>
                <circle cx="6.5" cy="6.5" r="2.5"></circle>
                <circle cx="17.5" cy="17.5" r="2.5"></circle>
              </svg>
            </div>
            <span>AI-Powered Evaluation System</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            AI Startup <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Evaluation Models</span>
          </h1>
          
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Five specialized AI models working together to analyze, evaluate, and score startup ideas with precision and comprehensive insights.
          </p>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Models</span>
          </h2>
          <p className="text-lg text-slate-400">
            Each model plays a critical role in the evaluation pipeline
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Model 1 */}
          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Rocket className="text-white" size={28} />
            </div>
            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-lg mb-3">
              Model 1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Idea Generator Model</h3>
            <p className="text-slate-400 leading-relaxed">
              Produces the first startup idea draft. This model creates innovative and comprehensive startup concepts from initial prompts.
            </p>
          </div>

          {/* Model 2 */}
          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="text-white" size={28} />
            </div>
            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-lg mb-3">
              Model 2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Market Research Agent Model</h3>
            <p className="text-slate-400 leading-relaxed">
              Analyzes TAM (Total Addressable Market), identifies market trends, calculates growth rates, and segments user demographics for strategic insights.
            </p>
          </div>

          {/* Model 3 */}
          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="text-white" size={28} />
            </div>
            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-lg mb-3">
              Model 3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Competition Analyzer Model</h3>
            <p className="text-slate-400 leading-relaxed">
              Evaluates competitors in the market space, identifies gaps and opportunities, and determines key differentiation strategies.
            </p>
          </div>

          {/* Model 4 */}
          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle className="text-white" size={28} />
            </div>
            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-lg mb-3">
              Model 4
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Risk Analyzer Model</h3>
            <p className="text-slate-400 leading-relaxed">
              Assesses technical risk factors, market risk exposure, and execution challenges to provide comprehensive risk evaluation.
            </p>
          </div>
        </div>

        {/* Model 5 - Referee */}
        <div className="max-w-3xl mx-auto">
          <div className="group bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="text-white" size={28} />
            </div>
            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-semibold rounded-lg mb-3">
              Model 5
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Referee Model (Final Judge)</h3>
            <p className="text-slate-400 leading-relaxed mb-5">
              Scores all 4 agents on innovation, feasibility, clarity, and market potential to deliver the final verdict.
            </p>
            
            {/* Returns Section */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Returns:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-slate-300">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Individual scores per criterion</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Detailed justification for each score</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}