import React, { useState, useEffect } from "react";
import Heatmap from "./Heatmap";
import { generateData } from "./data";
import patientData from "./data.json";
import "./App.css";

const fetchGraphqlData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15;
      if (isSuccess) {
        const grid = [];
        for (let i = 0; i < 10; i++) {
          const row = [];
          for (let j = 0; j < 10; j++) {
            const val = Math.floor(Math.abs(Math.sin((i+1)*0.9) * Math.cos((j+1)*0.7)) * 100);
            row.push(val);
          }
          grid.push(row);
        }
        resolve({ data: { dataset: { matrix: grid } } });
      } else {
        reject(new Error("GraphQL Request failed! Gateway processing Timeout."));
      }
    }, 1200);
  });
};

function App() {
  const [gridSize, setGridSize] = useState(10);
  const [dataMode, setDataMode] = useState("real");
  const [data, setData] = useState(patientData);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNewData = () => {
    setDataMode("random");
    setError(null);
    const sizeToUse = typeof gridSize === "number" && gridSize >= 5 && gridSize <= 20 ? gridSize : 10;
    setData(generateData(sizeToUse));
  };

  const handleLoadRealData = () => {
    setDataMode("real");
    setError(null);
    setGridSize(10);
    setData(patientData);
  };

  const handleLoadAPI = async () => {
    setDataMode("api");
    setError(null);
    setGridSize(10);
    setLoading(true);
    
    try {
      const response = await fetchGraphqlData();
      const fetchedGrid = response.data.dataset.matrix;
      setData(fetchedGrid);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeChange = (e) => {
    setDataMode("random");
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

  const handleMinChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setMinValue("");
      return;
    }
    const newMin = parseInt(val, 10);
    if (!isNaN(newMin)) {
      setMinValue(newMin);
    }
  };

  const handleMaxChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setMaxValue("");
      return;
    }
    const newMax = parseInt(val, 10);
    if (!isNaN(newMax)) {
      setMaxValue(newMax);
    }
  };

  useEffect(() => {
    if (dataMode === "random" && typeof gridSize === "number" && gridSize >= 5 && gridSize <= 20) {
      setData(generateData(gridSize));
    }
  }, [gridSize]);

  const isExternal = dataMode === "real" || dataMode === "api";

  return (
    <div className="app-container">
      <h1 className="title">Data Density Heatmap</h1>
      
      <div className="controls-card">
        {/* Dataset Controls Row */}
        <div className="controls-row">
          <button 
            className={`control-btn ${dataMode === "real" ? "active" : ""}`}
            onClick={handleLoadRealData} 
            disabled={loading}
          >
            Load Real Dataset
          </button>
          <button 
            className={`control-btn ${dataMode === "random" ? "active" : ""}`}
            onClick={handleNewData} 
            disabled={loading}
          >
            Generate Random Data
          </button>
          <button 
            className={`control-btn ${dataMode === "api" ? "active" : ""}`}
            onClick={handleLoadAPI} 
            disabled={loading}
          >
            Load from API
          </button>
        </div>

        {/* Filters and Size Parameters Row */}
        <div className="controls-row">
          <label className={`filter-group ${isExternal ? "disabled" : ""}`} title={isExternal ? "Grid size is fixed to 10 for external datasets." : ""}>
            Grid Size:
            <input 
              type="number" 
              className="filter-input"
              min="5" 
              max="20" 
              value={gridSize}
              onChange={handleSizeChange}
              disabled={isExternal || loading}
            />
          </label>

          <label className="filter-group">
            Min Value:
            <input 
              type="number" 
              className="filter-input"
              min="0" 
              max="100" 
              value={minValue}
              onChange={handleMinChange}
              disabled={loading}
            />
          </label>

          <label className="filter-group">
            Max Value:
            <input 
              type="number" 
              className="filter-input"
              min="0" 
              max="100" 
              value={maxValue}
              onChange={handleMaxChange}
              disabled={loading}
            />
          </label>
        </div>
      </div>

      {loading && (
        <div className="status-container">
          <h2 style={{ color: "#38bdf8", fontWeight: "bold" }}>Loading...</h2>
        </div>
      )}

      {error && !loading && (
        <div className="status-container">
          <h2 style={{ color: "#ef4444", fontWeight: "bold" }}>❌ {error}</h2>
          <button className="control-btn active" onClick={handleLoadAPI} style={{ marginTop: "24px" }}>
            Retry Request
          </button>
        </div>
      )}

      {!loading && !error && data && data.length > 0 && (
         <Heatmap data={data} minValue={minValue} maxValue={maxValue} />
      )}

      <div className="legend-container">
        <span className="legend-label">Low</span>
        <div className="legend-color" style={{ backgroundColor: "rgb(255, 0, 0)" }}></div>
        <div className="legend-color" style={{ backgroundColor: "rgb(127, 127, 0)" }}></div>
        <div className="legend-color" style={{ backgroundColor: "rgb(0, 255, 0)" }}></div>
        <span className="legend-label">High</span>
      </div>
    </div>
  );
}

export default App;
