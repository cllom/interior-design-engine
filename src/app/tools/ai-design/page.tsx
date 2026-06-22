"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ToolLayout } from "@/components/layout/Header";
import { aiDesignStyles, furnitureCatalog } from "@/lib/data";
import { delay } from "@/lib/utils";
import {
  Send,
  Sparkles,
  Loader2,
  CheckCircle2,
  Box,
  Palette,
  Layout,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function AIDesignContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to AI Smart Design! Describe your space — room type, style, size, and preferences — and I'll generate a complete 3D design plan in 3 steps.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<{
    room: string;
    style: string;
    furniture: string[];
    colors: string[];
  } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setInput(q);
      handleSend(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text?: string) {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);
    setStep(1);

    await delay(800);
    setStep(2);
    await delay(1200);
    setStep(3);

    const style =
      selectedStyle ||
      aiDesignStyles.find((s) => msg.toLowerCase().includes(s.toLowerCase().split(" ")[0])) ||
      aiDesignStyles[Math.floor(Math.random() * aiDesignStyles.length)];

    const roomType = msg.toLowerCase().includes("bedroom")
      ? "Master Bedroom"
      : msg.toLowerCase().includes("kitchen")
        ? "Open Kitchen"
        : msg.toLowerCase().includes("office")
          ? "Home Office"
          : "Living Room";

    const plan = {
      room: roomType,
      style,
      furniture: furnitureCatalog
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((f) => f.name),
      colors: ["#f5f0eb", "#8b7355", "#2d3748", "#e8dcc8"].sort(() => Math.random() - 0.5),
    };

    setGeneratedPlan(plan);
    setSelectedStyle(style);

    const response = `I've created a **${style}** design for your **${roomType}**!\n\n**Design Plan:**\n• Style: ${style}\n• Room: ${roomType}\n• Key furniture: ${plan.furniture.join(", ")}\n• Color palette: Warm neutrals with accent tones\n\nYour 3D space is ready to edit. You can adjust furniture placement, swap materials, and render in the 3D studio.`;

    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setLoading(false);
    setStep(0);
  }

  const sidebar = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4" /> Design Style
        </h3>
        <div className="flex flex-wrap gap-2">
          {aiDesignStyles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                selectedStyle === style
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-300"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Layout className="w-4 h-4" /> Quick Prompts
        </h3>
        <div className="space-y-2">
          {[
            "Modern minimalist living room, 25sqm",
            "Scandinavian bedroom with warm lighting",
            "Open kitchen with island, light luxury style",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="w-full text-left px-3 py-2 text-xs text-gray-600 bg-gray-50 rounded-lg hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="AI Smart Design"
      description="Describe your vision — get an editable 3D space in 3 steps"
      sidebar={sidebar}
    >
      <div className="grid lg:grid-cols-5 gap-6 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <span key={j}>
                      {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                      {j < msg.content.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-3 px-4 py-3 bg-violet-50 rounded-2xl text-sm text-violet-700">
                <Loader2 className="w-4 h-4 animate-spin" />
                {step === 1 && "Analyzing your requirements..."}
                {step === 2 && "Generating 3D layout..."}
                {step === 3 && "Applying materials and lighting..."}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe your dream space..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-4 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Box className="w-4 h-4" /> 3D Preview
            </h3>
            {generatedPlan ? (
              <div className="space-y-4">
                <div
                  className="h-48 rounded-xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${generatedPlan.colors[0]}, ${generatedPlan.colors[1]})`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2 p-4">
                      {generatedPlan.furniture.slice(0, 6).map((f, i) => (
                        <div
                          key={f}
                          className="w-12 h-12 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center text-[10px] text-white font-medium text-center p-1"
                          style={{ transform: `translateY(${i % 2 === 0 ? -4 : 4}px)` }}
                        >
                          {f.split(" ")[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1">
                    {generatedPlan.colors.map((c) => (
                      <div key={c} className="flex-1 h-2 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Room</span>
                    <span className="font-medium">{generatedPlan.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Style</span>
                    <span className="font-medium">{generatedPlan.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Items</span>
                    <span className="font-medium">{generatedPlan.furniture.length} pieces</span>
                  </div>
                </div>
                <Link
                  href="/tools/room-designer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Open in 3D Studio
                </Link>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                <Box className="w-12 h-12 mb-3 opacity-30" />
                <p>Your 3D preview will appear here</p>
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">3-Step Process</h3>
            {["Analyze requirements", "Generate 3D layout", "Apply materials"].map((s, i) => (
              <div key={s} className="flex items-center gap-2 py-2">
                {loading && step > i ? (
                  <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
                ) : !loading && generatedPlan ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                )}
                <span className="text-sm text-gray-600">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export default function AIDesignPage() {
  return (
    <Suspense>
      <AIDesignContent />
    </Suspense>
  );
}
