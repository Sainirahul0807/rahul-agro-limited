"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Search, Thermometer, Shield, Zap, FileText, ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CROPS, CHAMBER_STATUS } from "@/lib/constants";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  const { t } = useLanguage();
  useReveal();

  const categoryImages: Record<string, string> = {
    tuber: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
    bulb: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80",
    fruits: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80",
    grains: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
    govt: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&q=80",
  };

  const categoryList = [
    { key: "tuber" as const, title: t.categories.tuber, desc: t.categories.tuberDesc },
    { key: "bulb" as const, title: t.categories.bulb, desc: t.categories.bulbDesc },
    { key: "fruits" as const, title: t.categories.fruits, desc: t.categories.fruitsDesc },
    { key: "grains" as const, title: t.categories.grains, desc: t.categories.grainsDesc },
    { key: "govt" as const, title: t.categories.govt, desc: t.categories.govtDesc },
  ];

  const features = [
    { icon: <FileText className="w-7 h-7" />, title: t.features.enwr, desc: t.features.enwrDesc },
    { icon: <Thermometer className="w-7 h-7" />, title: t.features.iot, desc: t.features.iotDesc },
    { icon: <Zap className="w-7 h-7" />, title: t.features.dg, desc: t.features.dgDesc },
    { icon: <Shield className="w-7 h-7" />, title: t.features.insurance, desc: t.features.insuranceDesc },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-farm-green overflow-hidden min-h-[520px] flex items-center">
        {/* Wheat leaf decorations */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute left-4 bottom-8 text-[90px] wheat-1 opacity-10">🌾</span>
          <span className="absolute left-24 bottom-0 text-[70px] wheat-2 opacity-10">🌿</span>
          <span className="absolute right-8 bottom-12 text-[80px] wheat-3 opacity-10">🌾</span>
          <span className="absolute right-32 top-10 text-[60px] wheat-1 opacity-10">🌿</span>
          <span className="absolute left-1/2 top-4 text-[50px] wheat-2 opacity-10">🌾</span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-mustard-gold border-2 border-charcoal px-3 py-1.5 mb-6 shadow-boxy-sm">
                <span className="w-2 h-2 bg-charcoal rounded-full animate-pulse" />
                <span className="text-charcoal font-bold text-xs uppercase tracking-widest">
                  Sainipura, Taoru · Est. 2019
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                {t.hero.title}
              </h1>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">{t.hero.subtitle}</p>

              {/* Search Bar */}
              <div className="flex border-2 border-charcoal shadow-boxy bg-white mb-6">
                <div className="flex items-center px-3 border-r-2 border-charcoal">
                  <Search className="w-5 h-5 text-charcoal/50" />
                </div>
                <input
                  type="text"
                  placeholder={t.hero.searchPlaceholder}
                  className="flex-1 px-4 py-3 text-sm outline-none font-medium"
                />
                <Link href="/chambers" className="boxy-btn-gold text-sm">
                  Search
                </Link>
              </div>

              <div className="flex gap-3">
                <Link href="/book" className="boxy-btn-gold">
                  {t.hero.bookNow} →
                </Link>
                <Link href="/calculator" className="boxy-btn-outline bg-transparent text-white border-white/60 hover:border-white">
                  {t.nav.calculator}
                </Link>
              </div>
            </div>

            {/* Right: Chamber Status Cards */}
            <div>
              <p className="text-mustard-gold font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-green" />
                {t.hero.chamberStatus}
              </p>
              <div className="space-y-3">
                {CHAMBER_STATUS.map((chamber) => (
                  <div key={chamber.id} className="bg-white border-2 border-charcoal shadow-boxy p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-extrabold text-charcoal text-sm">{chamber.name}</p>
                        <p className="text-charcoal/60 text-xs">{chamber.crops} · {chamber.temp}</p>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 border-2 ${
                          chamber.booked > 80
                            ? "bg-red-100 border-red-600 text-red-700"
                            : chamber.booked > 60
                            ? "bg-yellow-100 border-yellow-600 text-yellow-700"
                            : "bg-green-100 border-green-600 text-green-700"
                        }`}
                      >
                        {100 - chamber.booked}% {t.hero.available}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 border border-charcoal/20">
                      <div
                        className={`h-full transition-all duration-500 ${
                          chamber.booked > 80 ? "bg-red-500" : chamber.booked > 60 ? "bg-yellow-500" : "bg-farm-green"
                        }`}
                        style={{ width: `${chamber.booked}%` }}
                      />
                    </div>
                    <p className="text-charcoal/50 text-xs mt-1">{chamber.booked}% {t.hero.booked}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY GRID ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title mb-10">{t.categories.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryList.map((cat, i) => (
            <Link
              key={cat.key}
              href={cat.key === "govt" ? "/govt-procurement" : `/chambers?category=${cat.key}`}
              className="reveal boxy-card group hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all overflow-hidden"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="relative h-32 overflow-hidden border-b-2 border-charcoal">
                <Image
                  src={categoryImages[cat.key]}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="font-extrabold text-charcoal text-sm leading-tight">{cat.title}</p>
                <p className="text-charcoal/60 text-xs mt-1">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-mustard-gold text-xs font-bold mt-2">
                  {t.common.bookSlot} <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED CROPS ===== */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white border-b-4 border-mustard-gold pb-2 inline-block">
              Available Storage Chambers
            </h2>
            <Link href="/chambers" className="boxy-btn-gold text-sm hidden md:flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CROPS.slice(0, 4).map((crop, i) => (
              <div key={crop.id} className="reveal bg-white border-2 border-charcoal shadow-boxy" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-44 border-b-2 border-charcoal overflow-hidden">
                  <Image src={crop.image} alt={crop.name} fill className="object-cover" />
                  <div className="absolute top-2 left-2 bg-mustard-gold border-2 border-charcoal px-2 py-0.5">
                    <span className="text-charcoal font-bold text-xs">{crop.tempMin}°C – {crop.tempMax}°C</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-extrabold text-charcoal">{crop.name}</p>
                  <p className="text-charcoal/50 text-xs mb-3">Humidity: {crop.humidity}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-farm-green font-extrabold text-lg">₹{crop.ratePerQuintalPerMonth}</p>
                      <p className="text-charcoal/40 text-xs">/quintal/month</p>
                    </div>
                    <Link href={`/book?crop=${crop.id}`} className="boxy-btn-primary text-sm px-3 py-2">
                      {t.common.bookSlot}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/chambers" className="boxy-btn-gold inline-flex items-center gap-2">
              View All Chambers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title mb-10">{t.features.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => (
            <div key={i} className="reveal boxy-card p-6" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-mustard-gold mb-4 p-3 bg-mustard-gold/10 border-2 border-mustard-gold/30 w-fit">
                {feat.icon}
              </div>
              <h3 className="font-extrabold text-charcoal mb-2">{feat.title}</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-mustard-gold border-y-4 border-charcoal py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4">
            Ready to Reserve Your Cold Storage Space?
          </h2>
          <p className="text-charcoal/70 mb-8 text-lg">
            Join 500+ farmers & traders who trust Rahul Agro Limited for safe, affordable cold storage in Haryana.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book" className="boxy-btn-primary text-lg px-8 py-4">
              Book Storage Now
            </Link>
            <Link href="/calculator" className="boxy-btn-outline text-lg px-8 py-4">
              Calculate Rent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
