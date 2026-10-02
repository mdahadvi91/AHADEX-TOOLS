import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 20 — Future Horizon
 * Futuristic professional · glowing accent lines · tech/AI
 * ============================================================ */

export function FutureHorizon({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-fh { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-fh__head { position: relative; padding: 5mm 6mm; margin-bottom: 5mm; background: linear-gradient(135deg, ${accent}10, transparent); border-left: 4px solid ${accent}; }
        .cv-fh__head::after { content:""; position: absolute; top: 0; right: 0; width: 40%; height: 1px; background: linear-gradient(to right, transparent, ${accent}); }
        .cv-fh__head::before { content:""; position: absolute; bottom: 0; left: 0; width: 40%; height: 1px; background: linear-gradient(to right, ${accent}, transparent); }
        .cv-fh__tag { font-size: 0.68em; color:${accent}; letter-spacing:0.3em; text-transform: uppercase; font-weight: 700; margin: 0 0 2mm; }
        .cv-fh__name { font-size: 2em; font-weight: 800; margin: 0; letter-spacing:-0.02em; color:#0F0F0F; line-height: 1.05; }
        .cv-fh__role { font-size: 0.9em; color:${accent}; letter-spacing:0.16em; text-transform: uppercase; margin: 1.5mm 0 0; font-weight: 600; }
        .cv-fh__contact { display: flex; flex-wrap: wrap; gap: 1mm 4mm; font-size: 0.78em; color:#4A4A4A; margin-top: 3mm; }
        .cv-fh__contact span + span::before { content:"//"; margin-right: 4mm; color:${accent}; font-weight: 700; }
        .cv-fh section { position: relative; margin-bottom: ${settings.sectionSpacing * 1.6}mm; padding-left: 6mm; }
        .cv-fh section::before { content:""; position: absolute; left: 0; top: 0; width: 3px; height: 100%; background: linear-gradient(to bottom, ${accent}, transparent); }
        .cv-fh h2 { font-size: 0.8em; font-weight: 800; letter-spacing:0.24em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; display: flex; align-items: center; gap: 2mm; }
        .cv-fh h2::after { content:""; flex: 1; height: 1px; background: linear-gradient(to right, ${accent}44, transparent); }
        .cv-fh__entry { margin-bottom: 3mm; }
        .cv-fh__entry:last-child { margin-bottom: 0; }
        .cv-fh__row { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
        .cv-fh__title { font-size: 1em; font-weight: 700; color:#0F0F0F; }
        .cv-fh__date { font-size: 0.76em; color:${accent}; white-space: nowrap; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
        .cv-fh__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.4mm 0 1.2mm; }
        .cv-fh p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-fh ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-fh li { font-size: 0.86em; margin-bottom: 0.6mm; }
        .cv-fh__focus { display: flex; flex-wrap: wrap; gap: 1.2mm; }
        .cv-fh__focus-item { font-size: 0.78em; padding: 1mm 3mm; border: 1px solid ${accent}; color:${accent}; font-weight: 600; border-radius: 1mm; }
        .cv-fh__projects { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
        .cv-fh__proj { padding: 3mm 3.5mm; background: ${accent}06; border: 1px solid ${accent}25; border-radius: 1mm; }
        .cv-fh__proj-name { font-weight: 700; font-size: 0.92em; margin: 0 0 0.5mm; color:#0F0F0F; }
        .cv-fh__proj-desc { font-size: 0.82em; color:#4A4A4A; margin: 0.5mm 0 0; }
        .cv-fh__2col { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
        .cv-fh__tech-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1mm 4mm; font-size: 0.85em; }
        .cv-fh__tech-item { padding-left: 3mm; position: relative; }
        .cv-fh__tech-item::before { content: "▸"; position: absolute; left: 0; color:${accent}; }
      `}</style>

      <div className="cv-fh">
        <header className="cv-fh__head">
          <p className="cv-fh__tag">Future Horizon · Professional Profile</p>
          <h1 className="cv-fh__name">{personal.fullName || "Your Name"}</h1>
          {personal.jobTitle && <p className="cv-fh__role">{personal.jobTitle}</p>}
          <div className="cv-fh__contact">
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
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-fh__entry">
                <div className="cv-fh__row">
                  <span className="cv-fh__title">{e.position}</span>
                  <span className="cv-fh__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-fh__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2>Focus Areas</h2>
            <div className="cv-fh__focus">
              {skills.map((s) => (
                <span key={s.id} className="cv-fh__focus-item">{s.name}</span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Projects</h2>
            <div className="cv-fh__projects">
              {projects.map((p) => (
                <div key={p.id} className="cv-fh__proj">
                  <p className="cv-fh__proj-name">{p.name}</p>
                  {p.description && <p className="cv-fh__proj-desc">{p.description}</p>}
                  {p.tech && (
                    <p style={{ color: `${accent}CC`, fontSize: "0.74em", marginTop: "1mm" }}>
                      {"// "}{p.tech}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="cv-fh__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-fh__entry">
                  <p className="cv-fh__title" style={{ fontSize: "0.92em" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                  <p className="cv-fh__sub">{e.institution}</p>
                  <p className="cv-fh__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2>Certifications</h2>
              {certifications.map((c) => (
                <p key={c.id} style={{ fontSize: "0.86em", marginBottom: "1.2mm" }}>
                  <span style={{ color: accent }}>✓</span> {c.name}{c.issuer && ` — ${c.issuer}`}
                </p>
              ))}
            </section>
          )}
        </div>

        {languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <div className="cv-fh__tech-grid">
              {languages.map((l) => (
                <div key={l.id} className="cv-fh__tech-item">
                  {l.name}{l.level && <span style={{ color: "#8B8B8B" }}> · {l.level}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
