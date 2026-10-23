import { useState, useEffect, useRef, useMemo } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle, Upload, Download, Loader2 } from "lucide-react";
import { getPlatform } from "./options";
import { composePhoto, generatePreview } from "./logic";
import { photoQrData } from "./data";
import type { Position, QrBackground } from "./types";
import { cn } from "@lib/cn";

const PLATFORM_OPTIONS = [
  { id: "whatsapp", name: "WhatsApp", emoji: "💬" },
  { id: "facebook", name: "Facebook", emoji: "📘" },
  { id: "instagram", name: "Instagram", emoji: "📸" },
  { id: "url", name: "Website", emoji: "🌐" },
  { id: "email", name: "Email", emoji: "✉️" },
  { id: "text", name: "Plain Text", emoji: "📝" },
];

export function PhotoQRWizardModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  // 🚨 Unused 'language' removed
  
  const [step, setStep] = useState(1); 
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [platformId, setPlatformId] = useState<string>("whatsapp");
  const [values, setValues] = useState<Record<string, string>>({});
  const [position, setPosition] = useState<Position>("bottom-right");
  const [sizePercent, setSizePercent] = useState(20);
  const [padding, setPadding] = useState(10);
  const [qrBackground, setQrBackground] = useState<QrBackground>("rounded");
  
  const [preview, setPreview] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const previewTimerRef = useRef<number | null>(null);
  const previewRequestRef = useRef(0);

  const platform = useMemo(
    () => getPlatform(platformId) ?? getPlatform("whatsapp")!,
    [platformId]
  );

  const payload = useMemo(() => {
    try {
      const p = platform.buildPayload(values);
      if (p) return p;
    } catch (e) { /* ignore */ }
    
    if (platformId === "whatsapp") return `https://wa.me/${values.phone?.replace(/\D/g, '') || ''}?text=${encodeURIComponent(values.message || '')}`;
    if (platformId === "url" || platformId === "facebook") return values.url || "";
    if (platformId === "instagram") return `https://instagram.com/${values.username?.replace('@', '') || ''}`;
    if (platformId === "email") return `mailto:${values.email || ''}`;
    if (platformId === "text") return values.text || "";
    
    return "";
  }, [platform, values, platformId]);

  const canPreview = Boolean(photoFile && payload);

  useEffect(() => {
    const requestId = ++previewRequestRef.current;
    if (previewTimerRef.current !== null) window.clearTimeout(previewTimerRef.current);

    if (!canPreview || !photoFile) {
      setPreview(null);
      setGenerating(false);
      return;
    }

    setGenerating(true);

    previewTimerRef.current = window.setTimeout(async () => {
      if (requestId !== previewRequestRef.current) return;
      
      try {
        const url = await generatePreview({ photoFile, platform, values, position, sizePercent, padding, qrBackground });
        if (requestId === previewRequestRef.current) {
          setPreview(url);
          setError(null);
        }
      } catch (e) {
        if (requestId === previewRequestRef.current) setError(e instanceof Error ? e.message : "Preview failed");
      } finally {
        if (requestId === previewRequestRef.current) setGenerating(false);
      }
    }, 50);

    return () => {
      if (previewTimerRef.current !== null) window.clearTimeout(previewTimerRef.current);
      if (previewRequestRef.current === requestId) previewRequestRef.current += 1;
    };
  }, [photoFile, platform, values, position, sizePercent, padding, qrBackground, canPreview]);

  if (!isOpen) return null;

  const handleCloseClick = () => {
    if (step === 1) onClose();
    else setStep(1);
  };

  const handleDownload = async () => {
    if (!photoFile || !payload) return;
    setIsDownloading(true);
    try {
      const blob = await composePhoto({ photoFile, platform, values, position, sizePercent, padding, qrBackground });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${photoQrData.slug}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4">
      <div className="bg-white w-full max-w-5xl h-full sm:h-auto sm:max-h-[95vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            {step === 1 && "1. Upload Image"}
            {step === 2 && "2. QR Code Data"}
            {step === 3 && "3. Design & Position"}
            {step === 4 && "4. Download"}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 font-medium hidden sm:block">Step {step}/4</span>
            <button onClick={handleCloseClick} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-50">
          
          {/* Top: Live Preview */}
          {step > 1 && (
            <div className="bg-white p-4 border-b border-gray-200 shrink-0 flex justify-center shadow-sm z-10 max-h-[45vh] overflow-hidden pointer-events-none relative">
              <div className="w-full max-w-[500px] flex items-center justify-center relative">
                
                {generating && (
                  <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
                    <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Updating...</span>
                  </div>
                )}

                {preview ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className={cn(
                      "max-h-[38vh] w-auto object-contain rounded-md shadow-md transition-opacity duration-200",
                      generating ? "opacity-40" : "opacity-100"
                    )} 
                  />
                ) : (
                  !generating && <div className="text-gray-400 text-sm py-10">Fill the details to see preview</div>
                )}
              </div>
            </div>
          )}

          {/* Bottom: Form */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
            <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
              
              {/* 🚨 Error Message Display (Fixed TS6133 error) */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
                  {error}
                </div>
              )}

              {/* Step 1: Upload Image */}
              {step === 1 && (
                <div className="space-y-6 text-center">
                  <h3 className="text-xl font-bold border-b pb-2 mb-4 text-left">Upload Your Photo</h3>
                  <label className="cursor-pointer inline-flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-gray-300 hover:border-red-500 bg-gray-50 overflow-hidden relative">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      {photoFile ? photoFile.name : "Click to upload image"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) { setPhotoFile(file); setStep(2); }
                    }} />
                  </label>
                </div>
              )}

              {/* Step 2: Payload Data */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold border-b pb-2 mb-4">Select QR Platform</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PLATFORM_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setPlatformId(opt.id); setValues({}); }}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all",
                          platformId === opt.id 
                            ? "bg-red-50 border-red-500 text-red-600 shadow-sm" 
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <span className="text-3xl">{opt.emoji}</span>
                        <span className="text-xs font-bold">{opt.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 capitalize flex items-center gap-2">
                      {PLATFORM_OPTIONS.find(o => o.id === platformId)?.emoji} {platformId} Details
                    </h4>

                    {platformId === "whatsapp" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input type="text" value={values.phone || ""} onChange={(e) => setValues({ ...values, phone: e.target.value })} placeholder="+1234567890" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Default Message (Optional)</label>
                          <input type="text" value={values.message || ""} onChange={(e) => setValues({ ...values, message: e.target.value })} placeholder="Hello!" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                      </div>
                    )}

                    {(platformId === "url" || platformId === "facebook") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website / Profile URL</label>
                        <input type="url" value={values.url || ""} onChange={(e) => setValues({ ...values, url: e.target.value })} placeholder="https://example.com" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                      </div>
                    )}

                    {platformId === "instagram" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Username</label>
                        <input type="text" value={values.username || ""} onChange={(e) => setValues({ ...values, username: e.target.value })} placeholder="@yourusername" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                      </div>
                    )}

                    {platformId === "email" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" value={values.email || ""} onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder="hello@example.com" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                      </div>
                    )}

                    {platformId === "text" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Plain Text</label>
                        <textarea value={values.text || ""} onChange={(e) => setValues({ ...values, text: e.target.value })} placeholder="Enter any text here..." rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Design & Position */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold border-b pb-2 mb-4">Design & Position</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">QR Position</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["top-left", "top-right", "bottom-left", "bottom-right", "center"].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setPosition(pos as Position)}
                          className={cn("py-2 rounded-lg border text-xs font-medium capitalize", position === pos ? "bg-red-50 border-red-500 text-red-600" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50")}
                        >
                          {pos.replace("-", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">QR Size ({sizePercent}%)</label>
                    <input type="range" min="10" max="50" value={sizePercent} onChange={(e) => setSizePercent(Number(e.target.value))} className="w-full accent-red-600" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
                    <input type="range" min="0" max="30" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full accent-red-600" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">QR Background</label>
                    <select value={qrBackground} onChange={(e) => setQrBackground(e.target.value as QrBackground)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none">
                      <option value="rounded">Rounded</option>
                      <option value="square">Square</option>
                      <option value="none">None (Transparent)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Download */}
              {step === 4 && (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Your Photo QR is Ready!</h3>
                  <p className="text-gray-500 mb-8">Click below to download the image.</p>
                  
                  <button onClick={handleDownload} disabled={isDownloading} className="flex items-center justify-center gap-2 bg-red-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors w-full max-w-sm mx-auto disabled:opacity-50 text-lg shadow-lg shadow-red-200">
                    {isDownloading ? <><Loader2 className="w-6 h-6 animate-spin" /> Downloading...</> : <><Download className="w-6 h-6" /> Download Image</>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation Bar */}
          {step > 1 && step < 4 && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-20">
              <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={() => setStep(step + 1)} disabled={!canPreview && step === 2} className="px-8 py-2.5 rounded-full font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200 disabled:opacity-50">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {step === 4 && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-center z-20">
              <button onClick={onClose} className="px-8 py-2.5 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                Close Editor
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
