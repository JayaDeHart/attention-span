import Matter from "matter-js";
import { type Component } from "../types";
import { makeAutoObservable, observable } from "mobx";

export class ComponentController {
  //has a set of properties that mirror the form state
  //has a Matter.Body object
  //has methods that relate to transforming the body
  component: Component;
  body: Matter.Body;

  constructor(component: Component, body: Matter.Body) {
    this.component = component;
    this.body = this.applyProperties(component, body);
    makeAutoObservable(this, {
      body: observable.shallow,
    });
  }

  applyProperties(component: Component, body: Matter.Body) {
    return body;
  }
}
