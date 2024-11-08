import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

const App = () => {
  const [shapeData, setShapeData] = useState(null); // Holds the shape data
  const [addShapeToScene, setAddShapeToScene] = useState(false); // Triggers shape addition

  const handleAddShape = (data) => {
    setShapeData(data); // Update shape data
    setAddShapeToScene(true); // Trigger shape addition
  };

  const handleShapeAdded = () => {
    setAddShapeToScene(false); // Reset the flag after adding the shape
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel for Controls */}
      <div
        style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "#f4f4f4",
          borderRight: "1px solid #ddd",
        }}
      >
        <Controls onAddShape={handleAddShape} />
      </div>

      {/* Right Panel for Canvas */}
      <div style={{ flex: 1 }}>
        <Canvas
          shapeData={shapeData}
          addShapeToScene={addShapeToScene}
          onShapeAdded={handleShapeAdded}
        />
      </div>
    </div>
  );
};

export default App;
