"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Upload,
  Search,
  Image as ImageIcon,
  Type,
  ArrowRight,
  Sparkles,
  Zap,
  Video,
  Library,
  Workflow,
} from "lucide-react";
import { withBasePath } from "@/lib/utils";

const iconMap = {
  workflow: Workflow,
  zap: Zap,
  sparkles: Sparkles,
  video: Video,
  library: Library,
};

const quickActions = [
  { icon: Search, label: "Apartment Search", count: "10M+" },
  { icon: ImageIcon, label: "Image Search Model", count: "500K+" },
  { icon: Type, label: "Text to Image", count: "AI" },
];

export function HeroSection() {
  const [prompt, setPrompt] = useState("");

  return (
    <section className="gradient-hero min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm text-blue-200 mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered 3D Design Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Full-Scene{" "}
              <span className="gradient-text">3D Rendering</span>
              <br />
              One Entry, Design Faster
            </h1>
            <p className="mt-6 text-lg text-blue-100/80 max-w-lg">
              Cloud-based interior design with AI tools, instant rendering, and millions of 3D assets. Start designing today — free for personal use.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tools/room-designer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Start Designing Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools/ai-design"
                className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-semibold rounded-xl hover:bg-white/15 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Try AI Design
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 animate-pulse-glow"
          >
            <div className="text-sm text-blue-200 mb-4 font-medium">
              Super Entrance — Start designing today
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your dream space or ask a question..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && prompt.trim()) {
                    window.location.href = withBasePath(`/tools/ai-design?q=${encodeURIComponent(prompt)}`);
                  }
                }}
              />
              <Link
                href={prompt.trim() ? `/tools/ai-design?q=${encodeURIComponent(prompt)}` : "/tools/ai-design"}
                className="px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors flex items-center"
              >
                <Send className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-blue-200 hover:bg-white/10 rounded-lg transition-colors">
                <Upload className="w-4 h-4" />
                Upload file
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center"
                >
                  <action.icon className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                  <div className="text-xs text-blue-200 font-medium">{action.label}</div>
                  <div className="text-xs text-blue-300/60 mt-1">{action.count}</div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection({ features }: { features: typeof import("@/lib/data").features }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Lightning-Fast Rendering, Master-Level Design
          </h2>
          <p className="mt-4 text-lg text-gray-500">3 steps to get started — design made effortless.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Sparkles;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 card-hover bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-brand-600 font-medium mt-1">{feature.subtitle}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{feature.desc}</p>
                <Link
                  href="/tools/room-designer"
                  className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium mt-4 hover:gap-2 transition-all"
                >
                  Try Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection({ industries }: { industries: typeof import("@/lib/data").industries }) {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Expert in Every Industry
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {industries.map((ind, i) => (
            <button
              key={ind.slug}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === i
                  ? "bg-brand-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {ind.title}
            </button>
          ))}
        </div>

        <motion.div
          key={current.slug}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          <div className={`rounded-2xl bg-gradient-to-br ${current.gradient} p-12 text-white min-h-[320px] flex flex-col justify-center`}>
            <h3 className="text-3xl font-bold mb-2">{current.title}</h3>
            <p className="text-white/80 text-lg">{current.tagline}</p>
            <div className="mt-8 space-y-3">
              {current.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-white/90 text-sm">{f}</span>
                </div>
              ))}
            </div>
            <Link
              href={`/solutions/${current.slug}`}
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 bg-white text-gray-900 font-medium rounded-lg w-fit hover:bg-white/90 transition-colors"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/solutions/${ind.slug}`}
                className={`p-4 rounded-xl border transition-all card-hover ${
                  ind.slug === current.slug
                    ? "border-brand-300 bg-brand-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${ind.gradient} mb-3`} />
                <div className="text-sm font-semibold text-gray-900">{ind.title}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{ind.tagline}</div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WorkflowSection({ steps }: { steps: typeof import("@/lib/data").workflowSteps }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ultra-HD Renders in Just 3 Steps
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-brand-300 to-brand-100" />
              )}
              <div className="w-24 h-24 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-3xl font-bold text-brand-600">{step.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">{step.desc}</p>
              <Link
                href={i === 0 ? "/tools/floor-plan" : i === 1 ? "/tools/room-designer" : "/tools/render"}
                className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium mt-4 hover:gap-2 transition-all"
              >
                {step.action} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: typeof import("@/lib/data").testimonials }) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
          Trusted by Millions of Users
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-white p-6 rounded-2xl border border-gray-100 card-hover">
              <p className="text-gray-600 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Start Your Design Journey Today
        </h2>
        <p className="mt-4 text-lg text-blue-100/80">
          The most powerful design tool you&apos;ll ever find — free to start.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/tools/room-designer"
            className="px-8 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            Free Personal Use
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-3 glass text-white font-semibold rounded-xl hover:bg-white/15 transition-colors"
          >
            Enterprise Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AIToolsBanner() {
  const tools = [
    { title: "AI Smart Design", desc: "3-step editable 3D space generation", href: "/tools/ai-design", color: "from-violet-500 to-purple-600" },
    { title: "AI 3D Modeling", desc: "Text or image to 3D models instantly", href: "/tools/ai-modeling", color: "from-blue-500 to-cyan-600" },
    { title: "AI Image Gen", desc: "High-quality renders from a single prompt", href: "/tools/ai-image", color: "from-pink-500 to-rose-600" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">AI Design Suite</h2>
          <p className="mt-4 text-gray-500">Chat your ideas — AI handles the rest</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group p-8 rounded-2xl bg-gradient-to-br ${tool.color} text-white card-hover`}
            >
              <Sparkles className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="text-xl font-bold">{tool.title}</h3>
              <p className="text-white/80 text-sm mt-2">{tool.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                Try Now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
