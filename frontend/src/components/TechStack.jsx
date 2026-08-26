import "../styles/components/TechStack.css";

const stack = ["discord.js v14", "Node.js", "React + Vite", "better-sqlite3", "@napi-rs/canvas", "figlet"];

export default function TechStack({ orgUrl, botRepoUrl }) {
  return (
    <section className="section section-alt" id="specs">
      <div className="wrap specs-grid">
        <div className="section-head">
          <p className="eyebrow">Under the Hood</p>
          <h2>Built from the studs up</h2>
          <p className="section-desc">
            TheSkull's bot runs on discord.js v14 with a SQLite-backed store. This site is
            a separate, componentized React + Vite build — an optional Node backend can
            feed it live numbers straight from that same database.
          </p>
          <div className="stack-badges">
            {stack.map((s) => (
              <span className="badge" key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="repo-card">
          <p className="repo-label">Bot repository</p>
          <p className="repo-name">TheSkull-Bot</p>
          <p className="repo-desc">
            One repo among others under the <strong>TheSkullNetwork</strong> org. Open source,
            every change lands as a pull request — nothing merges straight to main.
          </p>
          <div className="repo-links">
            <a className="btn btn-ghost btn-small" href={botRepoUrl} target="_blank" rel="noopener noreferrer">
              Browse the bot's code ↗
            </a>
            <a className="btn btn-ghost btn-small" href={orgUrl} target="_blank" rel="noopener noreferrer">
              See the org ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
