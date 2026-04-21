import React from 'react';
export default function StatusBadge({text,color}){
 return <span style={{padding:'4px 10px',borderRadius:'12px',background:color,color:'#fff'}}>{text}</span>
}