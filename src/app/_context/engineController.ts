import { makeAutoObservable, observable, toJS, action } from "mobx";
import type { IBodyDefinition } from "matter-js";
import Matter, { Bodies } from "matter-js";

export class EngineController {
  // components: Map<string, Matter.Body>;
  components: Matter.Body[];
  width: number;
  height: number;
  wallOptions: IBodyDefinition;
  defaultOptions: IBodyDefinition;
  engineOptions: {
    gravity: { y: number };
    positionIterations: number;
    velocityIterations: number;
  };
  shape: string;
  engine: Matter.Engine | null;
  runner: Matter.Runner | null;

  constructor() {
    this.components = [];
    this.width = 600;
    this.height = 600;
    this.wallOptions = {
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      inertia: Infinity,
      render: {
        fillStyle: "#000000",
      },
      label: "Wall",
      density: 1,
    };
    this.defaultOptions = {
      isStatic: false,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      inertia: Infinity,
      render: {
        fillStyle: "#000000",
      },
      force: { x: Math.random() * 0.01, y: Math.random() * 0.01 },
    };
    this.engineOptions = {
      gravity: { y: 0 },
      positionIterations: 7,
      velocityIterations: 5,
    };

    this.shape = "rectangle";
    this.engine = null;
    this.runner = null;

    makeAutoObservable(this, {
      components: observable.shallow,
      engine: observable.shallow,
    });
  }

  addComponent(component: Matter.Body) {
    this.components.push(component);
    if (this.engine) {
      Matter.Composite.add(this.engine?.world, component);
    }
  }

  getRandomPosition() {
    return [Math.random() * this.width, Math.random() * this.height];
  }

  setEngine(engine: Matter.Engine) {
    this.engine = engine;
  }

  setRunner(runner: Matter.Runner) {
    this.runner = runner;
  }

  updateComponent(id: number, values: { color: string }) {
    //component basically has all the properties that we have to update our component with
    //perhaps we modify the structure of how we store components to like put our own custom wrapper on top
    //bootstrap it for nowsky
    const updateComponent = this.components.find((c) => c.id === id);
    if (updateComponent) {
      updateComponent.render.fillStyle = values.color;
    }
  }
}
