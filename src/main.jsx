import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Organize from "./pages/Organize";
import Extract from "./pages/Extract";
import Scan from "./pages/Scan";
import Transfer from "./pages/Transfer";
import "./styles.css";

function App() {
  // Shared state for uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white neon-bg p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold neon-text">Neon File Manager</h1>
          <nav className="space-x-4">
            <Link to="/" className="neon-link">Dashboard</Link>
            <Link to="/organize" className="neon-link">Organize</Link>
            <Link to="/extract" className="neon-link">Extract</Link>
            <Link to="/scan" className="neon-link">Scan</Link>
            <Link to="/transfer" className="neon-link">Transfer</Link>
          </nav>
        </header>

        <main className="bg-[rgba(255,255,255,0.02)] p-6 rounded-2xl shadow-neon">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organize" element={<Organize uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />} />
            <Route path="/extract" element={<Extract uploadedFiles={uploadedFiles} />} />
            <Route path="/scan" element={<Scan uploadedFiles={uploadedFiles} />} />
            <Route path="/transfer" element={<Transfer uploadedFiles={uploadedFiles} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
