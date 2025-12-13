// ============================================
// Navbar.jsx (updated with Investor Matching button)
// ============================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Sparkles, Brain, TrendingUp, Users, Menu, X } from "lucide-react";

export default function Navbar({ onRefresh }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-75"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={20} strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">
              IdeaForge <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium">

              <button 
                onClick={() => navigate("/")}
                className="text-purple-300 hover:text-white transition-colors"
              >
                Home
              </button>

              <button 
                onClick={() => navigate("/competition")}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>Compete</span>
              </button>

              <button 
                onClick={() => navigate("/match")}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Users size={16} />
                <span>Investors</span>
              </button>

              {/* ⭐ New Investor Matching Button */}
              <button 
                onClick={() => navigate("/request")}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Users size={16} />
                <span>Investor Matching</span>
              </button>

              <button 
                onClick={() => navigate("/reports")}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <TrendingUp size={16} />
                <span>Reports</span>
              </button>

            </nav>

            <div className="flex items-center gap-3">
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  <RefreshCw size={16} />
                  <span>Reset</span>
                </button>
              )}

              <button 
                onClick={() => navigate("/competition")}
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-bold shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <nav className="flex flex-col gap-3">

              <button 
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 p-2"
              >
                Home
              </button>

              <button 
                onClick={() => {
                  navigate("/competition");
                  setMenuOpen(false);
                }}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 p-2"
              >
                <Sparkles size={16} />
                <span>Compete</span>
              </button>

              <button 
                onClick={() => {
                  navigate("/match");
                  setMenuOpen(false);
                }}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 p-2"
              >
                <Users size={16} />
                <span>Investors</span>
              </button>

              {/* ⭐ New Investor Matching Mobile Button */}
              <button 
                onClick={() => {
                  navigate("/request");
                  setMenuOpen(false);
                }}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 p-2"
              >
                <Users size={16} />
                <span>Investor Matching</span>
              </button>

              <button 
                onClick={() => {
                  navigate("/reports");
                  setMenuOpen(false);
                }}
                className="text-purple-300 hover:text-white transition-colors flex items-center gap-2 p-2"
              >
                <TrendingUp size={16} />
                <span>Reports</span>
              </button>

              <div className="flex flex-col gap-2 pt-3 mt-3 border-t border-white/10">

                {onRefresh && (
                  <button
                    onClick={onRefresh}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all"
                  >
                    <RefreshCw size={16} />
                    <span>Reset</span>
                  </button>
                )}

                <button 
                  onClick={() => {
                    navigate("/competition");
                    setMenuOpen(false);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold"
                >
                  Get Started
                </button>

              </div>

            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
