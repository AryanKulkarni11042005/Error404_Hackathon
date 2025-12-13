// src/api/apiClient.js
export async function runCompetition(backendUrl, payload = {}) {
  // If payload.options.mock === true -> return deterministic mock data immediately
  const isMock = payload?.options?.mock === true;

  if (isMock) {
    // simple mock that matches the shape HomePage expects
    const mock = {
      meta: { prompt: payload.prompt || "", timestamp: new Date().toISOString() },
      contestant_outputs: [
        {
          model: "openai/gpt-oss-20b:free",
          idea: `[MOCK] ${payload.prompt} — Elevator pitch (model A)`,
          market: "- Market: students\n- Trend: edtech adoption",
          competitor: "MockCo A: basic competitor",
          risk: "Data privacy - mitigate via consent"
        },
        {
          model: "google/gemma-3-27b-it:free",
          idea: `[MOCK] ${payload.prompt} — Elevator pitch (model B)`,
          market: "- Market: niche\n- Trend: personalization",
          competitor: "MockCo B: alternative",
          risk: "Accuracy - add human-in-the-loop"
        },
        {
          model: "meta-llama/llama-3.3-70b-instruct:free",
          idea: `[MOCK] ${payload.prompt} — Elevator pitch (model C)`,
          market: "- Market: mass\n- Trend: mobile-first",
          competitor: "MockCo C: incumbent",
          risk: "Regulation - consult counsel"
        }
      ],
      referee: {
        evaluations: {
          "openai/gpt-oss-20b:free": { innovation: 6, market_potential: 6, feasibility: 5, clarity: 6, total_score: 23, justification: "Balanced" },
          "google/gemma-3-27b-it:free": { innovation: 7, market_potential: 6, feasibility: 6, clarity: 7, total_score: 26, justification: "Solid" },
          "meta-llama/llama-3.3-70b-instruct:free": { innovation: 8, market_potential: 7, feasibility: 7, clarity: 7, total_score: 29, justification: "Strong" }
        },
        winner_model: "meta-llama/llama-3.3-70b-instruct:free",
        raw: "[MOCK referee]"
      }
    };

    // simulate network latency slightly
    await new Promise(res => setTimeout(res, 450));
    return mock;
  }

  // Real run: POST to backend /run-competition
  const url = backendUrl.replace(/\/$/, "") + "/run-competition";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Server error ${res.status}: ${txt}`);
    }
    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out (60s). Try again or use mock mode.");
    }
    throw err;
  }
}
