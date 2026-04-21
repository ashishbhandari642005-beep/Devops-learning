export default function Topbar({ onLogout }) {
  return (
    <div
      style={{
        background: "white",
        padding: "15px 25px",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>CampusOps Dashboard</h2>

      <div style={{ display: "flex", gap: "12px" }}>
        <input
          placeholder="Search..."
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={onLogout}
          style={{
            padding: "8px 14px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}