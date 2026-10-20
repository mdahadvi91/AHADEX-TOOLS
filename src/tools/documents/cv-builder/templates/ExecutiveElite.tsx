import type { CVTemplateProps } from "../types";

export function ExecutiveElite({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, languages } = data;
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white flex text-left font-sans shadow-sm" style={{ fontFamily: data.settings.fontFamily }}>
      {/* LEFT SIDEBAR - NAVY */}
      <div className="w-[70mm] bg-[#1A233A] text-white p-8 flex flex-col gap-8 shrink-0">
        
        {/* Photo */}
        {personal.photoDataUrl && data.settings.photoEnabled && (
          <div className="flex justify-center mb-2">
            <img src={personal.photoDataUrl} alt={personal.fullName} className="w-32 h-32 rounded-full object-cover border-4 border-white/20" />
          </div>
        )}

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-white/70 font-bold mb-3">Contact</h3>
          {personal.phone && <p className="text-xs">📞 {personal.phone}</p>}
          {personal.email && <p className="text-xs">✉️ {personal.email}</p>}
          {personal.location && <p className="text-xs">📍 {personal.location}</p>}
          {personal.linkedin && <p className="text-xs">🔗 {personal.linkedin}</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/70 font-bold mb-3">Skills</h3>
            <ul className="space-y-1.5 text-xs text-white/90">
              {skills.map(s => <li key={s.id}>{s.name}</li>)}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/70 font-bold mb-3">Languages</h3>
            <ul className="space-y-1.5 text-xs text-white/90">
              {languages.map(l => <li key={l.id}>{l.name} <span className="text-white/50">({l.level})</span></li>)}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT - WHITE */}
      <div className="flex-1 p-10 text-[#1A233A] space-y-6">
        {/* Header */}
        <div className="border-b-2 border-[#1A233A]/10 pb-4 mb-6">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-1">{personal.fullName}</h1>
          <p className="text-lg font-semibold tracking-wide text-[#1A233A]/80">{personal.jobTitle}</p>
        </div>

        {/* Summary */}
        {summary && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest border-b border-[#1A233A]/20 pb-1 mb-3">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest border-b border-[#1A233A]/20 pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="text-sm">
                  <div className="flex justify-between font-bold text-[#1A233A]">
                    <span>{exp.position}</span>
                    <span className="text-xs text-gray-500 font-mono">{exp.startDate} - {exp.endDate || "Present"}</span>
                  </div>
                  <div className="text-gray-600 italic text-xs mb-2">{exp.company} {exp.location && `| ${exp.location}`}</div>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700 text-xs">
                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest border-b border-[#1A233A]/20 pb-1 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="text-sm">
                  <div className="font-bold text-[#1A233A]">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                  <div className="text-gray-600 text-xs">{edu.institution} | {edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
