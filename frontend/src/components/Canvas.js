import React, { useEffect, useState } from "react";
import * as BABYLON from "@babylonjs/core";

const Canvas = ({ shapeData, addShapeToScene, onShapeAdded }) => {
  const canvasRef = React.createRef();
  const [scene, setScene] = useState(null);
  const [engine, setEngine] = useState(null);
  const [shapeCount, setShapeCount] = useState(0); // Tracks the number of added shapes

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
      "camera1",
      Math.PI / 2,
      Math.PI / 3,
      15,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);
    light.intensity = 0.7;

    BABYLON.MeshBuilder.CreateGround("ground", { width: 30, height: 30 }, scene);

    setEngine(engine);
    setScene(scene);

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      scene.dispose();
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    if (scene && addShapeToScene && shapeData) {
      let shape;
      switch (shapeData.shape) {
        case "box":
          shape = BABYLON.MeshBuilder.CreateBox("box", { size: shapeData.size }, scene);
          break;
        case "sphere":
          shape = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: shapeData.size }, scene);
          break;
        case "cylinder":
          shape = BABYLON.MeshBuilder.CreateCylinder(
            "cylinder",
            { height: shapeData.size, diameterTop: 2, diameterBottom: 3 },
            scene
          );
          break;
        case "torus":
          shape = BABYLON.MeshBuilder.CreateTorus(
            "torus",
            { diameter: shapeData.size, thickness: 1 },
            scene
          );
          break;
        case "cone":
          shape = BABYLON.MeshBuilder.CreateCylinder(
            "cone",
            { height: shapeData.size, diameterTop: 0, diameterBottom: shapeData.size },
            scene
          );
          break;
        case "plane":
          shape = BABYLON.MeshBuilder.CreatePlane("plane", { size: shapeData.size }, scene);
          break;
        case "icosphere":
          shape = BABYLON.MeshBuilder.CreateIcoSphere(
            "icosphere",
            { radius: shapeData.size },
            scene
          );
          break;
        case "pyramid":
          shape = BABYLON.MeshBuilder.CreatePolyhedron(
            "pyramid",
            { type: 1, size: shapeData.size },
            scene
          );
          break;
        case "dodecahedron":
          shape = BABYLON.MeshBuilder.CreatePolyhedron(
            "dodecahedron",
            { type: 9, size: shapeData.size },
            scene
          );
          break;
        case "torusKnot":
          shape = BABYLON.MeshBuilder.CreateTorusKnot(
            "torusKnot",
            { radius: shapeData.size, tube: shapeData.size / 4 },
            scene
          );
          break;
        default:
          break;
      }

      if (shape) {
        // Dynamically position shapes side by side
        shape.position = new BABYLON.Vector3(
          shapeCount * (shapeData.size + 1), // Increment position based on shape count
          shapeData.y,
          shapeData.z
        );

        setShapeCount(shapeCount + 1); // Increment shape count
      }

      onShapeAdded(); // Notify parent that the shape has been added
    }
  }, [shapeData, addShapeToScene, scene, onShapeAdded, shapeCount]);

  return <canvas ref={canvasRef} id="renderCanvas" style={{ width: "100%", height: "100%" }} />;
};

export default Canvas;
