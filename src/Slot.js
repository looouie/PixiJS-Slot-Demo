import React, { useState, useRef } from "react";
import { Sprite, Text, withApp, Container } from "react-pixi-fiber";
import { Spin } from "./Textures";
import Rectangle from "./Rectangle";
import Reel from "./Reel";

import {
  spriteWidth,
  spriteHeight,
  reelSpacing,
  spriteSpacing,
  numSprites,
  noOfReels,
  targetRotation,
  rotationSpeed
} from "./constant";

// TODO: add payline
// 1: decide how many payline or payways
// 2: need to store the final symbols result
// 3: payline animation

const Slot = ({ app }) => {
  const screenWidth = app.screen.width;
  const reelOffset = reelSpacing + spriteWidth;
  const totalWidth = (spriteWidth + reelSpacing) * noOfReels - reelSpacing;
  const initReelX = screenWidth / 2 - totalWidth / 2;
  const containerHeight = numSprites * (spriteSpacing + spriteHeight);

  const [isSpinning, setIsSpinning] = useState(false);

  const spinBtnRef = useRef();

  const spinningBtn = (delta) => {
    if (spinBtnRef.current.rotation < targetRotation) {
      spinBtnRef.current.rotation += rotationSpeed * delta;
    }
  };

  const startSpinning = () => {
    if (!isSpinning) {
      setIsSpinning(true);
    }

    // start animation for the spin button
    spinBtnRef.current.rotation = 0;
    app.ticker.add(spinningBtn);
  };

  const stopSpinning = () => {
    setIsSpinning(false);

    // stop animation for the spin button
    app.ticker.remove(spinningBtn);
  };

  return (
    <>
      <Rectangle x={0} y={0} width={screenWidth} height={100} fill={"b8bedd"}>
        <Text
          text="Slot Demo"
          anchor="0.5,0.5"
          x={screenWidth / 2}
          y={100 / 2}
        />
      </Rectangle>
      <Container x={0} y={120}>
        <Reel
          key={1}
          x={initReelX}
          isSpinning={isSpinning}
          stopSpinning={stopSpinning}
          delay={0}
        />
        <Reel
          key={2}
          x={initReelX + reelOffset}
          isSpinning={isSpinning}
          stopSpinning={stopSpinning}
          delay={0.2}
        />
        <Reel
          key={3}
          x={initReelX + reelOffset * 2}
          isSpinning={isSpinning}
          stopSpinning={stopSpinning}
          delay={0.4}
        />
        <Rectangle
          x={0}
          y={containerHeight - 20}
          width={screenWidth}
          height={100}
          fill={"b8bedd"}
        />
        <Container>
          <Sprite
            texture={Spin}
            x={screenWidth / 2}
            y={containerHeight + 25}
            width={70}
            height={70}
            anchor={0.5}
            interactive
            onpointerdown={startSpinning}
            ref={spinBtnRef}
          />
        </Container>
      </Container>
    </>
  );
};

export default withApp(Slot);
