import type { IBodyDefinition } from "matter-js";

export const WIDTH = 600;
export const HEIGHT = 600;
export const wallOptions: IBodyDefinition = {
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

export const defaultOptions: IBodyDefinition = {
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

export const engineOptions = {
  gravity: { y: 0 },
  positionIterations: 7,
  velocityIterations: 5,
};
