import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 07 — Nordic Balance
 * Scandinavian · calm spacing · soft section blocks
 * ============================================================ */

export function NordicBalance({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-nb { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#2A2A2A; line-height:1.6; background:#FFF; }
        .cv-nb__head { text-align: center; padding: 6mm 0 5mm; margin-bottom: 6mm; border-bottom: 1px solid #E5E5E5; }
        .cv-nb__name { font-size: 2.1em; font-weight: 300; letter-spacing: 0.02em; margin:0; color:#0F0F0F; }
        .cv-nb__name strong { font-weight: 700; }
        .cv-nb__role { font-size: 0.92em; color:${accent}; letter-spacing: 0.22em; text-transform: uppercase; margin: 2mm 0 0; font-weight: 500; }
        .cv-nb__contact { display:flex; flex-wrap:wrap; justify-content:center; gap: 1.5mm 5mm; font-size: 0.82em; color:#6B6B6B; margin-top: 4mm; }
        .cv-nb__contact span + span::before { content:"·"; margin-right: 5mm; color:#CCC; }
        .cv-nb section { margin-bottom: ${settings.sectionSpacing * 1.8}mm; }
        .cv-nb h2 { font-size: 0.78em; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color:${accent}; margin: 0 0 4mm; text-align: center; }
        .cv-nb h2::before, .cv-nb h2::after { content:""; display:inline-block; width: 8mm; height:1px; background: ${accent}55; vertical-align: middle; margin: 0 3mm; }
        .cv-nb__entry { padding: 3.5mm 4mm; background:#FAFAFA; border-radius: 2mm; margin-bottom: 3mm; }
        .cv-nb__entry:last-child { margin-bottom: 0; }
        .cv-nb__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; margin-bottom: 0.8mm; }
        .cv-nb__title { font-size: 0.98em; font-weight: 600; color:#0F0F0F; }
        .cv-nb__date { font-size: 0.78em; color:#8B8B8B; white-space:nowrap; }
        .cv-nb__sub { font-size: 0.85em; color:#6B6B6B; margin: 0 0 1mm; }
        .cv-nb p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-nb ul { margin: 1mm 0 0; padding-left: 4mm; }
        .cv-nb li { font-size: 0.86em; margin-bottom: 0.6mm; }
        .cv-nb__skills { display:flex; flex-wrap:wrap; justify-content:center; gap: 1.5mm 2mm; }
        .cv-nb__skill { font-size: 0.78em; padding: 1mm 3mm; border: 1px solid ${accent}44; border-radius: 6mm; color:#2A2A2A; }
        .cv-nb__2col { display:grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
        .cv-nb__lang { display:flex; justify-content:space-between; font-size:0.88em; margin-bottom: 1.5mm; padding: 0 4mm; }
      `}</style>

      <div className="cv-nb">
        <header className="cv-nb__head">
          <h1 className="cv-nb__name">
            {personal.fullName?.split(" ").slice(0, -1).join(" ")} <strong>{personal.fullName?.split(" ").slice(-1)}</strong>
          </h1>
          {personal.jobTitle && <p className="cv-nb__role">{personal.jobTitle}</p>}
          <div className="cv-nb__contact">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2>Profile</h2>
            <p style={{ textAlign: "center", maxWidth: "85%", margin: "0 auto" }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-nb__entry">
                <div className="cv-nb__row">
                  <span className="cv-nb__title">{e.position}</span>
                  <span className="cv-nb__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-nb__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="cv-nb__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-nb__entry">
                  <p className="cv-nb__title" style={{ marginBottom: "0.5mm" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                  <p className="cv-nb__sub">{e.institution}</p>
                  <p className="cv-nb__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {(projects.length > 0 || certifications.length > 0) && (
            <section>
              {projects.length > 0 && (
                <>
                  <h2>Projects</h2>
                  {projects.map((p) => (
                    <div key={p.id} className="cv-nb__entry">
                      <p className="cv-nb__title" style={{ marginBottom: "0.5mm" }}>{p.name}</p>
                      {p.role && <p className="cv-nb__sub">{p.role}</p>}
                      {p.description && <p style={{ fontSize: "0.85em" }}>{p.description}</p>}
                    </div>
                  ))}
                </>
              )}
            </section>
          )}
        </div>

        {skills.length > 0 && (
          <section>
            <h2>Skills</h2>
            <div className="cv-nb__skills">
              {skills.map((s) => <span key={s.id} className="cv-nb__skill">{s.name}</span>)}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <div style={{ maxWidth: "60%", margin: "0 auto" }}>
              {languages.map((l) => (
                <div key={l.id} className="cv-nb__lang">
                  <span>{l.name}</span><span style={{ color: "#8B8B8B" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
