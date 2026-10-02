import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 06 — Creative Poster
 * Bold typography · portfolio-oriented
 * ============================================================ */

export function CreativePoster({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, settings } = data;
  const fontStack = `'${settings.fontFamily}', 'Helvetica Neue', sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-cp { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#0F0F0F; line-height:1.45; background:#FFF; }
        .cv-cp__hero { margin-bottom: 8mm; }
        .cv-cp__name { font-size: 3.4em; font-weight: 900; line-height:0.95; letter-spacing:-0.045em; margin:0; color:#0F0F0F; }
        .cv-cp__name span { color:${accent}; }
        .cv-cp__role { font-size: 1.1em; font-weight: 700; letter-spacing: 0.02em; color:#0F0F0F; margin: 3mm 0 0; max-width: 70%; }
        .cv-cp__tag { font-size: 0.72em; font-weight:800; letter-spacing:0.25em; text-transform: uppercase; color:${accent}; margin: 0 0 2mm; }
        .cv-cp__meta { display:flex; flex-wrap:wrap; gap: 1mm 4mm; font-size: 0.82em; color:#4A4A4A; margin-top: 4mm; padding-top: 3mm; border-top: 3px solid ${accent}; }
        .cv-cp__meta span + span::before { content:"·"; margin-right: 4mm; color:${accent}; }
        .cv-cp h2 { font-size: 0.82em; font-weight:900; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; }
        .cv-cp section { margin-bottom: ${settings.sectionSpacing * 1.6}mm; }
        .cv-cp__grid { display:grid; grid-template-columns: 1fr 1fr; gap: 6mm 8mm; }
        .cv-cp__entry { margin-bottom: 4mm; }
        .cv-cp__entry:last-child { margin-bottom: 0; }
        .cv-cp__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-cp__title { font-size: 1.05em; font-weight: 800; color:#0F0F0F; letter-spacing:-0.01em; }
        .cv-cp__date { font-size: 0.78em; font-weight: 600; color:${accent}; white-space:nowrap; }
        .cv-cp__sub { font-size: 0.88em; color:#4A4A4A; margin: 0.5mm 0 1.5mm; }
        .cv-cp p { font-size: 0.92em; margin: 0 0 1.2mm; }
        .cv-cp ul { margin: 1mm 0 0; padding-left: 0; list-style: none; }
        .cv-cp li { font-size: 0.88em; padding-left: 4mm; position:relative; margin-bottom: 0.8mm; }
        .cv-cp li::before { content:"→"; position:absolute; left:0; color:${accent}; font-weight:700; }
        .cv-cp__skills { display:flex; flex-wrap:wrap; gap: 1.2mm 2mm; }
        .cv-cp__skill { font-size: 0.78em; font-weight: 600; padding: 1mm 2.5mm; background:${accent}15; color:#0F0F0F; border-radius: 1mm; }
        .cv-cp__full { grid-column: 1 / -1; }
      `}</style>

      <div className="cv-cp">
        <header className="cv-cp__hero">
          <p className="cv-cp__tag">Portfolio · Curriculum Vitae</p>
          <h1 className="cv-cp__name">
            {personal.fullName?.split(" ").map((w, i) => (
              <span key={i}>
                {i === 1 ? <span>{w}</span> : w}
                {i < (personal.fullName?.split(" ").length ?? 0) - 1 ? " " : ""}
              </span>
            )) || "Your Name"}
          </h1>
          {personal.jobTitle && <p className="cv-cp__role">{personal.jobTitle}</p>}
          <div className="cv-cp__meta">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2>About</h2>
            <p style={{ fontSize: "1.05em", fontWeight: 500 }}>{summary}</p>
          </section>
        )}

        <div className="cv-cp__grid">
          {experience.length > 0 && (
            <section className="cv-cp__full">
              <h2>Experience</h2>
              {experience.map((e) => (
                <div key={e.id} className="cv-cp__entry">
                  <div className="cv-cp__row">
                    <span className="cv-cp__title">{e.position}</span>
                    <span className="cv-cp__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                  </div>
                  <p className="cv-cp__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                  {e.bullets.filter(Boolean).length > 0 && (
                    <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2>Selected Work</h2>
              {projects.map((p) => (
                <div key={p.id} className="cv-cp__entry">
                  <div className="cv-cp__row">
                    <span className="cv-cp__title">{p.name}</span>
                  </div>
                  {p.role && <p className="cv-cp__sub">{p.role}</p>}
                  {p.description && <p>{p.description}</p>}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-cp__entry">
                  <div className="cv-cp__row">
                    <span className="cv-cp__title">{e.degree}</span>
                    <span className="cv-cp__date">{formatRange(e.startDate, e.endDate, false)}</span>
                  </div>
                  <p className="cv-cp__sub">{e.institution}{e.field && ` · ${e.field}`}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="cv-cp__full">
              <h2>Skills & Tools</h2>
              <div className="cv-cp__skills">
                {skills.map((s) => <span key={s.id} className="cv-cp__skill">{s.name}</span>)}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2>Languages</h2>
              {languages.map((l) => (
                <div key={l.id} className="cv-cp__row" style={{ marginBottom: "1mm" }}>
                  <span style={{ fontSize: "0.9em", fontWeight: 600 }}>{l.name}</span>
                  <span className="cv-cp__date">{l.level}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </>
  );
}
