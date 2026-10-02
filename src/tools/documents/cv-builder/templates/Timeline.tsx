import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 09 — Timeline
 * Central vertical timeline with milestone markers
 * ============================================================ */

export function Timeline({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-tl { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-tl__head { text-align:center; padding-bottom: 5mm; margin-bottom: 6mm; border-bottom: 1px solid #E5E5E5; }
        .cv-tl__name { font-size: 2em; font-weight: 800; letter-spacing:0.02em; margin:0; color:#0F0F0F; text-transform: uppercase; }
        .cv-tl__role { font-size: 0.86em; color:${accent}; letter-spacing:0.2em; text-transform: uppercase; margin: 2mm 0 3mm; font-weight: 600; }
        .cv-tl__contact { display:flex; flex-wrap:wrap; justify-content:center; gap: 1.5mm 4mm; font-size: 0.8em; color:#6B6B6B; }
        .cv-tl__contact span + span::before { content:"·"; margin-right: 4mm; color:#CCC; }
        .cv-tl h2 { font-size: 0.82em; font-weight:800; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 4mm; text-align: center; }
        .cv-tl section { margin-bottom: ${settings.sectionSpacing * 1.8}mm; }
        .cv-tl__track { position:relative; padding-left: 8mm; }
        .cv-tl__track::before { content:""; position:absolute; left: 4mm; top: 0; bottom: 0; width: 2px; background: ${accent}33; }
        .cv-tl__item { position: relative; margin-bottom: 4mm; padding-left: 3mm; }
        .cv-tl__item:last-child { margin-bottom: 0; }
        .cv-tl__dot { position: absolute; left: -6.5mm; top: 1.5mm; width: 3mm; height: 3mm; background:${accent}; border-radius: 50%; border: 1.5px solid #FFF; box-shadow: 0 0 0 1.5px ${accent}; }
        .cv-tl__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-tl__title { font-size: 1em; font-weight: 700; color:#0F0F0F; }
        .cv-tl__date { font-size: 0.76em; color:${accent}; white-space:nowrap; font-weight: 700; letter-spacing:0.04em; }
        .cv-tl__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.4mm 0 1mm; }
        .cv-tl p { font-size: 0.88em; margin: 0 0 1mm; }
        .cv-tl ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-tl li { font-size: 0.84em; margin-bottom: 0.5mm; }
        .cv-tl__skills { display:flex; flex-wrap:wrap; gap: 1.2mm 2mm; }
        .cv-tl__skill { font-size: 0.78em; padding: 1mm 2.5mm; background: ${accent}10; border: 1px solid ${accent}25; border-radius: 1mm; color:#2A2A2A; }
        .cv-tl__2col { display:grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
      `}</style>

      <div className="cv-tl">
        <header className="cv-tl__head">
          <h1 className="cv-tl__name">{personal.fullName || "Your Name"}</h1>
          {personal.jobTitle && <p className="cv-tl__role">{personal.jobTitle}</p>}
          <div className="cv-tl__contact">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2>Profile</h2>
            <p style={{ textAlign: "center", maxWidth: "80%", margin: "0 auto" }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Career Timeline</h2>
            <div className="cv-tl__track">
              {experience.map((e) => (
                <div key={e.id} className="cv-tl__item">
                  <span className="cv-tl__dot" />
                  <div className="cv-tl__row">
                    <span className="cv-tl__title">{e.position}</span>
                    <span className="cv-tl__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                  </div>
                  <p className="cv-tl__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                  {e.bullets.filter(Boolean).length > 0 && (
                    <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2>Education</h2>
            <div className="cv-tl__track">
              {education.map((e) => (
                <div key={e.id} className="cv-tl__item">
                  <span className="cv-tl__dot" />
                  <div className="cv-tl__row">
                    <span className="cv-tl__title">{e.degree}{e.field && ` · ${e.field}`}</span>
                    <span className="cv-tl__date">{formatRange(e.startDate, e.endDate, false)}</span>
                  </div>
                  <p className="cv-tl__sub">{e.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="cv-tl__2col">
          {skills.length > 0 && (
            <section>
              <h2>Skills</h2>
              <div className="cv-tl__skills">
                {skills.map((s) => <span key={s.id} className="cv-tl__skill">{s.name}</span>)}
              </div>
            </section>
          )}

          {(certifications.length > 0 || languages.length > 0) && (
            <section>
              {certifications.length > 0 && (
                <>
                  <h2>Certifications</h2>
                  {certifications.map((c) => (
                    <p key={c.id} style={{ fontSize: "0.86em", marginBottom: "1mm" }}>
                      <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
                    </p>
                  ))}
                </>
              )}
              {languages.length > 0 && (
                <>
                  <h2 style={{ marginTop: "3mm" }}>Languages</h2>
                  {languages.map((l) => (
                    <p key={l.id} style={{ fontSize: "0.86em", marginBottom: "1mm" }}>
                      <strong>{l.name}</strong>{l.level && ` — ${l.level}`}
                    </p>
                  ))}
                </>
              )}
            </section>
          )}
        </div>

        {projects.length > 0 && (
          <section>
            <h2>Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="cv-tl__item" style={{ paddingLeft: 0 }}>
                <div className="cv-tl__row">
                  <span className="cv-tl__title">{p.name}</span>
                  {p.url && <span className="cv-tl__date">{p.url}</span>}
                </div>
                {p.role && <p className="cv-tl__sub">{p.role}</p>}
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
