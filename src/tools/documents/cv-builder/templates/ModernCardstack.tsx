import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 19 — Modern Cardstack
 * Layered card sections · subtle shadows · rounded modules
 * ============================================================ */

export function ModernCardstack({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;
  const showPhoto = settings.photoEnabled && personal.photoDataUrl;

  return (
    <>
      <style>{`
        .cv-mcs { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-mcs__head { padding: 5mm 6mm; background:#FAFAFA; border-radius: 4mm; margin-bottom: 5mm; display: grid; grid-template-columns: auto 1fr; gap: 5mm; align-items: center; border: 1px solid #EAEAEA; }
        .cv-mcs__avatar { width: 24mm; height: 24mm; border-radius: 50%; object-fit: cover; border: 3px solid ${accent}22; }
        .cv-mcs__initials { width: 24mm; height: 24mm; border-radius: 50%; background:${accent}; color:#FFF; display: flex; align-items: center; justify-content: center; font-size: 18pt; font-weight: 800; }
        .cv-mcs__name { font-size: 2em; font-weight: 800; margin: 0; letter-spacing:-0.02em; color:#0F0F0F; line-height:1.05; }
        .cv-mcs__role { font-size: 0.9em; color:${accent}; margin: 1mm 0 0; font-weight: 600; letter-spacing: 0.05em; }
        .cv-mcs__contact { display: flex; flex-wrap: wrap; gap: 1mm 4mm; font-size: 0.78em; color:#4A4A4A; margin-top: 2mm; }
        .cv-mcs__contact span + span::before { content:"·"; margin-right: 4mm; color:#C8C8C8; }
        .cv-mcs section { padding: 4.5mm 5mm; background:#FAFAFA; border-radius: 3mm; border: 1px solid #EAEAEA; margin-bottom: 3.5mm; }
        .cv-mcs h2 { font-size: 0.78em; font-weight: 800; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; display: flex; align-items: center; gap: 2mm; }
        .cv-mcs h2::before { content:""; width: 3px; height: 3mm; background:${accent}; border-radius: 2px; }
        .cv-mcs__entry { margin-bottom: 3mm; }
        .cv-mcs__entry:last-child { margin-bottom: 0; }
        .cv-mcs__row { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
        .cv-mcs__title { font-size: 0.98em; font-weight: 700; color:#0F0F0F; }
        .cv-mcs__date { font-size: 0.74em; color:${accent}; white-space: nowrap; font-weight: 700; padding: 0.3mm 2mm; background: ${accent}12; border-radius: 1mm; }
        .cv-mcs__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.5mm 0 1.2mm; }
        .cv-mcs p { font-size: 0.9em; margin: 0 0 1mm; }
        .cv-mcs ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-mcs li { font-size: 0.86em; margin-bottom: 0.5mm; }
        .cv-mcs__projects { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
        .cv-mcs__proj { padding: 3mm 3.5mm; background:#FFF; border-radius: 2mm; border: 1px solid ${accent}22; border-left: 3px solid ${accent}; }
        .cv-mcs__proj-name { font-weight: 700; font-size: 0.92em; color:#0F0F0F; margin: 0 0 0.5mm; }
        .cv-mcs__proj-role { font-size: 0.76em; color:${accent}; font-weight: 600; margin: 0 0 1mm; }
        .cv-mcs__proj-desc { font-size: 0.82em; color:#4A4A4A; margin: 0; }
        .cv-mcs__skills { display: flex; flex-wrap: wrap; gap: 1.2mm; }
        .cv-mcs__skill { font-size: 0.78em; padding: 1mm 3mm; background:#FFF; border: 1px solid ${accent}33; border-radius: 6mm; color:#0F0F0F; }
        .cv-mcs__2col { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; }
      `}</style>

      <div className="cv-mcs">
        <header className="cv-mcs__head">
          {showPhoto ? (
            <img src={personal.photoDataUrl as string} alt="" className="cv-mcs__avatar" />
          ) : (
            <div className="cv-mcs__initials">
              {personal.fullName ? personal.fullName.split(" ").map(w => w[0]).slice(0,2).join("") : "CV"}
            </div>
          )}
          <div>
            <h1 className="cv-mcs__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-mcs__role">{personal.jobTitle}</p>}
            <div className="cv-mcs__contact">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.website && <span>{personal.website}</span>}
              {personal.linkedin && <span>{personal.linkedin}</span>}
            </div>
          </div>
        </header>

        {summary && (
          <section>
            <h2>About</h2>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-mcs__entry">
                <div className="cv-mcs__row">
                  <span className="cv-mcs__title">{e.position}</span>
                  <span className="cv-mcs__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-mcs__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Projects</h2>
            <div className="cv-mcs__projects">
              {projects.map((p) => (
                <div key={p.id} className="cv-mcs__proj">
                  <p className="cv-mcs__proj-name">{p.name}</p>
                  {p.role && <p className="cv-mcs__proj-role">{p.role}</p>}
                  {p.description && <p className="cv-mcs__proj-desc">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="cv-mcs__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-mcs__entry">
                  <p className="cv-mcs__title" style={{ fontSize: "0.92em" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                  <p className="cv-mcs__sub">{e.institution}</p>
                  <p className="cv-mcs__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2>Skills</h2>
              <div className="cv-mcs__skills">
                {skills.map((s) => <span key={s.id} className="cv-mcs__skill">{s.name}</span>)}
              </div>
            </section>
          )}
        </div>

        {(certifications.length > 0 || languages.length > 0) && (
          <section>
            <h2>Additional</h2>
            {certifications.map((c) => (
              <p key={c.id} style={{ fontSize: "0.88em", marginBottom: "1mm" }}>
                <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
              </p>
            ))}
            {languages.length > 0 && (
              <p style={{ fontSize: "0.88em" }}>
                <strong>Languages:</strong> {languages.map(l => `${l.name} (${l.level})`).join("  ·  ")}
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
