import type { CVTemplateProps } from "../types";

export function CreativeCanvas({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, languages } = data;
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white flex flex-row-reverse text-left font-sans shadow-sm" style={{ fontFamily: data.settings.fontFamily }}>
      
      {/* RIGHT SIDEBAR - DARK/ORANGE */}
      <div className="w-[75mm] bg-[#1A1114] text-white p-8 flex flex-col gap-6 shrink-0 relative">
        {/* Accent Bar */}
        <div className="absolute top-0 right-0 w-2 h-full bg-[#E67E22]" />
        
        {/* Photo */}
        {personal.photoDataUrl && data.settings.photoEnabled && (
          <div className="flex justify-center mb-2">
            <img src={personal.photoDataUrl} alt={personal.fullName} className="w-32 h-32 rounded-full object-cover border-4 border-[#E67E22]" />
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#E67E22] font-bold mb-3 border-b border-[#E67E22]/30 pb-1">Education</h3>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold">{edu.degree}</div>
                  <div className="text-white/70">{edu.startDate} - {edu.endDate}</div>
                  <div className="text-white/90">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#E67E22] font-bold mb-3 border-b border-[#E67E22]/30 pb-1">Skills</h3>
            <ul className="space-y-1.5 text-xs text-white/90 list-disc pl-4">
              {skills.map(s => <li key={s.id}>{s.name}</li>)}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#E67E22] font-bold mb-3 border-b border-[#E67E22]/30 pb-1">Language</h3>
            <ul className="space-y-1.5 text-xs text-white/90 list-disc pl-4">
              {languages.map(l => <li key={l.id}>{l.name}</li>)}
            </ul>
          </div>
        )}

        {/* Contact */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-[#E67E22] font-bold mb-3 border-b border-[#E67E22]/30 pb-1">Contact</h3>
          <div className="space-y-2 text-xs text-white/90">
            {personal.phone && <p>📞 {personal.phone}</p>}
            {personal.email && <p>✉️ {personal.email}</p>}
            {personal.location && <p>📍 {personal.location}</p>}
            {personal.website && <p>🌐 {personal.website}</p>}
          </div>
        </div>
      </div>

      {/* LEFT CONTENT - WHITE */}
      <div className="flex-1 p-10 text-[#1A1114] space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black uppercase tracking-tight mb-2 leading-none">{personal.fullName}</h1>
          <p className="text-xl font-bold tracking-widest text-[#E67E22] uppercase">{personal.jobTitle}</p>
        </div>

        {/* Summary */}
        {summary && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest border-b-2 border-[#1A1114]/10 pb-1 mb-3">About Me</h2>
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest border-b-2 border-[#1A1114]/10 pb-1 mb-3">Experience</h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id} className="text-sm">
                  <div className="font-bold text-[#1A1114] text-base">{exp.position}</div>
                  <div className="font-bold text-gray-600 text-xs mb-1">{exp.company} | {exp.startDate} - {exp.endDate || "Present"}</div>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700 text-xs">
                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
