"use client";

import React, { useEffect, useRef } from "react";

const WORD = "ENTERSOFT";
const LINE_GAP = 5;

type Props = {
  reduce?: boolean;
};

export default function LinedWordmark({ reduce = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let time = 0;
    let runs: Array<{ y: number; segs: Array<[number, number]> }> = [];
    let dpr = 1;
    let w = 0;
    let h = 0;

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mask = document.createElement("canvas");
      mask.width = canvas.width;
      mask.height = canvas.height;
      const m = mask.getContext("2d");
      if (!m) return;
      m.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.clearRect(0, 0, w, h);
      m.fillStyle = "#fff";
      m.textAlign = "center";
      m.textBaseline = "middle";
      const size = Math.min(w * 0.168, h * 1.28);
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--font-inter-tight").trim() ||
        "Inter Tight";
      m.font = `600 ${size}px ${family}, Inter Tight, system-ui, sans-serif`;
      m.fillText(WORD, w / 2, h * 0.52);

      const data = m.getImageData(0, 0, canvas.width, canvas.height).data;
      const next: typeof runs = [];
      const step = Math.max(1, Math.round(LINE_GAP * dpr));
      for (let py = 0; py < canvas.height; py += step) {
        const segs: Array<[number, number]> = [];
        let start = -1;
        const row = py * canvas.width;
        for (let px = 0; px < canvas.width; px++) {
          const on = data[(row + px) * 4 + 3] > 20;
          if (on && start < 0) start = px;
          if (!on && start >= 0) {
            segs.push([start / dpr, px / dpr]);
            start = -1;
          }
        }
        if (start >= 0) segs.push([start / dpr, canvas.width / dpr]);
        if (segs.length) next.push({ y: py / dpr, segs });
      }
      runs = next;
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.05;
      ctx.strokeStyle = "rgba(236,234,230,0.92)";
      ctx.lineCap = "round";

      for (const row of runs) {
        for (const [x0, x1] of row.segs) {
          ctx.beginPath();
          const steps = Math.max(2, Math.ceil((x1 - x0) / 8));
          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = x0 + (x1 - x0) * t;
            let y = row.y;
            if (!reduce && mouse.active) {
              const dx = x - mouse.x;
              const dy = row.y - mouse.y;
              const dist = Math.hypot(dx, dy);
              const falloff = Math.exp(-(dist * dist) / 14000);
              y += Math.sin(x * 0.045 + time * 7 + row.y * 0.08) * 16 * falloff;
            }
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    measure();
    draw();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className="relative h-[32vw] min-h-[160px] max-h-[420px] w-full">
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-crosshair"
        aria-label="Entersoft"
      />
    </div>
  );
}
