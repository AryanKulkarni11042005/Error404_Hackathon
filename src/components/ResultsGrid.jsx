import React from "react";
import { motion } from "framer-motion";
import ModelCard from "./ModelCard";
import { Trophy, Award, Target, Sparkles } from "lucide-react";

export default function ResultsGrid({ data }) {
  if (!data) return null;

  const contestants = data.contestant_outputs || [];
  const referee = data.referee || {};
  const evaluations = referee.evaluations || {};
  const winnerModel = referee.winner_model;

  // Animation variants for staggered cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Referee Summary Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 shadow-2xl"
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Referee Analysis</h3>
                  <p className="text-purple-300 text-sm">Competition Results</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{contestants.length}</div>
                <div className="text-xs text-purple-300">Models</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{Object.keys(evaluations).length}</div>
                <div className="text-xs text-purple-300">Evaluated</div>
              </div>
            </div>
          </div>

          {/* Winner Announcement */}
          {winnerModel && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border-2 border-emerald-400/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Trophy size={32} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <div className="text-emerald-300 text-sm font-semibold mb-1">🎉 Competition Winner</div>
                  <div className="text-2xl font-black text-white">{winnerModel}</div>
                  <div className="text-emerald-200 text-sm mt-1">
                    Achieved the highest overall score across all evaluation criteria
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Evaluation Criteria */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 text-blue-300 mb-1">
                <Sparkles size={14} />
                <span className="text-xs font-semibold">Idea & Pitch</span>
              </div>
              <div className="text-white text-sm">Innovation clarity</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 text-purple-300 mb-1">
                <Target size={14} />
                <span className="text-xs font-semibold">Market Analysis</span>
              </div>
              <div className="text-white text-sm">Size & potential</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 text-pink-300 mb-1">
                <Award size={14} />
                <span className="text-xs font-semibold">Competition</span>
              </div>
              <div className="text-white text-sm">Gap analysis</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 text-orange-300 mb-1">
                <Trophy size={14} />
                <span className="text-xs font-semibold">Risk Factor</span>
              </div>
              <div className="text-white text-sm">Mitigation plans</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Model Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {contestants.map((c) => {
          const score = evaluations[c.model] || null;
          const isWinner = winnerModel === c.model;
          
          return (
            <motion.div
              key={c.model}
              variants={cardVariants}
              className={isWinner ? "md:col-span-2" : ""}
            >
              <ModelCard
                model={c.model}
                outputs={{
                  idea: c.idea,
                  market: c.market,
                  competitor: c.competitor,
                  risk: c.risk
                }}
                score={score}
                winner={isWinner}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="text-blue-600 text-sm font-semibold mb-2">Average Idea Score</div>
          <div className="text-3xl font-bold text-blue-900">
            {contestants.length > 0 
              ? (Object.values(evaluations).reduce((sum, e) => sum + (e?.idea_score || 0), 0) / contestants.length).toFixed(1)
              : "—"
            }
            <span className="text-lg text-blue-600">/10</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="text-purple-600 text-sm font-semibold mb-2">Average Market Score</div>
          <div className="text-3xl font-bold text-purple-900">
            {contestants.length > 0 
              ? (Object.values(evaluations).reduce((sum, e) => sum + (e?.market_score || 0), 0) / contestants.length).toFixed(1)
              : "—"
            }
            <span className="text-lg text-purple-600">/10</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
          <div className="text-emerald-600 text-sm font-semibold mb-2">Highest Total Score</div>
          <div className="text-3xl font-bold text-emerald-900">
            {Object.values(evaluations).length > 0
              ? Math.max(...Object.values(evaluations).map(e => e?.total_score || 0))
              : "—"
            }
            <span className="text-lg text-emerald-600">/40</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}