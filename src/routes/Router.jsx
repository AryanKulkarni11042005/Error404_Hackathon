// src/routes/Router.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import LoadingDots from "../components/LoadingDots";

// Lazy-loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const CompetitionPage = lazy(() => import("../pages/CompetitionPage"));
const CampaignPage = lazy(() => import("../pages/CampaignPage"));
const MatchPage = lazy(() => import("../pages/MatchPage"));
const ReportsPage = lazy(() => import("../pages/ReportsPage"));
const EquityModelPage = lazy(() => import("../pages/EquityModelPage"));
const Agents = lazy(() => import("../pages/Agents"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="container mx-auto p-6">
            <div className="card p-6 flex items-center gap-4">
              <LoadingDots /> Loading...
            </div>
          </div>
        }
      >
        <Routes>

          {/* ALL PAGES NOW GO INSIDE LAYOUT */}
          <Route element={<Layout />}>

            <Route path="/" element={<HomePage />} />
            <Route path="/competition" element={<CompetitionPage />} />
            <Route path="/request" element={<CampaignPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/EquityModelPage" element={<EquityModelPage />} />
            <Route path="/Agents" element={<Agents />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
