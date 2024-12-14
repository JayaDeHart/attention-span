"use client";

import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";
import { EngineContext } from "../_context/engineContext";
import Matter, { Runner } from "matter-js";
import { set } from "zod";

const GameEngine = () => {
  const { width, height, engineOptions, wallOptions, shape } =
    useContext(EngineContext);
  const controller = useContext(EngineContext);
  const canvasRef = useRef(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Composite = Matter.Composite;
    const Bodies = Matter.Bodies;
    const engine = Engine.create({ ...engineOptions });
    engineRef.current = engine;
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    controller.setEngine(engine);
    controller.setRunner(runner);
    const render = Render.create({
      engine: engine,
      canvas: canvasRef.current!,
      options: {
        background: "rgba(255, 255, 255, 1)",
        wireframes: false,
        height: height,
        width: width,
      },
    });

    const floor = Bodies.rectangle(
      width / 2,
      height - 2.5,
      width,
      10,
      wallOptions,
    );
    const ceiling = Bodies.rectangle(width / 2, 2.5, width, 10, wallOptions);
    const leftWall = Bodies.rectangle(2.5, height / 2, 10, height, wallOptions);
    const rightWall = Bodies.rectangle(
      width - 2.5,
      height / 2,
      10,
      height,
      wallOptions,
    );

    const container = [floor, ceiling, rightWall, leftWall];
    const [x, y] = controller.getRandomPosition();
    const body = Bodies.rectangle(100, 100, 50, 50, {
      ...controller.defaultOptions,
      render: {
        fillStyle: "#0000000",
      },
    });

    //we need to run the code that adds the components a) once and b) only after all components are added.

    const ball = Bodies.circle(150, 10, 10, {
      ...controller.defaultOptions,
      force: { x: Math.random() * 0.01, y: Math.random() * 0.01 },
    });

    Composite.add(engine.world, [...container, body, ball]);
    Render.run(render);
  }, [engineOptions, width, height, wallOptions, controller]);

  const toggleRunner = () => {
    if (engineRef.current && runnerRef.current) {
      if (!run) {
        Matter.Runner.run(runnerRef.current, engineRef.current);
      } else {
        Matter.Runner.stop(runnerRef.current);
      }
    }
    setRun(!run);
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <button onClick={toggleRunner}>{run ? "Stop" : "Start"}</button>
    </div>
  );
};

export default observer(GameEngine);
