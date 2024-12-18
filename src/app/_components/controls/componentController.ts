import Matter, { IBodyDefinition } from "matter-js";
import { Color, Shape, type ComponentValues } from "../types";
import { makeAutoObservable, observable } from "mobx";

export class ComponentController {
  //has a set of properties that mirror the form state
  //has a Matter.Body object
  //has methods that relate to transforming the body
  values: ComponentValues;
  body: Matter.Body;
  defaultOptions: IBodyDefinition;
  private handlers: Record<string, () => void>;

  constructor(component: ComponentValues, position: [number, number]) {
    this.values = component;
    this.body = this.generateBody(component, position);
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
    this.handlers = {
      color: this.handleColor.bind(this),
      shape: this.handleShape.bind(this),
      size: this.handleSize.bind(this),
    };
    makeAutoObservable(this, {
      body: observable.shallow,
    });
  }

  generateBody(
    component: ComponentValues,
    position: [number, number],
  ): Matter.Body {
    switch (component.shape) {
      case Shape.Square:
        return this._generateSquare(component, position);
      case Shape.Circle:
        return this._generateCircle(component, position);
      default:
        throw new Error("Unhandled shape case");
    }
  }

  updateValues(values: ComponentValues) {
    //iterate through values
    //check if value differs from this.values[value]
    //if so, call the appropriate handler
    //update this.values[value] to new value
    Object.entries(values).forEach(([key, value]) => {
      const typedKey = key as keyof ComponentValues;
      if (this.values[typedKey] !== value) {
        const handler = this.handlers[typedKey];
        this.values = { ...this.values, [typedKey]: values[typedKey] };
        if (handler) {
          handler();
        }
      }
    });
  }

  _generateSquare(component: ComponentValues, position: [number, number]) {
    return Matter.Bodies.rectangle(
      position[0],
      position[1],
      component.size,
      component.size,
      {
        ...this.defaultOptions,
        render: {
          fillStyle: component.color,
        },
      },
    );
  }

  _generateCircle(component: ComponentValues, position: [number, number]) {
    return Matter.Bodies.circle(position[0], position[1], component.size / 2, {
      ...this.defaultOptions,
      render: {
        fillStyle: component.color,
      },
    });
  }

  handleColor() {
    console.log("hi");
  }

  handleShape() {
    console.log("hi");
  }

  handleSize() {
    console.log("hi");
  }
}
