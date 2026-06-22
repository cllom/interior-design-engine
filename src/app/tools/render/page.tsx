"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/layout/Header";
import { delay } from "@/lib/utils";
import {
  Camera,
  Loader2,
  Download,
  Sun,
  Moon,
  Image as ImageIcon,
  Video,
  Globe,
} from "lucide-react";

const renderModes = [
  { id: "image", label: "Still Image", icon: ImageIcon, desc: "4K photorealistic render" },
  { id: "panorama", label: "360° Panorama", icon: Globe, desc: "Immersive VR-ready panorama" },
  { id: "video", label: "Walkthrough Video", icon: Video, desc: "Animated camera tour" },
];

const qualityPresets = [
  { id: "draft", label: "Draft", time: "~30s", resolution: "1080p" },
  { id: "standard", label: "Standard", time: "~2min", resolution: "2K" },
  { id: "ultra", label: "Ultra HD", time: "~5min", resolution: "4K" },
];

export default function RenderStudioPage() {
  const [mode, setMode] = useState("image");
  const [quality, setQuality] = useState("standard");
  const [lighting, setLighting] = useState<"day" | "night">("day");
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  async function startRender() {
    setRendering(true);
    setProgress(0);
    setResult(null);

    const steps = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
    for (const p of steps) {
      await delay(300);
      setProgress(p);
    }

    const hue = lighting === "day" ? 35 : 240;
    setResult(`linear-gradient(135deg, hsl(${hue}, 30%, ${lighting === "day" ? 75 : 25}%), hsl(${hue + 20}, 25%, ${lighting === "day" ? 60 : 15}%))`);
    setRendering(false);
  }

  const sidebar = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Render Mode</h3>
        <div className="space-y-2">
          {renderModes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                mode === m.id ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <m.icon className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900">{m.label}</div>
                <div className="text-xs text-gray-500">{m.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Lighting</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setLighting("day")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm ${
              lighting === "day" ? "border-amber-400 bg-amber-50 text-amber-700" : "border-gray-200"
            }`}
          >
            <Sun className="w-4 h-4" /> Day
          </button>
          <button
            onClick={() => setLighting("night")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm ${
              lighting === "night" ? "border-indigo-400 bg-indigo-50 text-indigo-700" : "border-gray-200"
            }`}
          >
            <Moon className="w-4 h-4" /> Night
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Render Studio"
      description="Cloud rendering engine — photorealistic images, panoramas, and videos"
      sidebar={sidebar}
    >
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quality Preset</h3>
            <div className="space-y-2">
              {qualityPresets.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setQuality(q.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    quality === q.id ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium">{q.label}</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{q.resolution}</div>
                    <div className="text-xs text-brand-600">{q.time}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={startRender}
              disabled={rendering}
              className="w-full mt-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {rendering ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
              {rendering ? `Rendering ${progress}%` : "Start Render"}
            </button>
            {rendering && (
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 h-full min-h-[400px]">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Preview</h3>
            {result ? (
              <div className="relative">
                <div
                  className="aspect-video rounded-xl overflow-hidden relative"
                  style={{ background: result }}
                >
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/5 w-2/5 h-1/3 bg-white/10 rounded" />
                    <div className="absolute bottom-1/4 right-1/5 w-1/4 h-1/5 bg-white/5 rounded" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium drop-shadow">
                    {qualityPresets.find((q) => q.id === quality)?.resolution} · {lighting === "day" ? "Daylight" : "Night"} · {renderModes.find((m) => m.id === mode)?.label}
                  </div>
                </div>
                <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                  <Download className="w-4 h-4" /> Download Render
                </button>
              </div>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                <Camera className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm">Your render will appear here</p>
                <p className="text-xs mt-1">Configure settings and click Start Render</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
