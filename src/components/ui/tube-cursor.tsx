// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

type TubesCursorProps = {
  title?: string;
  subtitle?: string;
  caption?: string;
  initialColors?: string[];   // tubes base colors
  lightColors?: string[];     // lights colors
  lightIntensity?: number;    // lights intensity
  titleSize?: string;         // Tailwind text size classes
  subtitleSize?: string;
  captionSize?: string;
  enableRandomizeOnClick?: boolean;
  className?: string;         // extra classes for wrapper
};

const TubesCursor = ({
  title = "Tubes",
  subtitle = "Cursor",
  caption = "WebGPU / WebGL",
  initialColors = ["#00D9FF", "#7C3AED", "#CF30AA"],
  lightColors = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
  lightIntensity = 200,
  titleSize = "text-[80px]",
  subtitleSize = "text-[60px]",
  captionSize = "text-base",
  enableRandomizeOnClick = true,
  className = "",
}: TubesCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    let removeClick: (() => void) | null = null;
    let destroyed = false;

    (async () => {
      // Dynamic import of the external cursor library
      const mod = await import(
        /* webpackIgnore: true */
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      const TubesCursorCtor = (mod as any).default ?? mod;

      if (!canvasRef.current || destroyed) return;

      const app = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors: initialColors,
          lights: {
            intensity: lightIntensity,
            colors: lightColors,
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick && containerRef.current) {
        const handler = () => {
          const colors = randomColors(initialColors.length);
          const lights = randomColors(lightColors.length);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lights);
        };
        const el = containerRef.current;
        el.addEventListener("click", handler);
        removeClick = () => el.removeEventListener("click", handler);
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [initialColors, lightColors, lightIntensity, enableRandomizeOnClick]);

  return (
    <div ref={containerRef} className={`relative h-screen w-full overflow-hidden cursor-pointer ${className}`}>
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {/* Hero text */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 select-none pointer-events-none">
        <h1
          className={`m-0 p-0 text-foreground font-bold uppercase leading-none drop-shadow-[0_0_20px_rgba(var(--foreground),0.5)] ${titleSize}`}
        >
          {title}
        </h1>
        <h2
          className={`m-0 p-0 text-foreground font-medium uppercase leading-none drop-shadow-[0_0_20px_rgba(var(--foreground),0.5)] ${subtitleSize}`}
        >
          {subtitle}
        </h2>
        <p
          className={`m-0 p-0 text-foreground leading-none drop-shadow-[0_0_20px_rgba(var(--foreground),0.5)] ${captionSize}`}
        >
          {caption}
        </p>
      </div>
    </div>
  );
};

function randomColors(count: number) {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  );
}

export { TubesCursor };
