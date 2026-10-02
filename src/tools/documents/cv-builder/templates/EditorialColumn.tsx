import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 03 — Editorial Column
 * Magazine-inspired asymmetric layout
 * ============================================================ */

export function EditorialColumn({ data }: CVTemplateProps) {
  const {
    personal, summary, experience, education,
    skills, languages, projects, settings,
  } = data;
  const fontStack = `'${settings.fontFamily}', Georgia, serif`;
  const accent = settings.accentColor;

  return (
    <>
      <style>{`
        .cv-ed { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-ed__head { border-bottom: 2px solid ${accent}; padding-bottom: 4mm; margin-bottom: 5mm; }
        .cv-ed__name { font-size: 2.6em; font-weight: 900; margin:0; letter-spacing:-0.025em; line-height:1; color:${accent}; }
        .cv-ed__role { font-size: 1.05em; font-style: italic; color:#4A4A4A; margin: 1.5mm 0 3mm; }
        .cv-ed__tag { font-size: 0.78em; letter-spacing:0.15em; text-transform: uppercase; color:${accent}; font-weight:700; margin: 0 0 2mm; }
        .cv-ed__cols { display:grid; grid-template-columns: 58% 38%; gap: 4%; }
        .cv-ed__col-left { padding-right: 3mm; border-right: 1px solid ${accent}22; }
        .cv-ed h2 { font-size: 0.82em; font-weight:700; letter-spacing:0.2em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; padding-bottom: 1mm; }
        .cv-ed h2::before { content: "— "; color:${accent}88; }
        .cv-ed section { margin-bottom: ${settings.sectionSpacing * 1.6}mm; }
        .cv-ed__entry { margin-bottom: 3mm; }
        .cv-ed__entry:last-child { margin-bottom: 0; }
        .cv-ed__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-ed__title { font-size: 1em; font-weight:700; color:#0F0F0F; }
        .cv-ed__date { font-size: 0.78em; color:#6B6B6B; font-style: italic; white-space: nowrap; }
        .cv-ed__sub { font-size: 0.9em; color:#4A4A4A; font-style: italic; margin: 0.5mm 0 1.2mm; }
        .cv-ed p { margin: 0 0 1.5mm; font-size: 0.93em; }
        .cv-ed ul { margin: 1mm 0 0; padding-left: 4mm; }
        .cv-ed li { font-size: 0.9em; margin-bottom: 0.6mm; }
        .cv-ed__skills { display:flex; flex-wrap:wrap; gap: 1.5mm; }
        .cv-ed__chip { font-size: 0.8em; padding: 0.8mm 2.5mm; border: 1px solid ${accent}44; border-radius: 2mm; color:#2A2A2A; }
        .cv-ed__foot { border-top: 1px solid ${accent}33; padding-top: 3mm; margin-top: 5mm; font-size: 0.82em; color:#4A4A4A; display:flex; flex-wrap:wrap; gap: 1.5mm 4mm; }
        .cv-ed__foot span + span::before { content: " · "; color:${accent}; }
      `}</style>

      <div className="cv-ed">
        <header className="cv-ed__head">
          <p className="cv-ed__tag">Curriculum Vitae</p>
          <h1 className="cv-ed__name">{personal.fullName || "Your Name"}</h1>
          {personal.jobTitle && <p className="cv-ed__role">{personal.jobTitle}</p>}
        </header>

        <div className="cv-ed__cols">
          {/* LEFT — Profile + Experience */}
          <div className="cv-ed__col-left">
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
                  <div key={e.id} className="cv-ed__entry">
                    <div className="cv-ed__row">
                      <span className="cv-ed__title">{e.position}</span>
                      <span className="cv-ed__date">
                        {formatRange(e.startDate, e.endDate, e.current)}
                      </span>
                    </div>
                    <p className="cv-ed__sub">{e.company}{e.location && ` · ${e.location}`}</p>
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
                  <div key={p.id} className="cv-ed__entry">
                    <div className="cv-ed__row">
                      <span className="cv-ed__title">{p.name}</span>
                      {p.url && <span className="cv-ed__date">{p.url}</span>}
                    </div>
                    {p.role && <p className="cv-ed__sub">{p.role}</p>}
                    {p.description && <p>{p.description}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* RIGHT — Education + Skills + Languages */}
          <div>
            {education.length > 0 && (
              <section>
                <h2>Education</h2>
                {education.map((e) => (
                  <div key={e.id} className="cv-ed__entry">
                    <div className="cv-ed__row">
                      <span className="cv-ed__title">{e.degree}{e.field && ` · ${e.field}`}</span>
                      <span className="cv-ed__date">{formatRange(e.startDate, e.endDate, false)}</span>
                    </div>
                    <p className="cv-ed__sub">{e.institution}</p>
                  </div>
                ))}
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h2>Core Skills</h2>
                <div className="cv-ed__skills">
                  {skills.map((s) => (
                    <span key={s.id} className="cv-ed__chip">{s.name}</span>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h2>Languages</h2>
                {languages.map((l) => (
                  <div key={l.id} className="cv-ed__row" style={{ marginBottom: "1mm" }}>
                    <span style={{ fontSize: "0.9em" }}>{l.name}</span>
                    <span className="cv-ed__date">{l.level}</span>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>

        <footer className="cv-ed__foot">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </footer>
      </div>
    </>
  );
}
