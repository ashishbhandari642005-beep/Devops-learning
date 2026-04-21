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
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "20px",
          fontWeight: "700",
        }}
      >
        Support Tickets
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#f8fafc",
              textAlign: "left",
            }}
          >
            <tr>
              <th style={{ padding: "14px" }}>Ticket ID</th>
              <th style={{ padding: "14px" }}>Issue</th>
              <th style={{ padding: "14px" }}>Status</th>
              <th style={{ padding: "14px" }}>Created</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((item) => (
              <tr
                key={item._id}
                style={{
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <td style={{ padding: "14px", fontWeight: "600" }}>
                  {item.id}
                </td>

                <td style={{ padding: "14px" }}>
                  {item.issue}
                </td>

                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      background: `${color(item.status)}20`,
                      color: color(item.status),
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td style={{ padding: "14px", color: "#64748b" }}>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <p
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No tickets found
          </p>
        )}
      </div>
    </div>
  );
}