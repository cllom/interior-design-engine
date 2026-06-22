"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Box,
  Home,
} from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Design<span className="text-brand-600">Engine</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-lg hover:bg-gray-50 transition-colors">
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-colors"
                        >
                          <div className="text-sm font-medium text-gray-900">{child.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{child.desc}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href!}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/tools/ai-design" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
              <Sparkles className="w-4 h-4" />
              AI Design
            </Link>
            <Link href="/tools/room-designer" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Box className="w-4 h-4" />
              3D Studio
            </Link>
            <Link href="/tools/room-designer" className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
              Start Designing
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {link.label}
                </div>
                {link.children ? (
                  <div className="space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={link.href!}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/tools/room-designer"
              className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-brand-600 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Start Designing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">DesignEngine</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Full-scene online 3D cloud design platform. One entry point — design faster.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/solutions/home" className="hover:text-white transition-colors">Home Design</Link></li>
              <li><Link href="/solutions/commercial" className="hover:text-white transition-colors">Commercial</Link></li>
              <li><Link href="/tools/render" className="hover:text-white transition-colors">Rendering</Link></li>
              <li><Link href="/tools/floor-plan" className="hover:text-white transition-colors">Floor Plans</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">AI Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/ai-design" className="hover:text-white transition-colors">AI Smart Design</Link></li>
              <li><Link href="/tools/ai-modeling" className="hover:text-white transition-colors">AI 3D Modeling</Link></li>
              <li><Link href="/tools/ai-image" className="hover:text-white transition-colors">AI Image Gen</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Open Platform</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
          © 2026 DesignEngine. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function ToolLayout({
  title,
  description,
  children,
  sidebar,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <div className={cn("max-w-7xl mx-auto", sidebar ? "flex" : "")}>
        {sidebar && (
          <aside className="w-72 shrink-0 border-r border-gray-200 bg-white min-h-[calc(100vh-8rem)] p-4 hidden md:block">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
