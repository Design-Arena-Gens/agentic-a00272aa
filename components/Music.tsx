"use client";
import React, { useEffect, useRef } from "react";

export function Music({ running, timeMs }: { running: boolean; timeMs: number }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const padOscRef = useRef<OscillatorNode | null>(null);
  const arpOscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!running) return;
    if (!ctxRef.current) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      ctxRef.current = ctx;
      const master = ctx.createGain(); master.gain.value = 0.15; master.connect(ctx.destination); gainRef.current = master;
      // Warm pad
      const pad = ctx.createOscillator(); pad.type = "sawtooth"; const padGain = ctx.createGain(); padGain.gain.value = 0.02; pad.connect(padGain).connect(master); pad.start(); padOscRef.current = pad;
      // Soft noise shimmer
      const noise = ctx.createBufferSource(); const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buffer.getChannelData(0); for (let i=0;i<data.length;i++){ data[i] = (Math.random()*2-1) * 0.02; }
      noise.buffer = buffer; const noiseFilter = ctx.createBiquadFilter(); noiseFilter.type = "lowpass"; noiseFilter.frequency.value = 800; noise.connect(noiseFilter);
      const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.05; noiseFilter.connect(noiseGain).connect(master); noise.start();
      // Arp
      const arp = ctx.createOscillator(); arp.type = "triangle"; const arpGain = ctx.createGain(); arpGain.gain.value = 0.03; arp.connect(arpGain).connect(master); arp.start(); arpOscRef.current = arp;
    }
    const ctx = ctxRef.current!;
    const pad = padOscRef.current!; const arp = arpOscRef.current!;

    const update = () => {
      const t = timeMs / 1000;
      const base = 110; // A2
      const chord = [0, 7, 12]; // A, E, A
      const detune = Math.sin(t*0.15)*5;
      pad.frequency.setValueAtTime(base * Math.pow(2, 1/12 * chord[0]), ctx.currentTime);
      (pad as any).detune?.setValueAtTime(detune, ctx.currentTime);
      // Arp sequence 1-5-8-10 over time
      const steps = [0, 7, 12, 15];
      const step = Math.floor(t * 4) % steps.length;
      const freq = base * Math.pow(2, steps[step]/12);
      arp.frequency.setValueAtTime(freq, ctx.currentTime);
      if (running) requestAnimationFrame(update);
    };
    const req = requestAnimationFrame(update);
    return () => cancelAnimationFrame(req);
  }, [running, timeMs]);

  useEffect(() => {
    return () => {
      padOscRef.current?.stop();
      arpOscRef.current?.stop();
      ctxRef.current?.close();
    };
  }, []);

  return null;
}
