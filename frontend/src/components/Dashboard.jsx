import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    devices: 0,
    online: 0,
    alerts: 0,
    tickets: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const devicesRes = await axios.get("http://localhost:5000/api/devices");
        const alertsRes = await axios.get("http://localhost:5000/api/alerts");
        const ticketsRes = await axios.get("http://localhost:5000/api/tickets");

        const devices = devicesRes.data;
        const online = devices.filter(
          (item) => item.status === "Online"
        ).length;

        setStats({
          devices: devices.length,
          online,
          alerts: alertsRes.data.length,
          tickets: ticketsRes.data.length,
        });

        setChartData(
          devices.map((item) => ({
            name: item.name,
            cpu: item.cpu,
            ram: item.ram,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  const cards = [
    { title: "Total Devices", value: stats.devices },
    { title: "Online Systems", value: stats.online },
    { title: "Active Alerts", value: stats.alerts },
    { title: "Open Tickets", value: stats.tickets },
  ];

  const pieData = [
    { name: "Online", value: stats.online },
    { name: "Offline", value: stats.devices - stats.online },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

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

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            height: "400px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>CPU / RAM Usage</h3>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cpu" fill="#2563eb" />
              <Bar dataKey="ram" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            height: "400px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>System Status</h3>

          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}