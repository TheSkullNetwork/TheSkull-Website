import { useEffect, useState } from "react";
import { BACKEND_URL } from "../app/config.js";

export function useLiveResources(categoryKey, staticCategories) {
  const [categories, setCategories] = useState(staticCategories);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${BACKEND_URL}/api/resources?category=${categoryKey}`, {
          signal: controller.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (cancelled) return;

        const bySubtype = {};
        for (const item of data.items || []) {
          (bySubtype[item.subtype] ||= []).push(item);
        }

        const merged = staticCategories.map((cat) => ({
          ...cat,
          items: bySubtype[cat.slug] && bySubtype[cat.slug].length > 0 ? bySubtype[cat.slug] : cat.items
        }));

        setCategories(merged);
      } catch (err) {
        if (!cancelled) setCategories(staticCategories);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [categoryKey, staticCategories]);

  return categories;
}
