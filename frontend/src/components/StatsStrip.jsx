import "../styles/components/StatsStrip.css";
import { systems } from "../data/systems.js";
import { commands } from "../data/commands.js";
import { cyberCategories } from "../data/resourcesCyber.js";
import { devCategories } from "../data/resourcesDev.js";

function countItems(categories) {
  return categories.reduce((sum, c) => sum + c.items.length, 0);
}

const totalResources = countItems(cyberCategories) + countItems(devCategories);

const stats = [
  { num: commands.length, label: "Bot Commands" },
  { num: systems.length, label: "Bot Systems" },
  { num: totalResources, label: "Curated Resources" },
  { num: cyberCategories.length + devCategories.length, label: "Resource Topics" }
];

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      {stats.map((s) => (
        <div className="stat-cell" key={s.label}>
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
