import { useState } from "react";
import { X, ArrowRight, CheckCircle, ArrowLeft, Upload, Plus, Trash2, Download } from "lucide-react";
import { SAMPLE_CV_DATA, getCVTemplate, CV_TEMPLATES } from "./data";
import type { CVData, CVExperience, CVEducation, CVSkill, CVLanguage } from "./types";
import { CVPreview } from "./components/CVPreview";
import { TemplatePreview } from "./components/TemplatePreview";
import { PrintRoot } from "./components/PrintRoot";
import { PROFESSION_PRESETS } from "./presets";
import { PROFESSION_NAMES } from "./components/ProfessionModal";
import { useLanguage } from "@contexts/LanguageContext";

export function CVWizardModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [step, setStep] = useState(1); 
  const [data, setData] = useState<CVData>(SAMPLE_CV_DATA);

  if (!isOpen) return null;

  const handleCloseClick = () => {
    if (step === 1) onClose();
    else setStep(1);
  };

  const updateData = (newData: Partial<CVData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const updatePersonal = (key: keyof CVData['personal'], value: any) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
  };

  const handleProfessionSelect = (profKey: string) => {
    const preset = PROFESSION_PRESETS[profKey] || {};
    const currentTemplateId = data.settings.templateId || CV_TEMPLATES[0].id;
    setData(prev => ({
      ...prev,
      ...preset,
      settings: { ...prev.settings, templateId: currentTemplateId },
      personal: {
        ...prev.personal,
        ...(preset.personal || {}),
        jobTitle: (typeof PROFESSION_NAMES !== 'undefined' && PROFESSION_NAMES[profKey as keyof typeof PROFESSION_NAMES]) || "Professional"
      }
    }));
    setStep(4);
  };

  // --- Array Add/Update/Remove Logic (Updated for Objects) ---
  const handleArrayAdd = (field: string, emptyObj: any) => {
    const currentArray = (data as any)[field] || [];
    updateData({ [field]: [...currentArray, emptyObj] } as any);
  };

  const handleArrayUpdate = (field: string, index: number, key: string, value: string) => {
    const currentArray = [...((data as any)[field] || [])];
    if (typeof currentArray[index] === 'string') {
      currentArray[index] = value;
    } else {
      currentArray[index] = { ...currentArray[index], [key]: value };
    }
    updateData({ [field]: currentArray } as any);
  };

  const handleArrayRemove = (field: string, index: number) => {
    const currentArray = [...((data as any)[field] || [])];
    currentArray.splice(index, 1);
    updateData({ [field]: currentArray } as any);
  };

  const templateIdToUse = data.settings.templateId || CV_TEMPLATES[0]?.id;
  const Template = getCVTemplate(templateIdToUse)?.Component;
  const totalSteps = 11;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4 print:hidden">
        <div className="bg-white w-full max-w-5xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
            <h2 className="text-lg font-bold text-gray-900">
              {step === 1 && (bn ? "১. টেমপ্লেট বেছে নিন" : "1. Select Template")}
              {step === 2 && (bn ? "২. টেমপ্লেট প্রিভিউ" : "2. Template Preview")}
              {step === 3 && (bn ? "৩. পেশা নির্বাচন" : "3. Select Profession")}
              {step === 4 && (bn ? "৪. ছবি" : "4. Photo")}
              {step === 5 && (bn ? "৫. ব্যক্তিগত তথ্য" : "5. Personal Info")}
              {step === 6 && (bn ? "৬. সারাংশ" : "6. Summary")}
              {step === 7 && (bn ? "৭. অভিজ্ঞতা" : "7. Experience")}
              {step === 8 && (bn ? "৮. শিক্ষা" : "8. Education")}
              {step === 9 && (bn ? "৯. দক্ষতা" : "9. Skills")}
              {step === 10 && (bn ? "১০. ভাষা ও শখ" : "10. Languages & Hobbies")}
              {step === 11 && (bn ? "১১. ডাউনলোড" : "11. Download")}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 font-medium hidden sm:block">{bn ? "ধাপ" : "Step"} {step}/{totalSteps}</span>
              <button onClick={handleCloseClick} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Steps Content */}
          <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-50">
            
            {/* STEP 1: Template */}
            {step === 1 && (
              <div className="p-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {CV_TEMPLATES.map((tpl) => (
                    <button key={tpl.id} onClick={() => { updateData({ settings: { ...data.settings, templateId: tpl.id } }); setStep(2); }} className="group flex flex-col items-center gap-2 p-2 rounded-xl bg-white border border-gray-200 hover:border-red-500 hover:shadow-lg transition-all">
                      <div className="w-full flex justify-center overflow-hidden rounded-md bg-gray-50 border border-gray-100">
                        <TemplatePreview Template={tpl.Component} data={data} scale={0.2} />
                      </div>
                      <h3 className="font-bold text-xs text-gray-900 truncate w-full text-center">{bn ? tpl.nameBn : tpl.name}</h3>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Preview */}
            {step === 2 && Template && (
              <div className="flex flex-col flex-1 overflow-hidden bg-gray-100">
                <div className="flex-1 overflow-y-auto p-4 flex justify-center pb-24">
                  <div className="bg-white shadow-xl w-full max-w-2xl">
                    <CVPreview Template={Template} data={data} scale={0.8} />
                  </div>
                </div>
                <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-200">
                  <button onClick={() => setStep(3)} className="w-full py-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex justify-center items-center gap-2 text-lg">
                    {bn ? "এই টেমপ্লেট ব্যবহার করুন" : "Use this template"} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Profession */}
            {step === 3 && (
              <div className="p-6 overflow-y-auto flex-1">
                <h3 className="text-xl font-bold text-center mb-6">{bn ? "আপনার পেশা নির্বাচন করুন" : "Select Your Profession"}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {Object.keys(PROFESSION_PRESETS).map((profKey) => (
                    <button key={profKey} onClick={() => handleProfessionSelect(profKey)} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-red-500 hover:shadow-md transition-all font-semibold text-gray-800">
                      {(typeof PROFESSION_NAMES !== 'undefined' && PROFESSION_NAMES[profKey as keyof typeof PROFESSION_NAMES]) || profKey}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 to 10: Editor */}
            {step > 3 && step < 11 && (
              <div className="flex flex-col flex-1 overflow-hidden">
                
                {Template && (
                  <div className="bg-white p-3 border-b border-gray-200 shrink-0 flex justify-center shadow-sm z-10 max-h-[200px] overflow-hidden pointer-events-none relative">
                    <div className="w-full max-w-[300px]">
                      <CVPreview Template={Template} data={data} scale={0.3} />
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
                  <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                    
                    {/* Step 4: Photo */}
                    {step === 4 && (
                      <div className="space-y-6 text-center">
                        <h3 className="text-xl font-bold border-b pb-2 mb-4 text-left">{bn ? "আপনার ছবি আপলোড করুন" : "Upload Your Photo"}</h3>
                        <label className="cursor-pointer inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-gray-300 hover:border-red-500 bg-gray-50 overflow-hidden relative">
                          {data.personal.photoDataUrl ? (
                            <img src={data.personal.photoDataUrl} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <><Upload className="w-6 h-6 text-gray-400 mb-1" /><span className="text-xs text-gray-500">{bn ? "আপলোড" : "Upload"}</span></>
                          )}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                updatePersonal("photoDataUrl", reader.result as string);
                                updateData({ settings: { ...data.settings, photoEnabled: true } });
                              };
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                      </div>
                    )}

                    {/* Step 5: Personal */}
                    {step === 5 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold border-b pb-2 mb-4">{bn ? "ব্যক্তিগত তথ্য" : "Personal Info"}</h3>
                        <div><label className="block text-sm mb-1">{bn ? "পুরো নাম" : "Full Name"}</label><input type="text" value={data.personal.fullName || ""} onChange={(e) => updatePersonal("fullName", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                        <div><label className="block text-sm mb-1">{bn ? "পদবি" : "Job Title"}</label><input type="text" value={data.personal.jobTitle || ""} onChange={(e) => updatePersonal("jobTitle", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="block text-sm mb-1">{bn ? "ইমেইল" : "Email"}</label><input type="text" value={data.personal.email || ""} onChange={(e) => updatePersonal("email", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                          <div><label className="block text-sm mb-1">{bn ? "ফোন" : "Phone"}</label><input type="text" value={data.personal.phone || ""} onChange={(e) => updatePersonal("phone", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" /></div>
                        </div>
                      </div>
                    )}

                    {/* Step 6: Summary */}
                    {step === 6 && (
                      <div>
                        <h3 className="text-xl font-bold border-b pb-2 mb-4">{bn ? "প্রফেশনাল সারাংশ" : "Professional Summary"}</h3>
                        <textarea value={data.summary || ""} onChange={(e) => updateData({ summary: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" rows={6} />
                      </div>
                    )}

                    {/* Step 7: Experience */}
                    {step === 7 && (
                      <div>
                        <div className="flex items-center justify-between border-b pb-2 mb-4">
                          <h3 className="text-xl font-bold">{bn ? "অভিজ্ঞতা" : "Experience"}</h3>
                          <button onClick={() => handleArrayAdd('experience', { id: crypto.randomUUID(), company: "", position: "", location: "", startDate: "", endDate: "", current: false, bullets: [] })} className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100"><Plus className="w-4 h-4" /> {bn ? "যোগ করুন" : "Add"}</button>
                        </div>
                        <div className="space-y-4">
                          {(data.experience || []).map((exp: CVExperience, idx) => (
                            <div key={exp.id || idx} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
                              <button onClick={() => handleArrayRemove('experience', idx)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 bg-white rounded-md shadow-sm"><Trash2 className="w-4 h-4" /></button>
                              <div className="space-y-3 mt-2">
                                <input type="text" value={exp.position || ""} onChange={(e) => handleArrayUpdate('experience', idx, 'position', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "পদবি" : "Position"} />
                                <input type="text" value={exp.company || ""} onChange={(e) => handleArrayUpdate('experience', idx, 'company', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "কোম্পানির নাম" : "Company Name"} />
                                <div className="grid grid-cols-2 gap-2">
                                  <input type="text" value={exp.startDate || ""} onChange={(e) => handleArrayUpdate('experience', idx, 'startDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "শুরুর তারিখ" : "Start Date"} />
                                  <input type="text" value={exp.endDate || ""} onChange={(e) => handleArrayUpdate('experience', idx, 'endDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "শেষের তারিখ" : "End Date"} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 8: Education */}
                    {step === 8 && (
                      <div>
                        <div className="flex items-center justify-between border-b pb-2 mb-4">
                          <h3 className="text-xl font-bold">{bn ? "শিক্ষা" : "Education"}</h3>
                          <button onClick={() => handleArrayAdd('education', { id: crypto.randomUUID(), institution: "", degree: "", field: "", location: "", startDate: "", endDate: "", description: "" })} className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100"><Plus className="w-4 h-4" /> {bn ? "যোগ করুন" : "Add"}</button>
                        </div>
                        <div className="space-y-4">
                          {(data.education || []).map((edu: CVEducation, idx) => (
                            <div key={edu.id || idx} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
                              <button onClick={() => handleArrayRemove('education', idx)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 bg-white rounded-md shadow-sm"><Trash2 className="w-4 h-4" /></button>
                              <div className="space-y-3 mt-2">
                                <input type="text" value={edu.degree || ""} onChange={(e) => handleArrayUpdate('education', idx, 'degree', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "ডিগ্রি" : "Degree"} />
                                <input type="text" value={edu.institution || ""} onChange={(e) => handleArrayUpdate('education', idx, 'institution', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "প্রতিষ্ঠান" : "Institution"} />
                                <div className="grid grid-cols-2 gap-2">
                                  <input type="text" value={edu.startDate || ""} onChange={(e) => handleArrayUpdate('education', idx, 'startDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "শুরুর বছর" : "Start Year"} />
                                  <input type="text" value={edu.endDate || ""} onChange={(e) => handleArrayUpdate('education', idx, 'endDate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "শেষের বছর" : "End Year"} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 9: Skills */}
                    {step === 9 && (
                      <div>
                        <div className="flex items-center justify-between border-b pb-2 mb-4">
                          <h3 className="text-xl font-bold">{bn ? "দক্ষতা" : "Skills"}</h3>
                          <button onClick={() => handleArrayAdd('skills', { id: crypto.randomUUID(), name: "", level: 0 })} className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100"><Plus className="w-4 h-4" /> {bn ? "যোগ করুন" : "Add"}</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(data.skills || []).map((skill: CVSkill, idx) => (
                            <div key={skill.id || idx} className="flex items-center gap-2">
                              <input type="text" value={skill.name || ""} onChange={(e) => handleArrayUpdate('skills', idx, 'name', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "দক্ষতা" : "Skill"} />
                              <button onClick={() => handleArrayRemove('skills', idx)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 10: Languages & Hobbies */}
                    {step === 10 && (
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center justify-between border-b pb-2 mb-4">
                            <h3 className="text-xl font-bold">{bn ? "ভাষা" : "Languages"}</h3>
                            <button onClick={() => handleArrayAdd('languages', { id: crypto.randomUUID(), name: "", level: "" })} className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100"><Plus className="w-4 h-4" /> {bn ? "যোগ করুন" : "Add"}</button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(data.languages || []).map((lang: CVLanguage, idx) => (
                              <div key={lang.id || idx} className="flex items-center gap-2">
                                <input type="text" value={lang.name || ""} onChange={(e) => handleArrayUpdate('languages', idx, 'name', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "ভাষা" : "Language"} />
                                <button onClick={() => handleArrayRemove('languages', idx)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between border-b pb-2 mb-4">
                            <h3 className="text-xl font-bold">{bn ? "শখ" : "Hobbies"}</h3>
                            <button onClick={() => handleArrayAdd('hobbies', "")} className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100"><Plus className="w-4 h-4" /> {bn ? "যোগ করুন" : "Add"}</button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(data.hobbies || []).map((hobby: string, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input type="text" value={hobby || ""} onChange={(e) => handleArrayUpdate('hobbies', idx, '', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none" placeholder={bn ? "শখ" : "Hobby"} />
                                <button onClick={() => handleArrayRemove('hobbies', idx)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-20">
                  <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> {bn ? "পিছনে" : "Back"}
                  </button>
                  <button onClick={() => setStep(step + 1)} className="px-8 py-2.5 rounded-full font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200">
                    {bn ? "পরবর্তী" : "Next"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 11: Download */}
            {step === 11 && (
              <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{bn ? "আপনার সিভি তৈরি!" : "Your CV is Ready!"}</h3>
                <p className="text-gray-500 mb-8">{bn ? "ডাউনলোড করতে নিচের বাটনে ক্লিক করুন।" : "Click the button below to download your CV as a PDF."}</p>
                
                <button onClick={() => window.print()} className="flex items-center justify-center gap-2 bg-red-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors w-full max-w-sm text-lg shadow-lg shadow-red-200">
                  <Download className="w-6 h-6" /> {bn ? "PDF ডাউনলোড" : "Download PDF"}
                </button>
                
                <button onClick={onClose} className="mt-8 text-sm font-medium text-gray-500 hover:text-gray-800 underline">
                  {bn ? "এডিটর বন্ধ করুন" : "Close Editor"}
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* 🚨 হিডেন প্রিভিউ: PDF জেনারেট করার জন্য (স্ক্রিনে দেখা যাবে না) */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
        {Template && (
          <div style={{ width: '794px', backgroundColor: 'white' }}>
            <PrintRoot Template={Template} data={data} />
          </div>
        )}
      </div>
    </>
  );
}
