import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Sprite } from "react-pixi-fiber";
import { gsap } from "gsap";
import { animationDuration } from "./constant";

import { Heart, Ghost, Star, Skull } from "./Textures";
const textures = [Heart, Ghost, Star, Skull];

const Reel = ({ key, x, isSpinning, stopSpinning, delay }) => {
  const numSprites = 4;
  const spriteSpacing = 40;
  const spriteWidth = 100;
  const spriteHeight = 100;
  const containerHeight = numSprites * (spriteSpacing + spriteHeight);

  const BlurFilter = PIXI.filters.BlurFilter;

  const sprites = useRef([]);
  useEffect(() => {
    // Set initial textures for the sprites
    sprites.current.forEach((sprite, i) => {
      sprite.texture = textures[Math.floor(Math.random() * textures.length)];
    });
  }, []);

  useEffect(() => {
    if (isSpinning) {
      startSpinning();
    }
  }, [isSpinning]);

  const startSpinning = () => {
    // tweening
    gsap.to(sprites.current, {
      y: "+=" + containerHeight * 3,
      duration: animationDuration, //adjusting this to make it spin faster or slower
      ease: "power1",
      delay: delay,
      onComplete: () => {
        stopSpinning();
        sprites.current.forEach((sprite, i) => {
          sprite.filters = [];
        });
      },
      onUpdate: () => {
        sprites.current.forEach((sprite, i) => {
          // add a slightly blurry effect when spinning
          const blurFilter = new BlurFilter();
          blurFilter.blur = 0.7;
          sprite.filters = [blurFilter];

          const prevY = sprite.y;
          if (prevY >= containerHeight) {
            // Move sprite to the top when it hits the bottom of the container
            sprite.y = 0 + (prevY % containerHeight);
          }
          if (sprite.y < 1 && prevY > sprite.y) {
            // generate a new random symbol on top
            sprite.texture =
              textures[Math.floor(Math.random() * textures.length)];
          }
        });
      }
    });
  };

  return (
    <>
      {Array.from({ length: numSprites }, (_, i) => (
        <Sprite
          key={i}
          x={x}
          y={i * (spriteHeight + spriteSpacing)}
          width={spriteWidth}
          height={spriteHeight}
          ref={(ref) => (sprites.current[i] = ref)}
        />
      ))}
    </>
  );
};

export default Reel;
