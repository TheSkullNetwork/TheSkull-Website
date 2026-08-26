import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useDiscordStats } from "../hooks/useDiscordStats.js";

const INVITE_URL = "https://discord.gg/7tSPQjtkhz";
const ORG_URL = "https://github.com/TheSkullNetwork";

export default function Layout() {
  const { stats, catalog } = useDiscordStats();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>

      <Header inviteUrl={INVITE_URL} />

      <main id="main">
        <Outlet context={{ stats, catalog }} />
      </main>

      <Footer inviteUrl={INVITE_URL} orgUrl={ORG_URL} isSample={!catalog || catalog.sample} />
    </>
  );
}
