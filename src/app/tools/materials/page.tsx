"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/layout/Header";
import { materialLibrary } from "@/lib/data";
import { Search, Filter } from "lucide-react";

export default function MaterialsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(materialLibrary.map((m) => m.category)))];

  const filtered = materialLibrary.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || m.category === category;
    return matchSearch && matchCategory;
  });

  const sidebar = (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Categories</h3>
        <div className="space-y-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                category === c ? "bg-brand-50 text-brand-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Material Library"
      description="Browse thousands of materials, textures, and 3D models"
      sidebar={sidebar}
    >
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search materials..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setSelected(mat.id)}
              className={`text-left rounded-2xl border overflow-hidden card-hover transition-all ${
                selected === mat.id ? "border-brand-500 ring-2 ring-brand-200" : "border-gray-200"
              }`}
            >
              <div className="aspect-square relative" style={{ background: mat.color }}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px)`,
                  }}
                />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900">{mat.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{mat.category}</div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Filter className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No materials found</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
