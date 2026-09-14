"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ChevronRight, Download, QrCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CROPS, STACKING_TYPES } from "@/lib/constants";

type BookingData = {
  cropId: string;
  quantity: number;
  months: number;
  storageType: string;
  fullName: string;
  phone: string;
  aadhaar: string;
  address: string;
};

function ConfirmationModal({ bookingId, onClose }: { bookingId: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
      <div className="bg-white border-2 border-charcoal shadow-boxy-lg max-w-md w-full animate-slide-up">
        <div className="bg-farm-green p-6 text-center border-b-2 border-charcoal">
          <div className="w-16 h-16 bg-white border-2 border-charcoal mx-auto mb-4 flex items-center justify-center">
            <svg viewBox="0 0 52 52" className="w-10 h-10">
              <circle cx="26" cy="26" r="25" fill="none" stroke="#1b4332" strokeWidth="2" />
              <path
                className="check-path"
                d="M14 27 L22 35 L38 19"
                fill="none"
                stroke="#1b4332"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Booking Confirmed!</h2>
          <p className="text-white/70 text-sm mt-1">Your cold storage slot is reserved</p>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="bg-warm-soil border-2 border-charcoal p-4">
            <p className="text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-1">Booking ID</p>
            <p className="text-2xl font-extrabold text-farm-green tracking-wider">{bookingId}</p>
          </div>

          <div className="bg-warm-soil border-2 border-charcoal p-4 flex flex-col items-center">
            <QrCode className="w-24 h-24 text-charcoal mb-2" />
            <p className="text-xs text-charcoal/50 font-semibold">Show this QR at the gate for entry</p>
          </div>

          <div className="bg-mustard-gold/20 border-2 border-mustard-gold p-3 text-left">
            <p className="text-xs font-bold text-charcoal">📍 Sainipura, Taoru, Haryana</p>
            <p className="text-xs text-charcoal/70 mt-1">Gate Timings: 6:00 AM – 10:00 PM · Call: +91 9728517836</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 boxy-btn-primary flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Slip
            </button>
            <button onClick={onClose} className="flex-1 boxy-btn-outline">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initCrop = searchParams.get("crop") ?? "";

  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [data, setData] = useState<BookingData>({
    cropId: initCrop,
    quantity: 100,
    months: 3,
    storageType: "Palletized",
    fullName: "",
    phone: "",
    aadhaar: "",
    address: "",
  });

  const steps = [t.booking.step1, t.booking.step2, t.booking.step3, t.booking.step4];

  const selectedCrop = CROPS.find((c) => c.id === data.cropId);
  const total = selectedCrop
    ? selectedCrop.ratePerQuintalPerMonth * data.quantity * data.months * 1.005
    : 0;

  function update<K extends keyof BookingData>(k: K, v: BookingData[K]) {
    setData((prev) => ({ ...prev, [k]: v }));
  }

  function confirm() {
    const id = "RAL-" + Date.now().toString(36).toUpperCase();
    setBookingId(id);
  }

  return (
    <div className="min-h-screen bg-warm-soil">
      {bookingId && (
        <ConfirmationModal bookingId={bookingId} onClose={() => setBookingId(null)} />
      )}

      <div className="bg-farm-green border-b-4 border-charcoal py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">{t.booking.title}</h1>
          {/* Step Progress */}
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 ${i + 1 <= step ? "text-mustard-gold" : "text-white/40"}`}>
                  <div
                    className={`w-8 h-8 border-2 flex items-center justify-center font-extrabold text-sm shrink-0 ${
                      i + 1 < step
                        ? "bg-mustard-gold border-charcoal text-charcoal"
                        : i + 1 === step
                        ? "bg-white border-charcoal text-charcoal"
                        : "bg-farm-green-light border-white/30 text-white/40"
                    }`}
                  >
                    {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-xs font-bold hidden sm:block">{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i + 1 < step ? "bg-mustard-gold" : "bg-white/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="boxy-card p-6 md:p-8">
          {/* Step 1: Crop Details */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-charcoal text-xl border-b-2 border-mustard-gold pb-3">{t.booking.step1}</h2>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">{t.booking.cropType}</label>
                <select
                  value={data.cropId}
                  onChange={(e) => update("cropId", e.target.value)}
                  className="w-full border-2 border-charcoal px-4 py-3 font-semibold bg-white outline-none"
                >
                  <option value="">-- Select Crop --</option>
                  {CROPS.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">{t.booking.quantity} (Quintals)</label>
                <input
                  type="number"
                  min={10}
                  value={data.quantity}
                  onChange={(e) => update("quantity", Number(e.target.value))}
                  className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">{t.booking.duration} (Months)</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={data.months}
                  onChange={(e) => update("months", Number(e.target.value))}
                  className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Storage Preferences */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-charcoal text-xl border-b-2 border-mustard-gold pb-3">{t.booking.step2}</h2>
              <div>
                <label className="block text-sm font-bold text-charcoal mb-3">{t.booking.storageType}</label>
                <div className="grid grid-cols-2 gap-3">
                  {STACKING_TYPES.map((s) => (
                    <button
                      key={s}
                      onClick={() => update("storageType", s)}
                      className={`border-2 py-4 font-bold text-sm transition-all ${
                        data.storageType === s
                          ? "bg-farm-green text-white border-farm-green shadow-boxy-sm"
                          : "bg-white text-charcoal border-charcoal/30 hover:border-charcoal"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {selectedCrop && (
                <div className="bg-blue-50 border-2 border-blue-300 p-4">
                  <p className="font-bold text-blue-800 text-sm mb-1">Recommended for {selectedCrop.name}:</p>
                  <p className="text-blue-600 text-sm">{selectedCrop.stackingTypes.join(", ")}</p>
                  <p className="text-blue-600 text-sm mt-1">Ideal temp: {selectedCrop.tempMin}°C – {selectedCrop.tempMax}°C · {selectedCrop.humidity} humidity</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Your Details */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-charcoal text-xl border-b-2 border-mustard-gold pb-3">{t.booking.step3}</h2>
              {[
                { key: "fullName" as const, label: t.booking.fullName, type: "text", placeholder: "Enter your full name" },
                { key: "phone" as const, label: t.booking.phone, type: "tel", placeholder: "+91 XXXXX XXXXX" },
                { key: "aadhaar" as const, label: t.booking.aadhaar, type: "text", placeholder: "XXXX XXXX XXXX" },
                { key: "address" as const, label: t.booking.address, type: "text", placeholder: "Village, District, State" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-bold text-charcoal mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={data[field.key] as string}
                    onChange={(e) => update(field.key, e.target.value)}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none focus:border-farm-green"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="font-extrabold text-charcoal text-xl border-b-2 border-mustard-gold pb-3">{t.booking.step4}</h2>
              <div className="bg-warm-soil border-2 border-charcoal divide-y-2 divide-charcoal/10">
                {[
                  ["Crop", selectedCrop?.name ?? "-"],
                  ["Quantity", `${data.quantity} Quintals`],
                  ["Duration", `${data.months} Months`],
                  ["Storage Type", data.storageType],
                  ["Name", data.fullName],
                  ["Phone", data.phone],
                  ["Aadhaar/ID", data.aadhaar],
                  ["Address", data.address],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center px-4 py-3">
                    <span className="text-sm font-bold text-charcoal/60">{k}</span>
                    <span className="text-sm font-extrabold text-charcoal text-right max-w-[55%]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-farm-green border-2 border-charcoal shadow-boxy p-4 flex justify-between items-center">
                <span className="font-extrabold text-white">Estimated Total</span>
                <span className="text-2xl font-extrabold text-mustard-gold">₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
              </div>
              <p className="text-xs text-charcoal/40 text-center">*Advance token (20%) payable at our Sainipura, Taoru facility.</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t-2 border-charcoal/10">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="boxy-btn-outline">
                ← {t.booking.back}
              </button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !data.cropId}
                className="boxy-btn-gold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.booking.next} <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={confirm}
                disabled={!data.fullName || !data.phone}
                className="boxy-btn-primary flex items-center gap-2 disabled:opacity-40"
              >
                <Check className="w-4 h-4" /> {t.booking.confirm}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-bold text-xl">Loading...</p></div>}>
      <BookingContent />
    </Suspense>
  );
}
