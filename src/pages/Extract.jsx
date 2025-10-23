import React, { useState } from "react";
import axios from "axios";

export default function Extract({ uploadedFiles }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [result, setResult] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";

  async function extract() {
    if (!selectedFile) return alert("Select a file to extract!");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/extract`, { zip: selectedFile });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Extraction failed");
    }
  }

  return (
    <div>
      <h2 className="text-2xl neon-text mb-4">Zip Extractor</h2>

      <div className="mb-4">
        <h3>Select file to extract:</h3>
        <select value={selectedFile} onChange={e => setSelectedFile(e.target.value)} className="w-full p-2 mb-2 bg-black/40 rounded">
          <option value="">-- Choose a zip file --</option>
          {uploadedFiles.map((f, i) => <option key={i} value={f}>{f.split("/").pop()}</option>)}
        </select>
      </div>

      <button onClick={extract} className="px-4 py-2 border rounded bg-black text-white hover:neon-glow">Extract</button>

      {result && <div className="mt-4 p-2 bg-gray-900 text-white rounded">Extracted to: {result.extracted_dir}</div>}
    </div>
  );
}
