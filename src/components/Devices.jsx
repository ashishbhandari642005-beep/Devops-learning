export default function Devices() {
  const devices = [
    {
      name: "Lab-PC-01",
      lab: "Lab A",
      ip: "192.168.1.10",
      status: "Online",
      cpu: "45%",
      ram: "52%",
    },
    {
      name: "Lab-PC-12",
      lab: "Lab A",
      ip: "192.168.1.12",
      status: "Warning",
      cpu: "88%",
      ram: "76%",
    },
    {
      name: "Lab-PC-47",
      lab: "Lab B",
      ip: "192.168.1.47",
      status: "Offline",
      cpu: "--",
      ram: "--",
    },
    {
      name: "Server-01",
      lab: "Server Room",
      ip: "192.168.10.1",
      status: "Online",
      cpu: "55%",
      ram: "80%",
    },
  ];

  const getColor = (status) => {
    if (status === "Online") return "#16a34a";
    if (status === "Warning") return "#f59e0b";
    if (status === "Offline") return "#dc2626";
  };

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Devices Management
      </h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "12px" }}>Device Name</th>
              <th style={{ padding: "12px" }}>Lab</th>
              <th style={{ padding: "12px" }}>IP Address</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>CPU</th>
              <th style={{ padding: "12px" }}>RAM</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <td style={{ padding: "14px" }}>{item.name}</td>
                <td style={{ padding: "14px" }}>{item.lab}</td>
                <td style={{ padding: "14px" }}>{item.ip}</td>

                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      background: `${getColor(item.status)}20`,
                      color: getColor(item.status),
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td style={{ padding: "14px" }}>{item.cpu}</td>
                <td style={{ padding: "14px" }}>{item.ram}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}