import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 13 — Minimal Signature
 * Luxury minimalist · script accent · whitespace
 * ============================================================ */

export function MinimalSignature({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', Georgia, serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-ms { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#2A2A2A; line-height:1.6; background:#FFF; }
        .cv-ms__head { padding: 10mm 0 8mm; margin-bottom: 8mm; text-align: center; }
        .cv-ms__name { font-family: 'Dancing Script', 'Georgia', cursive; font-size: 3em; font-weight: 700; margin: 0; letter-spacing: -0.02em; color:${accent}; line-height: 1; }
        .cv-ms__name-fallback { font-size: 2.2em; font-weight: 400; letter-spacing: 0.16em; text-transform: uppercase; margin: 0; color:${accent}; }
        .cv-ms__rule { width: 20mm; height: 1px; background:${accent}66; margin: 4mm auto; }
        .cv-ms__role { font-size: 0.85em; color:#6B6B6B; letter-spacing: 0.24em; text-transform: uppercase; margin: 0; font-weight: 500; }
        .cv-ms__contact { display:flex; flex-wrap:wrap; justify-content:center; gap: 1mm 4mm; font-size: 0.82em; color:#8B8B8B; margin-top: 5mm; }
        .cv-ms__contact span + span::before { content:"—"; margin-right: 4mm; color:${accent}66; }
        .cv-ms section { margin-bottom: ${settings.sectionSpacing * 2}mm; padding-bottom: ${settings.sectionSpacing * 1}mm; }
        .cv-ms h2 { font-size: 0.76em; font-weight: 500; letter-spacing: 0.36em; text-transform: uppercase; color:${accent}; margin: 0 0 4mm; text-align: center; }
        .cv-ms__entry { margin-bottom: 4mm; padding-bottom: 4mm; border-bottom: 1px solid #F0F0F0; }
        .cv-ms__entry:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .cv-ms__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-ms__title { font-size: 1em; font-weight: 600; color:#0F0F0F; letter-spacing: 0.02em; }
        .cv-ms__date { font-size: 0.78em; color:#B0B0B0; white-space:nowrap; font-style: italic; }
        .cv-ms__sub { font-size: 0.86em; color:${accent}; margin: 0.4mm 0 1.5mm; font-style: italic; }
        .cv-ms p { font-size: 0.9em; margin: 0 0 1.2mm; color:#3A3A3A; }
        .cv-ms ul { margin: 1mm 0 0; padding-left: 4mm; }
        .cv-ms li { font-size: 0.86em; margin-bottom: 0.6mm; color:#3A3A3A; }
        .cv-ms__skills { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5mm 4mm; }
        .cv-ms__skill { font-size: 0.85em; color:#3A3A3A; }
        .cv-ms__skill + .cv-ms__skill::before { content:"·"; margin-right: 4mm; color:${accent}66; }
        .cv-ms__centered { text-align: center; max-width: 85%; margin: 0 auto; }
      `}</style>

      <div className="cv-ms">
        <header className="cv-ms__head">
          {personal.fullName ? (
            <h1 className="cv-ms__name">{personal.fullName}</h1>
          ) : (
            <h1 className="cv-ms__name-fallback">Your Name</h1>
          )}
          <div className="cv-ms__rule" />
          {personal.jobTitle && <p className="cv-ms__role">{personal.jobTitle}</p>}
          <div className="cv-ms__contact">
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
            <p className="cv-ms__centered">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-ms__entry">
                <div className="cv-ms__row">
                  <span className="cv-ms__title">{e.position}</span>
                  <span className="cv-ms__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-ms__sub">{e.company}{e.location && ` · ${e.location}`}</p>
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
              <div key={p.id} className="cv-ms__entry">
                <div className="cv-ms__row">
                  <span className="cv-ms__title">{p.name}</span>
                  {p.url && <span className="cv-ms__date">{p.url}</span>}
                </div>
                {p.role && <p className="cv-ms__sub">{p.role}</p>}
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2>Education</h2>
            {education.map((e) => (
              <div key={e.id} className="cv-ms__entry">
                <div className="cv-ms__row">
                  <span className="cv-ms__title">{e.degree}{e.field && ` · ${e.field}`}</span>
                  <span className="cv-ms__date">{formatRange(e.startDate, e.endDate, false)}</span>
                </div>
                <p className="cv-ms__sub">{e.institution}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2>Skills</h2>
            <div className="cv-ms__skills">
              {skills.map((s) => <span key={s.id} className="cv-ms__skill">{s.name}</span>)}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2>Certifications</h2>
            <div className="cv-ms__centered">
              {certifications.map((c) => (
                <p key={c.id} style={{ fontSize: "0.9em" }}>
                  <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
                </p>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <div className="cv-ms__skills">
              {languages.map((l) => (
                <span key={l.id} className="cv-ms__skill">
                  {l.name}{l.level && ` (${l.level})`}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
