"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter, Thermometer, Droplets, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CROPS, TEMP_RANGES, STACKING_TYPES } from "@/lib/constants";

function ChambersContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initCategory = searchParams.get("category") ?? "all";

  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [selectedTemp, setSelectedTemp] = useState<string>("all");
  const [selectedStacking, setSelectedStacking] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") ?? "all");
  }, [searchParams]);

  const filtered = CROPS.filter((crop) => {
    const catMatch = selectedCategory === "all" || crop.category === selectedCategory;
    const tempMatch =
      selectedTemp === "all" ||
      TEMP_RANGES.find(
        (r) => r.label === selectedTemp && crop.tempMin >= r.min && crop.tempMax <= r.max + 4
      );
    const stackMatch =
      selectedStacking.length === 0 ||
      selectedStacking.some((s) => crop.stackingTypes.includes(s));
    return catMatch && tempMatch && stackMatch;
  });

  const categories = [
    { id: "all", label: "All Chambers" },
    { id: "tuber", label: "🥔 Tuber Crops" },
    { id: "bulb", label: "🧅 Bulb Crops" },
    { id: "fruits", label: "🍎 Fruits" },
    { id: "grains", label: "🌾 Grains & Oilseeds" },
  ];

  const toggleStacking = (s: string) =>
    setSelectedStacking((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="min-h-screen bg-warm-soil">
      <div className="bg-farm-green border-b-4 border-charcoal py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Chamber Directory</h1>
          <p className="text-white/70">Browse all cold storage chambers by crop type, temperature, and stacking preference</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-24 left-6 z-40 boxy-btn-primary flex items-center gap-2"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r-2 border-charcoal overflow-y-auto transition-transform duration-300 lg:static lg:w-64 lg:translate-x-0 lg:block lg:shrink-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 space-y-8">
            <div>
              <h3 className="font-extrabold text-charcoal text-sm uppercase tracking-widest mb-3 border-b-2 border-mustard-gold pb-2">
                Category
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm font-semibold border-2 transition-all ${
                      selectedCategory === cat.id
                        ? "bg-farm-green text-white border-farm-green shadow-boxy-sm"
                        : "bg-white text-charcoal border-charcoal/20 hover:border-charcoal"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-charcoal text-sm uppercase tracking-widest mb-3 border-b-2 border-mustard-gold pb-2 flex items-center gap-2">
                <Thermometer className="w-4 h-4" /> Temperature Range
              </h3>
              <div className="space-y-2">
                {[{ label: "All Temperatures", value: "all" }, ...TEMP_RANGES.map((r) => ({ label: r.label, value: r.label }))].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="temp"
                      checked={selectedTemp === opt.value}
                      onChange={() => setSelectedTemp(opt.value)}
                      className="accent-farm-green"
                    />
                    <span className="text-sm font-medium text-charcoal">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-charcoal text-sm uppercase tracking-widest mb-3 border-b-2 border-mustard-gold pb-2 flex items-center gap-2">
                <Package className="w-4 h-4" /> Stacking Type
              </h3>
              <div className="space-y-2">
                {STACKING_TYPES.map((s) => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStacking.includes(s)}
                      onChange={() => toggleStacking(s)}
                      className="accent-farm-green"
                    />
                    <span className="text-sm font-medium text-charcoal">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Chamber Cards Grid */}
        <div className="flex-1">
          <p className="text-charcoal/60 text-sm mb-6 font-semibold">
            Showing {filtered.length} chamber{filtered.length !== 1 ? "s" : ""}
          </p>
          {filtered.length === 0 ? (
            <div className="boxy-card p-12 text-center">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-extrabold text-charcoal text-xl mb-2">No chambers match your filters</p>
              <p className="text-charcoal/60">Try adjusting temperature range or stacking type filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((crop) => (
                <div key={crop.id} className="boxy-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                  <div className="relative h-44 border-b-2 border-charcoal overflow-hidden">
                    <Image src={crop.image} alt={crop.name} fill className="object-cover" />
                    <div className="absolute top-2 left-2 bg-mustard-gold border-2 border-charcoal px-2 py-0.5">
                      <span className="text-charcoal font-bold text-xs">{crop.tempMin}°C – {crop.tempMax}°C</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-extrabold text-charcoal text-lg">{crop.name}</h3>
                    <div className="grid grid-cols-2 gap-2 my-3">
                      <div className="bg-warm-soil border border-charcoal/20 p-2">
                        <p className="text-xs text-charcoal/50 flex items-center gap-1"><Droplets className="w-3 h-3" /> {t.common.humidity}</p>
                        <p className="font-bold text-sm text-charcoal">{crop.humidity}</p>
                      </div>
                      <div className="bg-warm-soil border border-charcoal/20 p-2">
                        <p className="text-xs text-charcoal/50">{t.common.minDeposit}</p>
                        <p className="font-bold text-sm text-charcoal">₹{crop.minDeposit.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {crop.stackingTypes.map((s) => (
                        <span key={s} className="bg-farm-green/10 border border-farm-green/30 text-farm-green text-xs px-2 py-0.5 font-semibold">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t-2 border-charcoal/10">
                      <div>
                        <p className="text-2xl font-extrabold text-farm-green">₹{crop.ratePerQuintalPerMonth}</p>
                        <p className="text-xs text-charcoal/40">/quintal/month</p>
                      </div>
                      <Link href={`/book?crop=${crop.id}`} className="boxy-btn-primary text-sm px-4 py-2">
                        {t.common.bookSlot}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChambersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-charcoal font-bold text-xl">Loading chambers...</p></div>}>
      <ChambersContent />
    </Suspense>
  );
}
