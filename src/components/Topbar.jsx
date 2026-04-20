import React from 'react';
export default function Topbar({page}){
 return <div style={{background:'#fff',padding:'16px 24px',borderBottom:'1px solid #e2e8f0'}}>
 <h2>{page}</h2>
 </div>
}export default function Topbar() {
  return (
    <div
      style={{
        background: "white",
        padding: "15px 25px",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h2>CampusOps Dashboard</h2>

      <div>
        <input
          placeholder="Search..."
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
      </div>
    </div>
  );
}