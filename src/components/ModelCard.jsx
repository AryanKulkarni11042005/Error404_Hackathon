import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trophy, ChevronDown, ChevronUp, Lightbulb, TrendingUp, Users, AlertTriangle, Target } from "lucide-react";

export default function ModelCard({ model, outputs, score, winner }) {
  const [expanded, setExpanded] = useState(false);

  // animation variants
  const container = {
    rest: { scale: 1, boxShadow: "0 6px 18px rgba(2,6,23,0.06)" },
    hover: { scale: 1.01, boxShadow: "0 12px 30px rgba(2,6,23,0.12)" }
  };

  const total = score?.total_score ?? 0;
  const pct = Math.max(0, Math.min(100, Math.round((total / 40) * 100)));

  // Individual scores
  const ideaScore = score?.idea_score ?? 0;
  const marketScore = score?.market_score ?? 0;
  const competitorScore = score?.competitor_score ?? 0;
  const riskScore = score?.risk_score ?? 0;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={container}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
        winner 
          ? "from-emerald-50 via-white to-emerald-50 border-2 border-emerald-400" 
          : "from-slate-50 via-white to-purple-50 border border-slate-200"
      } shadow-lg`}
    >
      {/* Winner Badge */}
      {winner && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white px-4 py-2 rounded-bl-2xl shadow-lg z-10"
        >
          <div className="flex items-center gap-2">
            <Trophy size={18} className="animate-pulse" />
            <span className="font-bold text-sm">Winner</span>
          </div>
        </motion.div>
      )}

      {/* Header Section */}
      <div className={`p-6 pb-4 ${winner ? "bg-gradient-to-r from-emerald-500/10 to-emerald-600/10" : "bg-gradient-to-r from-purple-500/5 to-blue-500/5"}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{model}</h3>
            <div className="flex items-center gap-2">
              <div className={`text-sm font-semibold ${winner ? "text-emerald-700" : "text-purple-700"}`}>
                Total Score: {total} / 40
              </div>
            </div>
          </div>
        </div>

        {/* Overall Score Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-600">Overall Performance</span>
            <span className={`text-sm font-bold ${winner ? "text-emerald-600" : "text-purple-600"}`}>{pct}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className={`h-full rounded-full ${
                winner 
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600" 
                  : "bg-gradient-to-r from-purple-500 to-blue-500"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="px-6 py-4 grid grid-cols-2 gap-3">
        {/* Idea Score */}
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-blue-700 font-medium">Idea</div>
            <div className="text-lg font-bold text-blue-900">{ideaScore}/10</div>
          </div>
        </div>

        {/* Market Score */}
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-purple-700 font-medium">Market</div>
            <div className="text-lg font-bold text-purple-900">{marketScore}/10</div>
          </div>
        </div>

        {/* Competitor Score */}
        <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-100">
          <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-pink-700 font-medium">Competitor</div>
            <div className="text-lg font-bold text-pink-900">{competitorScore}/10</div>
          </div>
        </div>

        {/* Risk Score */}
        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-orange-700 font-medium">Risk</div>
            <div className="text-lg font-bold text-orange-900">{riskScore}/10</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis - Collapsible */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-all ${
            expanded 
              ? winner ? "bg-emerald-100" : "bg-purple-100" 
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          <span className={`font-semibold text-sm ${expanded ? winner ? "text-emerald-900" : "text-purple-900" : "text-slate-700"}`}>
            {expanded ? "Hide" : "View"} Detailed Analysis
          </span>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-4 space-y-4">
            {/* Idea Analysis */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} className="text-blue-600" />
                <h4 className="font-semibold text-blue-900">Idea & Pitch</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {outputs?.idea ?? <span className="text-slate-400 italic">No analysis available</span>}
              </p>
            </div>

            {/* Market Analysis */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-purple-600" />
                <h4 className="font-semibold text-purple-900">Market Analysis</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {outputs?.market ?? <span className="text-slate-400 italic">No analysis available</span>}
              </p>
            </div>

            {/* Competitor Analysis */}
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-pink-600" />
                <h4 className="font-semibold text-pink-900">Competitor Analysis</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {outputs?.competitor ?? <span className="text-slate-400 italic">No analysis available</span>}
              </p>
            </div>

            {/* Risk Assessment */}
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-orange-600" />
                <h4 className="font-semibold text-orange-900">Risk Assessment</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {outputs?.risk ?? <span className="text-slate-400 italic">No analysis available</span>}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Accent Line */}
      <div className={`h-1 ${winner ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-purple-500 to-blue-500"}`} />
    </motion.div>
  );
}