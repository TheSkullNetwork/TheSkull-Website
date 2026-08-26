import { Link } from "react-router-dom";
import { Terminal, Code2 } from "lucide-react";
import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/Resources.css";

const hubs = [
  {
    to: "/resources/cybersecurity",
    accent: "cyber",
    icon: Terminal,
    title: "Cybersecurity & Hacking",
    desc: "OSINT, web hacking, network & systems, CTF practice, tools, and careers — six topics, browse by sidebar."
  },
  {
    to: "/resources/developers",
    accent: "dev",
    icon: Code2,
    title: "Developer Resources",
    desc: "Learning platforms, practice sites, dev tooling, and Discord bot dev references."
  }
];

export default function Resources() {
  return (
    <>
      <PageIntro
        eyebrow="Resources"
        title="Pick a track"
        desc="Curated, free-first resources for the two things this community is built around."
      />
      <section className="section">
        <div className="wrap">
          <div className="res-hub-grid">
            {hubs.map((h) => {
              const Icon = h.icon;
              return (
                <Link className={`res-hub-card ${h.accent}`} to={h.to} key={h.to}>
                  <div className="res-hub-card-icon"><Icon size={24} strokeWidth={2.25} /></div>
                  <h3>{h.title}</h3>
                  <p>{h.desc}</p>
                  <span className="res-hub-card-go">Browse →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
