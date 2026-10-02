import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 14 — Tech Matrix
 * Developer dashboard · code-like labels · modular matrix
 * ============================================================ */

export function TechMatrix({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', 'JetBrains Mono', monospace`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-tm { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#E5E5E5; line-height:1.5; background:#0F1115; padding: 6mm; margin: -6mm; }
        .cv-tm__head { display:grid; grid-template-columns: 1fr auto; gap: 5mm; padding-bottom: 4mm; margin-bottom: 5mm; border-bottom: 1px solid ${accent}44; }
        .cv-tm__label { font-size: 0.68em; color:${accent}; letter-spacing:0.2em; text-transform: uppercase; margin: 0 0 1.5mm; }
        .cv-tm__name { font-size: 1.9em; font-weight: 700; margin:0; letter-spacing:-0.01em; color:#FFF; line-height:1.1; }
        .cv-tm__role { font-size: 0.86em; color:${accent}; letter-spacing:0.14em; text-transform: uppercase; margin: 1.5mm 0 0; }
        .cv-tm__contact { font-size: 0.74em; color:#8A8A8A; text-align:right; line-height: 1.7; }
        .cv-tm__contact-item { display: block; }
        .cv-tm__contact-item::before { content:"› "; color:${accent}; }
        .cv-tm h2 { font-size: 0.72em; font-weight: 700; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; display:flex; align-items: center; gap: 2mm; }
        .cv-tm h2::before { content:"//"; color:${accent}88; }
        .cv-tm section { margin-bottom: ${settings.sectionSpacing * 1.5}mm; }
        .cv-tm__entry { margin-bottom: 3mm; padding-left: 3mm; border-left: 2px solid ${accent}44; }
        .cv-tm__entry:last-child { margin-bottom: 0; }
        .cv-tm__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-tm__title { font-size: 0.98em; font-weight: 700; color:#FFF; }
        .cv-tm__date { font-size: 0.72em; color:#7A7A7A; white-space:nowrap; }
        .cv-tm__sub { font-size: 0.82em; color:${accent}; margin: 0.4mm 0 1.2mm; }
        .cv-tm p { font-size: 0.86em; margin: 0 0 1mm; color:#C8C8C8; }
        .cv-tm ul { margin: 0.8mm 0 0; padding-left: 0; list-style: none; }
        .cv-tm li { font-size: 0.82em; padding-left: 4mm; position:relative; margin-bottom: 0.6mm; color:#C8C8C8; }
        .cv-tm li::before { content:"▸"; position:absolute; left:0; color:${accent}; }
        .cv-tm__matrix { display:grid; grid-template-columns: repeat(2, 1fr); gap: 1.2mm 4mm; }
        .cv-tm__skill { display:flex; justify-content:space-between; align-items:center; font-size: 0.82em; padding: 1mm 2mm; background: ${accent}0A; border-left: 2px solid ${accent}; }
        .cv-tm__skill-name { color:#FFF; }
        .cv-tm__skill-level { color:${accent}; font-size: 0.9em; letter-spacing: 1px; }
        .cv-tm__2col { display:grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
      `}</style>

      <div className="cv-tm">
        <header className="cv-tm__head">
          <div>
            <p className="cv-tm__label">$ whoami</p>
            <h1 className="cv-tm__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-tm__role">{personal.jobTitle}</p>}
          </div>
          <div className="cv-tm__contact">
            {personal.email && <span className="cv-tm__contact-item">{personal.email}</span>}
            {personal.phone && <span className="cv-tm__contact-item">{personal.phone}</span>}
            {personal.location && <span className="cv-tm__contact-item">{personal.location}</span>}
            {personal.website && <span className="cv-tm__contact-item">{personal.website}</span>}
            {personal.linkedin && <span className="cv-tm__contact-item">{personal.linkedin}</span>}
            {personal.github && <span className="cv-tm__contact-item">{personal.github}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2>Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-tm__entry">
                <div className="cv-tm__row">
                  <span className="cv-tm__title">{e.position}</span>
                  <span className="cv-tm__date">[{formatRange(e.startDate, e.endDate, e.current)}]</span>
                </div>
                <p className="cv-tm__sub">@ {e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2>Stack</h2>
            <div className="cv-tm__matrix">
              {skills.map((s) => (
                <div key={s.id} className="cv-tm__skill">
                  <span className="cv-tm__skill-name">{s.name}</span>
                  <span className="cv-tm__skill-level">{"█".repeat(s.level || 3)}{"░".repeat(5 - (s.level || 3))}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="cv-tm__entry">
                <div className="cv-tm__row">
                  <span className="cv-tm__title">{p.name}</span>
                  {p.url && <span className="cv-tm__date">{p.url}</span>}
                </div>
                {p.role && <p className="cv-tm__sub">{p.role}</p>}
                {p.description && <p>{p.description}</p>}
                {p.tech && <p style={{ color: `${accent}CC`, fontSize: "0.78em" }}># {p.tech}</p>}
              </div>
            ))}
          </section>
        )}

        <div className="cv-tm__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-tm__entry">
                  <p className="cv-tm__title" style={{ fontSize: "0.9em" }}>{e.degree}{e.field && ` in ${e.field}`}</p>
                  <p className="cv-tm__sub">{e.institution}</p>
                  <p className="cv-tm__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {(certifications.length > 0 || languages.length > 0) && (
            <section>
              {certifications.length > 0 && (
                <>
                  <h2>Certs</h2>
                  {certifications.map((c) => (
                    <p key={c.id} style={{ fontSize: "0.84em", marginBottom: "1mm" }}>
                      <span style={{ color: accent }}>✓</span> {c.name}{c.issuer && ` — ${c.issuer}`}
                    </p>
                  ))}
                </>
              )}
              {languages.length > 0 && (
                <>
                  <h2 style={{ marginTop: "3mm" }}>Languages</h2>
                  {languages.map((l) => (
                    <p key={l.id} style={{ fontSize: "0.84em", marginBottom: "1mm" }}>
                      {l.name}{l.level && <span style={{ color: "#7A7A7A" }}> — {l.level}</span>}
                    </p>
                  ))}
                </>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
}
