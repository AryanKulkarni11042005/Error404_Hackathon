export async function runCompetition(backendUrl, payload) {
  const url = backendUrl.replace(/\/$/, "") + "/run-competition";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Server error ${res.status}: ${txt}`);
  }

  return res.json();
}
