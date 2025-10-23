import React, { useState } from "react";
import axios from "axios";

export default function Scan({ uploadedFiles }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [result, setResult] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";

  function toggleFile(filePath) {
    setSelectedFiles(prev => prev.includes(filePath) ? prev.filter(f => f !== filePath) : [...prev, filePath]);
  }

  async function scan() {
    if (!selectedFiles.length) return alert("Select files to scan");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/scan`, { files: selectedFiles });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Scan failed");
    }
  }

  return (
    <div>
      <h2 className="text-2xl neon-text mb-4">Malware Scan</h2>

      <div className="mb-4">
        <h3>Select files to scan:</h3>
        {uploadedFiles.length ? (
          <div className="space-y-1">
            {uploadedFiles.map((f, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input type="checkbox" checked={selectedFiles.includes(f)} onChange={() => toggleFile(f)} />
                <span>{f.split("/").pop()}</span>
              </label>
            ))}
          </div>
        ) : <p>No uploaded files found</p>}
      </div>

      <button onClick={scan} className="px-4 py-2 border rounded bg-black text-white hover:neon-glow mb-4">Scan</button>

      {result && (
        <div className="mt-4 p-3 file-card bg-gray-900 text-white rounded">
          <div>Summary: Clean {result.summary.clean} / Infected {result.summary.infected}</div>
          <ul className="mt-2">
            {result.results.map((r, i) => <li key={i}>{r.file} — {r.message}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
