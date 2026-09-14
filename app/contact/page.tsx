"use client";
import { Phone, MapPin, Mail, Clock, Truck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  const contactCards = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: t.contact.phone,
      value: "+91 9728517836",
      href: "tel:+919728517836",
      color: "bg-green-50 border-green-400",
      iconColor: "text-green-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: t.contact.email,
      value: "info@rahulagro.in",
      href: "mailto:info@rahulagro.in",
      color: "bg-blue-50 border-blue-400",
      iconColor: "text-blue-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: t.contact.gateTimings,
      value: t.contact.gateTimingsValue,
      href: null,
      color: "bg-yellow-50 border-yellow-400",
      iconColor: "text-yellow-600",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      label: t.contact.reefer,
      value: t.contact.reeферValue,
      href: null,
      color: "bg-purple-50 border-purple-400",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-warm-soil">
      <div className="bg-farm-green border-b-4 border-charcoal py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{t.contact.title}</h1>
          <div className="flex items-start gap-2 text-white/70">
            <MapPin className="w-5 h-5 text-mustard-gold mt-0.5 shrink-0" />
            <p>{t.contact.addressValue}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactCards.map((card, i) => (
            <div key={i} className={`border-2 shadow-boxy p-5 ${card.color}`}>
              <div className={`${card.iconColor} mb-3`}>{card.icon}</div>
              <p className="text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-1">{card.label}</p>
              {card.href ? (
                <a href={card.href} className={`font-extrabold text-charcoal hover:underline text-sm`}>
                  {card.value}
                </a>
              ) : (
                <p className="font-extrabold text-charcoal text-sm">{card.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map */}
          <div className="boxy-card overflow-hidden">
            <div className="bg-charcoal text-white px-6 py-4 flex items-center justify-between">
              <h2 className="font-extrabold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-mustard-gold" /> Location Map
              </h2>
              <a
                href="https://maps.google.com/?q=Sainipura+Taoru+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mustard-gold text-sm font-bold flex items-center gap-1 hover:text-white"
              >
                {t.contact.getDirections} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56388.26!2d76.85!3d28.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3e0a00000001%3A0x2b0000000000!2sTaoru%2C+Haryana!5e0!3m2!1sen!2sin!4v1234567890123"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rahul Agro Limited Location Map"
            />
          </div>

          {/* Quick Contact Form */}
          <div className="boxy-card p-6">
            <h2 className="font-extrabold text-charcoal text-lg mb-6 pb-3 border-b-2 border-mustard-gold">
              Send us a Message
            </h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message received! We will contact you within 24 hours."); }}>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none focus:border-farm-green"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none focus:border-farm-green"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">Your Query</label>
                <textarea
                  rows={4}
                  placeholder="Storage rates, booking help, reefer timing..."
                  required
                  className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none resize-none focus:border-farm-green"
                />
              </div>
              <button type="submit" className="w-full boxy-btn-primary py-3">
                Send Message →
              </button>
            </form>
          </div>
        </div>

        {/* Facility Details */}
        <div className="mt-10 boxy-card overflow-hidden">
          <div className="bg-mustard-gold border-b-2 border-charcoal px-6 py-4">
            <h2 className="font-extrabold text-charcoal text-lg">Facility Highlights — Sainipura, Taoru</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-charcoal/10">
            {[
              { emoji: "❄️", title: "3 Cold Chambers", desc: "Total capacity: 15,000 MT" },
              { emoji: "⚡", title: "100% DG Backup", desc: "Uninterrupted power, 24x7" },
              { emoji: "🌡️", title: "IoT Monitoring", desc: "Live temp & humidity logs" },
              { emoji: "🚛", title: "Reefer Bay", desc: "4 bays, all-day access" },
              { emoji: "📄", title: "e-NWR Support", desc: "Bank financing available" },
              { emoji: "🔒", title: "24x7 Security", desc: "CCTV + guard patrolling" },
            ].map((item) => (
              <div key={item.title} className="p-6 text-center">
                <p className="text-4xl mb-2">{item.emoji}</p>
                <p className="font-extrabold text-charcoal">{item.title}</p>
                <p className="text-charcoal/50 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
