// src/pages/EquityModelPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Shield, TrendingUp, Users, Heart, Sparkles, CheckCircle, Mail, Send, ArrowRight, Rocket, Award, Target } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function EquityModelPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link
      const subject = encodeURIComponent("I'm Interested in IdeaForge AI Equity Model");
      const body = encodeURIComponent(`I am interested in learning more about the 2-5% equity model.

My Email: ${email}

Please contact me with more details.

Thank you!`);
      
      const mailtoLink = `mailto:jyotsnaaa04@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Show success message
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 500);
      
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to open email client. Please email us directly at jyotsnaaa04@gmail.com");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">


      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-white/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-300 text-sm font-semibold mb-6">
              <Percent size={14} />
              <span>Fair & Flexible Funding Model</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">2-5% Equity</span> Model
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Empowering young entrepreneurs, startups, and women restarting their careers with fair, accessible funding that grows with your success.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Who We Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Who We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Support</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We believe in democratizing access to capital for those who need it most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Young Entrepreneurs</h3>
              <p className="text-slate-400 leading-relaxed">
                Fresh ideas deserve fresh opportunities. We support ambitious founders taking their first steps into entrepreneurship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Early-Stage Startups</h3>
              <p className="text-slate-400 leading-relaxed">
                From idea to execution, we provide the capital and support needed to transform your vision into reality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Women Entrepreneurs</h3>
              <p className="text-slate-400 leading-relaxed">
                Whether starting fresh or restarting your career, we're committed to supporting women-led ventures.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Works</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A transparent, founder-friendly approach to funding
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <Percent className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Equity Range: 2-5%</h3>
                    <p className="text-slate-400 leading-relaxed">
                      You retain 95-98% of your company. The exact equity percentage depends on factors like funding amount, industry, stage, and growth potential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                    <Shield className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Flexible Terms</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Terms are customized based on your startup's unique situation, industry dynamics, and growth trajectory.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <Target className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Success-Aligned</h3>
                    <p className="text-slate-400 leading-relaxed">
                      We only succeed when you succeed. Our interests are perfectly aligned with your company's growth and success.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                    <Award className="text-orange-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">5-Year Milestone</h3>
                    <p className="text-slate-400 leading-relaxed">
                      After 5 years, we evaluate progress together. Successful companies continue growing, while unsuccessful ventures may have structured exit options.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
                    <Users className="text-pink-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Fair Settlement Terms</h3>
                    <p className="text-slate-400 leading-relaxed">
                      In case of company challenges after 5 years, settlement amounts are determined fairly based on initial investment, market conditions, and circumstances. We work with you, not against you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <Sparkles className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Beyond Capital</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Access to our investor network, mentorship, resources, and AI-powered tools to accelerate your growth journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-white/5">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                  <span className="text-sm text-slate-300">Maintain majority ownership</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-white/5">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                  <span className="text-sm text-slate-300">Flexible repayment structure</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-white/5">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                  <span className="text-sm text-slate-300">Founder-friendly terms</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-white/5">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                  <span className="text-sm text-slate-300">Access to investor network</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-white/5">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                  <span className="text-sm text-slate-300">AI-powered matching</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-white/5">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" size={20} />
                  <span className="text-sm text-slate-300">Ongoing mentorship support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-300 text-sm font-semibold mb-6">
              <Rocket size={14} />
              <span>Start Your Journey Today</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Become an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Entrepreneur</span> Today
            </h2>
            
            <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
              Ready to transform your idea into reality? Get in touch with us and let's discuss how we can support your entrepreneurial journey.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:scale-100 whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>I'm Interested</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  We'll open your email client to send us a message
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-emerald-500/20 border border-emerald-500/30 rounded-xl mb-8 max-w-md mx-auto"
              >
                <CheckCircle className="text-emerald-400 mx-auto mb-3" size={48} />
                <h3 className="text-xl font-bold text-white mb-2">Email Client Opened!</h3>
                <p className="text-sm text-slate-300">
                  Please send the email from your email client to complete your interest submission.
                </p>
              </motion.div>
            )}

            {/* Contact Information */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Contact Us Directly</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                <a
                  href="mailto:jyotsnaaa04@gmail.com"
                  className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors group"
                >
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  <span>jyotsnaaa04@gmail.com</span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                We typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}