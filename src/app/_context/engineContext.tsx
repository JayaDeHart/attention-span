"use client";

import React, { createContext, type ReactNode } from "react";
import { EngineController } from "./engineController";

const controller = new EngineController();
export const EngineContext = createContext<EngineController>(controller);

interface StoreProviderProps {
  children: ReactNode;
}

export default function EngineProvider(props: StoreProviderProps) {
  return (
    <EngineContext.Provider value={controller}>
      {props.children}
    </EngineContext.Provider>
  );
}
