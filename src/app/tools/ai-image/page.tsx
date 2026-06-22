"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/layout/Header";
import { aiDesignStyles } from "@/lib/data";
import { delay } from "@/lib/utils";
import {
  Sparkles,
  Loader2,
  Download,
  RefreshCw,
  Wand2,
} from "lucide-react";

const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Dining Room"];

export default function AIImagePage() {
  const [prompt, setPrompt] = useState("");
  const [room, setRoom] = useState("Living Room");
  const [style, setStyle] = useState("Modern Minimalist");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<{ id: number; gradient: string; label: string }[]>([]);

  async function generate() {
    if (!prompt.trim() && !style) return;
    setLoading(true);

    await delay(2000);

    const newImages = Array.from({ length: 4 }, (_, i) => {
      const hues = [
        [220, 60, 45],
        [30, 55, 50],
        [150, 40, 40],
        [280, 50, 45],
      ][i];
      const [h, s, l] = hues;
      return {
        id: Date.now() + i,
        gradient: `linear-gradient(${135 + i * 30}deg, hsl(${h}, ${s}%, ${l}%), hsl(${h + 40}, ${s - 10}%, ${l - 15}%))`,
        label: `${style} ${room} — Variation ${i + 1}`,
      };
    });

    setImages(newImages);
    setLoading(false);
  }

  const sidebar = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-gray-900 mb-2 block">Room Type</label>
        <div className="space-y-1">
          {roomTypes.map((r) => (
            <button
              key={r}
              onClick={() => setRoom(r)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                room === r ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-900 mb-2 block">Style</label>
        <div className="flex flex-wrap gap-1.5">
          {aiDesignStyles.slice(0, 6).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                style === s ? "bg-brand-600 text-white border-brand-600" : "border-gray-200 text-gray-600"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="AI Image Generation"
      description="Generate photorealistic interior renderings from text prompts"
      sidebar={sidebar}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex gap-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe your ${room.toLowerCase()} — e.g. spacious with floor-to-ceiling windows...`}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              onKeyDown={(e) => e.key === "Enter" && generate()}
            />
            <button
              onClick={generate}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              Generate
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Warm ambient lighting, marble floors",
              "Cozy reading nook by the window",
              "Open concept with kitchen island",
            ].map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-violet-50 hover:text-violet-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
              </div>
            ))}
          </div>
        )}

        {!loading && images.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" />
                Generated Results
              </h3>
              <button
                onClick={generate}
                className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700"
              >
                <RefreshCw className="w-4 h-4" /> Regenerate
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img) => (
                <div key={img.id} className="group relative rounded-2xl overflow-hidden card-hover">
                  <div
                    className="aspect-[4/3] relative"
                    style={{ background: img.gradient }}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-white/10 rounded-lg" />
                      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/4 bg-white/5 rounded" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm font-medium">{img.label}</p>
                      <p className="text-white/70 text-xs mt-0.5">4K · Photorealistic</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium text-gray-500">Ready to create</p>
            <p className="text-sm mt-1">Enter a prompt and click Generate to create stunning interior renders</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
