// src/pages/CampaignPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Users, DollarSign, Percent, X, Sparkles, TrendingUp, Award } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function tinyId() {
  return Math.random().toString(36).slice(2, 9);
}

/* -------------------------------------------
   MOCK: Pitch Deck Generation
-------------------------------------------- */
async function generatePitchDeckMock(campaign) {
  await new Promise((r) => setTimeout(r, 900));
  return { deckUrl: `https://example.com/mock-decks/${tinyId()}.pdf` };
}

/* -------------------------------------------
   MOCK: Improved Domain-Based Investor Matching
   Now returns `n` investors (honours the n arg).
-------------------------------------------- */
async function runInvestorMatchingBBNMock(campaign, n = 5) {
  if (!campaign.name || !campaign.industry || !campaign.askAmount) {
    // return empty so UI shows no matches when required fields are missing
    return [];
  }

  await new Promise((r) => setTimeout(r, 1100));

  const industries = [
    "EdTech",
    "FinTech",
    "Health",
    "SaaS",
    "Consumer",
    "Climate",
    "Mobility"
  ];

  const userIndustry = (campaign.industry || "").toLowerCase();

  const relatedDomains = industries.filter(
    (ind) =>
      userIndustry.includes(ind.toLowerCase()) ||
      ind.toLowerCase().includes(userIndustry)
  );

  if (relatedDomains.length === 0) {
    relatedDomains.push(
      industries[Math.floor(Math.random() * industries.length)]
    );
  }

  const investors = Array.from({ length: Math.max(n, 5) }).map((_, i) => {
    const industry = industries[i % industries.length];
    const isRelatedDomain = relatedDomains.some(
      (rd) => rd.toLowerCase() === industry.toLowerCase()
    );

    let base = isRelatedDomain
      ? 0.6 + Math.random() * 0.35
      : 0.1 + Math.random() * 0.25;

    if (userIndustry.includes(industry.toLowerCase())) base += 0.15;
    if ((campaign.stage || "").toLowerCase() === "seed") base += 0.05;

    base = Math.min(0.98, base);

    return {
      id: `inv_${i + 1}`,
      name: `${industry} Capital ${i + 1}`,
      industry,
      ticketMin: Math.round((Math.random() * 0.5 + 0.05) * 100000),
      ticketMax: Math.round((Math.random() * 4 + 0.5) * 100000),
      location: ["Bengaluru", "Mumbai", "Delhi", "London", "San Francisco"][i % 5],
      description: `Sector-focused investor with emphasis on ${industry}.`,
      fitScore: Math.round(base * 100),
      reasons: [
        `Past investments in ${industry}.`,
        campaign.stage
          ? `Prefers ${campaign.stage} stage.`
          : "Active in early-stage.",
        isRelatedDomain ? "Strong domain expertise match" : "Diversified portfolio"
      ]
    };
  });

  investors.sort((a, b) => b.fitScore - a.fitScore);
  return investors.slice(0, n);
}

/* -------------------------------------------
   UI Components
-------------------------------------------- */

function InputRow({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-purple-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function InvestorCard({ investor, onRequestIntro }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-purple-400 mb-1">
            <span className="px-2 py-1 bg-purple-500/20 rounded-full">{investor.industry}</span>
            <span>•</span>
            <span>{investor.location}</span>
          </div>
          <div className="font-bold text-white text-lg mb-2 group-hover:text-purple-400 transition-colors">
            {investor.name}
          </div>
          <div className="text-sm text-slate-400">{investor.description}</div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 justify-end mb-1">
            <Award size={14} className="text-emerald-400" />
            <span className="text-xs text-slate-400">Fit Score</span>
          </div>
          <div className="font-black text-3xl bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            {investor.fitScore}%
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-white/5">
        <div className="text-xs text-slate-500 mb-1">Investment Ticket</div>
        <div className="text-sm font-semibold text-white">
          ₹{investor.ticketMin.toLocaleString()} - ₹{investor.ticketMax.toLocaleString()}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        {investor.reasons.slice(0, 2).map((r, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
            <Sparkles size={12} className="text-purple-400 mt-0.5 flex-shrink-0" />
            <span>{r}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onRequestIntro(investor)}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
      >
        <Send size={16} />
        Request Intro
      </button>
    </motion.div>
  );
}

/* -------------------------------------------
   Agreement Modal
-------------------------------------------- */

function AgreementModal({ open, onClose, investor, onConfirm }) {
  const [equity, setEquity] = useState(5);
  const [milestones, setMilestones] = useState(
    "Milestone 1: 12 months revenue target"
  );

  React.useEffect(() => {
    if (!open) {
      setEquity(5);
      setMilestones("Milestone 1: 12 months revenue target");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-white/10"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">New Agreement</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {investor?.name}
            </div>
            <div className="text-sm text-slate-400">{investor?.description}</div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-purple-300 mb-2 block">
                Proposed Equity (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={equity}
                  onChange={(e) => setEquity(+e.target.value)}
                  className="w-28 px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Percent size={20} className="text-purple-400" />
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Equity you propose to offer for investment
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-purple-300 mb-2 block">
                Key Milestones
              </label>
              <textarea
                rows={4}
                value={milestones}
                onChange={(e) => setMilestones(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Define success milestones..."
              />
            </div>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-1">Agreement Terms</div>
                <div className="text-xs text-slate-400">
                  This will send an introduction request to {investor?.name} with your proposed equity and milestone structure. They will review and respond within 48 hours.
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
            Propose & Request Intro
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------
   MAIN PAGE
-------------------------------------------- */

export default function CampaignPage() {
  const [campaign, setCampaign] = useState({
    name: "",
    founder: "",
    email: "",
    teamSize: 1,
    stage: "seed",
    industry: "",
    tractionNotes: "",
    revenue: "",
    askAmount: "",
    proposedEquity: 5
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deckUrl, setDeckUrl] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  function onChangeField(k, v) {
    // coerce numeric fields to numbers to avoid type edge cases
    if (k === "teamSize") {
      v = Number(v) || 1;
    }
    if (k === "proposedEquity") {
      v = Number(v) || 0;
    }
    setCampaign((s) => ({ ...s, [k]: v }));
  }

  async function handleCreateCampaign(e) {
    e.preventDefault();

    // basic validation so the mock matching returns results
    if (!campaign.name || !campaign.industry || !campaign.askAmount) {
      alert("Please fill in Startup Name, Industry and Ask Amount before creating a campaign.");
      return;
    }

    setIsSubmitting(true);
    setMatchLoading(true);

    try {
      const deck = await generatePitchDeckMock(campaign);
      setDeckUrl(deck.deckUrl);

      const ranked = await runInvestorMatchingBBNMock(campaign, 5);
      setMatches(ranked);

      try {
        localStorage.setItem("last_matches", JSON.stringify(ranked));
      } catch (err) {
        console.error("Failed to save matches to localStorage", err);
      }
    } catch (err) {
      console.error("Create campaign error:", err);
      alert("Failed to create campaign (mock). See console.");
    } finally {
      setIsSubmitting(false);
      setMatchLoading(false);
    }
  }

  function openAgreement(investor) {
    setSelectedInvestor(investor);
    setModalOpen(true);
  }

  async function handleConfirmAgreement({ equity, milestones }) {
    setModalOpen(false);
    alert(
      `Intro requested to ${selectedInvestor.name}\nProposed equity: ${equity}%\nMilestones: ${milestones}`
    );
  }

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
              <Sparkles size={14} />
              <span>AI-Powered Investor Matching</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Funding Campaign</span>
            </h1>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Submit your startup details, generate an AI pitch deck, and get matched with the best-fit investors using our advanced Bayesian scoring algorithm.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-purple-300">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>80+ Active Investors</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>AI-Generated Pitch Decks</span>
            </div>
            <div className="flex items-center gap-2 text-purple-300">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span>Bayesian Matching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <form
          onSubmit={handleCreateCampaign}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Form */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <FileText className="text-purple-400" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Campaign Details</h3>
                <p className="text-xs text-slate-400">Fill in your startup information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputRow label="Startup Name *">
                <input
                  required
                  value={campaign.name}
                  onChange={(e) => onChangeField("name", e.target.value)}
                  placeholder="Enter your startup name"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>

              <InputRow label="Founder Name *">
                <input
                  required
                  value={campaign.founder}
                  onChange={(e) => onChangeField("founder", e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>

              <InputRow label="Founder Email *">
                <input
                  required
                  type="email"
                  value={campaign.email}
                  onChange={(e) => onChangeField("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>

              <InputRow label="Industry / Sector">
                <input
                  value={campaign.industry}
                  onChange={(e) => onChangeField("industry", e.target.value)}
                  placeholder="e.g., EdTech, FinTech, SaaS"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>

              <InputRow label="Funding Stage">
                <select
                  value={campaign.stage}
                  onChange={(e) => onChangeField("stage", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="pre-seed">Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                </select>
              </InputRow>

              <InputRow label="Team Size">
                <input
                  type="number"
                  min={1}
                  value={campaign.teamSize}
                  onChange={(e) => onChangeField("teamSize", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>
            </div>

            <div className="mt-5">
              <InputRow label="Traction & Notes">
                <textarea
                  value={campaign.tractionNotes}
                  onChange={(e) =>
                    onChangeField("tractionNotes", e.target.value)
                  }
                  rows={4}
                  placeholder="Describe your key achievements, traction metrics, and growth story..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                />
              </InputRow>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              <InputRow label="Revenue (Last 12M)">
                <input
                  value={campaign.revenue}
                  onChange={(e) => onChangeField("revenue", e.target.value)}
                  placeholder="₹ 10,00,000"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>

              <InputRow label="Ask Amount">
                <input
                  value={campaign.askAmount}
                  onChange={(e) => onChangeField("askAmount", e.target.value)}
                  placeholder="₹ 50,00,000"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>

              <InputRow label="Proposed Equity (%)">
                <input
                  type="number"
                  min={0.1}
                  max={49}
                  step={0.1}
                  value={campaign.proposedEquity}
                  onChange={(e) =>
                    onChangeField("proposedEquity", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </InputRow>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 disabled:scale-100"
              >
                <FileText size={18} />
                <span>
                  {isSubmitting
                    ? "Creating Campaign..."
                    : "Create Campaign & Generate Deck"}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setCampaign({
                    name: "",
                    founder: "",
                    email: "",
                    teamSize: 1,
                    stage: "seed",
                    industry: "",
                    tractionNotes: "",
                    revenue: "",
                    askAmount: "",
                    proposedEquity: 5
                  })
                }
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all"
              >
                Reset Form
              </button>

              {deckUrl && (
                <a
                  href={deckUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-2 px-4 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 rounded-lg font-semibold transition-all"
                >
                  <FileText size={18} /> 
                  <span>Download Pitch Deck</span>
                </a>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl space-y-6 h-fit sticky top-24">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="text-purple-400" size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Campaign Status</div>
                <div className="text-xs text-slate-400">Preview & matching</div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg border border-white/5">
              <div className="text-xs font-semibold text-purple-400 mb-2">Quick Preview</div>
              {campaign.name ? (
                <div className="space-y-2">
                  <div className="text-white font-bold">{campaign.name}</div>
                  <div className="text-sm text-slate-400">
                    {campaign.industry || "No industry specified"} • {campaign.stage}
                  </div>
                  {campaign.askAmount && (
                    <div className="text-sm text-emerald-400">
                      Asking: {campaign.askAmount}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic">
                  Fill in details to see preview
                </div>
              )}
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Users className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Matching Engine</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    We'll match against ~80 investors using advanced Bayesian fit scoring. Results show compatibility scores and investment rationale.
                  </div>
                </div>
              </div>
            </div>

            <button
              disabled={matchLoading}
              onClick={async () => {
                // explicit run for 5 top matches
                setMatchLoading(true);
                try {
                  const ranked = await runInvestorMatchingBBNMock(campaign, 5);
                  setMatches(ranked);
                } catch (err) {
                  console.error("Matching error:", err);
                  alert("Failed to run matching. See console.");
                } finally {
                  setMatchLoading(false);
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-lg font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 disabled:scale-100"
            >
              {matchLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Matching...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Run Investor Matching</span>
                </>
              )}
            </button>

            {matches.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-purple-400 mb-3">Top Matches ({matches.length})</div>
                <div className="space-y-2 max-h-64 overflow-auto custom-scrollbar">
                  {matches.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-white/5 hover:border-purple-500/30 transition-colors"
                    >
                      <div>
                        <div className="text-sm text-white font-medium">{inv.name}</div>
                        <div className="text-xs text-slate-500">{inv.industry}</div>
                      </div>
                      <div className="text-lg font-bold text-emerald-400">
                        {inv.fitScore}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-500 mt-3 italic">
                  Click any match below to request introduction
                </div>
              </div>
            )}
          </aside>
        </form>

        {/* Matching Results Grid */}
        {matches.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Matched Investors</h3>
                <p className="text-sm text-slate-400">Ranked by compatibility score</p>
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                <span className="text-emerald-400 font-bold">{matches.length} Perfect Matches</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {matches.map((inv) => (
                <InvestorCard
                  key={inv.id}
                  investor={inv}
                  onRequestIntro={openAgreement}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AgreementModal
        open={modalOpen}
        investor={selectedInvestor}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmAgreement}
      />
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </div>
  );
}
