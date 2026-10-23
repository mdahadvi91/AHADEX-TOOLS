import { useState, useRef, useEffect } from "react";
import { X, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import { TEMPLATES, getTemplate } from "./templates";
import { renderSide } from "./shared/renderer";
import { DEFAULT_USER_DATA } from "./types";
import { getCardSizeFromId } from "./shared/sizes";
import type { Template, UserData } from "./types";
import { useLanguage } from "@contexts/LanguageContext";

import { Canvas } from "./editor/Canvas";
import { LogoPanel } from "./editor/panels/LogoPanel";
import { ExportPanel } from "./editor/panels/ExportPanel";

// --- Template Card (গ্যালারির জন্য) ---
function TemplateCard({ template, onSelect }: { template: Template; onSelect: () => void }) {
  const frontRef = useRef<HTMLCanvasElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const size = getCardSizeFromId("standard");
  const W = Math.round(size.widthPx * 0.38);
  const H = Math.round(size.heightPx * 0.38);

  useEffect(() => {
    let cancelled = false;
    async function go() {
      try {
        await document.fonts.ready;
        if (frontRef.current) {
          const ctx = frontRef.current.getContext("2d");
          if (ctx) await renderSide({ ctx, template, side: "front", userData: DEFAULT_USER_DATA, W, H });
        }
        if (backRef.current) {
          const ctx = backRef.current.getContext("2d");
          if (ctx) await renderSide({ ctx, template, side: "back", userData: DEFAULT_USER_DATA, W, H });
        }
        if (!cancelled) setReady(true);
      } catch { if (!cancelled) setReady(true); }
    }
    const timer = setTimeout(() => { void go(); }, 100);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [template, W, H]);

  return (
    <button type="button" onClick={onSelect} className="group relative flex flex-col p-3 rounded-2xl bg-white border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all cursor-pointer">
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="relative w-full rounded-md bg-gray-50 overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
          <canvas ref={frontRef} width={W} height={H} className="w-full h-full block" />
        </div>
        <div className="relative w-full rounded-md bg-gray-50 overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
          <canvas ref={backRef} width={W} height={H} className="w-full h-full block" />
        </div>
      </div>
      {!ready && <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl"><span className="w-5 h-5 rounded-full border-2 border-red-200 border-t-red-600 animate-spin" /></div>}
      <h3 className="font-bold text-sm text-gray-900 truncate">{template.name}</h3>
    </button>
  );
}

// --- MAIN WIZARD MODAL ---
export function WizardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [step, setStep] = useState(1); 
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const template = selectedTemplateId ? getTemplate(selectedTemplateId) : null;

  const handleSelect = (tplId: string) => {
    setSelectedTemplateId(tplId);
    setUserData(DEFAULT_USER_DATA);
    setStep(2);
  };

  const handleCloseClick = () => {
    if (step === 1) onClose();
    else setStep(1);
  };

  const updateData = (key: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const renderInput = (label: string, key: keyof UserData, placeholder: string, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        type={type} 
        value={(userData[key] as string) || ""} 
        onChange={(e) => updateData(key, e.target.value)} 
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
        placeholder={placeholder} 
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4">
      <div className="bg-white w-full max-w-5xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            {step === 1 && (bn ? "টেমপ্লেট বেছে নিন" : "Select Template")}
            {step === 2 && (bn ? "টেমপ্লেট প্রিভিউ" : "Template Preview")}
            {step === 3 && (bn ? "লোগো আপলোড করুন" : "Upload Logo")}
            {step === 4 && (bn ? "ব্যক্তিগত তথ্য" : "Personal Details")}
            {step === 5 && (bn ? "যোগাযোগের তথ্য" : "Contact Details")}
            {step === 6 && (bn ? "ওয়েবসাইট ও ঠিকানা" : "Web & Location")}
            {step === 7 && (bn ? "কিউআর কোড অপশন" : "QR Code Options")}
            {step === 8 && (bn ? "ডাউনলোড" : "Download")}
          </h2>
          <button onClick={handleCloseClick} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 1. TEMPLATE GALLERY */}
        {step === 1 && (
          <div className="p-4 overflow-y-auto flex-1 bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {TEMPLATES.map((tpl) => (
                <TemplateCard key={tpl.id} template={tpl} onSelect={() => handleSelect(tpl.id)} />
              ))}
            </div>
          </div>
        )}

        {/* 2. PREVIEW TEMPLATE (FULL SCREEN ON MOBILE) */}
        {step === 2 && template && (
          <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center gap-6">
              <div className="w-full max-w-md space-y-4">
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <p className="text-xs text-center font-bold text-gray-400 uppercase mb-1">{bn ? "সামনে" : "Front"}</p>
                  <Canvas template={template} side="front" sizeId="standard" userData={userData} />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm">
                  <p className="text-xs text-center font-bold text-gray-400 uppercase mb-1">{bn ? "পিছনে" : "Back"}</p>
                  <Canvas template={template} side="back" sizeId="standard" userData={userData} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
              <button 
                onClick={() => setStep(3)} 
                className="w-full py-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200 text-lg"
              >
                {bn ? "এই টেমপ্লেট ব্যবহার করুন" : "Use this template"} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* 3-8. EDITOR WIZARD */}
        {step > 2 && template && (
          <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-50">
            
            {/* LIVE PREVIEW (TOP) */}
            <div className="bg-white p-3 border-b border-gray-200 shrink-0 flex justify-center gap-4 shadow-sm z-10">
              <div className="w-1/2 max-w-[200px]">
                <p className="text-[10px] text-center font-bold text-gray-400 uppercase mb-1">{bn ? "সামনে" : "Front"}</p>
                <Canvas template={template} side="front" sizeId="standard" userData={userData} />
              </div>
              <div className="w-1/2 max-w-[200px]">
                <p className="text-[10px] text-center font-bold text-gray-400 uppercase mb-1">{bn ? "পিছনে" : "Back"}</p>
                <Canvas template={template} side="back" sizeId="standard" userData={userData} />
              </div>
            </div>

            {/* FORM AREA (BOTTOM) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
              <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                
                {/* Step 3: Logo */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">{bn ? "কোম্পানি লোগো" : "Company Logo"}</h3>
                    <LogoPanel userData={userData} onChange={setUserData} onError={setError} />
                  </div>
                )}

                {/* Step 4: Brand & Tagline */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">{bn ? "ব্র্যান্ড তথ্য" : "Brand Details"}</h3>
                    {renderInput(bn ? "ব্র্যান্ড নেম" : "Brand Name", "brand", bn ? "যেমন: AHADEX TOOLS" : "e.g. AHADEX TOOLS")}
                    {renderInput(bn ? "ট্যাগলাইন" : "Tagline", "tagline", bn ? "যেমন: Tools for a Smarter Tomorrow" : "e.g. Tools for a Smarter Tomorrow")}
                  </div>
                )}

                {/* Step 5: Name & Title */}
                {step === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">{bn ? "ব্যক্তিগত তথ্য" : "Personal Info"}</h3>
                    {renderInput(bn ? "পুরো নাম" : "Full Name", "name", bn ? "যেমন: মোহাম্মদ আহাদ" : "e.g. Mohammad Ahad")}
                    {renderInput(bn ? "পদবি" : "Job Title", "title", bn ? "যেমন: ইলেকট্রিশিয়ান" : "e.g. Electrician")}
                  </div>
                )}

                {/* Step 6: Phone & Email */}
                {step === 6 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">{bn ? "যোগাযোগের তথ্য" : "Contact Info"}</h3>
                    {renderInput(bn ? "ফোন নম্বর" : "Phone Number", "phone", "+971 50 123 4567", "tel")}
                    {renderInput(bn ? "ইমেইল ঠিকানা" : "Email Address", "email", "ahad@example.com", "email")}
                  </div>
                )}

                {/* Step 7: Website & Location */}
                {step === 7 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">{bn ? "ওয়েবসাইট ও ঠিকানা" : "Web & Location"}</h3>
                    {renderInput(bn ? "ওয়েবসাইট" : "Website", "website", "www.ahadex.fun", "url")}
                    {renderInput(bn ? "ঠিকানা" : "Address / Location", "location", bn ? "দুবাই, সংযুক্ত আরব আমিরাত" : "Dubai, UAE")}
                  </div>
                )}

                {/* Step 8: Download */}
                {step === 8 && (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{bn ? "আপনার কার্ড তৈরি!" : "Your Card is Ready!"}</h3>
                    <p className="text-gray-500 mb-8">{bn ? "উচ্চ মানে আপনার কার্ড ডাউনলোড করুন।" : "Download your card in high quality."}</p>
                    <ExportPanel template={template} sizeId="standard" userData={userData} />
                  </div>
                )}

              </div>
            </div>

            {/* BOTTOM NAVIGATION BAR */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-20">
              <button 
                onClick={() => {
                  if (step === 3) setStep(2);
                  else setStep(step - 1);
                }} 
                className="px-6 py-2.5 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> {bn ? "পিছনে" : "Back"}
              </button>

              <button 
                onClick={() => {
                  if (step < 8) setStep(step + 1);
                  else onClose();
                }} 
                className="px-8 py-2.5 rounded-full font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200"
              >
                {step === 8 ? (bn ? "বন্ধ করুন" : "Close") : (bn ? "পরবর্তী" : "Next")} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Error Toast */}
      {error && (
        <div onClick={() => setError(null)} className="fixed bottom-6 right-6 z-[200] px-4 py-3 rounded-xl bg-red-600 text-white text-sm font-medium shadow-xl cursor-pointer">
          {error}
        </div>
      )}
    </div>
  );
}
