// src/pages/MatchPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, FileText, Check, X, Award, TrendingUp, Users, Sparkles, Filter, Download, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * MatchPage
 * - Shows list of previously computed matches (from localStorage or backend)
 * - Each card displays fit score, tags and "Request Intro" button which opens Agreement modal
 * - When agreement is confirmed a mock "contract draft" is produced and a link appears
 *
 * For demo the page looks for 'last_matches' in localStorage (set by CampaignPage mock)
 */

function simpleLoadMatches() {
  try {
    const raw = localStorage.getItem("last_matches");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveLastMatches(matches) {
  try {
    localStorage.setItem("last_matches", JSON.stringify(matches));
  } catch {}
}

function InvestorCardSmall({ inv, onRequest }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400">
              {inv.industry}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} />
              <span>{inv.location}</span>
            </div>
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors mb-2">
            {inv.name}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {inv.description}
          </p>
        </div>

        <div className="text-right ml-4">
          <div className="flex items-center gap-1 justify-end mb-1">
            <Award size={14} className="text-emerald-400" />
            <span className="text-xs text-slate-400">Fit</span>
          </div>
          <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            {inv.fitScore}%
          </div>
        </div>
      </div>

      {inv.reasons && inv.reasons.length > 0 && (
        <div className="mb-4 space-y-1">
          {inv.reasons.slice(0, 2).map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
              <Sparkles size={10} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 mb-1">Ticket Size</div>
          <div className="text-sm font-semibold text-white">
            {inv.ticketMin && inv.ticketMax 
              ? `₹${inv.ticketMin.toLocaleString()} - ₹${inv.ticketMax.toLocaleString()}`
              : "Contact for details"
            }
          </div>
        </div>

        <button 
          onClick={() => onRequest(inv)} 
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-sm font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
        >
          <Users size={14} />
          Request Intro
        </button>
      </div>
    </motion.div>
  );
}

function AgreementModalSmall({ open, inv, onClose, onConfirm }) {
  const [equity, setEquity] = useState(5);
  const [milestones, setMilestones] = useState("Milestone 1: reach X revenue");

  useEffect(() => {
    if (!open) { 
      setEquity(5); 
      setMilestones("Milestone 1: reach X revenue"); 
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ y: 8, opacity: 0, scale: 0.95 }} 
        animate={{ y: 0, opacity: 1, scale: 1 }} 
        className="w-full max-w-xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-white/10"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Introduction Request</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{inv?.name}</div>
            <div className="text-sm text-slate-400">{inv?.description}</div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-purple-300 mb-2 block">
              Proposed Equity (%)
            </label>
            <input 
              value={equity} 
              onChange={(e) => setEquity(+e.target.value)} 
              type="number" 
              min="0.1"
              max="49"
              step="0.1"
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
            />
            <div className="text-xs text-slate-500 mt-2">
              Equity percentage you're willing to offer
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-purple-300 mb-2 block">
              Key Milestones
            </label>
            <textarea 
              value={milestones} 
              onChange={(e) => setMilestones(e.target.value)} 
              rows={4} 
              placeholder="Define your success milestones..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" 
            />
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-1">Next Steps</div>
                <div className="text-xs text-slate-400">
                  Your introduction request will be reviewed by {inv?.name}. They typically respond within 48-72 hours with feedback or next steps.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm({ equity, milestones })} 
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            Send Request
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function MatchPage() {
  const [matches, setMatches] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState(null);
  const [filterIndustry, setFilterIndustry] = useState("all");

  useEffect(() => {
    // load from localStorage or create a mock if none
    const raw = simpleLoadMatches();
    if (raw && raw.length) {
      setMatches(raw);
    } else {
      // create a small mock sample so UI shows something
      const industries = ["EdTech", "SaaS", "FinTech", "Climate", "Health", "Consumer"];
      const locations = ["Bengaluru", "Mumbai", "Delhi", "London", "San Francisco", "New York"];
      
      const sample = Array.from({ length: 12 }).map((_, i) => {
        const industry = industries[i % industries.length];
        return {
          id: `m_${i + 1}`,
          name: `${industry} Ventures ${i + 1}`,
          industry,
          location: locations[i % locations.length],
          description: `Leading ${industry} investor with focus on early-stage startups and proven track record.`,
          fitScore: Math.round(65 + Math.random() * 30),
          ticketMin: Math.round((Math.random() * 0.5 + 0.1) * 100000),
          ticketMax: Math.round((Math.random() * 4 + 1) * 100000),
          reasons: [
            `Strong portfolio in ${industry} sector`,
            `Actively investing in seed stage`,
            `Geographic presence in target markets`
          ]
        };
      });
      sample.sort((a, b) => b.fitScore - a.fitScore);
      setMatches(sample);
      saveLastMatches(sample);
    }
  }, []);

  function openRequest(inv) {
    setSelected(inv);
    setModalOpen(true);
  }

  async function confirmRequest({ equity, milestones }) {
    setModalOpen(false);
    // mock: generate draft url
    await new Promise(r => setTimeout(r, 700));
    const url = `https://example.com/draft/${Math.random().toString(36).slice(2, 10)}.pdf`;
    setDraftUrl(url);
    alert(`Intro requested to ${selected.name}. Draft contract available.`);
  }

  const filtered = matches.filter(m => {
    const matchesSearch = (m.name + " " + m.industry + " " + m.location).toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = filterIndustry === "all" || m.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  const industries = ["all", ...new Set(matches.map(m => m.industry))];
  const avgFitScore = filtered.length > 0 ? Math.round(filtered.reduce((sum, m) => sum + m.fitScore, 0) / filtered.length) : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-white/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-300 text-sm font-semibold mb-4">
              <Users size={14} />
              <span>AI-Powered Investor Matching</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Matched Investors</span>
            </h1>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Discover investors perfectly aligned with your startup. Each match is scored using our advanced Bayesian algorithm.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl font-black text-white mb-1">{filtered.length}</div>
              <div className="text-sm text-purple-300">Total Matches</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl font-black text-emerald-400 mb-1">{avgFitScore}%</div>
              <div className="text-sm text-purple-300">Avg Fit Score</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-3xl font-black text-white mb-1">{industries.length - 1}</div>
              <div className="text-sm text-purple-300">Industries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search investors, sectors, or locations..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="pl-10 pr-8 py-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
              >
                {industries.map(ind => (
                  <option key={ind} value={ind}>
                    {ind === "all" ? "All Industries" : ind}
                  </option>
                ))}
              </select>
            </div>

            {draftUrl && (
              <motion.a 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                href={draftUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 rounded-lg font-semibold transition-all hover:scale-105"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Download Draft</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(inv => (
              <InvestorCardSmall key={inv.id} inv={inv} onRequest={openRequest} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Award className="text-purple-400" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">How Fit Scores Work</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our advanced Bayesian Belief Network analyzes multiple factors including industry alignment, stage preference, investment ticket size, geographic presence, and historical investment patterns. Scores represent the probability of a successful match (0-100%), with higher scores indicating stronger alignment with your startup's profile and needs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      

      <AgreementModalSmall
        open={modalOpen}
        inv={selected}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmRequest}
      />
    </div>
  );
}