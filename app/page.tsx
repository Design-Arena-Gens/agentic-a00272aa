"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProfessionAvatars } from "../components/ProfessionAvatars";
import { IndiaMap } from "../components/IndiaMap";
import { SuccessScenes } from "../components/SuccessScenes";
import { Music } from "../components/Music";

const TOTAL_DURATION_MS = 30000;

export default function Home() {
  const [startTs, setStartTs] = useState<number | null>(null);
  const [now, setNow] = useState<number>(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setStartTs(Date.now());
  }, []);

  useEffect(() => {
    if (startTs == null) return;
    const tick = () => {
      setNow(Date.now() - startTs);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [startTs]);

  const phase = useMemo(() => {
    const t = Math.min(now, TOTAL_DURATION_MS);
    if (t < 9000) return 0; // people searching
    if (t < 18000) return 1; // india map connections
    if (t < 25500) return 2; // happy success actions
    return 3; // end card
  }, [now]);

  return (
    <main className="main">
      <div className="title">Free Referrals Across India – Inspire Reach</div>
      <div className="scene" style={{ opacity: phase === 0 ? 1 : 0, transition: "opacity 1s ease" }}>
        <div className="card fade-in" style={{ maxWidth: 980, width: "92%" }}>
          <div className="badge">Real People • Real Connections</div>
          <h1 className="scene-title glow-text" style={{ marginTop: 12 }}>Looking for trusted contacts</h1>
          <p className="scene-sub">Designers, factory workers, engineers, marketers — across India.</p>
          <ProfessionAvatars t={now} mode="search" />
        </div>
      </div>

      <div className="scene" style={{ opacity: phase === 1 ? 1 : 0, transition: "opacity 1s ease" }}>
        <div className="card fade-in" style={{ maxWidth: 1100, width: "93%", padding: 18 }}>
          <IndiaMap t={now} />
        </div>
      </div>

      <div className="scene" style={{ opacity: phase === 2 ? 1 : 0, transition: "opacity 1s ease" }}>
        <div className="card fade-in" style={{ maxWidth: 1000, width: "92%" }}>
          <h2 className="scene-title glow-text">Connections spark opportunities</h2>
          <p className="scene-sub">Shaking hands, using laptops, smiles after getting connected.</p>
          <SuccessScenes t={now} />
        </div>
      </div>

      <div className="scene" style={{ opacity: phase === 3 ? 1 : 0, transition: "opacity 1s ease" }}>
        <div className="card fade-in" style={{ textAlign: "center", padding: 36, maxWidth: 820 }}>
          <div className="scene-title glow-text" style={{ marginBottom: 8 }}>Free Referrals Across India</div>
          <div className="scene-sub" style={{ fontSize: 22, marginBottom: 4 }}>Inspire Reach</div>
          <div className="scene-sub" style={{ fontSize: 16 }}>📩 inspirereach.solutions@gmail.com</div>
        </div>
      </div>

      <div className="cta">
        <button className="button" onClick={() => setStartTs(Date.now())}>Replay 30s</button>
        <button className="button secondary" onClick={() => setAudioEnabled(true)}>
          {audioEnabled ? "Sound On" : "Enable Sound"}
        </button>
      </div>

      <div className="footer-text">Warm lighting • Smooth transitions • Inspirational background music</div>

      {audioEnabled && <Music running={audioEnabled} timeMs={now} />}
    </main>
  );
}
