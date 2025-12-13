import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Github, Twitter, Linkedin, Mail, ArrowUpRight, Sparkles, Users, TrendingUp, Heart } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-75"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Brain className="text-white" size={24} strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  IdeaForge <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
                </h3>
              </div>
            </div>
            <p className="text-purple-300 text-sm leading-relaxed mb-6">
              Transform your startup ideas into fundable ventures with AI-powered analysis and investor matching.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-purple-300 hover:text-white transition-all hover:scale-110"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-purple-300 hover:text-white transition-all hover:scale-110"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-purple-300 hover:text-white transition-all hover:scale-110"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:hello@ideaforge.ai"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-purple-300 hover:text-white transition-all hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => navigate("/competition")}
                  className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <span>AI Competition</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <a href="#features" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Features</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Pricing</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#api" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>API Access</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#changelog" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Changelog</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-pink-400" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#docs" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Documentation</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#guides" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Startup Guides</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#blog" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Blog</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Case Studies</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#community" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Community</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users size={16} className="text-orange-400" />
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>About Us</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#careers" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Careers</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#investors" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>For Investors</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#contact" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Contact</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#press" className="text-purple-300 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span>Press Kit</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold text-white mb-2">Stay Updated</h4>
            <p className="text-purple-300 mb-6">Get the latest startup insights, AI trends, and platform updates delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/50 transition-all hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-purple-300 text-sm flex items-center gap-2">
              <span>© 2024 IdeaForge AI. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart size={14} className="text-pink-400 fill-pink-400 animate-pulse" /> for founders
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-purple-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-purple-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#cookies" className="text-purple-300 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
