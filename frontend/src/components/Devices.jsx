import { useEffect, useState } from "react";
import axios from "axios";

export default function Devices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/devices")
      .then((res) => setDevices(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getColor = (status) => {
    if (status === "Online") return "#16a34a";
    if (status === "Warning") return "#f59e0b";
    if (status === "Offline") return "#dc2626";
    return "#64748b";
  };
  const raiseTicket = async (device) => {
    try {
      await axios.post("http://localhost:5000/api/tickets", {
        id: "TK-" + Math.floor(Math.random() * 1000),
        issue: `${device.name} keyboard not working`,
        status: "Open"
      });

      alert("Ticket Raised Successfully");
    } catch (error) {
      console.log(error);
    }
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
              <th style={{ padding: "14px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredDevices.map((item, index) => (
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

                <td style={{ padding: "14px" }}>{item.cpu}%</td>
                <td style={{ padding: "14px" }}>{item.ram}%</td>

                <td style={{ padding: "14px" }}>
                  <button
                    onClick={() => raiseTicket(item)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Raise Ticket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}