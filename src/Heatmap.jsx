import React from "react";

const getColor = (value) => {
  const red = 255 - Math.floor((value / 100) * 255);
  const green = Math.floor((value / 100) * 255);
  return `rgb(${red}, ${green}, 0)`;
};

const Heatmap = ({ data }) => {
  // Number of rows is accurately represented by the length of the outer array.
  const cols = data && data.length ? data.length : 10;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 40px)`,
        gap: "5px",
        justifyContent: "center"
      }}
    >
      {data.flat().map((value, index) => (
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
            color: "#000",
            transition: "transform 0.2s"
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
      ))}
    </div>
  );
};

export default Heatmap;
