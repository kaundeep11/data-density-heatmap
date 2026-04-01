import React from "react";

const getColor = (value) => {
  const red = 255 - Math.floor((value / 100) * 255);
  const green = Math.floor((value / 100) * 255);
  return `rgb(${red}, ${green}, 0)`;
};

const Heatmap = ({ data, minValue = 0, maxValue = 100 }) => {
  // Number of rows is accurately represented by the length of the outer array.
  const cols = data && data.length ? data.length : 10;
  
  // Provide safe numeric defaults if inputs are cleared
  const activeMin = typeof minValue === "number" ? minValue : 0;
  const activeMax = typeof maxValue === "number" ? maxValue : 100;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 40px)`,
        gap: "5px",
        justifyContent: "center"
      }}
    >
      {data.flat().map((value, index) => {
        const isOutsideRange = value < activeMin || value > activeMax;

        return (
          <div
            key={index}
            title={`Value: ${value}`}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: getColor(value),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              color: isOutsideRange ? "rgba(0,0,0,0.3)" : "#000",
              opacity: isOutsideRange ? 0.2 : 1,
              transition: "transform 0.2s, opacity 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2)";
              e.currentTarget.style.zIndex = "10";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.zIndex = "1";
            }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};

export default Heatmap;
