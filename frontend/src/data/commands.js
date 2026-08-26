export const commands = [
  { name: "ascii", type: "slash", cat: "fun", desc: "Render text as large ASCII art." },
  { name: "base64", type: "slash", cat: "fun", desc: "Encode or decode a base64 string." },
  { name: "calc", type: "slash", cat: "fun", desc: "Evaluate a math expression." },
  { name: "hex", type: "slash", cat: "fun", desc: "Convert between hex and text." },
  { name: "help", type: "slash", cat: "misc", desc: "Lists every command, built live from the source." },
  { name: "setup-ticket", type: "slash", cat: "misc", desc: "Post the ticket-creation panel in a channel." },
  { name: "check-warn", type: "slash", cat: "moderation", desc: "View a member's warning history." },
  { name: "kick", type: "slash", cat: "moderation", desc: "Remove a member from the server." },
  { name: "notice", type: "slash", cat: "moderation", desc: "Send a formal notice to a member." },
  { name: "purge", type: "slash", cat: "moderation", desc: "Bulk-delete recent messages in a channel." },
  { name: "remove-warn", type: "slash", cat: "moderation", desc: "Delete a specific warning from a member's record." },
  { name: "timeout", type: "slash", cat: "moderation", desc: "Temporarily mute a member." },
  { name: "warn", type: "slash", cat: "moderation", desc: "Issue a warning; the member is notified by DM." },
  { name: "profile", type: "slash", cat: "profile", desc: "View a member's profile card." },
  { name: "edit-profile", type: "slash", cat: "profile", desc: "Edit your own bio, links, and details." },
  { name: "approve", type: "slash", cat: "suggestion", desc: "Approve a pending suggestion." },
  { name: "deny-suggestion", type: "slash", cat: "suggestion", desc: "Deny a pending suggestion." },
  { name: "reset-suggestions", type: "slash", cat: "suggestion", desc: "Wipe all suggestions and reset numbering. Staff only, requires confirmation." },
  { name: "setup-info", type: "slash", cat: "suggestion", desc: "Configure the suggestions channel." },
  { name: "suggest", type: "slash", cat: "suggestion", desc: "Submit a new suggestion for the community to vote on." },
  { name: "avatar", type: "slash", cat: "utility", desc: "Show a member's avatar at full size." },
  { name: "ping", type: "slash", cat: "utility", desc: "Check the bot's latency." },
  { name: "repo-info", type: "slash", cat: "utility", desc: "Show details about the bot's GitHub repository." },
  { name: "server-info", type: "slash", cat: "utility", desc: "Show stats and details about the server." },
  { name: "user-info", type: "slash", cat: "utility", desc: "Show details about a member." },
  { name: "say", type: "prefix", cat: "admin", desc: "Make the bot repeat a message. Staff only." },
  { name: "react", type: "prefix", cat: "admin", desc: "Force the bot to react to a message. Staff only." },
  { name: "reload", type: "prefix", cat: "admin", desc: "Hot-reload commands without restarting the bot." },
  { name: "afk", type: "prefix", cat: "misc", desc: "Mark yourself AFK with a reason." }
];

export const categoryLabels = {
  moderation: "Moderation", suggestion: "Suggestions", profile: "Profile",
  utility: "Utility", fun: "Fun", misc: "Misc", admin: "Admin"
};

const categoryOrder = ["moderation", "suggestion", "profile", "utility", "fun", "misc", "admin"];
export const presentCategories = categoryOrder.filter((c) => commands.some((cmd) => cmd.cat === c));
