"use client";

import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import { ToolLayout } from "@/components/layout/Header";
import {
  Square,
  DoorOpen,
  Minus,
  Trash2,
  Undo2,
  Grid3x3,
} from "lucide-react";

type Tool = "wall" | "door" | "window" | "eraser";

interface Wall {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Opening {
  x: number;
  y: number;
  type: "door" | "window";
}

const GRID = 20;
const SNAP = 20;

export default function FloorPlanPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("wall");
  const [walls, setWalls] = useState<Wall[]>([]);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [drawing, setDrawing] = useState<{ x: number; y: number } | null>(null);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<{ walls: Wall[]; openings: Opening[] }[]>([]);

  const snap = useCallback((v: number) => Math.round(v / SNAP) * SNAP, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, w, h);

    if (showGrid) {
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += GRID) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += GRID) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    walls.forEach((wall) => {
      ctx.beginPath();
      ctx.moveTo(wall.x1, wall.y1);
      ctx.lineTo(wall.x2, wall.y2);
      ctx.stroke();
    });

    if (start && drawing) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(drawing.x, drawing.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    openings.forEach((o) => {
      if (o.type === "door") {
        ctx.fillStyle = "#fbbf24";
        ctx.fillRect(o.x - 8, o.y - 8, 16, 16);
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 2;
        ctx.strokeRect(o.x - 8, o.y - 8, 16, 16);
      } else {
        ctx.fillStyle = "#93c5fd";
        ctx.fillRect(o.x - 10, o.y - 4, 20, 8);
      }
    });
  }, [walls, openings, start, drawing, showGrid]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = snap(e.clientX - rect.left);
    const y = snap(e.clientY - rect.top);

    if (tool === "wall") {
      setStart({ x, y });
      setDrawing({ x, y });
    } else if (tool === "door" || tool === "window") {
      setHistory((prev) => [...prev, { walls, openings }]);
      setOpenings((prev) => [...prev, { x, y, type: tool }]);
      setTimeout(draw, 0);
    } else if (tool === "eraser") {
      setHistory((prev) => [...prev, { walls, openings }]);
      const threshold = 15;
      setWalls((prev) =>
        prev.filter((w) => {
          const dist = pointToSegmentDist(x, y, w.x1, w.y1, w.x2, w.y2);
          return dist > threshold;
        })
      );
      setOpenings((prev) =>
        prev.filter((o) => Math.hypot(o.x - x, o.y - y) > threshold)
      );
      setTimeout(draw, 0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!start || tool !== "wall") return;
    const rect = canvasRef.current!.getBoundingClientRect();
    setDrawing({ x: snap(e.clientX - rect.left), y: snap(e.clientY - rect.top) });
    setTimeout(draw, 0);
  };

  const handleMouseUp = () => {
    if (start && drawing && tool === "wall") {
      if (Math.hypot(drawing.x - start.x, drawing.y - start.y) > 10) {
        setHistory((prev) => [...prev, { walls, openings }]);
        setWalls((prev) => [...prev, { x1: start.x, y1: start.y, x2: drawing.x, y2: drawing.y }]);
      }
    }
    setStart(null);
    setDrawing(null);
    setTimeout(draw, 0);
  };

  function pointToSegmentDist(px: number, py: number, x1: number, y1: number, x2: number, y2: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  function undo() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setWalls(prev.walls);
    setOpenings(prev.openings);
    setTimeout(draw, 0);
  }

  const tools: { id: Tool; icon: typeof Square; label: string }[] = [
    { id: "wall", icon: Minus, label: "Wall" },
    { id: "door", icon: DoorOpen, label: "Door" },
    { id: "window", icon: Square, label: "Window" },
    { id: "eraser", icon: Trash2, label: "Eraser" },
  ];

  const sidebar = (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs transition-colors ${
                tool === t.id ? "border-brand-500 bg-brand-50 text-brand-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <t.icon className="w-5 h-5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <p>Click & drag to draw walls</p>
        <p>Click to place doors/windows</p>
        <p>Grid snap: {SNAP}px</p>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Floor Plan Editor"
      description="Draw 2D floor plans with walls, doors, and windows"
      sidebar={sidebar}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={history.length === 0} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30">
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={() => { setShowGrid(!showGrid); setTimeout(draw, 0); }} className={`p-2 rounded-lg ${showGrid ? "bg-brand-50 text-brand-600" : "text-gray-600 hover:bg-gray-100"}`}>
            <Grid3x3 className="w-4 h-4" />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-gray-500">{walls.length} walls · {openings.length} openings</span>
          <Link href="/tools/room-designer" className="px-4 py-2 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition-colors">
            Convert to 3D
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden inline-block">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ display: "block" }}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
