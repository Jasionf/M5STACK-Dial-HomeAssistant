import { NavLink, Outlet } from "react-router";

export function Layout() {
  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{ background: "#0a0a0a" }}
    >
      {/* Page content */}
      <div className="flex-1 flex items-center justify-center w-full py-10 pb-28">
        <Outlet />
      </div>

      {/* Bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center"
        style={{
          height: 72,
          background: "#0d0d0d",
          borderTop: "1px solid #ffffff0c",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center" style={{ gap: 56 }}>
          {/* Timer tab */}
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              color: isActive ? "#4ade80" : "#ffffff28",
              transition: "color 0.2s",
            })}
          >
            {({ isActive }) => (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? 1.8 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: isActive ? 600 : 400, letterSpacing: "0.1em" }}>
                  TIMER
                </span>
              </>
            )}
          </NavLink>

          {/* Freshness tab */}
          <NavLink
            to="/freshness"
            style={({ isActive }) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              color: isActive ? "#4ade80" : "#ffffff28",
              transition: "color 0.2s",
            })}
          >
            {({ isActive }) => (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? 1.8 : 1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span style={{ fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: isActive ? 600 : 400, letterSpacing: "0.1em" }}>
                  FRESHNESS
                </span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
