export default function Alerts() {
  const alerts = [
    {
      title: "Lab-PC-47 Offline",
      message: "Device has been disconnected for 12 minutes.",
      level: "Critical",
      time: "2 min ago",
    },
    {
      title: "High CPU Usage",
      message: "Lab-PC-12 CPU reached 91%.",
      level: "Warning",
      time: "10 min ago",
    },
    {
      title: "Low Disk Space",
      message: "Server-01 disk usage reached 95%.",
      level: "Critical",
      time: "18 min ago",
    },
    {
      title: "RAM Usage High",
      message: "Lab-PC-33 RAM crossed 80%.",
      level: "Info",
      time: "30 min ago",
    },
  ];

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <h3>{item.title}</h3>
              <span style={{ color: "#64748b", fontSize: "13px" }}>
                {item.time}
              </span>
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