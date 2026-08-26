import { useParams, useOutletContext } from "react-router-dom";
import "../styles/components/ResourceSection.css";

export default function ResourceSubtypeView() {
  const { subtype } = useParams();
  const { categories, accent } = useOutletContext();
  const category = categories.find((c) => c.slug === subtype) || categories[0];
  const accentVar = accent === "cyber" ? "var(--cyber-accent-bright)" : "var(--dev-accent-bright)";

  if (!category) return null;

  return (
    <div style={{ "--rc-accent": accentVar }}>
      <div className="rc-content-head">
        <h3>{category.label}</h3>
        <p>{category.desc}</p>
      </div>
      <div className="resource-grid">
        {category.items.map((item) => (
          <a
            className="resource-card"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            key={item.name}
          >
            <p className="resource-card-name">{item.name}</p>
            <p className="resource-card-desc">{item.desc}</p>
            {item.tag && <span className="resource-card-tag">{item.tag}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
