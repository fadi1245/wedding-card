// ============================================================
// WEDDING INVITATION — Raseena Iqbal & Fahick Faisal
// ============================================================
import { useState, useRef, useId, useEffect } from "react";
import mainWeddingImage from "./assets/mainphoto.jpeg"; 
import cardPhoto from "./assets/cardphoto.jpeg";
import greetingphoto from "./assets/caligra3.png"
import {VenueMapButton } from "./components/invitationExtras.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Note: Adjust the relative path (e.g., "../assets/main.png") depending on where this file sits.

const HERO_IMAGE = mainWeddingImage
const COUPLE_IMAGE = cardPhoto

const WEDDING = {
  brideName: "Raseena Iqbal", groomName: "Fahick Faisal",
  brideParents: "D/o Mr. Mohammad Iqbal and Mrs. Nadeera Iqbal",
  brideAddress: "CP House, Thattanpadi P.O, Edappal · Mob: 7034105203",
  groomParents: "S/o Mr. Mohammad Faisal and Mumthas Mariyam",
  groomAddress: "AP House, Eshwaramanghalam, Ponnani",
  fullDate: "Saturday, July 11, 2026", hijriDate: "26 Muharram 1448",
  event: "Venue", venue: "Mass Auditorium", address: "Thrikkavu, Ponnani",
  sharingFamilies: "CP Family & Kadugothel Family", year: "2026",
  lunchtime: "11:30 am - 2:00 pm"
};

const C = { cream: "#f7f3ea", cream2: "#ede7d5", navy: "#1a3260", blue: "#2d4a7a", lblue: "#4a6a9a", border: "#b8c8e0", green: "#4a7a5a" };
const STORAGE_KEY = "wedding_rsvps_v2";

function loadRsvps() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveRsvps(list) {
  if (typeof window !== "undefined") { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
}

function FloralCorner({ pos, size = 110 }) {
  const placement = { tl: { top: 0, left: 0 }, tr: { top: 0, right: 0 }, bl: { bottom: 0, left: 0 }, br: { bottom: 0, right: 0 } }[pos];
  const sx = pos === "tr" || pos === "br" ? -1 : 1, sy = pos === "bl" || pos === "br" ? -1 : 1;
  return (
    <div style={{ position: "absolute", width: size, height: size, pointerEvents: "none", zIndex: 2, ...placement }}>
      <svg viewBox="0 0 110 110" width={size} height={size} style={{ transform: `scale(${sx},${sy})`, transformOrigin: "center", display: "block" }}>
        <g fill="none" stroke={C.blue} strokeWidth="0.7" opacity="0.5">
          <path d="M4 4 Q32 9 52 32 Q72 55 106 58" /><path d="M4 4 Q9 32 32 52 Q55 72 58 106" />
        </g>
        {[0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5].map((a, i) => {
          const cx = 20 + 6.5 * Math.cos((a * Math.PI) / 180), cy = 20 + 6.5 * Math.sin((a * Math.PI) / 180);
          return <ellipse key={i} cx={cx} cy={cy} rx="3.8" ry="1.8" transform={`rotate(${a} ${cx} ${cy})`} fill={C.blue} opacity="0.32" />;
        })}
        <circle cx="20" cy="20" r="2.8" fill={C.blue} opacity="0.45" /><circle cx="20" cy="20" r="1.1" fill={C.cream} opacity="0.9" />
        {[[38, 13], [13, 38], [56, 38], [38, 56], [72, 52], [52, 72]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="2.2" fill={C.blue} opacity="0.18" />)}
        {[[30, 30, 45], [18, 52, 80], [52, 18, 10], [64, 64, 45], [16, 66, 82], [66, 16, 8]].map(([cx, cy, rot], i) => <ellipse key={i} cx={cx} cy={cy} rx="4.5" ry="1.8" transform={`rotate(${rot} ${cx} ${cy})`} fill={C.green} opacity="0.3" />)}
        <line x1="2" y1="3" x2="2" y2="107" stroke={C.blue} strokeWidth="0.45" opacity="0.28" /><line x1="3" y1="2" x2="107" y2="2" stroke={C.blue} strokeWidth="0.45" opacity="0.28" />
      </svg>
    </div>
  );
}

function SideStrip({ side }) {
  const reactId = useId(), safeId = `ss-${side}-${reactId.replace(/:/g, "")}`;
  return (
    <div style={{ position: "absolute", top: 90, bottom: 90, [side]: 0, width: 28, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
      <svg width="28" height="100%">
        <defs>
          <pattern id={safeId} width="28" height="52" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={C.blue} strokeWidth="0.6" opacity="0.38">
              <path d="M14 0 Q7 13 14 26 Q21 39 14 52" />
              <ellipse cx="8" cy="9" rx="4.5" ry="1.8" transform="rotate(-35 8 9)" fill={C.blue} opacity="0.25" />
              <ellipse cx="20" cy="31" rx="4.5" ry="1.8" transform="rotate(35 20 31)" fill={C.blue} opacity="0.25" />
              <ellipse cx="9" cy="24" rx="3.8" ry="1.5" transform="rotate(-12 9 24)" fill={C.green} opacity="0.24" />
              <ellipse cx="20" cy="10" rx="3.8" ry="1.5" transform="rotate(12 20 10)" fill={C.green} opacity="0.24" />
              <circle cx="14" cy="26" r="2.2" fill={C.blue} opacity="0.18" />
            </g>
            <line x1={side === "left" ? 27 : 1} y1="0" x2={side === "left" ? 27 : 1} y2="52" stroke={C.blue} strokeWidth="0.4" opacity="0.22" />
          </pattern>
        </defs>
        <rect width="28" height="100%" fill={`url(#${safeId})`} />
      </svg>
    </div>
  );
}

function HStrip({ pos }) {
  const reactId = useId(), safeId = `hs-${pos}-${reactId.replace(/:/g, "")}`;
  return (
    <div style={{ position: "absolute", left: 90, right: 90, [pos]: 0, height: 28, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
      <svg height="28" width="100%">
        <defs>
          <pattern id={safeId} width="52" height="28" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={C.blue} strokeWidth="0.6" opacity="0.38">
              <path d="M0 14 Q13 7 26 14 Q39 21 52 14" />
              <ellipse cx="9" cy="8" rx="4.5" ry="1.8" transform="rotate(-35 9 8)" fill={C.blue} opacity="0.25" />
              <ellipse cx="43" cy="20" rx="4.5" ry="1.8" transform="rotate(35 43 20)" fill={C.blue} opacity="0.25" />
              <ellipse cx="11" cy="20" rx="3.8" ry="1.5" transform="rotate(12 11 20)" fill={C.green} opacity="0.24" />
              <ellipse cx="41" cy="8" rx="3.8" ry="1.5" transform="rotate(-12 41 8)" fill={C.green} opacity="0.24" />
              <circle cx="26" cy="14" r="2.2" fill={C.blue} opacity="0.18" />
            </g>
            <line x1="0" y1={pos === "top" ? 27 : 1} x2="52" y2={pos === "top" ? 27 : 1} stroke={C.blue} strokeWidth="0.4" opacity="0.22" />
          </pattern>
        </defs>
        <rect height="28" width="100%" fill={`url(#${safeId})`} />
      </svg>
    </div>
  );
}

// ── Decorative divider (Commented out) ──────────────────────
// function Divider({ className = "" }) { return ( <div className={`flex items-center justify-center gap-3 ${className}`}><div style={{ height: 1, width: 52, background: C.blue, opacity: 0.35 }} /><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke={C.blue} strokeWidth="0.8" opacity="0.6" /><line x1="0" y1="9" x2="5.5" y2="9" stroke={C.blue} strokeWidth="0.7" opacity="0.45" /><line x1="12.5" y1="9" x2="18" y2="9" stroke={C.blue} strokeWidth="0.7" opacity="0.45" /><line x1="9" y1="0" x2="9" y2="5.5" stroke={C.blue} strokeWidth="0.7" opacity="0.35" /><line x1="9" y1="12.5" x2="9" y2="18" stroke={C.blue} strokeWidth="0.7" opacity="0.35" /></svg><div style={{ height: 1, width: 52, background: C.blue, opacity: 0.35 }} /></div> ); }

function ScrollOrnament() {
  return (
    <div style={{ textAlign: "center", margin: "8px 0" }}>
      <svg viewBox="0 0 200 28" width="180" height="26">
        <g fill="none" stroke={C.blue} strokeWidth="0.85" opacity="0.48">
          <path d="M12 14 Q60 3 100 14 Q140 25 188 14" /><path d="M12 14 Q60 25 100 14 Q140 3 188 14" />
          <path d="M10 14 C1 7 1 21 10 14" fill={C.blue} opacity="0.28" /><path d="M190 14 C199 7 199 21 190 14" fill={C.blue} opacity="0.28" />
          <path d="M97 10 L100 6 L103 10 L100 14 Z" fill={C.blue} opacity="0.42" />
          <ellipse cx="52" cy="8" rx="5" ry="2" transform="rotate(-18 52 8)" fill={C.green} opacity="0.3" />
          <ellipse cx="148" cy="20" rx="5" ry="2" transform="rotate(18 148 20)" fill={C.green} opacity="0.3" />
          <ellipse cx="70" cy="20" rx="4" ry="1.7" transform="rotate(24 70 20)" fill={C.green} opacity="0.26" />
          <ellipse cx="130" cy="8" rx="4" ry="1.7" transform="rotate(-24 130 8)" fill={C.green} opacity="0.26" />
        </g>
      </svg>
    </div>
  );
}

// ── FadeIn wrapper ──────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <div className={className} style={{ animation: "fadeUp 0.9s ease forwards", animationDelay: `${delay}ms`, opacity: 0 }}>
      {children}
    </div>
  );
}

// ── Hero Section ────────────────────────────────────────────
// ── Hero Section ────────────────────────────────────────────
function Hero({ onRsvpClick }) {
  return (
    <section style={{ position: "relative", minHeight: "100vh", width: "100vw", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Background Image — Fully stretched */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      {/* Color Overlay — Fully stretched */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(247,243,234,0.75)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(ellipse at center, transparent 35%, rgba(45,74,122,0.15) 100%)" }} />

      <FloralCorner pos="tl" size={130} />
      <FloralCorner pos="tr" size={130} />
      <FloralCorner pos="bl" size={130} />
      <FloralCorner pos="br" size={130} />
      <SideStrip side="left" />
      <SideStrip side="right" />
      <HStrip pos="top" />
      <HStrip pos="bottom" />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "15px 32px 40px" }}>
        <FadeIn delay={100}>
          <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <img
                src={greetingphoto}
                alt="Family"
                style={{
                  width: "100%",
                  maxWidth: "120px",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>       
             </FadeIn>

        <FadeIn delay={200}>
          <p style={{ color: C.blue, fontSize: "0.88rem", lineHeight: 1.75, marginBottom: 18, fontStyle: "italic", fontFamily: "'EB Garamond', serif" }}>
            {WEDDING.brideParents}<br />{WEDDING.brideAddress}
          </p>
        </FadeIn>

        <FadeIn delay={270}>
          <p style={{ color: C.lblue, fontSize: "0.84rem", fontStyle: "italic", fontFamily: "'EB Garamond', serif", marginBottom: 14 }}>cordially invite you to the marriage of their daughter</p>
        </FadeIn>

        <FadeIn delay={360}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.8rem, 8vw, 5.5rem)", fontWeight: 400, lineHeight: 1.08, color: C.navy, margin: "0 0 2px" }}>{WEDDING.brideName}</h1>
        </FadeIn>

        <FadeIn delay={430}>
          <ScrollOrnament />
        </FadeIn>

        <FadeIn delay={500}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.8rem, 8vw, 5.5rem)", fontWeight: 400, lineHeight: 1.08, color: C.navy, marginBottom: 6 }}>{WEDDING.groomName}</h1>
        </FadeIn>

        <FadeIn delay={580}>
          <p style={{ color: C.blue, fontSize: "0.88rem", lineHeight: 1.75, marginTop: 10, fontStyle: "italic", fontFamily: "'EB Garamond', serif" }}>
            {WEDDING.groomParents}<br />{WEDDING.groomAddress}
          </p>
        </FadeIn>

        <FadeIn delay={680}></FadeIn>

        <FadeIn delay={780}>
          <p style={{ color: C.lblue, letterSpacing: "0.18em", fontSize: "0.8rem", marginBottom: 4, marginTop: 20 }}>{WEDDING.fullDate}</p>
          <p style={{ color: C.lblue, fontSize: "0.75rem", letterSpacing: "0.12em" }}>{WEDDING.hijriDate}</p>
        </FadeIn>

        <FadeIn delay={920}>
          <button
            onClick={onRsvpClick}
            style={{ marginTop: 36, padding: "12px 40px", border: `1px solid ${C.navy}`, color: C.navy, background: "rgba(247,243,234,0.55)", fontSize: "0.74rem", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Cinzel', serif", transition: "all 0.26s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.cream; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(247,243,234,0.55)"; e.currentTarget.style.color = C.navy; }}
          >
            Join Us
          </button>
        </FadeIn>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", opacity: 0.45 }}>
        <div style={{ width: 1, height: 40, background: C.blue, animation: "pulse 2s ease infinite" }} />
      </div>
    </section>
  );
}

// ── Animation Helper ────────────────────────────────────────
function ScrollReveal({ children, direction = "up", delay = 0, duration = 1, style = {} }) {
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    if (direction === "up") return "translateY(40px)";
    if (direction === "down") return "translateY(-40px)";
    if (direction === "left") return "translateX(-40px)";
    if (direction === "right") return "translateX(40px)";
    return "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Details Section ─────────────────────────────────────────
function Details() {
  return (
    <section style={{ background: C.cream2, padding: "100px 24px", width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        
        <ScrollReveal direction="up">
          <p style={{ color: C.lblue, letterSpacing: "0.3em", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Cinzel', serif" }}>
            <span style={{ margin: "0 10px", opacity: 0.5 }}>✧</span>
            The Celebration
            <span style={{ margin: "0 10px", opacity: 0.5 }}>✧</span>
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem, 4vw, 2.5rem)", fontWeight: 400, color: C.navy, marginBottom: 50 }}>
            You are cordially invited
          </h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 30 }}>
          {[
            { icon: "📅", label: "Date", value: WEDDING.fullDate, sub: WEDDING.hijriDate },
            { icon: "🏛️", label: WEDDING.event, value: WEDDING.venue, sub: WEDDING.address },
            { icon: "🍽️", label: "Lunch", value: WEDDING.lunchtime },
          ].map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.15} direction="up">
              <div className="detail-card" style={{ border: `1px solid ${C.border}`, padding: "40px 24px", background: "rgba(255,255,255,0.5)", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", transition: "all 0.4s ease" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: 16, opacity: 0.9 }}>{item.icon}</div>
                <p style={{ color: C.lblue, letterSpacing: "0.14em", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Cinzel', serif" }}>{item.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: C.navy, margin: 0 }}>{item.value}</p>
                {item.sub && ( <p style={{ color: C.lblue, fontSize: "0.95rem", marginTop: 10, fontStyle: "italic" }}>{item.sub}</p> )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} direction="up">
          <div style={{ marginTop: 70, display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 260, height: 340 }} className="img-container">
              <img src={COUPLE_IMAGE} alt="The couple" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(15%) brightness(0.95) contrast(1.05)", transition: "all 0.6s ease" }} />
              {[
                { top: -6, left: -6, borderTop: `1.5px solid ${C.navy}`, borderLeft: `1.5px solid ${C.navy}` },
                { top: -6, right: -6, borderTop: `1.5px solid ${C.navy}`, borderRight: `1.5px solid ${C.navy}` },
                { bottom: -6, left: -6, borderBottom: `1.5px solid ${C.navy}`, borderLeft: `1.5px solid ${C.navy}` },
                { bottom: -6, right: -6, borderBottom: `1.5px solid ${C.navy}`, borderRight: `1.5px solid ${C.navy}` },
              ].map((s, i) => (
                <div key={i} className="img-corner" style={{ position: "absolute", width: 30, height: 30, opacity: 0.6, transition: "all 0.4s ease", ...s }} />
              ))}
            </div>
          </div>
        </ScrollReveal>
         <VenueMapButton/>
      </div>
    </section>
  );
}

// ── RSVP Section ────────────────────────────────────────────
function RsvpSection({ onSubmit, rsvpRef }) {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!answer) { setError("Please select your attendance."); return; }
    onSubmit({ name: name.trim(), answer, timestamp: new Date().toISOString() });
    setSubmitted(true);
    setError("");
  }

  return (
    <section ref={rsvpRef} style={{ background: C.cream, padding: "100px 24px", position: "relative", borderTop: `1px solid ${C.border}`, width: "100vw", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        
        <ScrollReveal direction="up">
          <p style={{ color: C.lblue, letterSpacing: "0.3em", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Cinzel', serif" }}>Kindly Reply</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 400, color: C.navy, marginBottom: 30 }}>Will you join us?</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="up">
          {submitted ? (
            <div style={{ border: `1px solid ${C.border}`, padding: "50px 24px", background: "rgba(255,255,255,0.6)", animation: "fadeUp 0.6s ease" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 16 }}>{answer === "yes" ? "🤍" : "🌿"}</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: C.navy, marginBottom: 12, lineHeight: 1.5 }}>
                {answer === "yes" ? "Jazakallah Khair! We look forward to celebrating with you." : "You will be dearly missed. May Allah bless you."}
              </p>
              <p style={{ color: C.lblue, fontSize: "0.85rem", fontStyle: "italic" }}>— {name}</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 22, textAlign: "left", background: "rgba(255,255,255,0.3)", padding: "30px", border: `1px solid ${C.border}` }}>
              <div>
                <label style={{ display: "block", color: C.blue, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Cinzel', serif" }}>Your Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={{ width: "100%", border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.8)", color: C.navy, padding: "14px 16px", fontSize: "0.95rem", fontFamily: "'EB Garamond', serif", outline: "none", boxSizing: "border-box", transition: "all 0.3s ease" }} />
              </div>

              <div>
                <p style={{ color: C.blue, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Cinzel', serif" }}>Attendance</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <button onClick={() => setAnswer("yes")} style={{ padding: "16px 8px", border: `1px solid ${answer === "yes" ? C.navy : C.border}`, background: answer === "yes" ? C.navy : "rgba(255,255,255,0.6)", color: answer === "yes" ? C.cream : C.blue, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Cinzel', serif", transition: "all 0.3s ease", transform: answer === "yes" ? "scale(1.02)" : "scale(1)" }}>✓ &nbsp;Yes, I'll be there</button>
                  <button onClick={() => setAnswer("no")} style={{ padding: "16px 8px", border: `1px solid ${answer === "no" ? "#7a2d2d" : C.border}`, background: answer === "no" ? "#7a2d2d" : "rgba(255,255,255,0.6)", color: answer === "no" ? C.cream : C.blue, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Cinzel', serif", transition: "all 0.3s ease", transform: answer === "no" ? "scale(1.02)" : "scale(1)" }}>✗ &nbsp;Can't make it</button>
                </div>
              </div>

              {error && ( <p style={{ color: "#7a2d2d", fontSize: "0.85rem", margin: 0, animation: "fadeUp 0.3s ease" }}>{error}</p> )}

              <button className="rsvp-submit-btn" onClick={handleSubmit} style={{ background: C.navy, color: C.cream, border: "none", padding: "16px", fontSize: "0.8rem", letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Cinzel', serif", marginTop: 8, transition: "all 0.3s ease" }}>let us know of your presence</button>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── Admin Dashboard ─────────────────────────────────────────
// function Dashboard({ rsvps }) {
//   const [open, setOpen] = useState(false);
//   const yes = rsvps.filter((r) => r.answer === "yes");
//   const no = rsvps.filter((r) => r.answer === "no");

//   return (
//     <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999 }}>
//       <button
//         onClick={() => setOpen((o) => !o)}
//         style={{ background: C.navy, color: C.cream, border: "none", borderRadius: 30, padding: "12px 24px", fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "pointer", fontFamily: "'Cinzel', serif", boxShadow: "0 8px 24px rgba(26,50,96,0.3)", transition: "all 0.3s ease" }}
//       >
//         {open ? "Close" : `📋 Responses (${rsvps.length})`}
//       </button>

//       {open && (
//         <div style={{ position: "absolute", bottom: 60, right: 0, width: 300, background: C.cream, border: `1px solid ${C.border}`, padding: 20, maxHeight: "65vh", overflowY: "auto", boxShadow: "0 12px 40px rgba(26,50,96,0.2)", borderRadius: "4px", animation: "fadeUp 0.3s ease-out" }}>
//           <p style={{ fontFamily: "'Playfair Display', serif", color: C.navy, fontSize: "1rem", margin: "0 0 16px", borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>RSVP Dashboard</p>
          
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
//             {[
//               ["Attending", yes.length, "#1a6a3a"],
//               ["Declined", no.length, "#7a2d2d"],
//             ].map(([label, count, color]) => (
//               <div key={label} style={{ background: "rgba(45,74,122,0.05)", padding: "12px 8px", textAlign: "center", borderRadius: 4 }}>
//                 <p style={{ margin: 0, fontSize: "1.8rem", color, fontWeight: 300 }}>{count}</p>
//                 <p style={{ margin: "4px 0 0", fontSize: "0.65rem", color: C.lblue, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</p>
//               </div>
//             ))}
//           </div>

//           {yes.length > 0 && (
//             <div style={{ marginBottom: 16 }}>
//               <p style={{ margin: "0 0 8px", fontSize: "0.7rem", color: "#1a6a3a", letterSpacing: "0.12em", textTransform: "uppercase" }}>Attending</p>
//               {yes.map((r, i) => (
//                 <div key={i} style={{ fontSize: "0.85rem", color: C.navy, padding: "5px 0", borderBottom: `0.5px solid ${C.border}` }}>
//                   ✓ {r.name}
//                 </div>
//               ))}
//             </div>
//           )}

//           {no.length > 0 && (
//             <div style={{ marginBottom: 16 }}>
//               <p style={{ margin: "0 0 8px", fontSize: "0.7rem", color: "#7a2d2d", letterSpacing: "0.12em", textTransform: "uppercase" }}>Can't Attend</p>
//               {no.map((r, i) => (
//                 <div key={i} style={{ fontSize: "0.85rem", color: C.navy, padding: "5px 0", borderBottom: `0.5px solid ${C.border}` }}>
//                   ✗ {r.name}
//                 </div>
//               ))}
//             </div>
//           )}

//           {rsvps.length === 0 && (
//             <p style={{ color: C.lblue, fontSize: "0.85rem", textAlign: "center", padding: "20px 0", fontStyle: "italic" }}>No responses yet</p>
//           )}

//           {rsvps.length > 0 && (
//             <button
//               onClick={() => { saveRsvps([]); window.location.reload(); }}
//               style={{ marginTop: 12, width: "100%", padding: "10px", background: "rgba(122,45,45,0.05)", border: `1px solid rgba(122,45,45,0.2)`, color: "#7a2d2d", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s ease" }}
//             >
//               Clear All (Admin)
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// ── Footer ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.cream2, borderTop: `1px solid ${C.border}`, padding: "80px 24px 60px", textAlign: "center", width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
      <ScrollReveal direction="up">
        <div style={{ marginBottom: 24, color: C.lblue, opacity: 0.6, fontSize: "1.2rem" }}>✧</div>
        
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: C.navy, marginBottom: 8, letterSpacing: "0.05em" }}>
          {WEDDING.brideName} <span style={{ fontStyle: "italic", color: C.lblue }}>&amp;</span> {WEDDING.groomName}
        </p>
        
        <p style={{ color: C.lblue, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
          {WEDDING.fullDate}
        </p>
        
        <p style={{ color: C.lblue, fontSize: "0.75rem", letterSpacing: "0.12em", marginBottom: 30 }}>
          {WEDDING.hijriDate}
        </p>
        
        <p style={{ color: C.navy, fontSize: "0.85rem", marginTop: 24, fontStyle: "italic", fontFamily: "'EB Garamond', serif", opacity: 0.8 }}>
          Sharing the happiness:<br/> 
          <span style={{ fontSize: "0.95rem", display: "inline-block", marginTop: 8 }}>{WEDDING.sharingFamilies}</span>
        </p>
      </ScrollReveal>
    </footer>
  );
}

// ── Main App ────────────────────────────────────────────────
export default function App() {
  const [rsvps, setRsvps] = useState(() => loadRsvps());
  const rsvpRef = useRef(null);

  function scrollToRsvp() {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth" });
  }

async function handleRsvpSubmit(entry) {
  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbwEHwNEh9w2zcZsUhs0uk9EqyWgGhOw8uvMzOr3VTAnwk73lSHlv6FhI49oyTi7k3QkUA/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(entry),
      }
    );

    toast.success("RSVP submitted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to submit RSVP");
  }
}

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=Cinzel:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.cream2}; overflow-x: hidden; }
        ::selection { background: rgba(45,74,122,0.18); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 3px; }
        
        /* Input Enhancements */
        input:focus { border-color: ${C.navy} !important; box-shadow: 0 0 0 3px rgba(45,74,122,0.1); }
        
        /* Interactive Hover Effects */
        .detail-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(45,74,122,0.06); border-color: rgba(45,74,122,0.3) !important; }
        .rsvp-submit-btn:hover { background: ${C.blue} !important; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(45,74,122,0.2); }
        
        /* Image Accent Hover Effect */
        .img-container:hover img { transform: scale(1.03); filter: sepia(10%) brightness(1) contrast(1.1) !important; }
        .img-container:hover .img-corner { width: 40px !important; height: 40px !important; border-width: 2px !important; }
      `}</style>
  <ToastContainer/>
      <div style={{ minHeight: "100vh", fontFamily: "'EB Garamond', Georgia, serif", color: C.navy }}>
        <Hero onRsvpClick={scrollToRsvp} />
        <Details />
        <RsvpSection onSubmit={handleRsvpSubmit} rsvpRef={rsvpRef} />
        <Footer />
        {/* <Dashboard rsvps={rsvps} /> */}
      </div>
    </>
  );
}