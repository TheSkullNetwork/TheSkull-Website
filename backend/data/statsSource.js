
const STATS_URL = process.env.BOT_STATS_URL || null;

let cache = { fetchedAt: 0, data: null };
const TTL_MS = 60 * 1000;

async function getLiveCatalogStats() {
  if (!STATS_URL) {
    return { live: false, profileCount: 128, skullboardCount: 47, sample: true };
  }

  const age = Date.now() - cache.fetchedAt;
  if (cache.data && age < TTL_MS) return cache.data;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(STATS_URL, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error("bot stats endpoint " + res.status);
    const json = await res.json();

    cache = {
      fetchedAt: Date.now(),
      data: {
        live: true,
        profileCount: json.profileCount ?? 128,
        skullboardCount: json.skullboardCount ?? 47,
        sample: false
      }
    };
    return cache.data;
  } catch (err) {
    console.error("[stats] Failed to fetch bot stats:", err.message);
    return { live: false, profileCount: 128, skullboardCount: 47, sample: true };
  }
}

module.exports = { getLiveCatalogStats, isLive: () => Boolean(STATS_URL) };

