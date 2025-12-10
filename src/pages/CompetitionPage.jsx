// --- FULL FIXED FILE BELOW ---
import React, { useState } from "react";
import { motion } from "framer-motion";
import ModelCard from "../components/ModelCard.jsx";
import { runCompetition } from "../api.js";

import { Trophy, Award, Target, Sparkles, Crown, Plus, Trash2, Zap } from "lucide-react";

export default function CompetitionPage() {
  const [competitors, setCompetitors] = useState([
    { id: 1, name: "Claude", idea: "" },
    { id: 2, name: "GPT-4", idea: "" }
  ]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextId, setNextId] = useState(3);

  // If results are showing
  if (results) {
    return <ResultsView data={results} onReset={() => setResults(null)} />;
  }

  const handleAddCompetitor = () => {
    setCompetitors([...competitors, { id: nextId, name: "", idea: "" }]);
    setNextId(nextId + 1);
  };

  const handleRemoveCompetitor = (id) => {
    if (competitors.length > 1) {
      setCompetitors(competitors.filter((c) => c.id !== id));
    }
  };

  const handleCompetitorChange = (id, field, value) => {
    setCompetitors(competitors.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleRunCompetition = async () => {
    if (competitors.some((c) => !c.name.trim() || !c.idea.trim())) {
      setError("Please fill in all competitor names and ideas");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const payload = {
        models: competitors.map((c) => ({ name: c.name, idea: c.idea }))
      };

      const competitionResults = await runCompetition(backendUrl, payload);
      setResults(competitionResults);
    } catch (err) {
      setError(err.message || "Failed to run competition");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={32} className="text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">AI Competition Arena</h1>
          </div>
          <p className="text-purple-300">Set up competitors and let AI evaluate their ideas</p>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-300"
          >
            {error}
          </motion.div>
        )}

        {/* Competitors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles size={24} className="text-purple-400" />
            Competitors
          </h2>

          <div className="space-y-4 mb-6">
            {competitors.map((competitor, index) => (
              <motion.div
                key={competitor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 items-start"
              >
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-purple-300 mb-2">
                    Competitor {index + 1} Name
                  </label>
                  <input
                    type="text"
                    value={competitor.name}
                    onChange={(e) => handleCompetitorChange(competitor.id, "name", e.target.value)}
                    placeholder="e.g., Claude, GPT-4, Llama"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div className="flex-[2]">
                  <label className="block text-sm font-semibold text-purple-300 mb-2">
                    Business Idea
                  </label>
                  <textarea
                    value={competitor.idea}
                    onChange={(e) => handleCompetitorChange(competitor.id, "idea", e.target.value)}
                    placeholder="Describe the business idea"
                    rows="2"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white resize-none"
                  />
                </div>

                <button
                  onClick={() => handleRemoveCompetitor(competitor.id)}
                  disabled={competitors.length === 1}
                  className="mt-8 p-2 text-red-400 hover:bg-red-500/20 rounded-lg disabled:opacity-50"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          <button
            onClick={handleAddCompetitor}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
          >
            <Plus size={20} />
            Add Competitor
          </button>
        </motion.div>

        {/* Run Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleRunCompetition}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-yellow-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin">⚙️</div>
              Running Competition...
            </>
          ) : (
            <>
              <Zap size={24} />
              Run Competition
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

/* ---------------- RESULTS VIEW ---------------- */

function ResultsView({ data, onReset }) {
  if (!data) return null;

  const contestants = data.contestant_outputs || [];
  const referee = data.referee || {};
  const evaluations = referee.evaluations || {};
  const winnerModel = referee.winner_model;

  const winnerData = contestants.find((c) => c.model === winnerModel);
  const otherContestants = contestants.filter((c) => c.model !== winnerModel);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={32} className="text-yellow-400" />
              <h1 className="text-4xl font-bold text-white">Competition Results</h1>
            </div>

            <button onClick={onReset} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg">
              ← Back to Setup
            </button>
          </div>
        </motion.div>

        {/* ------- REFEREE SUMMARY -------- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 shadow-2xl mb-8"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Referee Analysis</h3>
                  <p className="text-purple-300 text-sm">Competition Results</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WINNER CARD */}
        {winnerData && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-10">
            <div className="overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-yellow-400/30 p-1">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-4 text-center text-yellow-900 font-bold text-3xl rounded-t-2xl">
                🏆 WINNER 🏆
              </div>

              <div className="p-4 bg-white/30">
                <ModelCard
                  model={winnerData.model}
                  outputs={{
                    idea: winnerData.idea,
                    market: winnerData.market,
                    competitor: winnerData.competitor,
                    risk: winnerData.risk
                  }}
                  score={evaluations[winnerData.model]}
                  winner={true}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* OTHER CONTESTANTS */}
        {otherContestants.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Target size={24} className="text-purple-400" />
              Other Competitors
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherContestants.map((c) => (
                <motion.div key={c.model} variants={cardVariants}>
                  <ModelCard
                    model={c.model}
                    outputs={{
                      idea: c.idea,
                      market: c.market,
                      competitor: c.competitor,
                      risk: c.risk
                    }}
                    score={evaluations[c.model]}
                    winner={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
