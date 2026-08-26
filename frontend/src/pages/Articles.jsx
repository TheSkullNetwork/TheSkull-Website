import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/Articles.css";
import { articles } from "../data/articles.js";

export default function Articles() {
  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <PageIntro
        eyebrow="Articles"
        title="Notes & awareness"
        desc="Short reads on security awareness, community updates, and things worth knowing."
      />
      <section className="section">
        <div className="wrap">
          <div className="article-grid">
            {sorted.map((a) => (
              <Link className="article-card" to={`/articles/${a.slug}`} key={a.slug}>
                <span className="article-date">{a.date}</span>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
                <div className="article-tags">
                  {a.tags.map((t) => <span className="article-tag" key={t}>{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
