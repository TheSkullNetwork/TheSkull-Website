import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/components/ResourceCategoryLayout.css";
import { ICONS } from "../lib/icons.js";

export default function ResourceCategoryLayout({ title, desc, accent, basePath, categories }) {
  const accentVar = accent === "cyber" ? "var(--cyber-accent)" : "var(--dev-accent)";
  const [query, setQuery] = useState("");

  return (
    <div className="rc-layout">
      <section className={`rc-hero ${accent}`}>
        <div className="wrap">
          <p className={`eyebrow ${accent}`}>Resources</p>
          <h2>{title}</h2>
          <p className="section-desc">{desc}</p>
        </div>
      </section>

      <section className="wrap">
        <div className="rc-search-row">
          <input
            className="rc-search"
            type="search"
            placeholder="Search resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search resources"
          />
        </div>

        <div className="rc-body">
          <nav className="rc-sidebar" aria-label={`${title} categories`} style={{ "--sidebar-accent": accentVar }}>
            {categories.map((c) => {
              const Icon = ICONS[c.icon];
              return (
                <NavLink
                  key={c.slug}
                  to={`${basePath}/${c.slug}`}
                  className={({ isActive }) => `rc-sidebar-link${isActive ? " active" : ""}`}
                >
                  {Icon && <Icon size={17} strokeWidth={2.25} />}
                  {c.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="rc-content">
            <Outlet context={{ categories, accent, query }} />
          </div>
        </div>
      </section>
    </div>
  );
}
