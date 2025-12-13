import React from "react";
import { motion } from "framer-motion";
import ModelCard from "./ModelCard";
import { Trophy, Award, Target, Zap, Activity } from "lucide-react";

export default function ResultsGrid({ data }) {
  if (!data) return null;

  const contestants = data.contestant_outputs || [];
  const referee = data.referee || {};
  const evaluations = referee.evaluations || {};
  const winnerModel = referee.winner_model;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Helper for averages
  const getAverageScore = (key) => {
    const values = Object.values(evaluations).map(e => e?.scores?.[key] || 0);
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return (sum / values.length).toFixed(1);
  };

  const maxTotalScore = Math.max(...Object.values(evaluations).map(e => e?.total_score || 0));

  return (
    <div className="space-y-10">
      
      {/* 1. Hero Summary Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 shadow-2xl"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-purple-400 mb-2">
              <Activity size={20} className="animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-widest">Analysis Complete</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Referee <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Decision</span>
            </h2>
            <p className="text-slate-400 max-w-md text-lg">
              The AI Judge has analyzed innovation, market fit, and feasibility to declare a winner.
            </p>
          </div>

          {/* Winner Banner */}
          {winnerModel && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-5 min-w-[300px]">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Trophy size={32} className="text-slate-900 fill-slate-900" />
                </div>
                <div>
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Champion
                  </div>
                  <div className="text-xl font-bold text-white truncate max-w-[200px]">
                    {winnerModel}
                  </div>
                  <div className="text-slate-400 text-xs mt-1">
                    Highest Score: <span className="text-white font-bold">{maxTotalScore}/30</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* 2. Contestant Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-8"
      >
        {contestants.map((c) => {
          const score = evaluations[c.model] || null;
          const isWinner = winnerModel === c.model;
          
          return (
            <motion.div key={c.model} variants={itemVariants} className="h-full">
              <ModelCard
                model={c.model}
                outputs={{ idea: c.idea }} 
                score={score}
                winner={isWinner}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* 3. Bottom Stats Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatWidget 
          label="Avg Innovation" 
          value={getAverageScore("innovation")} 
          icon={Zap} 
          color="blue" 
        />
        <StatWidget 
          label="Avg Market Fit" 
          value={getAverageScore("market")} 
          icon={Target} 
          color="purple" 
        />
        <StatWidget 
          label="Avg Feasibility" 
          value={getAverageScore("feasibility")} 
          icon={Award} 
          color="emerald" 
        />
      </motion.div>
    </div>
  );
}

// Reusable Dashboard Widget
function StatWidget({ label, value, icon: Icon, color }) {
  const styles = {
    blue: "from-blue-500/20 to-indigo-500/5 border-blue-500/30 text-blue-400",
    purple: "from-purple-500/20 to-fuchsia-500/5 border-purple-500/30 text-purple-400",
    emerald: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-400",
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${styles[color]} border p-6 flex items-center justify-between group`}>
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1 text-white">{label}</p>
        <p className="text-4xl font-black text-white tracking-tighter">
          {value} <span className="text-lg opacity-40 font-medium">/10</span>
        </p>
      </div>
      <div className={`p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={28} />
      </div>
    </div>
  );
}