import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 08 — Data Pulse
 * Dashboard-inspired · metric cards
 * ============================================================ */

export function DataPulse({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;

  const totalYears = experience.length;
  const totalProjects = projects.length;
  const totalSkills = skills.length;

  return (
    <>
      <style>{`
        .cv-dp { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.45; background:#FFF; }
        .cv-dp__head { background:#0F0F0F; color:#FFF; padding: 6mm 7mm; margin: -6mm -6mm 5mm; }
        .cv-dp__head-row { display:flex; justify-content:space-between; align-items:flex-end; gap: 4mm; }
        .cv-dp__name { font-size: 2em; font-weight:800; margin:0; letter-spacing:-0.02em; color:#FFF; line-height:1.05; }
        .cv-dp__role { font-size: 0.9em; color:${accent}; letter-spacing: 0.15em; text-transform: uppercase; margin: 1mm 0 0; font-weight:600; }
        .cv-dp__meta { font-size: 0.78em; color:#B8B8B8; text-align:right; line-height: 1.7; font-family: 'JetBrains Mono', monospace; }
        .cv-dp__metrics { display:grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-bottom: 6mm; }
        .cv-dp__metric { border: 1px solid ${accent}33; border-radius: 2mm; padding: 3mm 4mm; background: ${accent}08; }
        .cv-dp__metric-num { font-size: 1.6em; font-weight: 800; color:${accent}; line-height: 1; margin: 0; font-family: 'JetBrains Mono', monospace; }
        .cv-dp__metric-label { font-size: 0.68em; letter-spacing: 0.15em; text-transform: uppercase; color:#6B6B6B; margin: 1mm 0 0; font-weight: 600; }
        .cv-dp h2 { font-size: 0.78em; font-weight:800; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; padding-bottom: 1.5mm; border-bottom: 1px solid ${accent}33; }
        .cv-dp section { margin-bottom: ${settings.sectionSpacing * 1.5}mm; }
        .cv-dp__entry { margin-bottom: 3mm; padding-left: 4mm; position: relative; }
        .cv-dp__entry::before { content:""; position:absolute; left:0; top: 1mm; width: 2px; height: calc(100% - 2mm); background: ${accent}44; }
        .cv-dp__entry:last-child { margin-bottom: 0; }
        .cv-dp__row { display:flex; justify-content:space-between; align-items:baseline; gap: 2mm; }
        .cv-dp__title { font-size: 0.98em; font-weight:700; color:#0F0F0F; }
        .cv-dp__date { font-size: 0.74em; color:#8B8B8B; white-space:nowrap; font-family: 'JetBrains Mono', monospace; }
        .cv-dp__sub { font-size: 0.85em; color:#4A4A4A; margin: 0.4mm 0 1mm; }
        .cv-dp p { font-size: 0.88em; margin: 0 0 1mm; }
        .cv-dp ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-dp li { font-size: 0.84em; margin-bottom: 0.5mm; }
        .cv-dp__bar { display:flex; align-items:center; gap: 2mm; font-size: 0.82em; margin-bottom: 1.2mm; }
        .cv-dp__bar-label { width: 32mm; font-weight: 500; }
        .cv-dp__bar-track { flex: 1; height: 4px; background: #E5E5E5; border-radius: 2px; overflow: hidden; }
        .cv-dp__bar-fill { height: 100%; background: ${accent}; border-radius: 2px; }
        .cv-dp__2col { display:grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
      `}</style>

      <div className="cv-dp">
        <header className="cv-dp__head">
          <div className="cv-dp__head-row">
            <div>
              <h1 className="cv-dp__name">{personal.fullName || "Your Name"}</h1>
              {personal.jobTitle && <p className="cv-dp__role">{personal.jobTitle}</p>}
            </div>
            <div className="cv-dp__meta">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location}</div>}
              {personal.website && <div>{personal.website}</div>}
            </div>
          </div>
        </header>

        <div className="cv-dp__metrics">
          <div className="cv-dp__metric">
            <p className="cv-dp__metric-num">{totalYears}</p>
            <p className="cv-dp__metric-label">Roles</p>
          </div>
          <div className="cv-dp__metric">
            <p className="cv-dp__metric-num">{totalProjects}</p>
            <p className="cv-dp__metric-label">Projects</p>
          </div>
          <div className="cv-dp__metric">
            <p className="cv-dp__metric-num">{totalSkills}</p>
            <p className="cv-dp__metric-label">Skills</p>
          </div>
        </div>

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
              <div key={e.id} className="cv-dp__entry">
                <div className="cv-dp__row">
                  <span className="cv-dp__title">{e.position}</span>
                  <span className="cv-dp__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-dp__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2>Skills</h2>
            <div>
              {skills.map((s) => (
                <div key={s.id} className="cv-dp__bar">
                  <span className="cv-dp__bar-label">{s.name}</span>
                  <div className="cv-dp__bar-track">
                    <div className="cv-dp__bar-fill" style={{ width: `${(s.level || 3) * 20}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="cv-dp__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-dp__entry">
                  <p className="cv-dp__title" style={{ fontSize: "0.92em" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                  <p className="cv-dp__sub">{e.institution}</p>
                  <p className="cv-dp__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2>Projects</h2>
              {projects.map((p) => (
                <div key={p.id} className="cv-dp__entry">
                  <p className="cv-dp__title" style={{ fontSize: "0.92em" }}>{p.name}</p>
                  {p.description && <p style={{ fontSize: "0.84em" }}>{p.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        {certifications.length > 0 && (
          <section>
            <h2>Certifications</h2>
            {certifications.map((c) => (
              <div key={c.id} className="cv-dp__row" style={{ marginBottom: "1mm" }}>
                <span style={{ fontSize: "0.88em" }}>{c.name}{c.issuer && ` — ${c.issuer}`}</span>
                <span className="cv-dp__date">{c.date}</span>
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1mm 5mm" }}>
              {languages.map((l) => (
                <span key={l.id} style={{ fontSize: "0.88em" }}>
                  <strong>{l.name}</strong> — {l.level}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
