import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 04 — Midnight Grid
 * Print-safe dark header band · modular grid below
 * ============================================================ */

export function MidnightGrid({ data }: CVTemplateProps) {
  const {
    personal, summary, experience, education,
    skills, languages, projects, certifications, settings,
  } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-mg { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-mg__head { background:${accent}; color:#FFF; padding: 7mm 8mm; margin: -6mm -6mm 6mm; display:grid; grid-template-columns: 1fr auto; gap: 5mm; align-items: center; }
        .cv-mg__name { font-size: 2em; font-weight:800; margin:0; letter-spacing:-0.02em; line-height:1.05; color:#FFF; }
        .cv-mg__role { font-size: 0.95em; color:#FFFFFFCC; margin: 1mm 0 0; letter-spacing:0.05em; text-transform: uppercase; font-weight:500; }
        .cv-mg__contact { text-align:right; font-size: 0.82em; color:#FFFFFFDD; line-height:1.6; }
        .cv-mg__grid { display:grid; grid-template-columns: 1fr 1fr; gap: 6mm 8mm; }
        .cv-mg section { break-inside: avoid; }
        .cv-mg h2 { font-size: 0.78em; font-weight:800; letter-spacing:0.18em; text-transform: uppercase; color:${accent}; margin: 0 0 2.5mm; display:flex; align-items:center; gap: 2mm; }
        .cv-mg h2::before { content:""; width: 4mm; height: 2px; background:${accent}; }
        .cv-mg__entry { margin-bottom: 3mm; }
        .cv-mg__entry:last-child { margin-bottom: 0; }
        .cv-mg__row { display:flex; justify-content:space-between; align-items:baseline; gap: 2mm; }
        .cv-mg__title { font-size: 0.98em; font-weight:700; color:#0F0F0F; }
        .cv-mg__date { font-size: 0.76em; color:#6B6B6B; white-space:nowrap; font-family: 'JetBrains Mono', monospace; }
        .cv-mg__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.4mm 0 1mm; }
        .cv-mg p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-mg ul { margin: 0.8mm 0 0; padding-left: 3.5mm; }
        .cv-mg li { font-size: 0.86em; margin-bottom: 0.5mm; }
        .cv-mg__skills { display:flex; flex-wrap:wrap; gap: 1.2mm; }
        .cv-mg__skill { font-size: 0.78em; padding: 0.6mm 2mm; background:${accent}11; border-left: 2px solid ${accent}; color:#2A2A2A; }
        .cv-mg__full { grid-column: 1 / -1; }
        .cv-mg__divider { height: 1px; background:${accent}22; margin: 4mm 0; }
      `}</style>

      <div className="cv-mg">
        <header className="cv-mg__head">
          <div>
            <h1 className="cv-mg__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-mg__role">{personal.jobTitle}</p>}
          </div>
          <div className="cv-mg__contact">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div>{personal.website}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.github && <div>{personal.github}</div>}
          </div>
        </header>

        {summary && (
          <section className="cv-mg__full" style={{ marginBottom: "6mm" }}>
            <h2>Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        <div className="cv-mg__grid">
          {experience.length > 0 && (
            <section className="cv-mg__full">
              <h2>Experience</h2>
              {experience.map((e) => (
                <div key={e.id} className="cv-mg__entry">
                  <div className="cv-mg__row">
                    <span className="cv-mg__title">{e.position}</span>
                    <span className="cv-mg__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                  </div>
                  <p className="cv-mg__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                  {e.bullets.filter(Boolean).length > 0 && (
                    <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                  )}
                </div>
              ))}
              <div className="cv-mg__divider" />
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-mg__entry">
                  <div className="cv-mg__row">
                    <span className="cv-mg__title">{e.degree}{e.field && ` · ${e.field}`}</span>
                    <span className="cv-mg__date">{formatRange(e.startDate, e.endDate, false)}</span>
                  </div>
                  <p className="cv-mg__sub">{e.institution}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2>Skills</h2>
              <div className="cv-mg__skills">
                {skills.map((s) => (
                  <span key={s.id} className="cv-mg__skill">{s.name}</span>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="cv-mg__full">
              <h2>Projects</h2>
              {projects.map((p) => (
                <div key={p.id} className="cv-mg__entry">
                  <div className="cv-mg__row">
                    <span className="cv-mg__title">{p.name}</span>
                    {p.url && <span className="cv-mg__date">{p.url}</span>}
                  </div>
                  {p.role && <p className="cv-mg__sub">{p.role}</p>}
                  {p.description && <p>{p.description}</p>}
                  {p.tech && <p className="cv-mg__sub"><em>{p.tech}</em></p>}
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2>Certifications</h2>
              {certifications.map((c) => (
                <div key={c.id} className="cv-mg__entry">
                  <div className="cv-mg__row">
                    <span className="cv-mg__title">{c.name}</span>
                    <span className="cv-mg__date">{c.date}</span>
                  </div>
                  {c.issuer && <p className="cv-mg__sub">{c.issuer}</p>}
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2>Languages</h2>
              {languages.map((l) => (
                <div key={l.id} className="cv-mg__row" style={{ marginBottom: "1mm" }}>
                  <span style={{ fontSize: "0.88em" }}>{l.name}</span>
                  <span className="cv-mg__date">{l.level}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </>
  );
}
