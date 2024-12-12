"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import {
  HEIGHT,
  WIDTH,
  wallOptions,
  defaultOptions,
  engineOptions,
} from "../engine/config";
import { observer } from "mobx-react-lite";

const GameEngine = () => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const canvasRef = useRef(null);

  const [cubes, setCubes] = useState<Matter.Body[]>([]);
  const [ke, setKE] = useState(0);

  const addCube = () => {
    const newCube = Matter.Bodies.rectangle(
      Math.random() * WIDTH,
      Math.random() * HEIGHT,
      Math.random() * 100,
      Math.random() * 100,
      {
        ...defaultOptions,
        render: {
          fillStyle: `#${Math.random() > 0.5 ? "00FF00" : "FF0000"}`,
        },
        force: { x: Math.random() * 0.01, y: Math.random() * 0.01 },
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
    const engine = Engine.create({ ...engineOptions });
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
    // const ball = Bodies.circle(150, 10, 10);

    // const cube = Bodies.rectangle(30, 30, 100, 100);

    const floor = Bodies.rectangle(
      WIDTH / 2,
      HEIGHT - 2.5,
      WIDTH,
      10,
      wallOptions,
    );
    const ceiling = Bodies.rectangle(WIDTH / 2, 2.5, WIDTH, 10, wallOptions);
    const leftWall = Bodies.rectangle(2.5, HEIGHT / 2, 10, HEIGHT, wallOptions);
    const rightWall = Bodies.rectangle(
      WIDTH - 2.5,
      HEIGHT / 2,
      10,
      HEIGHT,
      wallOptions,
    );

    Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);
    Render.run(render);
    Runner.run(runner, engine);
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      Matter.Events.on(engineRef.current, "collisionStart", (event) => {
        const pairs = event.pairs[0];
        console.log(pairs?.bodyA.mass);
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

  useEffect(() => {
    if (engineRef.current) {
      Matter.Events.on(engineRef.current, "afterUpdate", (e) => {
        if (engineRef.current) {
          let totalKE = 0;
          const bodies = Matter.Composite.allBodies(engineRef.current.world);
          bodies.forEach((body) => {
            if (!body.isStatic) {
              totalKE +=
                0.5 *
                body.mass *
                (body.velocity.x * body.velocity.x +
                  body.velocity.y * body.velocity.y);
            }
          });
          setKE(totalKE);
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

  const accelerate = () => {
    if (engineRef.current) {
      engineRef.current.timing.timeScale = 10;
    }
  };

  const normalize = () => {
    if (engineRef.current) {
      engineRef.current.timing.timeScale = 1;
    }
  };

  return (
    <div className="flex flex-col">
      <h2>{ke}</h2>
      <canvas ref={canvasRef} height={WIDTH} width={HEIGHT} />
      <button className="m-4" onClick={addCube}>
        Add Cube
      </button>
      <button onClick={clear} className="m-4">
        Clear
      </button>
      <button className="m-4" onClick={accelerate}>
        Accelerate
      </button>
      <button className="m-4" onClick={normalize}>
        Normal
      </button>
    </div>
  );
};

export default observer(GameEngine);
