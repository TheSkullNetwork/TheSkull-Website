import { Link, useParams } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/Articles.css";
import { articles } from "../data/articles.js";

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <>
        <PageIntro eyebrow="Articles" title="Not found" desc="That article doesn't exist." />
        <section className="section">
          <div className="wrap">
            <Link className="article-back" to="/articles">← Back to Articles</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro eyebrow={article.tags.join(" · ")} title={article.title} />
      <section className="section">
        <div className="wrap">
          <div className="article-detail-meta">
            <span className="article-date">{article.date}</span>
          </div>
          <div className="article-detail-body">
            {article.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <Link className="article-back" to="/articles">← Back to Articles</Link>
        </div>
      </section>
    </>
  );
}
