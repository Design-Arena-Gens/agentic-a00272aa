"use client";
import React, { useMemo } from "react";

type Props = { t: number; mode: "search" | "success" };

const PROFESSIONS = [
  { label: "Designer", color: "#ff9a9e" },
  { label: "Factory", color: "#ffd166" },
  { label: "Engineer", color: "#56ccf2" },
  { label: "Marketer", color: "#b28dff" }
];

function Avatar({ label, color, x, y, look = 0 }: { label: string; color: string; x: number; y: number; look?: number; }) {
  const eyeOffset = Math.sin(look) * 2;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <radialGradient id={`g-${label}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${label}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <circle cx="60" cy="60" r="50" fill={color} opacity={0.85} />
        <circle cx="60" cy="60" r="50" fill={`url(#g-${label})`} />
        <g filter={`url(#blur-${label})`} opacity="0.45">
          <circle cx="60" cy="60" r="50" fill={color} />
        </g>
        <circle cx={46 + eyeOffset} cy="55" r="6" fill="#1a1a1a" />
        <circle cx={74 + eyeOffset} cy="55" r="6" fill="#1a1a1a" />
        <path d="M40,78 Q60,92 80,78" stroke="#1a1a1a" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: "center", marginTop: 6, fontWeight: 600, color: "#e6f2ff" }}>{label}</div>
    </div>
  );
}

export function ProfessionAvatars({ t, mode }: Props) {
  const positions = useMemo(() => {
    return [
      { x: 200, y: 180 },
      { x: 420, y: 140 },
      { x: 660, y: 200 },
      { x: 900, y: 160 }
    ];
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: 340, marginTop: 12 }}>
      {PROFESSIONS.map((p, i) => (
        <Avatar key={p.label} label={p.label} color={p.color}
          x={positions[i].x} y={positions[i].y}
          look={mode === "search" ? (t / 500 + i) : 0}
        />
      ))}
      {mode === "search" && (
        <div style={{ position: "absolute", bottom: 8, left: 16, right: 16, textAlign: "center", opacity: 0.9 }}>
          They seek trusted contacts in new cities and industries.
        </div>
      )}
    </div>
  );
}
