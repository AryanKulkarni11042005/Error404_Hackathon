import React, { useState } from "react";
import { motion } from "framer-motion";
import ModelCard from "../components/ModelCard.jsx";
import ResultsGrid from "../components/ResultsGrid.jsx"; 
import { Trophy, Zap, Sparkles, AlertTriangle } from "lucide-react";

// ✅ UPDATED: Verified Free Models (Dec 2025)
const MODEL_OPTIONS = [
  { id: "google/gemma-3n-e4b-it:free", name: "Gemini Gemma" }, // Fixed 404
  { id: "meta-llama/llama-3.2-3b-instruct:free", name: "Llama 3.2 3B (Meta)" },
  { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B" },
  { id: "amazon/nova-2-lite-v1:free", name: "Amazon" },
  { id: "nex-agi/deepseek-v3.1-nex-n1:free", name: "Deepseek" }
];

export default function CompetitionPage() {
  const [prompt, setPrompt] = useState("");
  const [model1, setModel1] = useState(MODEL_OPTIONS[0].id);
  const [model2, setModel2] = useState(MODEL_OPTIONS[1].id);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runCompetition = async () => {
    if (!prompt.trim()) {
      setError("Please enter a startup idea prompt.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      
      const response = await fetch(`${backendUrl}/run-competition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          model_1: model1,
          model_2: model2
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Server Error: ${errText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Failed to run competition");
    } finally {
      setLoading(false);
    }
  };

  // --- RESULTS VIEW ---
  if (results) {
    return (
      <div className="min-h-screen bg-slate-950 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white flex gap-2">
              <Trophy className="text-yellow-400" /> Results
            </h1>
            <button 
              onClick={() => setResults(null)}
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors"
            >
              Start New Competition
            </button>
          </div>
          <ResultsGrid data={results} />
        </div>
      </div>
    );
  }

  // --- SETUP VIEW ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-5xl font-black text-white mb-4">
            AI Model <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Showdown</span>
          </h1>
          <p className="text-xl text-purple-200">
            Select two AI models and watch them compete to generate the best startup pitch.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center flex items-center justify-center gap-2">
              <AlertTriangle size={20} />
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2">Challenger 1</label>
              <select 
                value={model1}
                onChange={(e) => setModel1(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                {MODEL_OPTIONS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>

            <div className="md:text-right">
              <label className="block text-sm font-bold text-purple-300 mb-2">Challenger 2</label>
              <select 
                value={model2}
                onChange={(e) => setModel2(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                {MODEL_OPTIONS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
              <Sparkles size={16} /> Startup Idea Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A SaaS platform for urban gardeners using AI to optimize watering schedules..."
              rows="4"
              className="w-full bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={runCompetition}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Competition (Avg. 15s)...</span>
              </>
            ) : (
              <>
                <Zap size={20} fill="currentColor" />
                Run Competition
              </>
            )}
          </button>

        </motion.div>
      </div>
    </div>
  );
}