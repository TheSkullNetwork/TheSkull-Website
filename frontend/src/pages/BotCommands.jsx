import PageIntro from "../components/PageIntro.jsx";
import SystemsGrid from "../components/SystemsGrid.jsx";
import CommandLedger from "../components/CommandLedger.jsx";
import TechStack from "../components/TechStack.jsx";

const ORG_URL = "https://github.com/TheSkullNetwork";
const BOT_REPO_URL = "https://github.com/TheSkullNetwork/TheSkull-Bot";

export default function BotCommands() {
  return (
    <>
      <PageIntro
        eyebrow="One Part Of This Place"
        title="TheSkull bot"
        desc="The community's custom-built bot — moderation, tickets, profiles, and more. Built specifically for this server, not bolted on from a template."
      />
      <SystemsGrid />
      <CommandLedger />
      <TechStack orgUrl={ORG_URL} botRepoUrl={BOT_REPO_URL} />
    </>
  );
}
