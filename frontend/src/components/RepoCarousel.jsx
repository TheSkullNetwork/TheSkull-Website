import { Star } from "lucide-react";
import "../styles/components/RepoCarousel.css";
import { useGithubRepos } from "../hooks/useGithubRepos.js";

export default function RepoCarousel() {
  const { repos, loading } = useGithubRepos();

  if (!loading && repos.length === 0) {
    return <p className="repo-carousel-empty">Couldn't load repos right now — browse them directly on GitHub instead.</p>;
  }
  if (loading) {
    return <p className="repo-carousel-empty">Loading repositories…</p>;
  }

  const looped = [...repos, ...repos];

  return (
    <div className="repo-carousel">
      <div className="repo-track">
        {looped.map((r, i) => (
          <a className="repo-card" href={r.url} target="_blank" rel="noopener noreferrer" key={r.name + i}>
            <p className="repo-card-name">{r.name}</p>
            <p className="repo-card-desc">{r.desc}</p>
            <div className="repo-card-meta">
              {r.language && <span>{r.language}</span>}
              <span><Star size={12} style={{ verticalAlign: "-2px" }} /> {r.stars}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
