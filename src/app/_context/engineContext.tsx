"use client";

import React, { createContext, type ReactNode } from "react";
import { EngineController } from "./engineController";

export const VideoContext = createContext<EngineController | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export default function EngineProvider(props: StoreProviderProps) {
  const controller = new EngineController();
  return (
    <VideoContext.Provider value={controller}>
      {props.children}
    </VideoContext.Provider>
  );
}
