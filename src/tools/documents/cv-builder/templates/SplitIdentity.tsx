import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 12 — Split Identity
 * Strong split-screen identity panel
 * ============================================================ */

export function SplitIdentity({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const accent = settings.accentColor;
  const showPhoto = settings.photoEnabled && personal.photoDataUrl;

  return (
    <>
      <style>{`
        .cv-si { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#1A1A1A; line-height:1.5; background:#FFF; }
        .cv-si__grid { display:grid; grid-template-columns: 38% 1fr; gap: 0; min-height: 260mm; margin: -6mm; }
        .cv-si__left { background:${accent}; color:#FFF; padding: 8mm 6mm; }
        .cv-si__right { padding: 8mm 8mm 6mm; }
        .cv-si__photo { width: 32mm; height: 32mm; border-radius: 50%; object-fit: cover; display: block; margin: 0 auto 5mm; border: 3px solid #FFFFFF33; }
        .cv-si__initials { width: 32mm; height: 32mm; border-radius: 50%; background:#FFFFFF22; color:#FFF; display:flex; align-items:center; justify-content:center; font-size: 22pt; font-weight: 800; margin: 0 auto 5mm; }
        .cv-si__name { font-size: 1.9em; font-weight: 800; line-height:1.05; margin:0 0 1mm; letter-spacing:-0.02em; color:#FFF; }
        .cv-si__role { font-size: 0.85em; color:#FFFFFFCC; letter-spacing:0.16em; text-transform: uppercase; margin: 0 0 6mm; font-weight: 500; }
        .cv-si__section { margin-bottom: 6mm; }
        .cv-si__section:last-child { margin-bottom: 0; }
        .cv-si__label { font-size: 0.7em; font-weight:700; letter-spacing:0.2em; text-transform: uppercase; color:#FFFFFFAA; margin: 0 0 2mm; padding-bottom: 1mm; border-bottom: 1px solid #FFFFFF33; }
        .cv-si__info { font-size: 0.85em; color:#FFF; margin: 0 0 1.5mm; word-break: break-word; }
        .cv-si__skill-item { font-size: 0.85em; color:#FFF; margin: 0 0 1.2mm; display: flex; justify-content: space-between; gap: 2mm; }
        .cv-si__right h2 { font-size: 0.82em; font-weight: 800; letter-spacing:0.22em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; padding-bottom: 1.5mm; border-bottom: 1px solid ${accent}33; }
        .cv-si__right section { margin-bottom: ${settings.sectionSpacing * 1.6}mm; }
        .cv-si__entry { margin-bottom: 3mm; }
        .cv-si__entry:last-child { margin-bottom: 0; }
        .cv-si__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-si__title { font-size: 1em; font-weight: 700; color:#0F0F0F; }
        .cv-si__date { font-size: 0.76em; color:#6B6B6B; white-space:nowrap; }
        .cv-si__sub { font-size: 0.86em; color:#4A4A4A; margin: 0.4mm 0 1.2mm; }
        .cv-si p { font-size: 0.9em; margin: 0 0 1.2mm; }
        .cv-si ul { margin: 0.8mm 0 0; padding-left: 4mm; }
        .cv-si li { font-size: 0.86em; margin-bottom: 0.6mm; }
      `}</style>

      <div className="cv-si">
        <div className="cv-si__grid">
          <aside className="cv-si__left">
            {showPhoto ? (
              <img src={personal.photoDataUrl as string} alt="" className="cv-si__photo" />
            ) : (
              <div className="cv-si__initials">
                {personal.fullName ? personal.fullName.split(" ").map(w => w[0]).slice(0,2).join("") : "CV"}
              </div>
            )}
            <h1 className="cv-si__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-si__role">{personal.jobTitle}</p>}

            <div className="cv-si__section">
              <p className="cv-si__label">Contact</p>
              {personal.email && <p className="cv-si__info">{personal.email}</p>}
              {personal.phone && <p className="cv-si__info">{personal.phone}</p>}
              {personal.location && <p className="cv-si__info">{personal.location}</p>}
              {personal.website && <p className="cv-si__info">{personal.website}</p>}
              {personal.linkedin && <p className="cv-si__info">{personal.linkedin}</p>}
              {personal.github && <p className="cv-si__info">{personal.github}</p>}
            </div>

            {skills.length > 0 && (
              <div className="cv-si__section">
                <p className="cv-si__label">Skills</p>
                {skills.map((s) => (
                  <div key={s.id} className="cv-si__skill-item">
                    <span>{s.name}</span>
                    <span style={{ opacity: 0.7 }}>{"●".repeat(s.level || 3)}{"○".repeat(5 - (s.level || 3))}</span>
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div className="cv-si__section">
                <p className="cv-si__label">Languages</p>
                {languages.map((l) => (
                  <p key={l.id} className="cv-si__info">
                    <strong>{l.name}</strong> <span style={{ opacity: 0.75 }}>— {l.level}</span>
                  </p>
                ))}
              </div>
            )}
          </aside>

          <main className="cv-si__right">
            {summary && (
              <section>
                <h2>Profile</h2>
                <p style={{ fontSize: "1em" }}>{summary}</p>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <h2>Experience</h2>
                {experience.map((e) => (
                  <div key={e.id} className="cv-si__entry">
                    <div className="cv-si__row">
                      <span className="cv-si__title">{e.position}</span>
                      <span className="cv-si__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                    </div>
                    <p className="cv-si__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                    {e.bullets.filter(Boolean).length > 0 && (
                      <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2>Education</h2>
                {education.map((e) => (
                  <div key={e.id} className="cv-si__entry">
                    <div className="cv-si__row">
                      <span className="cv-si__title">{e.degree}{e.field && ` · ${e.field}`}</span>
                      <span className="cv-si__date">{formatRange(e.startDate, e.endDate, false)}</span>
                    </div>
                    <p className="cv-si__sub">{e.institution}</p>
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2>Projects</h2>
                {projects.map((p) => (
                  <div key={p.id} className="cv-si__entry">
                    <div className="cv-si__row">
                      <span className="cv-si__title">{p.name}</span>
                      {p.url && <span className="cv-si__date">{p.url}</span>}
                    </div>
                    {p.role && <p className="cv-si__sub">{p.role}</p>}
                    {p.description && <p>{p.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2>Certifications</h2>
                {certifications.map((c) => (
                  <div key={c.id} className="cv-si__row" style={{ marginBottom: "1.2mm" }}>
                    <span style={{ fontSize: "0.9em" }}>{c.name}{c.issuer && ` — ${c.issuer}`}</span>
                    <span className="cv-si__date">{c.date}</span>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
