import React, { useState } from "react";
import axios from "axios";

export default function Organize({ uploadedFiles, setUploadedFiles }) {
  const [files, setFiles] = useState([]);
  const [zipInfo, setZipInfo] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";

  function handleFileChange(e) {
    setFiles(Array.from(e.target.files));
  }

  async function upload() {
    if (files.length === 0) return alert("Select files first!");
    const fd = new FormData();
    files.forEach(f => fd.append("files", f));

    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const savedFiles = res.data.saved || [];
      setUploadedFiles(savedFiles); // Update shared state
      alert("Files uploaded. You can now process them in other tabs.");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  }

  async function organize() {
    if (!uploadedFiles.length) return alert("No uploaded files to organize!");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/organize`, { files: uploadedFiles });
      setZipInfo(res.data);
    } catch (err) {
      console.error(err);
      alert("Organize failed.");
    }
  }

  return (
    <div>
      <h2 className="text-2xl neon-text mb-4">Organize & Zip</h2>
      <input type="file" multiple onChange={handleFileChange} className="mb-4 border p-2 rounded w-full" />
      <div className="space-x-2 mb-4">
        <button onClick={upload} className="px-4 py-2 border rounded bg-black text-white hover:neon-glow">Upload</button>
        <button onClick={organize} className="px-4 py-2 border rounded bg-black text-white hover:neon-glow">Organize</button>
      </div>

      {zipInfo && (
        <div className="mt-4 p-3 border rounded bg-gray-900 text-white">
          <div className="mb-2">Zip ready: {zipInfo.download_token}</div>
          <a href={`${API_BASE_URL}/download/${zipInfo.download_token}`} target="_blank" className="underline text-blue-400">
            Download ZIP
          </a>
        </div>
      )}
    </div>
  );
}
