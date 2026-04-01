import React, { useState } from 'react';
import './App.css'; // Preserving the premium styling previously built

const getColor = (value) => {
  const hue = (value / 100) * 120;
  return `hsl(${hue}, 85%, 55%)`;
};

const Heatmap = ({ data }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  if (!data || !data.length) return null;

  return (
    <div className="heatmap-wrapper" style={{ margin: '30px auto' }}>
      <div className="heatmap-grid" onMouseLeave={() => setHoveredCell(null)}>
        {data.map((row, rowIndex) => (
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
    </div>
  );
};

export default Heatmap;
