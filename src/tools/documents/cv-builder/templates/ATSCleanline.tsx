import type { CVTemplateProps } from "../types";

/* ============================================================
 * TEMPLATE 01 — ATS Cleanline
 * Single column · standard headings · selectable text
 * Photo rendered only if user enables it (off by default)
 * ============================================================ */

export function ATSCleanline({ data }: CVTemplateProps) {
  const {
    personal, summary, experience, education,
    skills, languages, certifications, projects, settings,
  } = data;

  const fontStack = `'${settings.fontFamily}', system-ui, sans-serif`;
  const showPhoto = settings.photoEnabled && personal.photoDataUrl;

  return (
    <>
      <style>{`
        .cv-ats {
          font-family: ${fontStack};
          font-size: ${settings.fontSize}pt;
          color: #1A1A1A;
          line-height: 1.5;
          background: #FFFFFF;
        }
        .cv-ats__head {
          display: flex;
          align-items: center;
          gap: 1.2em;
          margin-bottom: 1em;
        }
        .cv-ats__photo {
          width: 22mm;
          height: 22mm;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid ${settings.accentColor}33;
          flex-shrink: 0;
        }
        .cv-ats__name {
          font-size: 1.9em;
          font-weight: 700;
          margin: 0 0 0.1em;
          letter-spacing: -0.015em;
          color: #0F0F0F;
        }
        .cv-ats__title {
          font-size: 1em;
          color: #4A4A4A;
          margin: 0;
        }
        .cv-ats__contact {
          font-size: 0.88em;
          color: #4A4A4A;
          margin: 0 0 1.4em;
          padding-bottom: 1em;
          border-bottom: 1px solid ${settings.accentColor}33;
        }
        .cv-ats__contact span + span::before {
          content: "  ·  ";
          color: #B0B0B0;
        }
        .cv-ats section { margin-bottom: ${settings.sectionSpacing * 1.4}mm; }
        .cv-ats section:last-child { margin-bottom: 0; }
        .cv-ats h2 {
          font-size: 0.82em;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${settings.accentColor};
          margin: 0 0 0.6em;
        }
        .cv-ats__block { margin-bottom: 0.9em; }
        .cv-ats__block:last-child { margin-bottom: 0; }
        .cv-ats__row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.6em;
          margin-bottom: 0.12em;
        }
        .cv-ats__pos { font-weight: 600; color: #0F0F0F; }
        .cv-ats__date {
          font-size: 0.85em;
          color: #6B6B6B;
          white-space: nowrap;
        }
        .cv-ats__sub {
          font-size: 0.9em;
          color: #4A4A4A;
          margin-bottom: 0.28em;
        }
        .cv-ats ul { margin: 0.2em 0 0; padding-left: 1.1em; }
        .cv-ats li { margin-bottom: 0.12em; }
        .cv-ats__inline {
          display: flex;
          flex-wrap: wrap;
          gap: 0.2em 0.9em;
        }
        .cv-ats__inline span { color: #1A1A1A; }
      `}</style>

      <div className="cv-ats">
        {/* Header */}
        <header>
          <div className="cv-ats__head">
            {showPhoto && (
              <img
                src={personal.photoDataUrl as string}
                alt=""
                className="cv-ats__photo"
              />
            )}
            <div>
              <h1 className="cv-ats__name">
                {personal.fullName || "Your Name"}
              </h1>
              {personal.jobTitle && (
                <p className="cv-ats__title">{personal.jobTitle}</p>
              )}
            </div>
          </div>
          <p className="cv-ats__contact">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span>{personal.github}</span>}
          </p>
        </header>

        {summary && (
          <section>
            <h2>Professional Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="cv-ats__block">
                <div className="cv-ats__row">
                  <span className="cv-ats__pos">{exp.position}</span>
                  <span className="cv-ats__date">
                    {formatRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div className="cv-ats__sub">
                  {exp.company}
                  {exp.location && ` · ${exp.location}`}
                </div>
                {exp.bullets.length > 0 && (
                  <ul>
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="cv-ats__block">
                <div className="cv-ats__row">
                  <span className="cv-ats__pos">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </span>
                  <span className="cv-ats__date">
                    {formatRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                <div className="cv-ats__sub">
                  {edu.institution}
                  {edu.location && ` · ${edu.location}`}
                </div>
                {edu.description && <p>{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2>Skills</h2>
            <div className="cv-ats__inline">
              {skills.map((s) => (
                <span key={s.id}>{s.name}</span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2>Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="cv-ats__block">
                <div className="cv-ats__row">
                  <span className="cv-ats__pos">{p.name}</span>
                  {p.url && <span className="cv-ats__date">{p.url}</span>}
                </div>
                {p.role && <div className="cv-ats__sub">{p.role}</div>}
                {p.description && <p>{p.description}</p>}
                {p.tech && (
                  <div className="cv-ats__sub" style={{ marginTop: "0.2em" }}>
                    <em>{p.tech}</em>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2>Certifications</h2>
            {certifications.map((c) => (
              <div key={c.id} className="cv-ats__block">
                <div className="cv-ats__row">
                  <span className="cv-ats__pos">{c.name}</span>
                  <span className="cv-ats__date">{c.date}</span>
                </div>
                {c.issuer && <div className="cv-ats__sub">{c.issuer}</div>}
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2>Languages</h2>
            <div className="cv-ats__inline">
              {languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` — ${l.level}`}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(value: string): string {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length < 2) return value;
  const year = parts[0];
  const mi = parseInt(parts[1], 10) - 1;
  if (mi < 0 || mi > 11) return year;
  return `${MONTHS[mi]} ${year}`;
}

function formatRange(start: string, end: string, current: boolean): string {
  const s = formatDate(start);
  if (current) return s ? `${s} – Present` : "Present";
  const e = formatDate(end);
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}
