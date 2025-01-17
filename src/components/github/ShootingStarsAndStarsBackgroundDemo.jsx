"use client";
import React from "react";
import { ShootingStars } from "./shooting-stars";
import { StarsBackground } from "./stars-background";
export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    (<div
      className="h-full rounded-md bg-black flex flex-col items-center justify-center relative w-full">
      <h2
        className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>Please type & select a REPO</span>
      </h2>
      <ShootingStars />
      <StarsBackground />
    </div>)
  );
}
