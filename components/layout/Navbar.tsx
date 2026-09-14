"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Wheat, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/locales/dictionary";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "hry", label: "HRY" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/chambers", label: t.nav.chambers },
    { href: "/calculator", label: t.nav.calculator },
    { href: "/book", label: t.nav.booking },
    { href: "/govt-procurement", label: t.nav.govtProcurement },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-farm-green border-b-4 border-charcoal shadow-md">
      {/* Announcement Ticker */}
      <div className="bg-mustard-gold border-b-2 border-charcoal overflow-hidden h-8 flex items-center">
        <div className="ticker-track whitespace-nowrap text-charcoal font-bold text-xs md:text-sm">
          <span className="px-8">{t.ticker}</span>
          <span className="px-8">{t.ticker}</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-mustard-gold p-1.5 border-2 border-charcoal">
            <Wheat className="w-5 h-5 text-charcoal" strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <p className="text-white font-extrabold text-sm md:text-base tracking-tight">
              Rahul Agro
            </p>
            <p className="text-mustard-gold text-[10px] font-semibold tracking-widest uppercase">
              Limited
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-mustard-gold font-semibold text-sm px-3 py-2 hover:bg-farm-green-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Phone + Language + Mobile Menu */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+919728517836"
            className="hidden md:flex items-center gap-1.5 bg-mustard-gold border-2 border-charcoal px-3 py-1.5 font-bold text-charcoal text-xs hover:shadow-boxy-sm transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            9728517836
          </a>

          {/* Language Switcher */}
          <div className="flex border-2 border-charcoal overflow-hidden">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => setLocale(loc.code)}
                className={`px-2.5 py-1.5 text-xs font-bold transition-colors ${
                  locale === loc.code
                    ? "bg-mustard-gold text-charcoal"
                    : "bg-farm-green-light text-white hover:bg-mustard-gold hover:text-charcoal"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white border-2 border-white/40 p-1.5"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-farm-green-light border-t-2 border-charcoal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white font-semibold px-6 py-3 border-b border-farm-green hover:bg-farm-green hover:text-mustard-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+919728517836"
            className="flex items-center gap-2 text-mustard-gold font-bold px-6 py-3"
          >
            <Phone className="w-4 h-4" /> +91 9728517836
          </a>
        </div>
      )}
    </header>
  );
}
