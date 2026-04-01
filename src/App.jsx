import React, { useState } from "react";
import Heatmap from "./Heatmap";
import { generateData } from "./data";

function App() {
  const [data, setData] = useState(generateData());

  const handleNewData = () => {
    setData(generateData());
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Data Density Heatmap</h1>

      <button onClick={handleNewData}>
        Generate New Data
      </button>

      <Heatmap data={data} />

      <div style={{ marginTop: "20px" }}>
        <span>Low</span>
        <span style={{ background: "red", padding: "5px 10px", margin: "0 5px" }}></span>
        <span style={{ background: "yellow", padding: "5px 10px", margin: "0 5px" }}></span>
        <span style={{ background: "green", padding: "5px 10px", margin: "0 5px" }}></span>
        <span>High</span>
      </div>
    </div>
  );
}

export default App;
