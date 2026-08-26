import { Link, useOutletContext } from "react-router-dom";
import { Users, MapPin, ShieldCheck, Terminal, Code2, Bot } from "lucide-react";
import "../styles/pages/Home.css";
import Hero from "../components/Hero.jsx";
import Cta from "../components/Cta.jsx";
import StatsStrip from "../components/StatsStrip.jsx";
import RepoCarousel from "../components/RepoCarousel.jsx";

const ORG_URL = "https://github.com/TheSkullNetwork";
const INVITE_URL = "https://discord.gg/7tSPQjtkhz";

const overview = [
  {
    to: "/about", icon: Users, title: "About the community",
    desc: "What The Skull is, what it's for, and who it's for.",
    accent: "var(--gradient-brand)", accentSolid: "var(--accent-violet)"
  },
  {
    to: "/server-info", icon: MapPin, title: "Server info",
    desc: "Rules, channel layout, and how to get involved.",
    accent: "var(--gradient-brand)", accentSolid: "var(--accent-violet)"
  },
  {
    to: "/staff", icon: ShieldCheck, title: "Staff",
    desc: "Who keeps the place running.",
    accent: "var(--gradient-brand)", accentSolid: "var(--accent-violet)"
  },
  {
    to: "/resources/cybersecurity", icon: Terminal, title: "Cybersecurity & hacking",
    desc: "OSINT, web hacking, CTF practice, tools, and more — browse by topic.",
    accent: "var(--gradient-cyber)", accentSolid: "var(--cyber-accent)"
  },
  {
    to: "/resources/developers", icon: Code2, title: "Developer resources",
    desc: "Learning platforms, practice sites, and dev tooling — browse by topic.",
    accent: "var(--gradient-dev)", accentSolid: "var(--dev-accent)"
  },
  {
    to: "/bot", icon: Bot, title: "TheSkull bot",
    desc: "Moderation, tickets, profiles, and the full command reference.",
    accent: "var(--gradient-brand)", accentSolid: "var(--accent-violet)"
  }
];

export default function Home() {
  const { stats, catalog } = useOutletContext();

  return (
    <>
      <Hero inviteUrl={INVITE_URL} orgUrl={ORG_URL} stats={stats} catalog={catalog} />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">By The Numbers</p>
            <h2>What's actually in here</h2>
          </div>
          <StatsStrip />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">From The Org</p>
            <h2>Repositories</h2>
            <p className="section-desc">Live from TheSkullNetwork on GitHub. Hover to pause, click to open.</p>
          </div>
          <RepoCarousel />
        </div>
      </section>

      <section className="section" id="explore">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Start Here</p>
            <h2>Explore the collection</h2>
            <p className="section-desc">The Skull is more than a bot — pick a card to open.</p>
          </div>
          <div className="overview-grid">
            {overview.map((o) => {
              const Icon = o.icon;
              return (
                <Link
                  className="overview-card"
                  to={o.to}
                  key={o.to}
                  style={{ "--card-accent": o.accent, "--card-accent-solid": o.accentSolid }}
                >
                  <div className="overview-card-icon"><Icon size={22} strokeWidth={2.25} /></div>
                  <h3>{o.title}</h3>
                  <p>{o.desc}</p>
                  <span className="overview-card-go">View →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Cta inviteUrl={INVITE_URL} />
    </>
  );
}
