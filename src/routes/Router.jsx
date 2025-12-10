// src/routes/Router.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingDots from "../components/LoadingDots";

const HomePage = lazy(() => import("../pages/HomePage"));
const CompetitionPage = lazy(() => import("../pages/CompetitionPage"));
const CampaignPage = lazy(() => import("../pages/CampaignPage"));
const MatchPage = lazy(() => import("../pages/MatchPage"));
const ReportsPage = lazy(() => import("../pages/ReportsPage"));

export default function Router() {
  // passing onReset to Navbar so the reset button works globally
  function handleReset() {
    localStorage.removeItem("last_run");
    // You can add other global reset logic here
    window.location.reload();
  }

  return (
    <BrowserRouter>
      <Navbar onReset={handleReset} />
      <Suspense fallback={
        <div className="container mx-auto p-6">
          <div className="card p-6 flex items-center gap-4"><LoadingDots /> Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/competition" element={<CompetitionPage />} />
          <Route path="/request" element={<CampaignPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
