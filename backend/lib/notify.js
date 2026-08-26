
const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || null;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || null;

async function postToWebhook(content) {
  if (!WEBHOOK_URL) {
    console.log("[notify] no DISCORD_WEBHOOK_URL set — skipping channel post");
    return false;
  }
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    return res.ok;
  } catch (err) {
    console.log("[notify] webhook post failed: " + err.message);
    return false;
  }
}

async function sendDM(discordUserId, content) {
  if (!BOT_TOKEN || !discordUserId) {
    console.log("[notify] no DISCORD_BOT_TOKEN or target user id — skipping DM");
    return false;
  }
  try {
    const dmChannelRes = await fetch("https://discord.com/api/v10/users/@me/channels", {
      method: "POST",
      headers: {
        "Authorization": "Bot " + BOT_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipient_id: discordUserId })
    });
    if (!dmChannelRes.ok) throw new Error("could not open DM channel (" + dmChannelRes.status + ")");
    const channel = await dmChannelRes.json();

    const msgRes = await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages`, {
      method: "POST",
      headers: {
        "Authorization": "Bot " + BOT_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
    });
    return msgRes.ok;
  } catch (err) {
    console.log("[notify] DM failed: " + err.message);
    return false;
  }
}

async function notifyDecision({ submission, decision, reason }) {
  const verb = decision === "approved" ? "approved ✅" : "denied ❌";
  const webhookMsg =
    `**Resource ${verb}**\n` +
    `**${submission.name}** (${submission.category}/${submission.subtype})\n` +
    (submission.submittedBy?.username ? `Submitted by: ${submission.submittedBy.username}\n` : "") +
    (reason ? `Reason: ${reason}\n` : "") +
    submission.url;

  const dmMsg =
    `Your resource submission **"${submission.name}"** was ${verb.replace(" ✅", "").replace(" ❌", "")}` +
    (reason ? ` — ${reason}` : ".");

  const [webhookOk, dmOk] = await Promise.all([
    postToWebhook(webhookMsg),
    submission.submittedBy?.id ? sendDM(submission.submittedBy.id, dmMsg) : Promise.resolve(false)
  ]);

  return { webhookOk, dmOk };
}

module.exports = { postToWebhook, sendDM, notifyDecision };
