import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 17 — Monochrome Classic
 * Black & white · serif headings · classic professional
 * ============================================================ */

export function MonochromeClassic({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', Georgia, serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-mc { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#0F0F0F; line-height:1.55; background:#FFF; }
        .cv-mc__head { text-align: center; padding-bottom: 5mm; margin-bottom: 6mm; border-bottom: 3px double #0F0F0F; }
        .cv-mc__name { font-size: 2.1em; font-weight: 700; margin: 0; letter-spacing:0.06em; text-transform: uppercase; color:#0F0F0F; }
        .cv-mc__role { font-size: 0.95em; color:#0F0F0F; letter-spacing:0.16em; text-transform: uppercase; margin: 2mm 0 3mm; font-style: italic; }
        .cv-mc__contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 1mm 4mm; font-size: 0.82em; color:#4A4A4A; }
        .cv-mc__contact span + span::before { content:"·"; margin-right: 4mm; color:#888; }
        .cv-mc h2 { font-size: 0.82em; font-weight: 700; letter-spacing:0.24em; text-transform: uppercase; color:#0F0F0F; margin: 0 0 3mm; text-align: center; }
        .cv-mc h2::before, .cv-mc h2::after { content:"—"; margin: 0 3mm; color:${accent}; }
        .cv-mc section { margin-bottom: ${settings.sectionSpacing * 1.6}mm; }
        .cv-mc__entry { margin-bottom: 3.5mm; }
        .cv-mc__entry:last-child { margin-bottom: 0; }
        .cv-mc__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-mc__title { font-size: 1em; font-weight: 700; color:#0F0F0F; }
        .cv-mc__date { font-size: 0.8em; color:#4A4A4A; white-space:nowrap; font-style: italic; }
        .cv-mc__sub { font-size: 0.88em; color:#4A4A4A; margin: 0.4mm 0 1.5mm; font-style: italic; }
        .cv-mc p { font-size: 0.9em; margin: 0 0 1.2mm; }
        .cv-mc ul { margin: 1mm 0 0; padding-left: 5mm; }
        .cv-mc li { font-size: 0.86em; margin-bottom: 0.6mm; }
        .cv-mc__skills-list { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.2mm 3mm; }
        .cv-mc__skill { font-size: 0.86em; }
        .cv-mc__skill + .cv-mc__skill::before { content:"·"; margin-right: 3mm; color:${accent}; }
        .cv-mc__2col { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
      `}</style>

      <div className="cv-mc">
        <header className="cv-mc__head">
          <h1 className="cv-mc__name">{personal.fullName || "Your Name"}</h1>
          {personal.jobTitle && <p className="cv-mc__role">{personal.jobTitle}</p>}
          <div className="cv-mc__contact">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2>Professional Summary</h2>
            <p style={{ textAlign: "center", maxWidth: "88%", margin: "0 auto" }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Professional Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-mc__entry">
                <div className="cv-mc__row">
                  <span className="cv-mc__title">{e.position}</span>
                  <span className="cv-mc__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-mc__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Notable Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="cv-mc__entry">
                <div className="cv-mc__row">
                  <span className="cv-mc__title">{p.name}</span>
                  {p.url && <span className="cv-mc__date">{p.url}</span>}
                </div>
                {p.role && <p className="cv-mc__sub">{p.role}</p>}
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2>Education</h2>
            {education.map((e) => (
              <div key={e.id} className="cv-mc__entry">
                <div className="cv-mc__row">
                  <span className="cv-mc__title">{e.degree}{e.field && ` in ${e.field}`}</span>
                  <span className="cv-mc__date">{formatRange(e.startDate, e.endDate, false)}</span>
                </div>
                <p className="cv-mc__sub">{e.institution}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2>Skills</h2>
            <div className="cv-mc__skills-list">
              {skills.map((s) => <span key={s.id} className="cv-mc__skill">{s.name}</span>)}
            </div>
          </section>
        )}

        <div className="cv-mc__2col">
          {certifications.length > 0 && (
            <section>
              <h2>Certifications</h2>
              <ul style={{ paddingLeft: "5mm" }}>
                {certifications.map((c) => (
                  <li key={c.id}>{c.name}{c.issuer && ` — ${c.issuer}`}</li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2>Languages</h2>
              <ul style={{ paddingLeft: "5mm" }}>
                {languages.map((l) => (
                  <li key={l.id}>{l.name}{l.level && ` — ${l.level}`}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
