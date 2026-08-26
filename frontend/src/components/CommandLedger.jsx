import "../styles/components/CommandLedger.css";
import { categoryLabels, presentCategories, commands } from "../data/commands.js";
import { useCommandFilter } from "../hooks/useCommandFilter.js";

export default function CommandLedger() {
  const { activeCat, setActiveCat, query, setQuery, results } = useCommandFilter();

  return (
    <section className="section" id="commands">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">The Ledger</p>
          <h2>Command reference</h2>
          <p className="section-desc">
            Every command TheSkull answers to, slash and prefix alike — {commands.length} on file.
          </p>
        </div>

        <div className="ledger-controls">
          <div className="search-wrap">
            <input
              type="text"
              placeholder="Search commands…"
              aria-label="Search commands"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-chips" role="group" aria-label="Filter by category">
            <button
              className={`chip${activeCat === "all" ? " active" : ""}`}
              onClick={() => setActiveCat("all")}
            >
              All
            </button>
            {presentCategories.map((c) => (
              <button
                key={c}
                className={`chip${activeCat === c ? " active" : ""}`}
                onClick={() => setActiveCat(c)}
              >
                {categoryLabels[c]}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="ledger-table" role="table" aria-label="Command reference table">
            <div className="ledger-head">
              <span>Command</span><span>Type</span><span>Description</span><span>Category</span>
            </div>
            {results.map((cmd) => (
              <div className="ledger-row" key={cmd.type + cmd.name}>
                <span className="cmd-name">{cmd.type === "slash" ? "/" : "x!"}{cmd.name}</span>
                <span className="cmd-type">{cmd.type}</span>
                <span className="cmd-desc">{cmd.desc}</span>
                <span className="cmd-cat">{categoryLabels[cmd.cat]}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="ledger-empty">No entries match that search.</p>
        )}
      </div>
    </section>
  );
}
