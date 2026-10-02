import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 11 — Consultant Brief
 * Consulting-report aesthetic · navy/gray
 * ============================================================ */

export function ConsultantBrief({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', 'Helvetica Neue', sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-cb { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-cb__head { padding-bottom: 4mm; margin-bottom: 5mm; border-bottom: 2px solid #1A1A1A; }
        .cv-cb__name { font-size: 1.9em; font-weight: 700; margin:0; letter-spacing:0.02em; color:#0F0F0F; text-transform: uppercase; }
        .cv-cb__role { font-size: 0.9em; color:${accent}; letter-spacing:0.2em; text-transform: uppercase; margin: 1.5mm 0 3mm; font-weight: 600; }
        .cv-cb__contact { font-size: 0.8em; color:#4A4A4A; display: flex; flex-wrap: wrap; gap: 1mm 4mm; }
        .cv-cb__contact span + span::before { content:"|"; margin-right: 4mm; color:${accent}; }
        .cv-cb h2 { font-size: 0.8em; font-weight: 700; letter-spacing:0.24em; text-transform: uppercase; color:#0F0F0F; margin: 0 0 3mm; padding-bottom: 1.2mm; border-bottom: 1px solid ${accent}; display: flex; align-items: baseline; gap: 3mm; }
        .cv-cb h2::before { content:""; width: 3mm; height: 3mm; background:${accent}; display: inline-block; }
        .cv-cb section { margin-bottom: ${settings.sectionSpacing * 1.5}mm; }
        .cv-cb__profile { padding: 4mm 5mm; background: ${accent}08; border-left: 4px solid ${accent}; font-size: 0.95em; }
        .cv-cb__entry { margin-bottom: 3.5mm; }
        .cv-cb__entry:last-child { margin-bottom: 0; }
        .cv-cb__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-cb__title { font-size: 0.98em; font-weight: 700; color:#0F0F0F; }
        .cv-cb__date { font-size: 0.78em; color:#6B6B6B; white-space:nowrap; }
        .cv-cb__sub { font-size: 0.86em; color:${accent}; margin: 0.4mm 0 1.2mm; font-weight: 600; }
        .cv-cb p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-cb ul { margin: 0.8mm 0 0; padding-left: 5mm; }
        .cv-cb li { font-size: 0.86em; margin-bottom: 0.7mm; }
        .cv-cb__capabilities { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5mm 5mm; }
        .cv-cb__cap { font-size: 0.88em; padding-left: 3mm; position: relative; }
        .cv-cb__cap::before { content:"▪"; position: absolute; left: 0; color:${accent}; }
        .cv-cb__engagements { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3mm; }
        .cv-cb__engagement { padding: 3mm; border: 1px solid ${accent}25; font-size: 0.88em; }
        .cv-cb__engagement strong { color:${accent}; display: block; margin-bottom: 0.5mm; }
      `}</style>

      <div className="cv-cb">
        <header className="cv-cb__head">
          <h1 className="cv-cb__name">{personal.fullName || "Your Name"}</h1>
          {personal.jobTitle && <p className="cv-cb__role">{personal.jobTitle}</p>}
          <div className="cv-cb__contact">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2>Executive Profile</h2>
            <div className="cv-cb__profile">{summary}</div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Key Engagements</h2>
            <div className="cv-cb__engagements">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="cv-cb__engagement">
                  <strong>{p.name}</strong>
                  {p.description && <span style={{ color: "#4A4A4A" }}>{p.description}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2>Capabilities</h2>
            <div className="cv-cb__capabilities">
              {skills.map((s) => (
                <div key={s.id} className="cv-cb__cap">{s.name}</div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-cb__entry">
                <div className="cv-cb__row">
                  <span className="cv-cb__title">{e.position}</span>
                  <span className="cv-cb__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-cb__sub">{e.company}{e.location && ` · ${e.location}`}</p>
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
              <div key={e.id} className="cv-cb__entry">
                <div className="cv-cb__row">
                  <span className="cv-cb__title">{e.degree}{e.field && ` in ${e.field}`}</span>
                  <span className="cv-cb__date">{formatRange(e.startDate, e.endDate, false)}</span>
                </div>
                <p className="cv-cb__sub">{e.institution}</p>
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2>Certifications</h2>
            {certifications.map((c) => (
              <div key={c.id} className="cv-cb__row" style={{ marginBottom: "1.2mm" }}>
                <span style={{ fontSize: "0.9em" }}>{c.name}{c.issuer && ` — ${c.issuer}`}</span>
                <span className="cv-cb__date">{c.date}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
