import { useEffect, useState } from "react";
import axios from "axios";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    console.log("Fetching alerts...");

    axios
      .get("http://localhost:5000/api/alerts")
      .then((res) => {
        console.log(res.data);
        setAlerts(res.data);
      })
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
        {alerts.map((item, index) => (
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
            <h3>{item.title}</h3>

            <p>{item.message}</p>

            <span>{item.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}