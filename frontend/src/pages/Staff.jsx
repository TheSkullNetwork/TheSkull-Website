import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/Staff.css";
import { staff, openRoles } from "../data/staff.js";

export default function Staff() {
  return (
    <>
      <PageIntro eyebrow="The Team" title="Staff" desc="Who keeps The Skull running." />
      <section className="section">
        <div className="wrap">
          {staff.length > 0 ? (
            <div className="staff-grid">
              {staff.map((s) => (
                <div className="staff-card" key={s.name}>
                  <p className="staff-role">{s.role}</p>
                  <p className="staff-name">{s.name}</p>
                  {s.note && <p className="staff-note">{s.note}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="staff-empty">
              Staff list not filled in yet — add entries to src/data/staff.js
            </p>
          )}

          {openRoles.length > 0 && (
            <div className="open-roles">
              <p className="resource-section-title">Open Roles</p>
              <div className="stack-badges">
                {openRoles.map((r) => <span className="badge" key={r}>{r}</span>)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
