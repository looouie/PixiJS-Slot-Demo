import React, { useRef } from "react";
import "./styles.css";
import { Stage } from "react-pixi-fiber";
import Slot from "./Slot";

export default function App() {
  const pixiContainer = useRef(null);

  return (
    <div className="App" ref={pixiContainer}>
      <Stage
        options={{ backgroundColor: "2b2d42", width: "800", height: "750" }}
      >
        <Slot />
      </Stage>
    </div>
  );
}
