import img1 from "../../imports/Frame19/07bfcb317afd8424072d11e2b68c09c30f891365.png";

function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate.replace(/\//g, "-"));
  const today = new Date("2026-04-03");
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatShortDate(dateStr: string): string {
  const parts = dateStr.split("/");
  return `${parts[1].padStart(2, "0")}/${parts[2].padStart(2, "0")}`;
}

interface ItemData {
  item: string;
  emoji: string;
  startDate: string;
  endDate: string;
}

const PALETTE = {
  safe:    { accent: "#4ade80", dim: "#166534", glow: "#4ade8033", label: "SAFE" },
  warning: { accent: "#fb923c", dim: "#9a3412", glow: "#fb923c33", label: "SOON" },
  expired: { accent: "#f87171", dim: "#7f1d1d", glow: "#f8717133", label: "EXPIRED" },
};

function WatchCard({ item, emoji, startDate, endDate }: ItemData) {
  const daysLeft = getDaysRemaining(endDate);
  const status = daysLeft <= 0 ? "expired" : daysLeft <= 2 ? "warning" : "safe";
  const { accent, dim, glow, label } = PALETTE[status];

  // Progress arc: 0–100% of shelf life consumed
  const start = new Date(startDate.replace(/\//g, "-")).getTime();
  const end   = new Date(endDate.replace(/\//g, "-")).getTime();
  const today = new Date("2026-04-03").getTime();
  const pct   = Math.min(1, Math.max(0, (today - start) / (end - start)));

  // SVG arc math
  const R = 26, cx = 32, cy = 32, stroke = 3.5;
  const circumference = 2 * Math.PI * R;
  const dashOffset = circumference * (1 - pct);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 240, height: 240 }}
    >
      {/* Watch face */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 32%, #222 0%, #0d0d0d 65%, #000 100%)",
          boxShadow: `0 0 0 1px #ffffff0a, 0 0 32px ${glow}`,
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 flex items-stretch"
        style={{
          width: 184,
          background: "#161614",
          border: `1px solid ${accent}28`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 0 0 0.5px #ffffff08, 0 8px 24px #00000066`,
        }}
      >
        {/* LEFT — shield anchor */}
        <div
          className="flex flex-col items-center justify-center gap-[6px] flex-shrink-0"
          style={{
            width: 68,
            background: dim + "44",
            borderRight: `1px solid ${accent}18`,
            paddingTop: 14,
            paddingBottom: 14,
          }}
        >
          {/* Arc progress ring around shield */}
          <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
            <svg
              width={64}
              height={64}
              viewBox="0 0 64 64"
              style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
            >
              {/* Track */}
              <circle
                cx={cx} cy={cy} r={R}
                fill="none"
                stroke="#ffffff0f"
                strokeWidth={stroke}
              />
              {/* Progress */}
              <circle
                cx={cx} cy={cy} r={R}
                fill="none"
                stroke={accent}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>

            {/* Shield icon centered in ring */}
            <div
              className="relative z-10 flex items-center justify-center"
              style={{
                width: 38,
                height: 38,
                background: dim + "88",
                borderRadius: 10,
                boxShadow: `0 0 12px ${glow}`,
              }}
            >
              <img
                src={img1}
                alt={label}
                style={{ width: 22, height: 22, objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Status label */}
          <span
            style={{
              fontSize: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: accent,
            }}
          >
            {label}
          </span>
        </div>

        {/* RIGHT — info */}
        <div
          className="flex flex-col justify-center"
          style={{ flex: 1, padding: "14px 14px 14px 13px", gap: 8 }}
        >
          {/* Item name + emoji */}
          <div className="flex items-center gap-[6px]">
            <span style={{ fontSize: 17, lineHeight: 1 }}>{emoji}</span>
            <span
              className="text-white"
              style={{
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1,
              }}
            >
              {item}
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ffffff0c" }} />

          {/* Dates */}
          <div className="flex flex-col" style={{ gap: 5 }}>
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  color: "#ffffff38",
                  letterSpacing: "0.06em",
                }}
              >
                START
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  color: "#ffffff70",
                }}
              >
                {formatShortDate(startDate)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  color: "#ffffff38",
                  letterSpacing: "0.06em",
                }}
              >
                END
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 400,
                  color: "#ffffff70",
                }}
              >
                {formatShortDate(endDate)}
              </span>
            </div>
          </div>

          {/* Days remaining pill */}
          <div
            style={{
              marginTop: 2,
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 4,
              background: dim + "55",
              border: `1px solid ${accent}30`,
              borderRadius: 999,
              padding: "2px 8px",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
                boxShadow: `0 0 5px ${accent}`,
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: accent,
              }}
            >
              {daysLeft <= 0 ? "Expired" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExpiryTracker() {
  const items: ItemData[] = [
    { item: "Milk",  emoji: "🥛", startDate: "2026/4/1",  endDate: "2026/4/5"  },
    { item: "Eggs",  emoji: "🥚", startDate: "2026/3/28", endDate: "2026/4/10" },
    { item: "Bread", emoji: "🍞", startDate: "2026/4/2",  endDate: "2026/4/4"  },
  ];

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
          FRESHNESS TRACKER
        </span>
        <div style={{ width: 32, height: 1, background: "#ffffff12" }} />
      </div>

      {/* Cards */}
      <div className="flex flex-col items-center" style={{ gap: 8 }}>
        {items.map((d) => (
          <WatchCard key={d.item} {...d} />
        ))}
      </div>
    </div>
  );
}
