import React, { useEffect, useState } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [stats, setStats] = useState({ organized: 0, extracted: 0, sent: 0, scanned: 0, zipped: 0, errors: 0 });

  useEffect(() => {
    // simulate stats
    setStats({ organized: 12, extracted: 3, sent: 5, scanned: 17, zipped: 14, errors: 2 });

    const ctx = document.getElementById('barChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Organized', 'Extracted', 'Sent', 'Scanned', 'Zipped', 'Errors'],
          datasets: [{ label: 'Counts', data: [12, 3, 5, 17, 14, 2], borderWidth: 1, backgroundColor: 'rgba(255,255,0,0.7)' }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 neon-text">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 file-card">Organized: <strong>{stats.organized}</strong></div>
        <div className="p-4 file-card">Extracted: <strong>{stats.extracted}</strong></div>
        <div className="p-4 file-card">Sent: <strong>{stats.sent}</strong></div>
        <div className="p-4 file-card">Scanned: <strong>{stats.scanned}</strong></div>
        <div className="p-4 file-card">Zipped: <strong>{stats.zipped}</strong></div>
        <div className="p-4 file-card">Errors: <strong>{stats.errors}</strong></div>
      </div>
      <canvas id="barChart" height="100"></canvas>
    </div>
  );
}
