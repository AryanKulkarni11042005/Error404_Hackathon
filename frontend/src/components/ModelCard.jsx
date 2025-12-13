import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronDown, ChevronUp, Lightbulb, TrendingUp, CheckCircle, Quote } from "lucide-react";

export default function ModelCard({ model, outputs, score, winner }) {
  const [expanded, setExpanded] = useState(true);

  // Animations
  const containerVariants = {
    rest: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }
  };

  const total = score?.total_score ?? 0;
  
  // Dynamic Styles based on Winner Status
  const cardStyle = winner 
    ? "bg-gradient-to-br from-emerald-900/40 via-slate-900/60 to-slate-900/80 border-emerald-500/50 shadow-emerald-500/20" 
    : "bg-white/5 border-white/10 hover:border-purple-500/30";

  const headerBg = winner
    ? "bg-gradient-to-r from-emerald-500/20 to-transparent"
    : "bg-white/5";

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={containerVariants}
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-300 ${cardStyle}`}
    >
      {/* Winner Badge (Ribbon Style) */}
      {winner && (
        <>
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg flex items-center gap-1">
              <Trophy size={14} className="fill-slate-900" />
              WINNER
            </div>
          </div>
          {/* Ambient Glow for Winner */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none"></div>
        </>
      )}

      {/* Header */}
      <div className={`p-6 border-b border-white/5 ${headerBg}`}>
        <div className="flex justify-between items-start mb-4 pr-16"> {/* pr-16 for badge space */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${winner ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'}`}>
                AI Model
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
              {model}
            </h3>
          </div>
        </div>

        {/* Big Score Display */}
        <div className="flex items-end gap-2 mb-6">
          <span className={`text-4xl font-black ${winner ? "text-emerald-400" : "text-purple-400"}`}>
            {total}
          </span>
          <span className="text-sm font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
            / 30 Points
          </span>
        </div>

        {/* Score Badges */}
        <div className="grid grid-cols-3 gap-2">
          <ScoreBadge 
            label="Innovation" 
            score={score?.scores?.innovation} 
            icon={Lightbulb} 
            color={winner ? "emerald" : "blue"} 
          />
          <ScoreBadge 
            label="Market Fit" 
            score={score?.scores?.market} 
            icon={TrendingUp} 
            color={winner ? "emerald" : "purple"} 
          />
          <ScoreBadge 
            label="Feasibility" 
            score={score?.scores?.feasibility} 
            icon={CheckCircle} 
            color={winner ? "emerald" : "pink"} 
          />
        </div>
      </div>

      {/* Pitch Content Area */}
      <div className="bg-slate-950/30">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-4 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors hover:bg-white/5"
        >
          <span className="flex items-center gap-2">
            <Quote size={14} className="text-slate-500" />
            Generated Pitch
          </span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-6 pt-2">
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-light">
                {outputs?.idea || <span className="text-slate-500 italic">No pitch generated...</span>}
              </div>
            </div>
            
            {/* Referee Justification */}
            {score?.justification && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/5 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-l-xl"></div>
                <p className="text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1">
                  Referee's Verdict
                </p>
                <p className="text-sm text-slate-200 italic">
                  "{score.justification}"
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Styled Badge Component
function ScoreBadge({ label, score = 0, icon: Icon, color }) {
  const colorStyles = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  };

  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${colorStyles[color] || colorStyles.blue}`}>
      <div className="flex items-center gap-1.5 mb-1 opacity-80">
        <Icon size={14} />
        <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-xl font-black tracking-tight">{score}</span>
    </div>
  );
}