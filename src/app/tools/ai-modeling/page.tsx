"use client";

import { useState, useRef } from "react";
import { ToolLayout } from "@/components/layout/Header";
import { delay } from "@/lib/utils";
import {
  Upload,
  Type,
  Loader2,
  Download,
  RotateCcw,
  Box,
  Image as ImageIcon,
} from "lucide-react";

type Mode = "text" | "image";

export default function AIModelingPage() {
  const [mode, setMode] = useState<Mode>("text");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ name: string; vertices: number; format: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function generate() {
    if (mode === "text" && !prompt.trim()) return;
    if (mode === "image" && !previewImage) return;

    setLoading(true);
    setProgress(0);
    setResult(null);

    const steps = [15, 35, 55, 75, 90, 100];
    for (const p of steps) {
      await delay(600);
      setProgress(p);
    }

    const name = mode === "text"
      ? prompt.split(" ").slice(0, 3).join(" ") || "Custom Model"
      : "Imported Model";

    setResult({
      name,
      vertices: Math.floor(Math.random() * 50000) + 10000,
      format: "GLB",
    });

    drawPreview(name);
    setLoading(false);
  }

  function drawPreview(name: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, 400, 400);

    const hue = name.length * 30 % 360;
    ctx.fillStyle = `hsl(${hue}, 60%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(200, 80);
    ctx.lineTo(320, 280);
    ctx.lineTo(80, 280);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = `hsl(${hue}, 40%, 35%)`;
    ctx.fillRect(120, 280, 160, 60);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(name, 200, 370);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  const sidebar = (
    <div className="space-y-4">
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => setMode("text")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${
            mode === "text" ? "bg-brand-600 text-white" : "bg-white text-gray-600"
          }`}
        >
          <Type className="w-3.5 h-3.5" /> Text
        </button>
        <button
          onClick={() => setMode("image")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${
            mode === "image" ? "bg-brand-600 text-white" : "bg-white text-gray-600"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" /> Image
        </button>
      </div>
      <div className="text-xs text-gray-500 space-y-2">
        <p>Supported formats: OBJ, GLB, FBX</p>
        <p>Max polygon count: 100K</p>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="AI 3D Modeling"
      description="Generate 3D models from text descriptions or reference images"
      sidebar={sidebar}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          {mode === "text" ? (
            <>
              <label className="text-sm font-medium text-gray-900">Describe your 3D model</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Modern Scandinavian dining chair with curved wooden legs..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
              <div className="flex flex-wrap gap-2">
                {["Modern sofa", "Pendant lamp", "Coffee table", "Bookshelf"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPrompt(s)}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-brand-300 transition-colors"
              >
                {previewImage ? (
                  <img src={previewImage} alt="Upload" className="max-h-48 mx-auto rounded-lg" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload reference image</p>
                  </>
                )}
              </div>
            </>
          )}

          <button
            onClick={generate}
            disabled={loading || (mode === "text" ? !prompt.trim() : !previewImage)}
            className="w-full py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Box className="w-5 h-5" />}
            {loading ? "Generating..." : "Generate 3D Model"}
          </button>

          {loading && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Processing mesh...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">3D Preview</h3>
          <div className="bg-gray-900 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
            {result ? (
              <canvas ref={canvasRef} className="w-full h-full" />
            ) : (
              <div className="text-center text-gray-500">
                <Box className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Your 3D model preview</p>
              </div>
            )}
          </div>
          {result && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Vertices</div>
                  <div className="text-sm font-semibold">{result.vertices.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Format</div>
                  <div className="text-sm font-semibold">{result.format}</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="text-sm font-semibold text-green-600">Ready</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" /> Export GLB
                </button>
                <button
                  onClick={() => { setResult(null); setProgress(0); }}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
