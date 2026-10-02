import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 18 — Career Map
 * Career journey with milestones & achievements
 * ============================================================ */

export function CareerMap({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-cm { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-cm__head { padding-bottom: 4mm; margin-bottom: 6mm; border-bottom: 2px solid ${accent}; display: grid; grid-template-columns: 1fr auto; gap: 5mm; align-items: end; }
        .cv-cm__name { font-size: 2em; font-weight: 800; margin:0; letter-spacing:-0.02em; color:#0F0F0F; line-height:1.05; }
        .cv-cm__role { font-size: 0.9em; color:${accent}; letter-spacing:0.16em; text-transform: uppercase; margin: 1.5mm 0 0; font-weight: 600; }
        .cv-cm__contact { font-size: 0.78em; color:#4A4A4A; text-align: right; line-height: 1.7; }
        .cv-cm h2 { font-size: 0.82em; font-weight: 800; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; }
        .cv-cm section { margin-bottom: ${settings.sectionSpacing * 1.6}mm; }
        .cv-cm__map { position: relative; padding: 5mm 0; }
        .cv-cm__axis { position:absolute; left: 0; right: 0; top: 50%; height: 2px; background: linear-gradient(to right, ${accent}, ${accent}33); }
        .cv-cm__milestones { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: 2mm; position: relative; }
        .cv-cm__mile { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .cv-cm__mile-year { font-size: 1.05em; font-weight: 800; color:${accent}; margin: 0 0 2mm; font-family: 'JetBrains Mono', monospace; }
        .cv-cm__mile-dot { width: 12px; height: 12px; border-radius: 50%; background:${accent}; border: 2.5px solid #FFF; box-shadow: 0 0 0 1.5px ${accent}; margin-bottom: 3mm; }
        .cv-cm__mile-title { font-size: 0.82em; font-weight: 700; color:#0F0F0F; margin: 0 0 0.6mm; line-height:1.25; }
        .cv-cm__mile-sub { font-size: 0.72em; color:#6B6B6B; margin: 0; }
        .cv-cm__entry { margin-bottom: 3mm; padding-left: 4mm; position: relative; }
        .cv-cm__entry::before { content:""; position: absolute; left: 0; top: 1.5mm; bottom: 0; width: 2px; background: ${accent}33; }
        .cv-cm__entry:last-child::before { bottom: auto; height: 3mm; }
        .cv-cm__row { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
        .cv-cm__title { font-size: 1em; font-weight: 700; color:#0F0F0F; }
        .cv-cm__date { font-size: 0.76em; color:${accent}; white-space:nowrap; font-weight: 600; }
        .cv-cm__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.4mm 0 1.2mm; }
        .cv-cm p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-cm ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-cm li { font-size: 0.86em; margin-bottom: 0.5mm; }
        .cv-cm__impact { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2mm; }
        .cv-cm__impact-item { padding: 2.5mm 3mm; background: ${accent}08; border-left: 3px solid ${accent}; font-size: 0.86em; }
        .cv-cm__2col { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
        .cv-cm__skills { display: flex; flex-wrap: wrap; gap: 1.2mm; }
        .cv-cm__skill { font-size: 0.78em; padding: 0.9mm 2.5mm; background:${accent}15; border-radius: 1mm; color:#0F0F0F; }
      `}</style>

      <div className="cv-cm">
        <header className="cv-cm__head">
          <div>
            <h1 className="cv-cm__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-cm__role">{personal.jobTitle}</p>}
          </div>
          <div className="cv-cm__contact">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div>{personal.website}</div>}
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
            <h2>Career Map</h2>
            <div className="cv-cm__map">
              <div className="cv-cm__milestones">
                {experience
                  .slice()
                  .reverse()
                  .map((e) => (
                    <div key={e.id} className="cv-cm__mile">
                      <p className="cv-cm__mile-year">
                        {e.startDate?.split("-")[0] || "—"}
                      </p>
                      <span className="cv-cm__mile-dot" />
                      <p className="cv-cm__mile-title">{e.position}</p>
                      <p className="cv-cm__mile-sub">{e.company}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Core Impact</h2>
            <div className="cv-cm__impact">
              {experience.flatMap((e) => e.bullets.filter(Boolean)).slice(0, 4).map((b, i) => (
                <div key={i} className="cv-cm__impact-item">{b}</div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2>Detailed History</h2>
          {experience.map((e) => (
            <div key={e.id} className="cv-cm__entry">
              <div className="cv-cm__row">
                <span className="cv-cm__title">{e.position}</span>
                <span className="cv-cm__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
              </div>
              <p className="cv-cm__sub">{e.company}{e.location && ` · ${e.location}`}</p>
              {e.bullets.filter(Boolean).length > 0 && (
                <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
              )}
            </div>
          ))}
        </section>

        <div className="cv-cm__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-cm__entry">
                  <p className="cv-cm__title" style={{ fontSize: "0.92em" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                  <p className="cv-cm__sub">{e.institution}</p>
                  <p className="cv-cm__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2>Skills</h2>
              <div className="cv-cm__skills">
                {skills.map((s) => <span key={s.id} className="cv-cm__skill">{s.name}</span>)}
              </div>
            </section>
          )}
        </div>

        {(projects.length > 0 || certifications.length > 0 || languages.length > 0) && (
          <section>
            <h2>Additional</h2>
            {projects.map((p) => (
              <p key={p.id} style={{ fontSize: "0.88em", marginBottom: "1mm" }}>
                <strong>{p.name}</strong>{p.description && ` — ${p.description}`}
              </p>
            ))}
            {certifications.map((c) => (
              <p key={c.id} style={{ fontSize: "0.88em", marginBottom: "1mm" }}>
                <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
              </p>
            ))}
            {languages.length > 0 && (
              <p style={{ fontSize: "0.88em" }}>
                <strong>Languages:</strong> {languages.map(l => `${l.name} (${l.level})`).join(", ")}
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
