import { useState } from "react";

export default function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [autoTicket, setAutoTicket] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const buttonStyle = (active) => ({
    padding: "8px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    background: active ? "#16a34a" : "#e2e8f0",
    color: active ? "white" : "black",
  });

  return (
    <div>
      <h1 style={{ fontSize: "42px", marginBottom: "25px" }}>
        Settings
      </h1>

      <div style={cardStyle}>
        
        <div style={rowStyle}>
          <span>Email Alerts</span>
          <button
            style={buttonStyle(emailAlerts)}
            onClick={() => setEmailAlerts(!emailAlerts)}
          >
            {emailAlerts ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div style={rowStyle}>
          <span>SMS Notifications</span>
          <button
            style={buttonStyle(smsAlerts)}
            onClick={() => setSmsAlerts(!smsAlerts)}
          >
            {smsAlerts ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div style={rowStyle}>
          <span>Auto Ticket Creation</span>
          <button
            style={buttonStyle(autoTicket)}
            onClick={() => setAutoTicket(!autoTicket)}
          >
            {autoTicket ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div style={rowStyle}>
          <span>System Theme</span>
          <button
            style={buttonStyle(darkMode)}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Dark" : "Light"}
          </button>
        </div>

      </div>
    </div>
  );
}