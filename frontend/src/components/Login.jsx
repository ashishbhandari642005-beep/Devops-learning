import { useState } from "react";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("login", "true");
      setIsLoggedIn(true);
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", justifyContent: "center",
      alignItems: "center", background: "#f1f5f9", fontFamily: "'DM Sans', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600&display=swap" rel="stylesheet" />

      <div style={{
        background: "white", borderRadius: "20px", padding: "40px 36px",
        width: "400px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        position: "relative", overflow: "hidden"
      }}>
        {/* Accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "4px",
          background: "linear-gradient(90deg, #185FA5, #5DCAA5)"
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px",
            background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 3L2 8l10 5 10-5-10-5zm0 7.5L4.5 6.75 12 3.5l7.5 3.25L12 10.5zm-7.5 2.25L12 16.5l7.5-3.75v2.5L12 19l-7.5-3.75v-2.5z" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#1e293b" }}>
            Campus<span style={{ color: "#185FA5" }}>Ops</span>
          </span>
        </div>

        <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "28px", lineHeight: "1.5" }}>
          Welcome back. Sign in to access your campus dashboard.
        </p>

        {/* Username */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: "500", color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Username
          </label>
          <input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(false); }}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%", padding: "11px 14px", fontSize: "14px",
              border: `1px solid ${error ? "#E24B4A" : "#e2e8f0"}`,
              borderRadius: "10px", background: "#f8fafc", outline: "none",
              color: "#1e293b", boxSizing: "border-box"
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: "500", color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%", padding: "11px 14px", fontSize: "14px",
              border: `1px solid ${error ? "#E24B4A" : "#e2e8f0"}`,
              borderRadius: "10px", background: "#f8fafc", outline: "none",
              color: "#1e293b", boxSizing: "border-box"
            }}
          />
        </div>

        {error && (
          <p style={{ color: "#E24B4A", fontSize: "13px", marginTop: "8px" }}>
            Invalid username or password. Please try again.
          </p>
        )}

        <button
          onClick={login}
          style={{
            width: "100%", marginTop: "20px", padding: "12px",
            background: "#185FA5", color: "white", border: "none",
            borderRadius: "11px", fontSize: "15px", fontWeight: "600",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em"
          }}
        >
          Sign In →
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#cbd5e1" }}>
          Secured by CampusOps · v2.4
        </p>
      </div>
    </div>
  );
}