"use client";

import React, { useEffect, useRef } from "react";

export default function StaticNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const width = canvas.width;
      const height = canvas.height;
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 25); // sparse dark noise
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 20; // very light opacity
      }

      ctx.putImageData(imgData, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50 z-0 bg-[#080808]"
    />
  );
}
