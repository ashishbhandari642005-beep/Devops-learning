import { useEffect, useState } from "react";
import axios from "axios";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tickets")
      .then((res) => setTickets(res.data))
      .catch((err) => console.log(err));
  }, []);

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

            <p>{item.issue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}