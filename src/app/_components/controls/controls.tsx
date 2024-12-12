"use client";

import { observer } from "mobx-react-lite";
import Components from "./components";
import World from "./world";

const Controls = () => {
  return (
    <div className="flex flex-col">
      <Components />
      <World />
    </div>
  );
};

export default observer(Controls);
