import { useState, useEffect, useRef } from "react";

// Mirroring your exact color palette for seamless integration
const C = { 
  cream: "#f7f3ea", 
  cream2: "#ede7d5", 
  navy: "#1a3260", 
  blue: "#2d4a7a", 
  lblue: "#4a6a9a", 
  border: "#b8c8e0", 
  green: "#4a7a5a" 
};

// Simplified copy of your ScrollReveal helper to keep this file independent
function LocalScrollReveal({ children, direction = "up", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    return direction === "up" ? "translateY(30px)" : "translate(0,0)";
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ── 1. COUNTDOWN COMPONENT ──────────────────────────────────
// ── 1. REDESIGNED LUXURY COUNTDOWN COMPONENT ────────────────
// ── REDESIGNED COUNTDOWN WITH BACKGROUND MASK ────────────────
export function Countdown() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-07-11T00:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => { setTimeLeft(calculateTimeLeft()); }, 1000);
    return () => clearTimeout(timer);
  });

  const parts = [
    { label: "Days", val: timeLeft.days || "00" },
    { label: "Hours", val: timeLeft.hours || "00" },
    { label: "Minutes", val: timeLeft.mins || "00" },
    { label: "Seconds", val: timeLeft.secs || "00" },
  ];

  return (
    <LocalScrollReveal direction="up">
      {/* 
        NEW SOLID MASK WRAPPER: 
        Spans 100% width with your exact page background color (C.cream2 / #ede7d5).
        This cuts off the vertical lines completely so they don't bleed through.
      */}
      <div style={{ width: "100%", background: "#ede7d5", padding: "50px 0 70px", position: "relative", zIndex: 2 }}>
        
        <div style={{ margin: "0 auto", maxWidth: 660, padding: "0 24px", boxSizing: "border-box" }}>
          
          {/* Main Card Container */}
          <div style={{ 
            background: "rgba(255, 255, 255, 0.55)", // Slightly higher opacity to look crisp over the solid mask
            border: `1px solid ${C.border}`, 
            padding: "40px 20px 35px", 
            position: "relative",
            boxShadow: "0 10px 35px rgba(45, 74, 122, 0.04)",
            backdropFilter: "blur(6px)",
            borderRadius: "2px"
          }}>
            
            {/* Elegant Fine-Line Corner Notches */}
            {[
              { top: 10, left: 10, borderTop: `1px solid ${C.navy}`, borderLeft: `1px solid ${C.navy}` },
              { top: 10, right: 10, borderTop: `1px solid ${C.navy}`, borderRight: `1px solid ${C.navy}` },
              { bottom: 10, left: 10, borderBottom: `1px solid ${C.navy}`, borderLeft: `1px solid ${C.navy}` },
              { bottom: 10, right: 10, borderBottom: `1px solid ${C.navy}`, borderRight: `1px solid ${C.navy}` },
            ].map((styleProps, index) => (
              <div key={index} style={{ position: "absolute", width: 14, height: 14, opacity: 0.35, ...styleProps }} />
            ))}

            {/* Minimalist Intro Header */}
            <p style={{ 
              fontFamily: "'Cinzel', serif", 
              fontSize: "0.65rem", 
              color: C.lblue, 
              letterSpacing: "0.28em", 
              textTransform: "uppercase", 
              marginBottom: 28, 
              textAlign: "center",
              opacity: 0.85
            }}>
              The Countdown Begun
            </p>

            {/* Balanced Time Display Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
              {parts.map((p, i) => (
                <div 
                  key={i} 
                  style={{ 
                    textAlign: "center", 
                    position: "relative",
                    borderRight: i < 3 ? `1px solid rgba(45, 74, 122, 0.12)` : "none" 
                  }}
                >
                  <p style={{ 
                    fontFamily: "'Playfair Display', Georgia, serif", 
                    fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", 
                    fontWeight: 400, 
                    color: C.navy, 
                    margin: 0,
                    lineHeight: 1
                  }}>
                    {String(p.val).padStart(2, '0')}
                  </p>
                  <p style={{ 
                    color: C.lblue, 
                    fontSize: "0.62rem", 
                    letterSpacing: "0.18em", 
                    textTransform: "uppercase", 
                    marginTop: 8, 
                    fontFamily: "'Cinzel', serif" 
                  }}>
                    {p.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </LocalScrollReveal>
  );
}
// ── 2. AUDIO PLAYER COMPONENT ───────────────────────────────
export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  // Note: Swap this placeholder link with a real URL to your instrumental tracks later
  const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;
    return () => { audioRef.current.pause(); };
  }, []);

  const toggle = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => console.log("Playback interaction flag triggered."));
    }
    setPlaying(!playing);
  };

  return (
    <div style={{ position: "fixed", bottom: 22, left: 22, zIndex: 9999 }}>
      <button 
        onClick={toggle}
        style={{ background: C.cream, border: `1px solid ${C.border}`, color: C.navy, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", transition: "all 0.3s ease" }}
      >
        {playing ? (
          <span style={{ display: "flex", gap: 2.5, alignItems: "flex-end", height: 14 }}>
            <span style={{ width: 2, height: 14, background: C.navy, animation: "pulse 1s infinite alternate" }} />
            <span style={{ width: 2, height: 8, background: C.navy, animation: "pulse 0.7s infinite alternate" }} />
            <span style={{ width: 2, height: 12, background: C.navy, animation: "pulse 1.2s infinite alternate" }} />
          </span>
        ) : (
          <span style={{ fontSize: "0.8rem", transform: "translateX(1px)" }}>▶</span>
        )}
      </button>
    </div>
  );
}

// ── 4. VENUE MAP BUTTON COMPONENT ───────────────────────────
export function VenueMapButton() {
  const MAPS_URL = "https://maps.google.com/?q=Mass+Auditorium+Thrikkavu+Ponnani";

  return (
    <LocalScrollReveal direction="up" delay={0.2}>
      <div style={{ marginTop: 45, padding: "30px 24px", border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.45)", display: "inline-block", borderRadius: 4, width: "100%", maxWidth: 460, boxSizing: "border-box" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: C.navy, marginBottom: 6 }}>Finding Your Way</p>
        <p style={{ fontSize: "0.9rem", color: C.lblue, marginBottom: 20, fontStyle: "italic" }}>Join us at Thrikkavu, Ponnani. Click below for live navigation routes.</p>
        <a 
          href={MAPS_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: "inline-block", textDecoration: "none", padding: "12px 32px", background: C.navy, color: C.cream, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Cinzel', serif", transition: "all 0.3s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = C.blue}
          onMouseLeave={(e) => e.currentTarget.style.background = C.navy}
        >
          📍 Open Google Maps
        </a>
      </div>
    </LocalScrollReveal>
  );
}