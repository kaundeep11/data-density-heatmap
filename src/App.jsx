import React, { useState, useEffect } from "react";
import Heatmap from "./Heatmap";
import { generateData } from "./data";

function App() {
  const [gridSize, setGridSize] = useState(10);
  const [data, setData] = useState(generateData(10));

  const handleNewData = () => {
    // Determine the active size to use; if input is empty, default to 10
    const sizeToUse = typeof gridSize === "number" && gridSize >= 5 && gridSize <= 20 ? gridSize : 10;
    setData(generateData(sizeToUse));
  };

  const handleSizeChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setGridSize("");
      return;
    }
    const newSize = parseInt(val, 10);
    if (!isNaN(newSize)) {
      setGridSize(newSize);
    }
  };

  // Automatically update the heatmap when grid size changes within valid boundaries
  useEffect(() => {
    if (typeof gridSize === "number" && gridSize >= 5 && gridSize <= 20) {
      setData(generateData(gridSize));
    }
  }, [gridSize]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Data Density Heatmap</h1>
      
      <div style={{ marginBottom: "30px", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
        <label style={{ fontSize: "16px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}>
          Grid Size: 
          <input 
            type="number" 
            min="5" 
            max="20" 
            value={gridSize}
            onChange={handleSizeChange}
            style={{ width: "60px", padding: "6px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>
        <button onClick={handleNewData} style={{ padding: "8px 16px", cursor: "pointer", fontSize: "16px", borderRadius: "4px", border: "1px solid #000" }}>
          Generate New Data
        </button>
      </div>

      <Heatmap data={data} />

      <div style={{ marginTop: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>Low</span>
        <span style={{ background: "red", padding: "6px 12px", margin: "0 8px", display: "inline-block", borderRadius: "2px" }}></span>
        <span style={{ background: "yellow", padding: "6px 12px", margin: "0 8px", display: "inline-block", borderRadius: "2px" }}></span>
        <span style={{ background: "green", padding: "6px 12px", margin: "0 8px", display: "inline-block", borderRadius: "2px" }}></span>
        <span>High</span>
      </div>
    </div>
  );
}

export default App;
