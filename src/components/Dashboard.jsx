export default function Dashboard() {
  const cards = [
    { title: "Total Devices", value: "128" },
    { title: "Online Systems", value: "119" },
    { title: "Active Alerts", value: "9" },
    { title: "Open Tickets", value: "14" },
  ];

  const usage = [
    { name: "CPU Usage", value: 72 },
    { name: "RAM Usage", value: 58 },
    { name: "Disk Usage", value: 81 },
    { name: "Network Load", value: 46 },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Dashboard Overview
      </h1>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "16px",
          marginBottom: "25px",
        }}
      >
        {cards.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ color: "#64748b" }}>{item.title}</p>
            <h2 style={{ fontSize: "34px", marginTop: "10px" }}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Usage Section */}
      <div
        style={{
          background: "white",
          padding: "22px",
          borderRadius: "14px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>System Usage</h2>

        {usage.map((item, index) => (
          <div key={index} style={{ marginBottom: "18px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>

            <div
              style={{
                height: "10px",
                background: "#e2e8f0",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  width: `${item.value}%`,
                  height: "10px",
                  background: "#2563eb",
                  borderRadius: "20px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}