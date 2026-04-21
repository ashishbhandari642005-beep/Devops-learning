import { useEffect, useState } from "react";
import axios from "axios";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const color = (level) => {
    if (level === "Critical") return "#dc2626";
    if (level === "Warning") return "#f59e0b";
    return "#2563eb";
  };

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        System Alerts
      </h1>

      <div style={{ display: "grid", gap: "16px" }}>
        {filteredAlerts.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "18px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              borderLeft: `5px solid ${color(item.level)}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <h3>{item.title}</h3>
            </div>

            <p style={{ color: "#64748b", marginBottom: "10px" }}>
              {item.message}
            </p>

            <span
              style={{
                background: `${color(item.level)}20`,
                color: color(item.level),
                padding: "5px 10px",
                borderRadius: "20px",
                fontSize: "13px",
              }}
            >
              {item.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}