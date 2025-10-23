import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function Transfer({ uploadedFiles }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  // Toggle selected files
  function toggleFile(filePath) {
    setSelectedFiles(prev =>
      prev.includes(filePath) ? prev.filter(f => f !== filePath) : [...prev, filePath]
    );
  }

  // Send transfer request
  async function transfer() {
    if (!selectedFiles.length) return alert("Select files to transfer");

    try {
      const res = await fetch("https://file-organiser-backend.onrender.com/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: selectedFiles, email }),
      });

      if (!res.ok) {
        const err = await res.json();
        return alert(err.error || "Transfer failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  }

  // Render uploaded file list
  const fileList = uploadedFiles.length ? (
    <div className="space-y-1">
      {uploadedFiles.map((f, i) => (
        <label key={i} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedFiles.includes(f)}
            onChange={() => toggleFile(f)}
          />
          <span>{f.split("/").pop()}</span>
        </label>
      ))}
    </div>
  ) : (
    <p>No uploaded files found</p>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl neon-text mb-4">File Transfer</h2>

      <div className="mb-4">
        <h3>Select files to transfer:</h3>
        {fileList}
      </div>

      <input
        type="email"
        placeholder="Optional email to send link"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 bg-black/40 rounded mb-2"
      />

      <button
        onClick={transfer}
        className="px-4 py-2 border rounded mb-4 bg-blue-600 text-white"
      >
        Create Transfer
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-900 text-white">
          <div>
            <strong>Download Link:</strong>{" "}
            <a href={`https://file-organiser-backend.onrender.com${result.link}`} target="_blank" rel="noopener noreferrer" className="underline">
              {`https://file-organiser-backend.onrender.com${result.link}`}
            </a>
          </div>

          <div className="mt-4">
            <strong>QR Code:</strong>
            <div className="mt-2 p-2 bg-white inline-block rounded">
              <QRCode value={`https://file-organiser-backend.onrender.com${result.link}`} />
            </div>
          </div>

          <div className="mt-4">
            <a
              href={`https://file-organiser-backend.onrender.com${result.link}`}
              className="px-3 py-2 bg-green-500 text-white rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download ZIP
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
