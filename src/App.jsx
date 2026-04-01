import { useState, useCallback, useMemo } from 'react';
import './App.css';

// Generate 10x10 grid with random values from 0 to 100
const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(Math.floor(Math.random() * 101));
    }
    grid.push(row);
  }
  return grid;
};

// Map a value from 0-100 to a color from Red to Green
// Red is 0 degrees, Green is 120 degrees
const getColor = (value) => {
  const hue = (value / 100) * 120;
  // Increase saturation slightly for brighter pop on dark background
  return `hsl(${hue}, 85%, 55%)`;
};

function App() {
  const [grid, setGrid] = useState(generateGrid());
  const [hoveredCell, setHoveredCell] = useState(null);

  const handleRegenerate = useCallback(() => {
    setGrid(generateGrid());
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Data Density Heatmap</h1>
        <p>Interactive 10x10 grid visualizing values from 0.0 to 100.0</p>
        <button className="regenerate-btn" onClick={handleRegenerate}>
          ↻ Regenerate Data
        </button>
      </div>
      
      <div className="heatmap-wrapper">
        <div className="heatmap-grid" onMouseLeave={() => setHoveredCell(null)}>
          {grid.map((row, rowIndex) => (
            row.map((cellValue, colIndex) => {
              const id = `${rowIndex}-${colIndex}`;
              const isHovered = hoveredCell === id;
              const cellColor = getColor(cellValue);
              
              return (
                <div
                  key={id}
                  className={`heatmap-cell ${isHovered ? 'hovered' : ''}`}
                  style={{ backgroundColor: cellColor }}
                  onMouseEnter={() => setHoveredCell(id)}
                >
                  {isHovered && (
                    <div 
                      className="tooltip" 
                      style={{ '--tooltip-color': cellColor }}
                    >
                      <span className="tooltip-value">{cellValue}</span>
                      <span className="tooltip-coords">Row {rowIndex + 1} • Col {colIndex + 1}</span>
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>
        <div className="legend">
          <span>0 (Low)</span>
          <div className="legend-gradient"></div>
          <span>100 (High)</span>
        </div>
      </div>
    </div>
  );
}

export default App;
