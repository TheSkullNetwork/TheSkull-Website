import { useEffect, useState } from "react";

const ORG = "TheSkullNetwork";

export function useGithubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(`https://api.github.com/orgs/${ORG}/repos?per_page=20&sort=updated`, {
          signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error("github api " + res.status);
        const data = await res.json();
        if (!cancelled) {
          setRepos(
            data
              .filter((r) => !r.fork)
              .map((r) => ({
                name: r.name,
                desc: r.description || "No description yet.",
                url: r.html_url,
                stars: r.stargazers_count,
                language: r.language
              }))
          );
        }
      } catch (err) {
        if (!cancelled) setRepos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { repos, loading };
}
