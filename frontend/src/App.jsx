import axios from "axios";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
//import Settings from "./components/Settings";

export default function App() {
     const [emailAlerts, setEmailAlerts] = useState(true);
     const [smsAlerts, setSmsAlerts] = useState(false);
     const [autoTicket, setAutoTicket] = useState(true);
     const [darkMode, setDarkMode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );
const [page, setPage] = useState(
  localStorage.getItem("page") || "Dashboard"
);

const [devices, setDevices] = useState([]);
const [alerts, setAlerts] = useState([]);
const [tickets, setTickets] = useState([]);

const [search, setSearch] = useState("");
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  useEffect(() => {

  const loadData = () => {

    // DEVICES
    axios
      .get("http://localhost:5000/api/devices")
      .then((res) => {

        setDevices(res.data);

        res.data.forEach((device) => {

          const deviceOffline =
            device.status === "Offline";

          if (deviceOffline && autoTicket) {

            axios.post(
              "http://localhost:5000/api/tickets",
              {
                id:
                  "TK-" +
                  Math.floor(Math.random() * 10000),

                issue:
                  `${device.name} is Offline`,

                status: "Open"
              }
            );

          }

        });

      })
      .catch((err) => console.log(err));

    // ALERTS
    axios
      .get("http://localhost:5000/api/alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) => console.log(err));

    // TICKETS
    axios
      .get("http://localhost:5000/api/tickets")
      .then((res) => setTickets(res.data))
      .catch((err) => console.log(err));

  };

  loadData();

  const timer = setInterval(loadData, 5000);

  return () => clearInterval(timer);

}, [autoTicket]);
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  const filteredDevices = devices.filter((item) =>
  item.name?.toLowerCase().includes(search.toLowerCase()) ||
  item.lab?.toLowerCase().includes(search.toLowerCase()) ||
  item.ip?.toLowerCase().includes(search.toLowerCase())
);

const filteredAlerts = alerts.filter((item) =>
  item.title?.toLowerCase().includes(search.toLowerCase()) ||
  item.message?.toLowerCase().includes(search.toLowerCase()) ||
  item.level?.toLowerCase().includes(search.toLowerCase())
);

const filteredTickets = tickets.filter((item) =>
  item.id?.toLowerCase().includes(search.toLowerCase()) ||
  item.issue?.toLowerCase().includes(search.toLowerCase()) ||
  item.status?.toLowerCase().includes(search.toLowerCase())
);
  const menuItems = [
  "Dashboard",
  "Devices",
  "Alerts",
  "Tickets",
  "Settings",
];

const onlineDevices = devices.filter(
  (d) => d.status === "Online"
);


const onlineCount = onlineDevices.length;

const activeAlerts = alerts.length;

const openTickets = tickets.filter(
  (t) => t.status !== "Resolved"
).length;

const stats = [
  { title: "Total Devices", value: devices.length },
  { title: "Online Now", value: onlineCount },
  { title: "Active Alerts", value: activeAlerts },
  { title: "Open Tickets", value: openTickets },
];

const avgCPU =
  onlineCount > 0
    ? (
        onlineDevices.reduce(
          (sum, d) => sum + Number(d.cpu || 0),
          0
        ) / onlineCount
      ).toFixed(1)
    : 0;

const avgRAM =
  onlineCount > 0
    ? (
        onlineDevices.reduce(
          (sum, d) => sum + Number(d.ram || 0),
          0
        ) / onlineCount
      ).toFixed(1)
    : 0;

const avgDisk =
  devices.length > 0
    ? (
        devices.reduce(
          (sum, d) => sum + Number(d.disk || 0),
          0
        ) / devices.length
      ).toFixed(1)
    : 0;

const usageData = [
  ["CPU", avgCPU],
  ["RAM", avgRAM],
  ["Disk", avgDisk],
];
const raiseManualTicket = async () => {
  const issue = prompt("Enter issue:");

  if (!issue) return;

  try {
    await axios.post(
      "http://localhost:5000/api/tickets",
      {
        id: "TK-" + Math.floor(Math.random() * 1000),
        issue,
        status: "Open"
      }
    );

    const res = await axios.get(
      "http://localhost:5000/api/tickets"
    );

    setTickets(res.data);

    alert("Ticket Raised Successfully");
  } catch (error) {
    console.log(error);
  }
};
const closeTicket = async (mongoId) => {
  try {
    await axios.patch(
      `http://localhost:5000/api/tickets/${mongoId}`
    );

    const res = await axios.get (
      "http://localhost:5000/api/tickets"
    );

    setTickets(res.data);
  } catch (error) {
    console.log(error);
  }
};
  const getStatusColor = (status) => {
    if (status === "Online") return "#16a34a";
    if (status === "Warning") return "#f59e0b";
    if (status === "Offline") return "#dc2626";
    if (status === "Critical") return "#dc2626";
    if (status === "Resolved") return "#16a34a";
    if (status === "Open") return "#2563eb";
    if (status === "In Progress") return "#f59e0b";
    return "#64748b";
  };

  const cardStyle = {
  background: darkMode
    ? "#1e293b"
    : "white",

  color: darkMode
    ? "white"
    : "black",

  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  };
 

  const renderDashboard = () => (
    <>
      <h1 style={{ fontSize: "30px", marginBottom: "22px" }}>
        Dashboard Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "18px",
          marginBottom: "24px",
        }}
      >
        {stats.map((item, index) => (
          <div key={index} style={cardStyle}>
            <p style={{ color: "#64748b", marginBottom: "10px" }}>
              {item.title}
            </p>
            <h2 style={{ fontSize: "38px" }}>{item.value}</h2>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "18px",
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "20px" }}>CPU / RAM Usage</h2>

          {usageData.map((item, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>{item[0]}</span>
                <span>{item[1]}%</span>
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
                    width: `${item[1]}%`,
                    height: "10px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(90deg,#2563eb,#06b6d4)",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginBottom: "18px" }}>Recent Alerts</h2>

          {filteredAlerts.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "12px",
                marginBottom: "12px",
                  borderRadius: "12px",
                background: "#f8fafc",
              }}
            >
              <p style={{ fontWeight: "600" }}>{item.title}</p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  margin: "6px 0",
                }}
              >
                {item.message}
              </p>

              <span
                style={{
                  color: getStatusColor(item.level),
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {item.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderDevices = () => (
    <>
      <h1 style={{ fontSize: "30px", marginBottom: "22px" }}>
        Devices Management
      </h1>

      <div style={cardStyle}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ color: "#64748b", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Device</th>
              <th style={{ padding: "12px" }}>Lab</th>
              <th style={{ padding: "12px" }}>IP</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>CPU</th>
              <th style={{ padding: "12px" }}>RAM</th>
            </tr>
          </thead>

          <tbody>
            {filteredDevices.map((item, i) => (
              <tr key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                <td style={{ padding: "14px" }}>{item.name}</td>
                <td style={{ padding: "14px" }}>{item.lab}</td>
                <td style={{ padding: "14px" }}>{item.ip}</td>

                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      background:
                        getStatusColor(item.status) + "20",
                      color: getStatusColor(item.status),
                      padding: "6px 12px",
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
    </>
  );

  const renderAlerts = () => (
    <>
      <h1 style={{ fontSize: "30px", marginBottom: "22px" }}>
        Alerts Center
      </h1>

      {filteredAlerts.map((item, i) => (
        <div
          key={i}
          style={{
            ...cardStyle,
            marginBottom: "16px",
          }}
        >
          <h3>{item.title}</h3>
          <p style={{ color: "#64748b", margin: "8px 0" }}>
            {item.message}
          </p>

          <span
            style={{
              color: getStatusColor(item.level),
              fontWeight: "600",
            }}
          >
            {item.level}
          </span>
        </div>
      ))}
    </>
  );

  const renderTickets = () => (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "22px"
      }}
    >
      <h1 style={{ fontSize: "30px", margin: 0 }}>
        Support Tickets
      </h1>

  <button
    onClick={raiseManualTicket}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600"
    }}
  >
    + Raise Ticket
  </button>
</div>

    <div
      style={{
        ...cardStyle,
        padding: 0,
        overflow: "hidden"
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead style={{ background: "#f8fafc" }}>
          <tr>
            <th style={{ padding: "14px", textAlign: "left" }}>Ticket ID</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Issue</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Status</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Created</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>

        <tbody>
  {filteredTickets.map((item, i) => (
    <tr
      key={i}
      style={{
        borderTop: "1px solid #e2e8f0"
      }}
    >
      {/* Ticket ID */}
      <td style={{ padding: "14px", fontWeight: "600" }}>
        {item.id}
      </td>

      {/* Issue */}
      <td style={{ padding: "14px" }}>
        {item.issue}
      </td>

      {/* Status */}
      <td style={{ padding: "14px" }}>
        <span
          style={{
            background: `${getStatusColor(item.status)}20`,
            color: getStatusColor(item.status),
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600"
          }}
        >
          {item.status}
        </span>
      </td>

      {/* Created */}
      <td style={{ padding: "14px", color: "#64748b" }}>
        {item.createdAt
          ? new Date(item.createdAt).toLocaleString()
          : "N/A"}
      </td>

      {/* Action */}
      {/* Action */}
        <td style={{ padding: "14px" }}>
          {item.status !== "Resolved" ? (
            <button
              onClick={() => closeTicket(item._id)}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          ) : (
            "Done"
          )}
        </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  </>
);

  const renderSettings = () => {

  const buttonStyle = (active) => ({
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    background: active ? "#16a34a" : "#e2e8f0",
    color: active ? "white" : "black",
  });

  return (
    <>
      <h1 style={{ fontSize: "30px", marginBottom: "22px" }}>
        Settings
      </h1>

      <div style={cardStyle}>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p>Email Alerts</p>

          <button
            style={buttonStyle(emailAlerts)}
            onClick={() =>
              setEmailAlerts(!emailAlerts)
            }
          >
            {emailAlerts ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p>SMS Notifications</p>

          <button
            style={buttonStyle(smsAlerts)}
            onClick={() =>
              setSmsAlerts(!smsAlerts)
            }
          >
            {smsAlerts ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p>Auto Ticket Creation</p>

          <button
            style={buttonStyle(autoTicket)}
            onClick={() =>
              setAutoTicket(!autoTicket)
            }
          >
            {autoTicket ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>System Theme</p>

          <button
            style={buttonStyle(darkMode)}
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? "Dark" : "Light"}
          </button>
        </div>

      </div>
    </>
  );
};
  const renderPage = () => {
    if (page === "Dashboard") return renderDashboard();
    if (page === "Devices") return renderDevices();
    if (page === "Alerts") return renderAlerts();
    if (page === "Tickets") return renderTickets();
    if (page === "Settings")
       return renderSettings();
    
    };

  return (
    <div
          style={{
          display: "flex",
          minHeight: "100vh",
          background: darkMode
            ? "#0f172a"
            : "#f1f5f9",
          color: darkMode
            ? "white"
            : "black",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
      <div
        style={{
          width: "250px",
          background: "#0f172a",
          color: "white",
          padding: "24px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>CampusOps</h2>

        {menuItems.map((item, i) => (
          <div
            key={i}
            onClick={() => setPage(item)}
            style={{
              padding: "14px",
              marginBottom: "10px",
              borderRadius: "12px",
              cursor: "pointer",
              background:
                page === item
                  ? "linear-gradient(90deg,#2563eb,#06b6d4)"
                  : "#1e293b",
            }}
          >
            {item}
          </div>
        ))}

       <button
          onClick={() => {
            localStorage.removeItem("login");
            setIsLoggedIn(false);
          }}
          style={{
            marginTop: "40px",
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "12px",
            background: "#dc2626",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            background: darkMode
                ? "#1e293b"
                : "white",
            padding: "20px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <h2>{page}</h2>
            <p style={{ color: "#64748b" }}>
              Welcome back, Admin
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <input
             type="text"
             placeholder="Search..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             style={{
               padding: "12px",
               borderRadius: "12px"
             }}           
            />

            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "white",
                display: "grid",
                placeItems: "center",
                fontWeight: "700",
              }}
            >
              AD
            </div>
          </div>
        </div>

        <div style={{ padding: "28px" }}>{renderPage()}</div>
      </div>
    </div>
  );
}