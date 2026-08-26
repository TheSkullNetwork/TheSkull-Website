import { useEffect, useState } from "react";

const INVITE_CODE = "7tSPQjtkhz";
const FALLBACK = { status: "unavailable — join to see", members: null, online: null };
const REFRESH_MS = 90 * 1000;

export function useDiscordStats() {
  const [stats, setStats] = useState({ ...FALLBACK, status: "reading instruments…" });
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setStats(data.discord);
            setCatalog(data.catalog);
          }
          return;
        }
      } catch (err) {
      }

      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(
          `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`,
          { signal: controller.signal }
        );
        clearTimeout(timer);
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (!cancelled) {
          setStats({
            status: "logged",
            members: data.approximate_member_count ?? null,
            online: data.approximate_presence_count ?? null
          });
        }
      } catch (err) {
        if (!cancelled) setStats(FALLBACK);
      }
    }

    load();
    const interval = setInterval(load, REFRESH_MS);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return { stats, catalog };
}
