import "../styles/components/SystemsGrid.css";
import { systems } from "../data/systems.js";

export default function SystemsGrid() {
  return (
    <section className="section section-alt" id="systems">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Specimen Catalog</p>
          <h2>Systems on record</h2>
          <p className="section-desc">Seven working systems, each accessioned, labeled, and running in production.</p>
        </div>
        <div className="specimen-grid">
          {systems.map((s) => (
            <div className="specimen-card" key={s.id}>
              <p className="specimen-id">{s.id}</p>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
