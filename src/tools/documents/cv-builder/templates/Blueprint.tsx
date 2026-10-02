import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 16 — Blueprint
 * Technical blueprint aesthetic · numbered modules · measurement lines
 * ============================================================ */

export function Blueprint({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', 'JetBrains Mono', monospace`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-bp { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-bp__head { padding: 5mm; border: 1.5px solid ${accent}; margin-bottom: 5mm; position: relative; }
        .cv-bp__head::before { content:""; position: absolute; top: -6mm; right: 8mm; width: 16mm; height: 5mm; background:#FFF; }
        .cv-bp__head::after { content:"CV · 001"; position: absolute; top: -5mm; right: 8mm; font-size: 0.65em; letter-spacing:0.2em; color:${accent}; font-weight: 700; }
        .cv-bp__name { font-size: 2em; font-weight: 800; margin:0; letter-spacing:-0.02em; color:#0F0F0F; }
        .cv-bp__role { font-size: 0.82em; color:${accent}; letter-spacing:0.24em; text-transform: uppercase; margin: 1.5mm 0 4mm; font-weight: 600; }
        .cv-bp__meta { display:grid; grid-template-columns: 1fr 1fr; gap: 1.2mm 5mm; font-size: 0.78em; color:#4A4A4A; padding-top: 3mm; border-top: 1px dashed ${accent}44; }
        .cv-bp__meta-item { display: flex; gap: 2mm; }
        .cv-bp__meta-label { color:${accent}; font-weight: 700; min-width: 14mm; }
        .cv-bp__section { position: relative; margin-bottom: ${settings.sectionSpacing * 1.6}mm; padding-left: 10mm; }
        .cv-bp__section-num { position: absolute; left: 0; top: 0; width: 7mm; height: 7mm; border: 1.5px solid ${accent}; display: flex; align-items: center; justify-content: center; font-size: 0.72em; font-weight: 800; color:${accent}; }
        .cv-bp h2 { font-size: 0.82em; font-weight: 800; letter-spacing:0.24em; text-transform: uppercase; color:#0F0F0F; margin: 0 0 3mm; padding-bottom: 1.5mm; border-bottom: 1px solid ${accent}44; }
        .cv-bp__entry { padding: 3mm 3.5mm; border: 1px solid ${accent}22; border-left: 3px solid ${accent}; background: ${accent}04; margin-bottom: 2.5mm; }
        .cv-bp__entry:last-child { margin-bottom: 0; }
        .cv-bp__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-bp__title { font-size: 0.98em; font-weight: 700; color:#0F0F0F; }
        .cv-bp__date { font-size: 0.74em; color:${accent}; white-space:nowrap; font-weight: 600; }
        .cv-bp__sub { font-size: 0.84em; color:#4A4A4A; margin: 0.5mm 0 1.5mm; }
        .cv-bp p { font-size: 0.88em; margin: 0 0 1mm; }
        .cv-bp ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-bp li { font-size: 0.84em; margin-bottom: 0.5mm; }
        .cv-bp__matrix { display:grid; grid-template-columns: repeat(3, 1fr); gap: 2mm; }
        .cv-bp__cell { padding: 1.5mm; border: 1px solid ${accent}33; text-align: center; font-size: 0.82em; }
        .cv-bp__cell strong { display: block; color:${accent}; font-size: 0.78em; letter-spacing: 0.1em; margin-bottom: 0.5mm; }
        .cv-bp__2col { display:grid; grid-template-columns: 1fr 1fr; gap: 6mm; padding-left: 0; }
      `}</style>

      <div className="cv-bp">
        <header className="cv-bp__head">
          <h1 className="cv-bp__name">{personal.fullName || "Your Name"}</h1>
          {personal.jobTitle && <p className="cv-bp__role">{personal.jobTitle}</p>}
          <div className="cv-bp__meta">
            {personal.email && <div className="cv-bp__meta-item"><span className="cv-bp__meta-label">EMAIL</span><span>{personal.email}</span></div>}
            {personal.phone && <div className="cv-bp__meta-item"><span className="cv-bp__meta-label">PHONE</span><span>{personal.phone}</span></div>}
            {personal.location && <div className="cv-bp__meta-item"><span className="cv-bp__meta-label">LOC</span><span>{personal.location}</span></div>}
            {personal.website && <div className="cv-bp__meta-item"><span className="cv-bp__meta-label">WEB</span><span>{personal.website}</span></div>}
            {personal.linkedin && <div className="cv-bp__meta-item"><span className="cv-bp__meta-label">LINK</span><span>{personal.linkedin}</span></div>}
            {personal.github && <div className="cv-bp__meta-item"><span className="cv-bp__meta-label">GIT</span><span>{personal.github}</span></div>}
          </div>
        </header>

        {summary && (
          <section className="cv-bp__section">
            <span className="cv-bp__section-num">01</span>
            <h2>Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="cv-bp__section">
            <span className="cv-bp__section-num">02</span>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-bp__entry">
                <div className="cv-bp__row">
                  <span className="cv-bp__title">{e.position}</span>
                  <span className="cv-bp__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-bp__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="cv-bp__section">
            <span className="cv-bp__section-num">03</span>
            <h2>Technical Matrix</h2>
            <div className="cv-bp__matrix">
              {skills.map((s) => (
                <div key={s.id} className="cv-bp__cell">
                  <strong>SK-{String(s.id).slice(-2).toUpperCase()}</strong>
                  {s.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="cv-bp__section">
            <span className="cv-bp__section-num">04</span>
            <h2>Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="cv-bp__entry">
                <div className="cv-bp__row">
                  <span className="cv-bp__title">{p.name}</span>
                  {p.url && <span className="cv-bp__date">{p.url}</span>}
                </div>
                {p.role && <p className="cv-bp__sub">{p.role}</p>}
                {p.description && <p>{p.description}</p>}
                {p.tech && <p className="cv-bp__sub"><strong>STACK:</strong> {p.tech}</p>}
              </div>
            ))}
          </section>
        )}

        <section className="cv-bp__section">
          <span className="cv-bp__section-num">05</span>
          <h2>Additional</h2>
          <div className="cv-bp__2col">
            {education.length > 0 && (
              <div>
                <p style={{ fontSize: "0.78em", fontWeight: 800, letterSpacing: "0.15em", marginBottom: "1.5mm", color: accent }}>
                  EDUCATION
                </p>
                {education.map((e) => (
                  <div key={e.id} style={{ marginBottom: "2mm" }}>
                    <p className="cv-bp__title" style={{ fontSize: "0.88em" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                    <p className="cv-bp__sub">{e.institution}</p>
                    <p className="cv-bp__date">{formatRange(e.startDate, e.endDate, false)}</p>
                  </div>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <p style={{ fontSize: "0.78em", fontWeight: 800, letterSpacing: "0.15em", marginBottom: "1.5mm", color: accent }}>
                  CERTIFICATIONS
                </p>
                {certifications.map((c) => (
                  <p key={c.id} style={{ fontSize: "0.84em", marginBottom: "1.2mm" }}>
                    <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
