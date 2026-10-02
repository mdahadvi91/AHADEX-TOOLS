import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 10 — Portfolio Frame
 * Portfolio-first · project cards prominent
 * ============================================================ */

export function PortfolioFrame({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-pf { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-pf__head { display:grid; grid-template-columns: 1fr auto; gap: 5mm; align-items: center; margin-bottom: 6mm; padding-bottom: 4mm; border-bottom: 3px solid ${accent}; }
        .cv-pf__name { font-size: 2.1em; font-weight: 800; margin:0; letter-spacing:-0.02em; line-height:1.05; color:#0F0F0F; }
        .cv-pf__role { font-size: 0.95em; color:${accent}; letter-spacing:0.12em; text-transform: uppercase; margin: 1.5mm 0 0; font-weight: 600; }
        .cv-pf__contact { font-size: 0.82em; color:#4A4A4A; text-align: right; line-height: 1.7; }
        .cv-pf h2 { font-size: 0.82em; font-weight: 800; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; }
        .cv-pf section { margin-bottom: ${settings.sectionSpacing * 1.5}mm; }
        .cv-pf__projects { display:grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
        .cv-pf__card { padding: 3.5mm 4mm; background:#FAFAFA; border-radius: 2mm; border-left: 3px solid ${accent}; }
        .cv-pf__card-title { font-size: 1em; font-weight: 700; color:#0F0F0F; margin: 0 0 0.5mm; }
        .cv-pf__card-role { font-size: 0.8em; color:${accent}; font-weight: 600; margin: 0 0 1.5mm; }
        .cv-pf__card-desc { font-size: 0.86em; color:#4A4A4A; margin: 0; }
        .cv-pf__card-tech { font-size: 0.76em; color:#8B8B8B; margin: 1.5mm 0 0; font-style: italic; }
        .cv-pf__entry { margin-bottom: 3mm; }
        .cv-pf__entry:last-child { margin-bottom: 0; }
        .cv-pf__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-pf__title { font-size: 1em; font-weight: 700; color:#0F0F0F; }
        .cv-pf__date { font-size: 0.76em; color:#6B6B6B; white-space:nowrap; }
        .cv-pf__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.4mm 0 1mm; }
        .cv-pf p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-pf ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-pf li { font-size: 0.86em; margin-bottom: 0.5mm; }
        .cv-pf__skills { display:flex; flex-wrap:wrap; gap: 1.2mm; }
        .cv-pf__skill { font-size: 0.78em; padding: 0.8mm 2.5mm; background:${accent}15; color:#0F0F0F; border-radius: 1mm; }
        .cv-pf__2col { display:grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
      `}</style>

      <div className="cv-pf">
        <header className="cv-pf__head">
          <div>
            <h1 className="cv-pf__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-pf__role">{personal.jobTitle}</p>}
          </div>
          <div className="cv-pf__contact">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div>{personal.website}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </header>

        {summary && (
          <section>
            <h2>About</h2>
            <p style={{ fontSize: "1em" }}>{summary}</p>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Portfolio</h2>
            <div className="cv-pf__projects">
              {projects.map((p) => (
                <div key={p.id} className="cv-pf__card">
                  <p className="cv-pf__card-title">{p.name}</p>
                  {p.role && <p className="cv-pf__card-role">{p.role}</p>}
                  {p.description && <p className="cv-pf__card-desc">{p.description}</p>}
                  {p.tech && <p className="cv-pf__card-tech">{p.tech}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-pf__entry">
                <div className="cv-pf__row">
                  <span className="cv-pf__title">{e.position}</span>
                  <span className="cv-pf__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-pf__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="cv-pf__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-pf__entry">
                  <p className="cv-pf__title" style={{ fontSize: "0.92em" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                  <p className="cv-pf__sub">{e.institution}</p>
                  <p className="cv-pf__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2>Skills</h2>
              <div className="cv-pf__skills">
                {skills.map((s) => <span key={s.id} className="cv-pf__skill">{s.name}</span>)}
              </div>
            </section>
          )}
        </div>

        {languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <p style={{ fontSize: "0.88em" }}>
              {languages.map((l) => `${l.name} (${l.level})`).join("  ·  ")}
            </p>
          </section>
        )}
      </div>
    </>
  );
}
