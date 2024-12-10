"use client";

import { useEffect, useRef, useState } from "react";
import Matter, { type IBodyDefinition } from "matter-js";

const WIDTH = 600;
const HEIGHT = 600;
const defaultOptions: IBodyDefinition = {
  render: {
    fillStyle: "black",
  },
  isStatic: true,
};

const GameEngine = () => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const canvasRef = useRef(null);

  const [cubes, setCubes] = useState<Matter.Body[]>([]);

  const addCube = () => {
    const newCube = Matter.Bodies.rectangle(
      Math.random() * WIDTH,
      Math.random() * HEIGHT,
      Math.random() * 100,
      Math.random() * 100,
      {
        render: {
          fillStyle: `#${Math.random() > 0.5 ? "00FF00" : "FF0000"}`,
        },
      },
    );

    setCubes([...cubes, newCube]);

    if (engineRef.current) {
      const world = engineRef.current.world;
      Matter.Composite.add(world, newCube);
    }
  };

  const clear = () => {
    if (engineRef.current) {
      Matter.Composite.clear(engineRef.current.world, true, true);
    }
  };

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Runner = Matter.Runner;
    const engine = Engine.create();
    engineRef.current = engine;
    const runner = Runner.create();
    const render = Render.create({
      engine: engine,
      canvas: canvasRef.current!,
      options: {
        background: "rgba(255, 255, 255, 1)",
        wireframes: false,
        height: HEIGHT,
        width: WIDTH,
      },
    });
    const ball = Bodies.circle(150, 10, 10);

    const cube = Bodies.rectangle(30, 30, 100, 100);

    const floor = Bodies.rectangle(
      WIDTH / 2,
      HEIGHT - 2.5,
      WIDTH,
      5,
      defaultOptions,
    );
    const ceiling = Bodies.rectangle(WIDTH / 2, 2.5, WIDTH, 5, defaultOptions);
    const leftWall = Bodies.rectangle(
      2.5,
      HEIGHT / 2,
      5,
      HEIGHT,
      defaultOptions,
    );
    const rightWall = Bodies.rectangle(
      WIDTH - 2.5,
      HEIGHT / 2,
      5,
      HEIGHT,
      defaultOptions,
    );

    Composite.add(engine.world, [
      ball,
      cube,
      floor,
      leftWall,
      rightWall,
      ceiling,
    ]);
    Render.run(render);
    Runner.run(runner, engine);
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      Matter.Events.on(engineRef.current, "collisionStart", (event) => {
        const pairs = event.pairs[0];
        if (pairs) {
          const bodyA = pairs.bodyA;
          const bodyB = pairs.bodyB;
          const bodyToDelete = redKillsGreen(bodyA, bodyB);
          if (bodyToDelete && engineRef.current) {
            Matter.Composite.remove(engineRef.current?.world, bodyToDelete);
          }
        }
      });
    }
  }, []);

  const redKillsGreen = (bodyA: Matter.Body, bodyB: Matter.Body) => {
    //same color, no delete
    if (bodyA.render.fillStyle === bodyB.render.fillStyle) {
      return null;
    }
    //A red, kills green B
    if (
      bodyA.render.fillStyle === "#FF0000" &&
      bodyB.render.fillStyle === "#00FF00"
    ) {
      return bodyB;
    }
    //B red, kills green A
    if (
      bodyA.render.fillStyle === "#00FF00" &&
      bodyB.render.fillStyle === "#FF0000"
    ) {
      return bodyA;
    }
  };

  return (
    <div className="flex">
      <canvas ref={canvasRef} height={WIDTH} width={HEIGHT} />
      <button className="m-4" onClick={addCube}>
        Add Cube
      </button>
      <button onClick={clear} className="m-4">
        Clear
      </button>
    </div>
  );
};

export default GameEngine;
