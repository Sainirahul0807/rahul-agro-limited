"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calculator, IndianRupee, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CROPS } from "@/lib/constants";
import Link from "next/link";

function CalculatorContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initCrop = searchParams.get("crop") ?? "";

  const [cropId, setCropId] = useState(initCrop);
  const [quantity, setQuantity] = useState<number>(100);
  const [months, setMonths] = useState<number>(3);
  const [calculated, setCalculated] = useState(false);

  const selectedCrop = CROPS.find((c) => c.id === cropId);

  const storageCost = selectedCrop ? selectedCrop.ratePerQuintalPerMonth * quantity * months : 0;
  const insurance = storageCost * 0.005;
  const total = storageCost + insurance;
  const advanceToken = total * 0.2;

  function handleCalculate() {
    if (cropId && quantity > 0 && months > 0) setCalculated(true);
  }

  return (
    <div className="min-h-screen bg-warm-soil">
      <div className="bg-farm-green border-b-4 border-charcoal py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-mustard-gold" />
            {t.calculator.title}
          </h1>
          <p className="text-white/70">{t.calculator.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="boxy-card p-6">
            <h2 className="font-extrabold text-charcoal text-lg mb-6 pb-3 border-b-2 border-mustard-gold">
              Enter Storage Details
            </h2>
            <div className="space-y-5">
              {/* Crop Select */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">{t.calculator.crop}</label>
                <div className="relative">
                  <select
                    value={cropId}
                    onChange={(e) => { setCropId(e.target.value); setCalculated(false); }}
                    className="w-full border-2 border-charcoal px-4 py-3 pr-10 font-semibold bg-white appearance-none outline-none cursor-pointer"
                  >
                    <option value="">-- Select Crop --</option>
                    {CROPS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — ₹{c.ratePerQuintalPerMonth}/qtl/mo
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/50 pointer-events-none" />
                </div>
                {selectedCrop && (
                  <p className="text-xs text-farm-green font-semibold mt-1">
                    Ideal temp: {selectedCrop.tempMin}°C – {selectedCrop.tempMax}°C · Humidity: {selectedCrop.humidity}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t.calculator.quantity}: <span className="text-farm-green">{quantity} quintals</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={5000}
                  step={10}
                  value={quantity}
                  onChange={(e) => { setQuantity(Number(e.target.value)); setCalculated(false); }}
                  className="w-full accent-farm-green"
                />
                <div className="flex justify-between text-xs text-charcoal/40 font-semibold mt-1">
                  <span>10 qtl</span><span>5000 qtl</span>
                </div>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  value={quantity}
                  onChange={(e) => { setQuantity(Math.min(5000, Math.max(10, Number(e.target.value)))); setCalculated(false); }}
                  className="mt-2 border-2 border-charcoal px-3 py-2 w-full font-semibold outline-none"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t.calculator.duration}: <span className="text-farm-green">{months} {t.calculator.months}</span>
                </label>
                <div className="grid grid-cols-6 gap-1">
                  {[1, 2, 3, 4, 6, 9].map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMonths(m); setCalculated(false); }}
                      className={`py-2 border-2 font-bold text-sm transition-all ${
                        months === m
                          ? "bg-farm-green text-white border-farm-green shadow-boxy-sm"
                          : "bg-white text-charcoal border-charcoal/30 hover:border-charcoal"
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!cropId}
                className="w-full boxy-btn-gold text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.calculator.calculate} →
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="boxy-card p-6">
            <h2 className="font-extrabold text-charcoal text-lg mb-6 pb-3 border-b-2 border-mustard-gold flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-farm-green" />
              Estimated Charges
            </h2>

            {!calculated ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <span className="text-6xl mb-4">🌾</span>
                <p className="text-charcoal/50 font-semibold">Select a crop and enter details to see your storage cost estimate.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-warm-soil border-2 border-charcoal/20 p-4">
                  <p className="text-xs font-bold text-charcoal/50 uppercase tracking-widest">{t.calculator.storageCost}</p>
                  <p className="text-3xl font-extrabold text-charcoal mt-1">
                    ₹{storageCost.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-charcoal/40 mt-1">
                    {quantity} qtl × {months} mo × ₹{selectedCrop?.ratePerQuintalPerMonth}/qtl/mo
                  </p>
                </div>

                <div className="bg-warm-soil border-2 border-charcoal/20 p-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-charcoal/50 uppercase tracking-widest">{t.calculator.insurance}</p>
                    <p className="text-lg font-extrabold text-charcoal">₹{insurance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                  </div>
                  <span className="bg-blue-100 border-2 border-blue-400 text-blue-700 font-bold text-xs px-2 py-1">0.5%</span>
                </div>

                <div className="bg-mustard-gold/20 border-2 border-mustard-gold p-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-charcoal/60 uppercase tracking-widest">{t.calculator.advanceToken}</p>
                    <p className="text-lg font-extrabold text-charcoal">₹{advanceToken.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                  </div>
                  <span className="bg-mustard-gold border-2 border-charcoal text-charcoal font-bold text-xs px-2 py-1">20%</span>
                </div>

                <div className="bg-farm-green border-2 border-charcoal shadow-boxy p-4">
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest">{t.calculator.totalEstimate}</p>
                  <p className="text-4xl font-extrabold text-white mt-1">
                    ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <Link href={`/book?crop=${cropId}`} className="block w-full text-center boxy-btn-gold py-3">
                    Book This Storage →
                  </Link>
                  <p className="text-center text-xs text-charcoal/40">
                    *Estimates are indicative. Final rates confirmed at booking.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rate Table */}
        <div className="mt-12 boxy-card overflow-hidden">
          <div className="bg-charcoal text-white px-6 py-4">
            <h3 className="font-extrabold text-lg">Current Storage Rates (Per Quintal / Month)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-warm-soil border-b-2 border-charcoal">
                  <th className="text-left px-6 py-3 font-extrabold text-charcoal">Crop</th>
                  <th className="text-left px-4 py-3 font-extrabold text-charcoal">Temp Range</th>
                  <th className="text-left px-4 py-3 font-extrabold text-charcoal">Humidity</th>
                  <th className="text-right px-6 py-3 font-extrabold text-charcoal">Rate / Qtl / Mo</th>
                </tr>
              </thead>
              <tbody>
                {CROPS.map((crop, i) => (
                  <tr key={crop.id} className={`border-b border-charcoal/10 ${i % 2 === 0 ? "bg-white" : "bg-warm-soil/50"}`}>
                    <td className="px-6 py-3 font-bold text-charcoal">{crop.name}</td>
                    <td className="px-4 py-3 text-charcoal/70">{crop.tempMin}°C – {crop.tempMax}°C</td>
                    <td className="px-4 py-3 text-charcoal/70">{crop.humidity}</td>
                    <td className="px-6 py-3 text-right font-extrabold text-farm-green">₹{crop.ratePerQuintalPerMonth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-bold text-xl text-charcoal">Loading Calculator...</p></div>}>
      <CalculatorContent />
    </Suspense>
  );
}
