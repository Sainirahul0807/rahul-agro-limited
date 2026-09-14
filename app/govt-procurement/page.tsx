"use client";
import { useState } from "react";
import { Building2, FileText, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { GOVT_AGENCIES, CROPS } from "@/lib/constants";

export default function GovtProcurementPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    agencyName: "",
    department: "",
    gstin: "",
    tenderNo: "",
    officerName: "",
    phone: "",
    email: "",
    cropId: "",
    quantity: "",
    months: "",
    remarks: "",
  });

  function handleChange(k: string, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    const refNo = "GOV-" + Date.now().toString(36).toUpperCase();
    return (
      <div className="min-h-screen bg-warm-soil flex items-center justify-center p-4">
        <div className="boxy-card max-w-lg w-full p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-farm-green mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-charcoal mb-2">Application Submitted!</h2>
          <p className="text-charcoal/60 mb-4">Your institutional procurement request has been registered.</p>
          <div className="bg-warm-soil border-2 border-charcoal p-4 mb-6">
            <p className="text-xs font-bold text-charcoal/50 uppercase tracking-widest">Reference Number</p>
            <p className="text-2xl font-extrabold text-farm-green">{refNo}</p>
          </div>
          <p className="text-sm text-charcoal/70 mb-6">
            Our procurement team will contact you within 2 working days. For urgent needs, call{" "}
            <strong>+91 9728517836</strong>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="boxy-btn-outline"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-soil">
      <div className="bg-farm-green border-b-4 border-charcoal py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8 text-mustard-gold" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Government & Institutional Procurement</h1>
          </div>
          <p className="text-white/70 text-lg">Dedicated portal for FCI, HAFED, NAFED, and government agencies for tender-based bulk cold storage leasing.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Info Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {["FCI Buffer Stock", "HAFED Schemes", "NAFED Procurement", "State Agency Tenders"].map((item) => (
            <div key={item} className="bg-blue-50 border-2 border-blue-400 shadow-boxy-sm p-3 text-center">
              <FileText className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-blue-800">{item}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Agency Details */}
            <div className="boxy-card p-6">
              <h2 className="font-extrabold text-charcoal text-lg mb-6 pb-3 border-b-2 border-mustard-gold">
                Agency / Department Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Agency Name *</label>
                  <div className="relative">
                    <select
                      required
                      value={form.agencyName}
                      onChange={(e) => handleChange("agencyName", e.target.value)}
                      className="w-full border-2 border-charcoal px-4 py-3 font-semibold bg-white appearance-none outline-none"
                    >
                      <option value="">-- Select Agency --</option>
                      {GOVT_AGENCIES.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/50 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Department / Division</label>
                  <input
                    type="text"
                    placeholder="e.g. District Procurement Wing"
                    value={form.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none focus:border-farm-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">GSTIN *</label>
                  <input
                    required
                    type="text"
                    placeholder="15-digit GST Number"
                    value={form.gstin}
                    maxLength={15}
                    onChange={(e) => handleChange("gstin", e.target.value.toUpperCase())}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Tender / Scheme Number</label>
                  <input
                    type="text"
                    placeholder="e.g. FCI/HRY/2025/001"
                    value={form.tenderNo}
                    onChange={(e) => handleChange("tenderNo", e.target.value)}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Procurement */}
            <div className="boxy-card p-6">
              <h2 className="font-extrabold text-charcoal text-lg mb-6 pb-3 border-b-2 border-mustard-gold">
                Contact & Storage Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Officer Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Authorised Officer Full Name"
                    value={form.officerName}
                    onChange={(e) => handleChange("officerName", e.target.value)}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Official Email</label>
                  <input
                    type="email"
                    placeholder="officer@agency.gov.in"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Commodity *</label>
                  <select
                    required
                    value={form.cropId}
                    onChange={(e) => handleChange("cropId", e.target.value)}
                    className="w-full border-2 border-charcoal px-4 py-3 font-semibold bg-white outline-none"
                  >
                    <option value="">-- Select Commodity --</option>
                    {CROPS.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                    <option value="pulses">Pulses (Dal)</option>
                    <option value="rice">Rice (Chawal)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-2">Quantity (MT) *</label>
                    <input
                      required
                      type="number"
                      min={1}
                      placeholder="Metric Tons"
                      value={form.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-2">Duration (Months) *</label>
                    <input
                      required
                      type="number"
                      min={1}
                      max={24}
                      placeholder="Months"
                      value={form.months}
                      onChange={(e) => handleChange("months", e.target.value)}
                      className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 boxy-card p-6">
            <label className="block text-sm font-bold text-charcoal mb-2">Additional Remarks / Special Requirements</label>
            <textarea
              rows={4}
              placeholder="Mention any specific temperature, stacking, inspection requirements or tender conditions..."
              value={form.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              className="w-full border-2 border-charcoal px-4 py-3 font-semibold outline-none resize-none focus:border-farm-green"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="boxy-btn-gold text-lg px-10 py-4 flex items-center gap-3"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                <>{t.common.submit} Application →</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
