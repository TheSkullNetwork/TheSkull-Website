import { useMemo, useState } from "react";
import { commands } from "../data/commands.js";

export function useCommandFilter() {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return commands.filter((cmd) => {
      const matchesCat = activeCat === "all" || cmd.cat === activeCat;
      const matchesQuery = !q || cmd.name.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCat, query]);

  return { activeCat, setActiveCat, query, setQuery, results };
}
