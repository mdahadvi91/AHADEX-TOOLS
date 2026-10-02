import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 05 — Architect
 * Precision grid · numbered sections · technical feel
 * ============================================================ */

export function Architect({ data }: CVTemplateProps) {
  const {
    personal, summary, experience, education,
    skills, projects, languages, certifications, settings,
  } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-ar { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.45; background:#FFF; }
        .cv-ar__head { display:grid; grid-template-columns: 1fr auto; gap: 5mm; padding-bottom: 4mm; border-bottom: 2px solid ${accent}; margin-bottom: 5mm; }
        .cv-ar__name { font-size: 1.9em; font-weight:800; letter-spacing:0.02em; margin:0 0 0.5mm; color:#0F0F0F; text-transform: uppercase; }
        .cv-ar__role { font-size: 0.88em; color:${accent}; font-weight:600; letter-spacing:0.15em; text-transform: uppercase; margin:0; }
        .cv-ar__meta { font-size: 0.76em; color:#6B6B6B; text-align:right; line-height:1.7; font-family: 'JetBrains Mono', monospace; }
        .cv-ar__headrow { display:flex; align-items: baseline; justify-content: space-between; margin-bottom: 1.5mm; }
        .cv-ar__title-line { display:flex; align-items:center; gap: 2mm; }
        .cv-ar h2 { font-size: 0.78em; font-weight:800; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0; }
        .cv-ar__num { font-size: 0.7em; font-family: 'JetBrains Mono', monospace; color:${accent}; padding: 0.4mm 1.5mm; border: 1px solid ${accent}; }
        .cv-ar section { margin-bottom: ${settings.sectionSpacing * 1.6}mm; padding-bottom: ${settings.sectionSpacing * 0.8}mm; border-bottom: 1px solid ${accent}18; }
        .cv-ar section:last-child { border-bottom: none; }
        .cv-ar__entry { padding-left: 4mm; border-left: 2px solid ${accent}33; padding-bottom: 2.5mm; margin-bottom: 2.5mm; position:relative; }
        .cv-ar__entry::before { content:""; position:absolute; left:-4px; top:0; width:6px; height:6px; background:${accent}; }
        .cv-ar__entry:last-child { border-left-color: transparent; padding-bottom: 0; margin-bottom: 0; }
        .cv-ar__entry:last-child::before { display:none; }
        .cv-ar__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-ar__title { font-size: 1em; font-weight:700; color:#0F0F0F; letter-spacing: -0.01em; }
        .cv-ar__date { font-size: 0.74em; color:#6B6B6B; white-space:nowrap; font-family: 'JetBrains Mono', monospace; letter-spacing:0.02em; }
        .cv-ar__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.4mm 0 1mm; }
        .cv-ar p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-ar ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-ar li { font-size: 0.86em; margin-bottom: 0.5mm; }
        .cv-ar__tech-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap: 1mm 4mm; font-size: 0.85em; }
        .cv-ar__tech-item { padding-left: 3mm; position:relative; }
        .cv-ar__tech-item::before { content:"▪"; position:absolute; left:0; color:${accent}; }
      `}</style>

      <div className="cv-ar">
        <header className="cv-ar__head">
          <div>
            <h1 className="cv-ar__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-ar__role">{personal.jobTitle}</p>}
          </div>
          <div className="cv-ar__meta">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div>{personal.website}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </header>

        {summary && (
          <section>
            <div className="cv-ar__headrow">
              <div className="cv-ar__title-line">
                <span className="cv-ar__num">01</span>
                <h2>Summary</h2>
              </div>
            </div>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <div className="cv-ar__headrow">
              <div className="cv-ar__title-line">
                <span className="cv-ar__num">02</span>
                <h2>Experience</h2>
              </div>
            </div>
            {experience.map((e) => (
              <div key={e.id} className="cv-ar__entry">
                <div className="cv-ar__row">
                  <span className="cv-ar__title">{e.position}</span>
                  <span className="cv-ar__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-ar__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <div className="cv-ar__headrow">
              <div className="cv-ar__title-line">
                <span className="cv-ar__num">03</span>
                <h2>Education</h2>
              </div>
            </div>
            {education.map((e) => (
              <div key={e.id} className="cv-ar__entry">
                <div className="cv-ar__row">
                  <span className="cv-ar__title">{e.degree}{e.field && ` · ${e.field}`}</span>
                  <span className="cv-ar__date">{formatRange(e.startDate, e.endDate, false)}</span>
                </div>
                <p className="cv-ar__sub">{e.institution}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <div className="cv-ar__headrow">
              <div className="cv-ar__title-line">
                <span className="cv-ar__num">04</span>
                <h2>Technical Skills</h2>
              </div>
            </div>
            <div className="cv-ar__tech-grid">
              {skills.map((s) => (
                <div key={s.id} className="cv-ar__tech-item">{s.name}</div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <div className="cv-ar__headrow">
              <div className="cv-ar__title-line">
                <span className="cv-ar__num">05</span>
                <h2>Projects</h2>
              </div>
            </div>
            {projects.map((p) => (
              <div key={p.id} className="cv-ar__entry">
                <div className="cv-ar__row">
                  <span className="cv-ar__title">{p.name}</span>
                  {p.url && <span className="cv-ar__date">{p.url}</span>}
                </div>
                {p.role && <p className="cv-ar__sub">{p.role}</p>}
                {p.description && <p>{p.description}</p>}
                {p.tech && <p className="cv-ar__sub"><em>{p.tech}</em></p>}
              </div>
            ))}
          </section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <section>
            <div className="cv-ar__headrow">
              <div className="cv-ar__title-line">
                <span className="cv-ar__num">06</span>
                <h2>Additional</h2>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4mm" }}>
              {certifications.length > 0 && (
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.82em", marginBottom: "1mm" }}>Certifications</p>
                  {certifications.map((c) => (
                    <p key={c.id} style={{ fontSize: "0.85em" }}>{c.name}{c.issuer && ` — ${c.issuer}`}</p>
                  ))}
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.82em", marginBottom: "1mm" }}>Languages</p>
                  {languages.map((l) => (
                    <p key={l.id} style={{ fontSize: "0.85em" }}>{l.name}{l.level && ` — ${l.level}`}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
