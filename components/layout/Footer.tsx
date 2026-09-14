"use client";
import Link from "next/link";
import { Wheat, Phone, MapPin, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-charcoal text-white border-t-4 border-mustard-gold">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-mustard-gold p-1.5 border-2 border-white">
              <Wheat className="w-5 h-5 text-charcoal" />
            </span>
            <div>
              <p className="font-extrabold text-lg">Rahul Agro</p>
              <p className="text-mustard-gold text-xs tracking-widest uppercase">Limited</p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Premium cold storage facility for farmers, traders & government agencies in Haryana.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-extrabold text-mustard-gold mb-4 border-b-2 border-mustard-gold/40 pb-2 text-sm uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              { href: "/chambers", label: t.nav.chambers },
              { href: "/calculator", label: t.nav.calculator },
              { href: "/book", label: t.nav.booking },
              { href: "/govt-procurement", label: t.nav.govtProcurement },
              { href: "/contact", label: t.nav.contact },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 hover:text-mustard-gold text-sm transition-colors">
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Crops */}
        <div>
          <h3 className="font-extrabold text-mustard-gold mb-4 border-b-2 border-mustard-gold/40 pb-2 text-sm uppercase tracking-widest">
            Storage For
          </h3>
          <ul className="text-white/70 text-sm space-y-1">
            {["Potato / Aaloo", "Onion / Pyaz", "Apple & Kinnow", "Mustard / Sarson", "Wheat / Gehu", "FCI/HAFED Tender"].map((item) => (
              <li key={item}>🌿 {item}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-extrabold text-mustard-gold mb-4 border-b-2 border-mustard-gold/40 pb-2 text-sm uppercase tracking-widest">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2 items-start text-white/70">
              <MapPin className="w-4 h-4 text-mustard-gold mt-0.5 shrink-0" />
              Sainipura, Taoru, Nuh Dist., Haryana
            </li>
            <li>
              <a href="tel:+919728517836" className="flex gap-2 items-center text-mustard-gold font-bold hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +91 9728517836
              </a>
            </li>
            <li className="flex gap-2 items-center text-white/70">
              <Mail className="w-4 h-4 text-mustard-gold" />
              info@rahulagro.in
            </li>
            <li className="flex gap-2 items-start text-white/70">
              <Clock className="w-4 h-4 text-mustard-gold mt-0.5 shrink-0" />
              6:00 AM – 10:00 PM (All Days)
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-white/10 py-4">
        <p className="text-center text-white/40 text-xs">
          © {new Date().getFullYear()} Rahul Agro Limited. All rights reserved. | Sainipura, Taoru, Haryana
        </p>
      </div>
    </footer>
  );
}
