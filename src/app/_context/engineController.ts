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
  test: Matter.Body | null;

  constructor() {
    // this.components = observable.map();
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
    this.test = null;

    makeAutoObservable(this, {
      components: observable.shallow,
      addComponent: action,
    });
  }

  addComponent(component: Matter.Body) {
    this.components.push(component);
    console.log(toJS(this.components));
  }

  getRandomPosition() {
    return [Math.random() * this.width, Math.random() * this.height];
  }

  getComponents() {
    return toJS(this.components);
  }
}
