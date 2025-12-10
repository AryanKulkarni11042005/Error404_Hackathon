// src/components/ShareExport.jsx
import React from "react";

export default function ShareExport({ data, filename = "run.json" }) {
  if (!data) return null;

  function downloadJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button onClick={downloadJson} className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-sm">
      Export JSON
    </button>
  );
}
