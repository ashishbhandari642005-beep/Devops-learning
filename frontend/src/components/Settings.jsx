import { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const rowStyle = {
    background: "white",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    marginBottom: "16px",
  };

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Settings
      </h1>

      <div style={rowStyle}>
        <h3>Dark Mode</h3>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background: darkMode ? "#16a34a" : "#e2e8f0",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Enabled" : "Disabled"}
        </button>
      </div>

      <div style={rowStyle}>
        <h3>Email Alerts</h3>
        <button
          onClick={() => setEmailAlerts(!emailAlerts)}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background: emailAlerts ? "#16a34a" : "#e2e8f0",
            cursor: "pointer",
          }}
        >
          {emailAlerts ? "Enabled" : "Disabled"}
        </button>
      </div>

      <div style={rowStyle}>
        <h3>Auto Refresh Monitoring</h3>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background: autoRefresh ? "#16a34a" : "#e2e8f0",
            cursor: "pointer",
          }}
        >
          {autoRefresh ? "Enabled" : "Disabled"}
        </button>
      </div>
    </div>
  );
}