import { useState, useEffect, useRef, useCallback } from "react";

const PRESETS = [
  { label: "1'",  seconds: 60   },
  { label: "3'",  seconds: 180  },
  { label: "5'",  seconds: 300  },
  { label: "10'", seconds: 600  },
  { label: "15'", seconds: 900  },
  { label: "30'", seconds: 1800 },
];

function getColor(pct: number, done: boolean) {
  if (done)      return { accent: "#f87171", dim: "#7f1d1d", glow: "#f8717140" };
  if (pct > 0.5) return { accent: "#4ade80", dim: "#166534", glow: "#4ade8033" };
  if (pct > 0.2) return { accent: "#fb923c", dim: "#9a3412", glow: "#fb923c33" };
  return          { accent: "#f87171", dim: "#7f1d1d", glow: "#f8717140" };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function KitchenTimer() {
  const [total, setTotal]       = useState(300); // 5 min default
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning]   = useState(false);
  const [done, setDone]         = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pct   = total > 0 ? remaining / total : 0;
  const { accent, dim, glow } = getColor(pct, done);

  // SVG arc
  const SIZE = 280;
  const cx = SIZE / 2, cy = SIZE / 2;
  const R  = 110;
  const STROKE = 8;
  const circumference = 2 * Math.PI * R;
  const dashOffset = circumference * (1 - pct);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const tick = useCallback(() => {
    setRemaining((prev) => {
      if (prev <= 1) {
        setRunning(false);
        setDone(true);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, tick]);

  function selectPreset(secs: number) {
    setRunning(false);
    setDone(false);
    setTotal(secs);
    setRemaining(secs);
  }

  function toggleRunning() {
    if (done) return;
    setRunning((r) => !r);
  }

  function reset() {
    setRunning(false);
    setDone(false);
    setRemaining(total);
  }

  // Blink effect when done
  const [blinkOn, setBlinkOn] = useState(true);
  useEffect(() => {
    if (!done) { setBlinkOn(true); return; }
    const id = setInterval(() => setBlinkOn((b) => !b), 500);
    return () => clearInterval(id);
  }, [done]);

  return (
    <div className="flex flex-col items-center" style={{ gap: 32 }}>
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 6 }}>
        <span
          style={{
            fontSize: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "#ffffff30",
          }}
        >
          KITCHEN TIMER
        </span>
        <div style={{ width: 32, height: 1, background: "#ffffff12" }} />
      </div>

      {/* Watch face */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 38% 32%, #222 0%, #0d0d0d 65%, #000 100%)",
            boxShadow: `0 0 0 1px #ffffff0a, 0 0 40px ${glow}`,
            transition: "box-shadow 0.6s ease",
          }}
        />

        {/* Arc ring */}
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="#ffffff08"
            strokeWidth={STROKE}
          />
          {/* Tick marks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
            const isMajor = i % 5 === 0;
            const inner = R - (isMajor ? 14 : 9);
            const outer = R - (isMajor ? 6 : 5);
            const x1 = cx + Math.cos(angle) * inner;
            const y1 = cy + Math.sin(angle) * inner;
            const x2 = cx + Math.cos(angle) * outer;
            const y2 = cy + Math.sin(angle) * outer;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#ffffff14"
                strokeWidth={isMajor ? 1.5 : 0.8}
                strokeLinecap="round"
              />
            );
          })}
          {/* Progress */}
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke={accent}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.6s ease" }}
          />
        </svg>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center" style={{ gap: 6 }}>
          {/* Time display */}
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 64,
              fontWeight: 300,
              color: done ? (blinkOn ? accent : "#ffffff20") : "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}
          >
            {pad(minutes)}<span style={{ color: accent, opacity: running ? (blinkOn ? 1 : 0.3) : 1, transition: "opacity 0.3s" }}>:</span>{pad(seconds)}
          </div>

          {/* Status */}
          <span
            style={{
              fontSize: 9,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: done ? accent : running ? accent + "bb" : "#ffffff28",
              transition: "color 0.4s ease",
            }}
          >
            {done ? "TIME'S UP" : running ? "RUNNING" : remaining === total ? "READY" : "PAUSED"}
          </span>
        </div>
      </div>

      {/* Preset chips */}
      <div className="flex items-center flex-wrap justify-center" style={{ gap: 8, maxWidth: 280 }}>
        {PRESETS.map((p) => {
          const active = total === p.seconds && !done;
          return (
            <button
              key={p.label}
              onClick={() => selectPreset(p.seconds)}
              style={{
                padding: "5px 14px",
                borderRadius: 999,
                border: `1px solid ${active ? accent + "60" : "#ffffff14"}`,
                background: active ? dim + "66" : "#161614",
                color: active ? accent : "#ffffff50",
                fontSize: 11,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: active ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: active ? `0 0 10px ${glow}` : "none",
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center" style={{ gap: 16 }}>
        {/* Reset */}
        <button
          onClick={reset}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1px solid #ffffff14",
            background: "#161614",
            color: "#ffffff40",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#ffffff30"; (e.currentTarget as HTMLElement).style.color = "#ffffff80"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#ffffff14"; (e.currentTarget as HTMLElement).style.color = "#ffffff40"; }}
        >
          {/* Reset icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>

        {/* Play / Pause */}
        <button
          onClick={toggleRunning}
          disabled={done}
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: `1.5px solid ${done ? "#ffffff10" : accent + "60"}`,
            background: done ? "#161614" : dim + "66",
            color: done ? "#ffffff20" : accent,
            cursor: done ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: done ? "none" : `0 0 20px ${glow}`,
            transition: "all 0.3s ease",
          }}
        >
          {running ? (
            /* Pause icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : (
            /* Play icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>

        {/* +1 min */}
        <button
          onClick={() => {
            if (done) return;
            const add = 60;
            setTotal((t) => t + add);
            setRemaining((r) => r + add);
          }}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1px solid #ffffff14",
            background: "#161614",
            color: "#ffffff40",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            flexDirection: "column",
            gap: 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#ffffff30"; (e.currentTarget as HTMLElement).style.color = "#ffffff80"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#ffffff14"; (e.currentTarget as HTMLElement).style.color = "#ffffff40"; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span style={{ fontSize: 7, letterSpacing: "0.05em" }}>1 MIN</span>
        </button>
      </div>
    </div>
  );
}
