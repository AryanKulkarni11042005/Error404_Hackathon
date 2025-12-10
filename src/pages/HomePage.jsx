import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, Rocket, TrendingUp, Users, Crown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950">
     
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-300 text-sm font-semibold mb-6">
              <Crown size={14} className="text-yellow-400" />
              <span>Battle-Test Your Startup Ideas with AI</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Transform Ideas Into
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                Fundable Ventures
              </span>
            </h2>

            <p className="text-xl text-purple-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              Five AI agents compete to analyze your startup. Get deep insights on market potential, risks, competition — then connect with investors who matter.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">

              <button 
                onClick={() => navigate("/agents")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm"
              >
                <Brain size={16} className="text-blue-300" />
                <span className="text-blue-200 text-sm font-semibold">5 AI Agents</span>
              </button>

              <button 
                onClick={() => navigate("/competition")}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full backdrop-blur-sm"
              >
                <Sparkles size={16} className="text-purple-300" />
                <span className="text-purple-200 text-sm font-semibold">Deep Analysis</span>
              </button>

              <button 
                onClick={() => navigate("/match")}
                className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-400/30 rounded-full backdrop-blur-sm"
              >
                <Users size={16} className="text-pink-300" />
                <span className="text-pink-200 text-sm font-semibold">Investor Matching</span>
              </button>

              <button 
                onClick={() => navigate("/EquityModelPage")}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-full backdrop-blur-sm"
              >
                <Rocket size={16} className="text-orange-300" />
                <span className="text-orange-200 text-sm font-semibold">2-5% Equity Model</span>
              </button>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => navigate("/competition")}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white text-lg font-bold shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              Start Your Analysis
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12 mt-12 border-t border-white/10">

              <button 
                onClick={() => navigate("/ideas")}
                className="text-center"
              >
                <div className="text-3xl font-black text-white mb-1">10k+</div>
                <div className="text-sm text-purple-300">Ideas Analyzed</div>
              </button>

              <button 
                onClick={() => navigate("/investors")}
                className="text-center"
              >
                <div className="text-3xl font-black text-white mb-1">500+</div>
                <div className="text-sm text-purple-300">Investors Connected</div>
              </button>

              <button 
                onClick={() => navigate("/funding")}
                className="text-center"
              >
                <div className="text-3xl font-black text-white mb-1">$50M+</div>
                <div className="text-sm text-purple-300">Funding Facilitated</div>
              </button>

            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </section>

    </div>
  );
}