import "../styles/components/Hero.css";
import SkullArt from "./SkullArt.jsx";

function fmt(n) {
  return n != null ? n.toLocaleString() : "—";
}

export default function Hero({ inviteUrl, orgUrl, stats, catalog }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Accession No. TS—001 · Est. Community Archive</p>
          <h1 className="hero-title">
            A field guide
            <br />
            to <em>The&nbsp;Skull</em>
          </h1>
          <p className="hero-sub">
            A Discord community catalogued like a specimen collection — every system,
            every command, every tool the bot carries, indexed and labeled for the record.
          </p>
          <div className="hero-actions">
            <a className="btn btn-seal" href={inviteUrl} target="_blank" rel="noopener noreferrer">
              Join the Server
            </a>
            <a className="btn btn-ghost" href={orgUrl} target="_blank" rel="noopener noreferrer">
              TheSkullNetwork ↗
            </a>
          </div>

          <dl className="specimen-tag">
            <div className="tag-row">
              <dt>Status</dt>
              <dd>{stats.status}</dd>
            </div>
            <div className="tag-row">
              <dt>Population</dt>
              <dd>{fmt(stats.members)}</dd>
            </div>
            <div className="tag-row">
              <dt>Present now</dt>
              <dd>{fmt(stats.online)}</dd>
            </div>
            {catalog && (
              <>
                <div className="tag-row">
                  <dt>Profiles filed</dt>
                  <dd>{fmt(catalog.profileCount)}</dd>
                </div>
                <div className="tag-row">
                  <dt>Skullboard entries</dt>
                  <dd>{fmt(catalog.skullboardCount)}</dd>
                </div>
              </>
            )}
          </dl>
          <p className="tag-footnote">
            {catalog
              ? catalog.sample
                ? "Backend connected, sample figures — link the bot's database for real counts."
                : "Pulled live from the bot's own database."
              : "Population pulled directly from Discord. Connect the optional backend for more."}
          </p>
        </div>

        <SkullArt />
      </div>
    </section>
  );
}
