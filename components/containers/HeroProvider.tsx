"use client";
import { HeroUIProvider } from "@heroui/react";
import React from "react";

interface HeroProviderProps {
  children: React.ReactNode;
}

const HeroProvider: React.FC<HeroProviderProps> = ({ children }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default HeroProvider;
