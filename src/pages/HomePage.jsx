import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, Rocket, TrendingUp, Users, Crown, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const popularIdeas = [
  { title: "AI-Powered Health Diagnostics", category: "HealthTech", trend: "Hot" },
  { title: "Sustainable Fashion Marketplace", category: "E-commerce", trend: "Growing" },
  { title: "Remote Team Collaboration Tool", category: "SaaS", trend: "Hot" },
  { title: "Fintech Payment Solutions", category: "FinTech", trend: "Popular" },
  { title: "EdTech Learning Platform", category: "Education", trend: "Growing" },
  { title: "Green Energy Management", category: "CleanTech", trend: "Hot" },
  { title: "Food Delivery Optimization", category: "Logistics", trend: "Popular" },
  { title: "Mental Wellness App", category: "HealthTech", trend: "Growing" },
  { title: "NFT Marketplace", category: "Web3", trend: "Hot" },
  { title: "Smart Home IoT", category: "IoT", trend: "Popular" }
];

const faqs = [
  {
    question: "How does the AI evaluation system work?",
    answer: "Our system uses five specialized AI models that work together to analyze your startup idea. Each model focuses on a specific aspect: idea generation, market research, competition analysis, risk assessment, and final scoring. The Referee Model then aggregates all insights to provide you with a comprehensive evaluation score and detailed feedback."
  },
  {
    question: "What makes your AI models different from other evaluation tools?",
    answer: "Unlike traditional evaluation tools, our AI models compete and collaborate simultaneously. Each model brings its unique perspective, ensuring no critical aspect is overlooked. The multi-model approach reduces bias and provides more balanced, comprehensive insights than single-model systems."
  },
  {
    question: "How long does the evaluation process take?",
    answer: "The complete evaluation typically takes 3-5 minutes. Our AI models work in parallel to analyze your idea, research the market, evaluate competition, and assess risks simultaneously. You'll receive a detailed report with scores, justifications, and actionable recommendations immediately after processing."
  },
  {
    question: "Can I use these models for free?",
    answer: "Yes! We offer a free tier that allows you to evaluate your startup ideas with our complete AI model suite. Premium features include deeper analysis, unlimited evaluations, priority processing, and access to our investor matching platform."
  },
  {
    question: "What happens after my idea is evaluated?",
    answer: "After evaluation, you receive a comprehensive report with scores across multiple criteria. Based on your results, you can connect with relevant investors through our matching platform, access resources to improve weak areas, and track your progress as you refine your startup concept."
  }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
                onClick={() => navigate("/Agents")}
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

      {/* Scrolling Popular Ideas Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Popular</span> Entrepreneur Ideas
            </h2>
            <p className="text-lg text-slate-400">
              Discover trending startup concepts across various industries
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-4">
              {[...popularIdeas, ...popularIdeas].map((idea, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{idea.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      idea.trend === 'Hot' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                      idea.trend === 'Growing' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {idea.trend}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{idea.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Questions</span>
            </h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about our AI evaluation system
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-purple-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-2 text-slate-400 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
}