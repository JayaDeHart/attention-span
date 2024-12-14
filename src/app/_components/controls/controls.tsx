"use client";

import { observer } from "mobx-react-lite";
import Components from "./components";
import World from "./world";
import { EngineContext } from "~/app/_context/engineContext";
import { useContext } from "react";

const Controls = () => {
  const controller = useContext(EngineContext);
  return (
    <div className="flex flex-col">
      <Components />
      <World />
      <button></button>
    </div>
  );
};

export default observer(Controls);
