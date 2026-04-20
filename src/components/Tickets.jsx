export default function Tickets() {
  const tickets = [
    {
      id: "#TK-101",
      issue: "Mouse not working on Lab-PC-33",
      status: "Open",
      assigned: "Pending",
      date: "20 Apr",
    },
    {
      id: "#TK-102",
      issue: "Windows boot error on Lab-PC-12",
      status: "In Progress",
      assigned: "Ravi",
      date: "20 Apr",
    },
    {
      id: "#TK-103",
      issue: "Printer offline in Lab B",
      status: "Resolved",
      assigned: "Ankit",
      date: "19 Apr",
    },
    {
      id: "#TK-104",
      issue: "Projector not connecting",
      status: "Open",
      assigned: "Pending",
      date: "18 Apr",
    },
  ];

  const color = (status) => {
    if (status === "Open") return "#dc2626";
    if (status === "In Progress") return "#f59e0b";
    return "#16a34a";
  };

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Support Tickets
      </h1>

      <div style={{ display: "grid", gap: "16px" }}>
        {tickets.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "18px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h3>{item.id}</h3>
              <span style={{ color: "#64748b" }}>{item.date}</span>
            </div>

            <p style={{ marginBottom: "10px" }}>{item.issue}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Assigned: {item.assigned}</span>

              <span
                style={{
                  background: `${color(item.status)}20`,
                  color: color(item.status),
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}