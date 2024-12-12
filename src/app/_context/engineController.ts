import { makeAutoObservable } from "mobx";

export class EngineController {
  components: unknown[];

  constructor() {
    this.components = [];
    makeAutoObservable(this);
  }
}
