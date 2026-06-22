"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { ToolLayout } from "@/components/layout/Header";
import { furnitureCatalog } from "@/lib/data";
import { generateId } from "@/lib/utils";
import {
  Trash2,
  RotateCw,
  Move,
  Camera,
  Undo2,
} from "lucide-react";

interface PlacedItem {
  id: string;
  furnitureId: string;
  name: string;
  color: string;
  size: [number, number, number];
  position: [number, number, number];
  rotation: number;
}

function FurnitureBox({
  item,
  selected,
  onSelect,
}: {
  item: PlacedItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const [w, h, d] = item.size;
  return (
    <mesh
      position={item.position}
      rotation={[0, item.rotation, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial
        color={item.color}
        emissive={selected ? "#3b82f6" : "#000000"}
        emissiveIntensity={selected ? 0.15 : 0}
      />
    </mesh>
  );
}

function Room({ wallColor, floorColor }: { wallColor: string; floorColor: string }) {
  const roomSize = 8;
  const wallHeight = 3;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomSize, roomSize]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      {[
        { pos: [0, wallHeight / 2, -roomSize / 2] as [number, number, number], rot: [0, 0, 0] as [number, number, number], args: [roomSize, wallHeight, 0.1] as [number, number, number] },
        { pos: [0, wallHeight / 2, roomSize / 2] as [number, number, number], rot: [0, 0, 0] as [number, number, number], args: [roomSize, wallHeight, 0.1] as [number, number, number] },
        { pos: [-roomSize / 2, wallHeight / 2, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], args: [roomSize, wallHeight, 0.1] as [number, number, number] },
        { pos: [roomSize / 2, wallHeight / 2, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], args: [roomSize, wallHeight, 0.1] as [number, number, number] },
      ].map((wall, i) => (
        <mesh key={i} position={wall.pos} rotation={wall.rot as [number, number, number]}>
          <boxGeometry args={wall.args} />
          <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh position={[0, 1.2, -roomSize / 2 + 0.06]}>
        <boxGeometry args={[1.5, 2.4, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Scene({
  items,
  selectedId,
  onSelect,
  wallColor,
  floorColor,
}: {
  items: PlacedItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  wallColor: string;
  floorColor: string;
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 4, -2]} intensity={0.5} color="#fff5e6" />
      <Room wallColor={wallColor} floorColor={floorColor} />
      {items.map((item) => (
        <FurnitureBox
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          onSelect={() => onSelect(item.id)}
        />
      ))}
      <Grid
        position={[0, 0.01, 0]}
        args={[8, 8]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#6b7280"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#9ca3af"
        fadeDistance={12}
        infiniteGrid={false}
      />
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} />
      <Environment preset="apartment" />
      <OrbitControls
        makeDefault
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
}

export default function RoomDesignerPage() {
  const [items, setItems] = useState<PlacedItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wallColor, setWallColor] = useState("#f5f0eb");
  const [floorColor, setFloorColor] = useState("#c4a35a");
  const [tool, setTool] = useState<"move" | "rotate">("move");
  const [history, setHistory] = useState<PlacedItem[][]>([]);

  function addFurniture(furnitureId: string) {
    const furniture = furnitureCatalog.find((f) => f.id === furnitureId);
    if (!furniture) return;

    const newItem: PlacedItem = {
      id: generateId(),
      furnitureId,
      name: furniture.name,
      color: furniture.color,
      size: furniture.size,
      position: [0, furniture.size[1] / 2, 0],
      rotation: 0,
    };

    setHistory((prev) => [...prev, items]);
    setItems((prev) => [...prev, newItem]);
    setSelectedId(newItem.id);
  }

  function deleteSelected() {
    if (!selectedId) return;
    setHistory((prev) => [...prev, items]);
    setItems((prev) => prev.filter((i) => i.id !== selectedId));
    setSelectedId(null);
  }

  function rotateSelected() {
    if (!selectedId) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === selectedId ? { ...i, rotation: i.rotation + Math.PI / 4 } : i
      )
    );
  }

  function undo() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setItems(prev);
    setSelectedId(null);
  }

  function moveSelected(axis: "x" | "z", delta: number) {
    if (!selectedId) return;
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== selectedId) return i;
        const pos = [...i.position] as [number, number, number];
        if (axis === "x") pos[0] += delta;
        else pos[2] += delta;
        return { ...i, position: pos };
      })
    );
  }

  const sidebar = (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Furniture</h3>
        <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin">
          {furnitureCatalog.map((f) => (
            <button
              key={f.id}
              onClick={() => addFurniture(f.id)}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-700 rounded-lg hover:bg-brand-50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg shrink-0" style={{ background: f.color }} />
              <div>
                <div className="font-medium text-xs">{f.name}</div>
                <div className="text-[10px] text-gray-400">{f.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Materials</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500">Wall</label>
            <input type="color" value={wallColor} onChange={(e) => setWallColor(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Floor</label>
            <input type="color" value={floorColor} onChange={(e) => setFloorColor(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="3D Room Designer"
      description="Drag furniture, customize materials, and design your space in real-time 3D"
      sidebar={sidebar}
    >
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setTool("move")}
              className={`p-2 ${tool === "move" ? "bg-brand-600 text-white" : "bg-white text-gray-600"}`}
              title="Move"
            >
              <Move className="w-4 h-4" />
            </button>
            <button
              onClick={rotateSelected}
              className={`p-2 ${tool === "rotate" ? "bg-brand-600 text-white" : "bg-white text-gray-600"}`}
              title="Rotate"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
          {selectedId && (
            <div className="flex gap-1">
              <button onClick={() => moveSelected("x", -0.5)} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">←</button>
              <button onClick={() => moveSelected("x", 0.5)} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">→</button>
              <button onClick={() => moveSelected("z", -0.5)} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">↑</button>
              <button onClick={() => moveSelected("z", 0.5)} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">↓</button>
            </div>
          )}
          <div className="flex-1" />
          <button onClick={undo} disabled={history.length === 0} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30" title="Undo">
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={deleteSelected} disabled={!selectedId} className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
          <Link href="/tools/render" className="flex items-center gap-1.5 px-3 py-2 bg-brand-600 text-white text-sm rounded-lg hover:bg-brand-700 transition-colors">
            <Camera className="w-4 h-4" /> Render
          </Link>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 bg-gray-900">
          <Canvas shadows camera={{ position: [6, 5, 6], fov: 50 }} onPointerMissed={() => setSelectedId(null)}>
            <Suspense fallback={null}>
              <Scene
                items={items}
                selectedId={selectedId}
                onSelect={setSelectedId}
                wallColor={wallColor}
                floorColor={floorColor}
              />
            </Suspense>
          </Canvas>
        </div>

        {selectedId && (
          <div className="mt-2 px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
            Selected: <span className="font-medium text-gray-900">{items.find((i) => i.id === selectedId)?.name}</span>
            — Use arrow buttons to move, rotate button to spin
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
