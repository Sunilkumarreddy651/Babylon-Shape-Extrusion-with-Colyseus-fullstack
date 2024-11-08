import React, { useState } from "react";

const Controls = ({ onAddShape }) => {
  const [shapeData, setShapeData] = useState({
    x: 0,
    y: 0,
    z: 0,
    shape: "box",
    size: 2,
  });

  const handleAddShapeClick = () => {
    onAddShape({ ...shapeData }); // Pass shape data to the parent
  };

  return (
    <div>
      <h2>Add Shape</h2>
      {/* Input for Position */}
      <label>
        X Position:
        <input
          type="number"
          value={shapeData.x}
          onChange={(e) => setShapeData({ ...shapeData, x: parseFloat(e.target.value) })}
        />
      </label>
      <br />
      <label>
        Y Position:
        <input
          type="number"
          value={shapeData.y}
          onChange={(e) => setShapeData({ ...shapeData, y: parseFloat(e.target.value) })}
        />
      </label>
      <br />
      <label>
        Z Position:
        <input
          type="number"
          value={shapeData.z}
          onChange={(e) => setShapeData({ ...shapeData, z: parseFloat(e.target.value) })}
        />
      </label>
      <br />

      {/* Input for Shape Type */}
      <label>
        Shape Type:
        <select
          value={shapeData.shape}
          onChange={(e) => setShapeData({ ...shapeData, shape: e.target.value })}
        >
          <option value="box">Box</option>
          <option value="sphere">Sphere</option>
          <option value="cylinder">Cylinder</option>
          <option value="torus">Torus</option>
          <option value="cone">Cone</option>
          <option value="plane">Plane</option>
          <option value="icosphere">Icosphere</option>
          <option value="pyramid">Pyramid</option>
          <option value="dodecahedron">Dodecahedron</option>
          <option value="torusKnot">Torus Knot</option>
        </select>
      </label>
      <br />

      {/* Input for Shape Size */}
      <label>
        Size:
        <input
          type="number"
          value={shapeData.size}
          onChange={(e) => setShapeData({ ...shapeData, size: parseFloat(e.target.value) })}
        />
      </label>
      <br />

      {/* Button to Add Shape */}
      <button onClick={handleAddShapeClick}>Add Shape</button>
    </div>
  );
};

export default Controls;
