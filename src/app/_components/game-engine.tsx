"use client";

import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";
import { EngineContext } from "../_context/engineContext";
import Matter, { Runner } from "matter-js";
import { set } from "zod";

const GameEngine = () => {
  const { width, height, engineOptions, wallOptions, components, shape } =
    useContext(EngineContext);
  const canvasRef = useRef(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [run, setRun] = useState(false);

  const container = useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Composite = Matter.Composite;
    const Bodies = Matter.Bodies;
    const engine = Engine.create({ ...engineOptions });
    engineRef.current = engine;
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

    Composite.add(engine.world, [...container, ...components]);
    Render.run(render);
  }, [engineOptions, width, height, wallOptions, components]);

  //load the components from the controller
  //load the world from the controller
  //set up the matterJS instance
  //run it upon play button

  const toggleRunner = () => {
    setRun(!run);
    if (engineRef.current) {
      const runner = Matter.Runner.create();
      if (run) {
        Runner.run(runner, engineRef.current);
      }
      if (!run) {
        Runner.stop(runner);
      }
    }
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <button onClick={toggleRunner}>{run ? "Stop" : "Start"}</button>
    </div>
  );
};

export default observer(GameEngine);
