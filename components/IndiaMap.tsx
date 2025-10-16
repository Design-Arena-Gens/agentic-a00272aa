"use client";
import React, { useEffect, useMemo, useRef } from "react";

type Props = { t: number };

type City = { name: string; x: number; y: number };

const CITIES: City[] = [
  { name: "Delhi", x: 300, y: 140 },
  { name: "Chandigarh", x: 280, y: 120 },
  { name: "Jaipur", x: 280, y: 170 },
  { name: "Ahmedabad", x: 220, y: 220 },
  { name: "Mumbai", x: 220, y: 280 },
  { name: "Pune", x: 230, y: 300 },
  { name: "Bengaluru", x: 320, y: 360 },
  { name: "Hyderabad", x: 350, y: 300 },
  { name: "Chennai", x: 360, y: 380 },
  { name: "Kolkata", x: 480, y: 220 },
  { name: "Bhopal", x: 320, y: 230 },
  { name: "Nagpur", x: 320, y: 280 },
  { name: "Lucknow", x: 360, y: 170 },
  { name: "Patna", x: 420, y: 190 },
  { name: "Guwahati", x: 560, y: 190 }
];

const LINKS = [
  ["Delhi", "Jaipur"], ["Delhi", "Lucknow"], ["Ahmedabad", "Mumbai"],
  ["Mumbai", "Pune"], ["Pune", "Bengaluru"], ["Hyderabad", "Bengaluru"],
  ["Hyderabad", "Chennai"], ["Delhi", "Kolkata"], ["Kolkata", "Patna"],
  ["Patna", "Guwahati"], ["Bhopal", "Nagpur"], ["Nagpur", "Hyderabad"],
  ["Lucknow", "Patna"], ["Jaipur", "Ahmedabad"]
] as const;

export function IndiaMap({ t }: Props) {
  const w = 800; const h = 480;
  const glowId = useMemo(() => `glow-${Math.round(Math.random()*1e6)}`, []);
  const sweepId = useMemo(() => `sweep-${Math.round(Math.random()*1e6)}`, []);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const scale = devicePixelRatio || 1; canvas.width = w * scale; canvas.height = h * scale; canvas.style.width = w+"px"; canvas.style.height = h+"px"; ctx.scale(scale, scale);

    ctx.clearRect(0,0,w,h);
    // background grid glow
    ctx.globalAlpha = 0.25; ctx.strokeStyle = "#22495a"; ctx.lineWidth = 1;
    for (let gx = 0; gx <= w; gx += 40) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,h); ctx.stroke(); }
    for (let gy = 0; gy <= h; gy += 40) { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(w,gy); ctx.stroke(); }
    ctx.globalAlpha = 1;

    // draw connections with sweeps
    const progress = (Math.sin(t/800) + 1) / 2; // 0..1 oscillation
    LINKS.forEach(([aName,bName], i) => {
      const a = CITIES.find(c=>c.name===aName)!; const b = CITIES.find(c=>c.name===bName)!;
      const p = (progress + i * 0.07) % 1;
      const cx = a.x + (b.x - a.x) * p; const cy = a.y + (b.y - a.y) * p;
      // base line
      ctx.strokeStyle = "rgba(86, 204, 242, 0.35)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      // glow sweep
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 36);
      grad.addColorStop(0, "rgba(255, 191, 105, 0.9)");
      grad.addColorStop(1, "rgba(255, 191, 105, 0)");
      ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI*2); ctx.fill();
    });

    // draw cities
    CITIES.forEach((c, i) => {
      ctx.fillStyle = i % 2 ? "#56ccf2" : "#ffbf69";
      ctx.beginPath(); ctx.arc(c.x, c.y, 6, 0, Math.PI*2); ctx.fill();
      ctx.shadowColor = ctx.fillStyle as string; ctx.shadowBlur = 12;
      ctx.fillStyle = "#eaf6ff"; ctx.font = "12px Inter, sans-serif"; ctx.fillText(c.name, c.x + 10, c.y - 10);
      ctx.shadowBlur = 0;
    });

    // title
    ctx.fillStyle = "#eaf6ff"; ctx.font = "bold 20px Inter, sans-serif";
    ctx.fillText("India • Connections glow between cities", 16, 32);
  }, [t]);

  return (
    <div style={{ display: "grid", placeItems: "center", padding: 8 }}>
      <svg width={w} height={h} style={{ position: "absolute", opacity: 0.08 }}>
        <defs>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="12" result="blur"/>
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={sweepId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#56ccf2" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffbf69" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={`url(#${sweepId})`} filter={`url(#${glowId})`} />
      </svg>
      <canvas ref={canvasRef} width={w} height={h} style={{ borderRadius: 14, boxShadow: "var(--glow)" }} />
    </div>
  );
}
