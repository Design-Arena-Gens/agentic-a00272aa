"use client";
import React from "react";
import { ProfessionAvatars } from "./ProfessionAvatars";

export function SuccessScenes({ t }: { t: number }) {
  return (
    <div style={{ position: "relative", width: "100%", height: 360 }}>
      <div style={{ position: "absolute", left: "8%", top: 40 }} className="fade-in">
        <Handshake />
        <div style={{ textAlign: "center", marginTop: 8 }}>Shaking hands</div>
      </div>
      <div style={{ position: "absolute", right: "8%", top: 40 }} className="fade-in">
        <Laptop />
        <div style={{ textAlign: "center", marginTop: 8 }}>Using laptops</div>
      </div>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: 12 }} className="fade-in">
        <ProfessionAvatars t={t} mode="success" />
      </div>
    </div>
  );
}

function Handshake() {
  return (
    <svg width="280" height="160" viewBox="0 0 280 160">
      <defs>
        <linearGradient id="hs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffbf69" />
          <stop offset="100%" stopColor="#f6d365" />
        </linearGradient>
        <filter id="soft">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <path d="M40,80 C60,40 120,40 140,80" stroke="url(#hs)" strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M140,80 C160,120 220,120 240,80" stroke="url(#hs)" strokeWidth="18" fill="none" strokeLinecap="round" />
      <circle cx="140" cy="80" r="10" fill="#ffd8a8" filter="url(#soft)" />
    </svg>
  );
}

function Laptop() {
  return (
    <svg width="280" height="160" viewBox="0 0 280 160">
      <defs>
        <linearGradient id="lap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#56ccf2" />
          <stop offset="100%" stopColor="#2f9ee8" />
        </linearGradient>
      </defs>
      <rect x="60" y="40" width="160" height="90" rx="10" fill="#0e1726" stroke="#2f9ee8" />
      <rect x="70" y="50" width="140" height="70" rx="8" fill="url(#lap)" opacity="0.6" />
      <rect x="40" y="130" width="200" height="16" rx="6" fill="#13233e" />
    </svg>
  );
}
