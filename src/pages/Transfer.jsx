import React, { useState } from "react";
import QRCode from "react-qr-code";

export default function Transfer({ uploadedFiles }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  function toggleFile(filePath) {
    setSelectedFiles(prev =>
      prev.includes(filePath) ? prev.filter(f => f !== filePath) : [...prev, filePath]
    );
  }

  async function transfer() {
    if (!selectedFiles.length) return alert("Select files to transfer");
    const res = await fetch("https://file-organiser-backend.onrender.com/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: selectedFiles, email }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <div>
      <h2 className="text-2xl neon-text mb-4">File Transfer</h2>

      <div className="mb-4">
        <h3>Select files to transfer:</h3>
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

      <input
        placeholder="Optional email to send link"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 bg-black/40 rounded mb-2"
      />

      <button onClick={transfer} className="px-4 py-2 border rounded mb-4">Create Transfer</button>

      {result && (
        <div className="mt-4 file-card">
          <div>Link: <a href={result.link} className="underline">{result.link}</a></div>
          <div className="mt-2">QR Code:</div>
          <div className="mt-2"><QRCode value={window.location.origin + result.link} /></div>
          <div className="mt-2">
            <a href={result.link} className="px-3 py-2 bg-white text-black rounded">Download ZIP</a>
          </div>
        </div>
      )}
    </div>
  );
}
