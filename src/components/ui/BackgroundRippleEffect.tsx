"use client";

import React, { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BackgroundRippleEffectProps {
  rows?: number;
  cols?: number;
  cellSize?: number;
  className?: string;
}

export function BackgroundRippleEffect({
  rows = 10,
  cols = 30,
  cellSize = 60,
  className,
}: BackgroundRippleEffectProps) {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 h-full w-full",
        "[--cell-border-color:rgba(0,163,255,0.04)] [--cell-fill-color:rgba(0,163,255,0.005)] [--cell-shadow-color:rgba(0,163,255,0.02)]",
        "dark:[--cell-border-color:rgba(0,163,255,0.03)] dark:[--cell-fill-color:rgba(0,163,255,0.003)] dark:[--cell-shadow-color:rgba(0,163,255,0.01)]",
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        <DivGrid
          key={`base-${rippleKey}`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
}

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  "--delay"?: string;
  "--duration"?: string;
};

const DivGrid = ({
  className,
  rows,
  cols,
  cellSize,
  borderColor,
  fillColor,
  clickedCell,
  onCellClick,
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        
        // Calculate distance from the clicked cell to propagate the ripple
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
          
        const delay = clickedCell ? Math.max(0, distance * 45) : 0; // ms stagger delay
        const duration = clickedCell ? 300 + distance * 50 : 0; // ms duration of fade

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-all duration-300 hover:opacity-100 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/20 cursor-crosshair",
              clickedCell && "animate-cell-ripple",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
