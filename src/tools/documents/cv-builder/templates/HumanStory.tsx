import type { CVTemplateProps } from "../types";
import { formatRange } from "./_shared";

/* ============================================================
 * TEMPLATE 15 — Human Story
 * Warm · narrative profile · people-focused
 * ============================================================ */

export function HumanStory({ data }: CVTemplateProps) {
  const { personal, summary, experience, education, skills, projects, languages, certifications, settings } = data;
  const fontStack = `'${settings.fontFamily}', Georgia, serif`;
  const accent = settings.accentColor;
  const showPhoto = settings.photoEnabled && personal.photoDataUrl;

  return (
    <>
      <style>{`
        .cv-hs { font-family: ${fontStack}; font-size: ${settings.fontSize}pt; color:#2A2A2A; line-height:1.65; background:#FFF; }
        .cv-hs__head { display:grid; grid-template-columns: auto 1fr; gap: 6mm; align-items: center; padding-bottom: 5mm; margin-bottom: 6mm; border-bottom: 2px solid ${accent}33; }
        .cv-hs__avatar { width: 26mm; height: 26mm; border-radius: 50%; object-fit: cover; border: 2px solid ${accent}55; }
        .cv-hs__initials { width: 26mm; height: 26mm; border-radius: 50%; background:${accent}22; color:${accent}; display:flex; align-items:center; justify-content:center; font-size: 20pt; font-weight: 700; }
        .cv-hs__name { font-size: 2em; font-weight: 700; margin:0; letter-spacing:-0.015em; color:#0F0F0F; line-height:1.15; }
        .cv-hs__role { font-size: 0.92em; color:${accent}; margin: 1mm 0 0; font-style: italic; }
        .cv-hs__contact { font-size: 0.8em; color:#6B6B6B; margin-top: 2mm; display: flex; flex-wrap: wrap; gap: 1mm 4mm; }
        .cv-hs h2 { font-size: 0.82em; font-weight: 700; letter-spacing:0.2em; text-transform: uppercase; color:${accent}; margin: 0 0 3mm; }
        .cv-hs section { margin-bottom: ${settings.sectionSpacing * 1.6}mm; }
        .cv-hs__highlight { background: ${accent}0A; padding: 4mm 5mm; border-radius: 2mm; border-left: 4px solid ${accent}; font-size: 1.05em; font-style: italic; }
        .cv-hs__entry { margin-bottom: 4mm; }
        .cv-hs__entry:last-child { margin-bottom: 0; }
        .cv-hs__row { display:flex; justify-content:space-between; align-items:baseline; gap: 3mm; }
        .cv-hs__title { font-size: 1.02em; font-weight: 700; color:#0F0F0F; }
        .cv-hs__date { font-size: 0.78em; color:#8B8B8B; white-space:nowrap; font-style: italic; }
        .cv-hs__sub { font-size: 0.88em; color:${accent}; margin: 0.4mm 0 1.5mm; font-style: italic; }
        .cv-hs p { font-size: 0.92em; margin: 0 0 1.2mm; }
        .cv-hs ul { margin: 1mm 0 0; padding-left: 4mm; list-style: none; }
        .cv-hs li { font-size: 0.88em; padding-left: 4mm; position: relative; margin-bottom: 0.8mm; }
        .cv-hs li::before { content:"◆"; position: absolute; left: 0; color:${accent}; font-size: 0.6em; top: 0.4em; }
        .cv-hs__skills { display:flex; flex-wrap: wrap; gap: 1.2mm 2mm; }
        .cv-hs__skill { font-size: 0.82em; padding: 1mm 3mm; background: ${accent}12; border-radius: 5mm; color:#2A2A2A; }
        .cv-hs__2col { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
      `}</style>

      <div className="cv-hs">
        <header className="cv-hs__head">
          {showPhoto ? (
            <img src={personal.photoDataUrl as string} alt="" className="cv-hs__avatar" />
          ) : (
            <div className="cv-hs__initials">
              {personal.fullName ? personal.fullName.split(" ").map(w => w[0]).slice(0,2).join("") : "CV"}
            </div>
          )}
          <div>
            <h1 className="cv-hs__name">{personal.fullName || "Your Name"}</h1>
            {personal.jobTitle && <p className="cv-hs__role">{personal.jobTitle}</p>}
            <div className="cv-hs__contact">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
              {personal.website && <span>{personal.website}</span>}
            </div>
          </div>
        </header>

        {summary && (
          <section>
            <h2>My Approach</h2>
            <div className="cv-hs__highlight">{summary}</div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Career Highlights</h2>
            {experience.map((e) => (
              <div key={e.id} className="cv-hs__entry">
                <div className="cv-hs__row">
                  <span className="cv-hs__title">{e.position}</span>
                  <span className="cv-hs__date">{formatRange(e.startDate, e.endDate, e.current)}</span>
                </div>
                <p className="cv-hs__sub">{e.company}{e.location && ` · ${e.location}`}</p>
                {e.bullets.filter(Boolean).length > 0 && (
                  <ul>{e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Projects I'm Proud Of</h2>
            {projects.map((p) => (
              <div key={p.id} className="cv-hs__entry">
                <div className="cv-hs__row">
                  <span className="cv-hs__title">{p.name}</span>
                  {p.url && <span className="cv-hs__date">{p.url}</span>}
                </div>
                {p.role && <p className="cv-hs__sub">{p.role}</p>}
                {p.description && <p>{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        <div className="cv-hs__2col">
          {education.length > 0 && (
            <section>
              <h2>Education</h2>
              {education.map((e) => (
                <div key={e.id} className="cv-hs__entry">
                  <p className="cv-hs__title" style={{ fontSize: "0.92em" }}>{e.degree}{e.field && ` · ${e.field}`}</p>
                  <p className="cv-hs__sub">{e.institution}</p>
                  <p className="cv-hs__date">{formatRange(e.startDate, e.endDate, false)}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2>Strengths</h2>
              <div className="cv-hs__skills">
                {skills.map((s) => <span key={s.id} className="cv-hs__skill">{s.name}</span>)}
              </div>
            </section>
          )}
        </div>

        {certifications.length > 0 && (
          <section>
            <h2>Certifications</h2>
            {certifications.map((c) => (
              <p key={c.id} style={{ fontSize: "0.88em", marginBottom: "1mm" }}>
                <strong>{c.name}</strong>{c.issuer && ` — ${c.issuer}`}
              </p>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <p style={{ fontSize: "0.9em" }}>
              {languages.map((l) => `${l.name} (${l.level})`).join("  ·  ")}
            </p>
          </section>
        )}
      </div>
    </>
  );
}
