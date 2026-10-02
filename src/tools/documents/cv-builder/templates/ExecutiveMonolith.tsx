import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 02 — Executive Monolith
 * Left 32% identity rail · right 68% content
 * ============================================================ */

export function ExecutiveMonolith({ data }: CVTemplateProps) {
  const {
    personal, summary, experience, education,
    skills, languages, certifications, projects, settings,
  } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;
  const showPhoto = settings.photoEnabled && personal.photoDataUrl;

  return (
    <>
      <style>{`
        .cv-em { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.45; background:#FFF; }
        .cv-em__grid { display:grid; grid-template-columns: 32% 1fr; gap: ${settings.sectionSpacing * 1.8}mm; min-height: 240mm; }
        .cv-em__rail { background: ${accent}0F; padding: 6mm 4mm; border-right: 1.5px solid ${accent}44; }
        .cv-em__body { padding: 6mm 0 0; }
        .cv-em__photo { width: 30mm; height: 30mm; border-radius: 50%; object-fit: cover; display:block; margin: 0 auto 4mm; border: 2px solid ${accent}55; }
        .cv-em__initials { width: 30mm; height: 30mm; border-radius: 50%; background:${accent}; color:#FFF; display:flex; align-items:center; justify-content:center; font-size: 22pt; font-weight: 700; margin: 0 auto 4mm; }
        .cv-em__name { font-size: 2em; font-weight: 800; color:${accent}; margin: 0 0 0.15em; letter-spacing:-0.02em; line-height:1.1; }
        .cv-em__role { font-size: 0.95em; color:#4A4A4A; font-weight:500; letter-spacing: 0.05em; text-transform: uppercase; margin: 0 0 6mm; }
        .cv-em__block { margin-bottom: 5mm; }
        .cv-em__label { font-size: 0.72em; font-weight:700; letter-spacing:0.14em; text-transform: uppercase; color:${accent}; margin: 0 0 1.5mm; }
        .cv-em__contact p { font-size: 0.85em; color:#2A2A2A; margin: 0 0 1.2mm; word-break: break-word; }
        .cv-em__skill { font-size: 0.85em; color:#2A2A2A; margin: 0 0 1mm; }
        .cv-em__lang { display:flex; justify-content:space-between; font-size:0.85em; margin: 0 0 1mm; }
        .cv-em h2 { font-size: 0.82em; font-weight:700; letter-spacing:0.14em; text-transform: uppercase; color:${accent}; margin: 0 0 2.5mm; padding-bottom: 1.2mm; border-bottom: 1px solid ${accent}33; }
        .cv-em section { margin-bottom: ${settings.sectionSpacing * 1.5}mm; }
        .cv-em__entry { margin-bottom: 3.5mm; }
        .cv-em__entry:last-child { margin-bottom: 0; }
        .cv-em__entry-head { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-em__entry-title { font-size: 1em; font-weight:700; color:#0F0F0F; }
        .cv-em__entry-date { font-size: 0.8em; color:#6B6B6B; white-space:nowrap; }
        .cv-em__entry-sub { font-size: 0.88em; color:#4A4A4A; margin: 0.5mm 0 1.5mm; }
        .cv-em ul { margin: 1mm 0 0; padding-left: 4mm; }
        .cv-em li { font-size: 0.9em; margin-bottom: 0.6mm; }
        .cv-em p { margin: 0 0 1.5mm; font-size: 0.92em; }
      `}</style>

      <div className="cv-em">
        <div className="cv-em__grid">
          {/* LEFT RAIL */}
          <aside className="cv-em__rail">
            {showPhoto ? (
              <img src={personal.photoDataUrl as string} alt="" className="cv-em__photo" />
            ) : (
              <div className="cv-em__initials">
                {personal.fullName ? personal.fullName.split(" ").map(w => w[0]).slice(0,2).join("") : "CV"}
              </div>
            )}
            <h1 className="cv-em__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-em__role">{personal.jobTitle}</p>}

            <div className="cv-em__block cv-em__contact">
              <p className="cv-em__label">Contact</p>
              {personal.email && <p>{personal.email}</p>}
              {personal.phone && <p>{personal.phone}</p>}
              {personal.location && <p>{personal.location}</p>}
              {personal.website && <p>{personal.website}</p>}
              {personal.linkedin && <p>{personal.linkedin}</p>}
              {personal.github && <p>{personal.github}</p>}
            </div>

            {skills.length > 0 && (
              <div className="cv-em__block">
                <p className="cv-em__label">Skills</p>
                {skills.map((s) => (
                  <p key={s.id} className="cv-em__skill">{s.name}</p>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div className="cv-em__block">
                <p className="cv-em__label">Languages</p>
                {languages.map((l) => (
                  <div key={l.id} className="cv-em__lang">
                    <span>{l.name}</span><span>{l.level}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>

          {/* RIGHT BODY */}
          <main className="cv-em__body">
            {summary && (
              <section>
                <h2>Profile</h2>
                <p>{summary}</p>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <h2>Experience</h2>
                {experience.map((e) => (
                  <div key={e.id} className="cv-em__entry">
                    <div className="cv-em__entry-head">
                      <span className="cv-em__entry-title">{e.position}</span>
                      <span className="cv-em__entry-date">
                        {formatRange(e.startDate, e.endDate, e.current)}
                      </span>
                    </div>
                    <p className="cv-em__entry-sub">
                      {e.company}{e.location && ` · ${e.location}`}
                    </p>
                    {e.bullets.filter(Boolean).length > 0 && (
                      <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2>Education</h2>
                {education.map((e) => (
                  <div key={e.id} className="cv-em__entry">
                    <div className="cv-em__entry-head">
                      <span className="cv-em__entry-title">{e.degree}{e.field && ` · ${e.field}`}</span>
                      <span className="cv-em__entry-date">{formatRange(e.startDate, e.endDate, false)}</span>
                    </div>
                    <p className="cv-em__entry-sub">{e.institution}</p>
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2>Selected Projects</h2>
                {projects.map((p) => (
                  <div key={p.id} className="cv-em__entry">
                    <div className="cv-em__entry-head">
                      <span className="cv-em__entry-title">{p.name}</span>
                      {p.url && <span className="cv-em__entry-date">{p.url}</span>}
                    </div>
                    {p.role && <p className="cv-em__entry-sub">{p.role}</p>}
                    {p.description && <p>{p.description}</p>}
                    {p.tech && <p className="cv-em__entry-sub"><em>{p.tech}</em></p>}
                  </div>
                ))}
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2>Certifications</h2>
                {certifications.map((c) => (
                  <div key={c.id} className="cv-em__entry">
                    <div className="cv-em__entry-head">
                      <span className="cv-em__entry-title">{c.name}</span>
                      <span className="cv-em__entry-date">{c.date}</span>
                    </div>
                    {c.issuer && <p className="cv-em__entry-sub">{c.issuer}</p>}
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
