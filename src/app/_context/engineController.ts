import { makeAutoObservable } from "mobx";
import type { IBodyDefinition } from "matter-js";
import Matter, { Bodies } from "matter-js";

export class EngineController {
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
    };
    this.engineOptions = {
      gravity: { y: 0 },
      positionIterations: 7,
      velocityIterations: 5,
    };

    this.shape = "rectangle";

    makeAutoObservable(this);
  }

  addComponent(component: Matter.Body) {
    this.components = [...this.components, component];
  }
}
