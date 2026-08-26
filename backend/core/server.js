
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { getLiveCatalogStats, isLive } = require("../data/statsSource.js");
const { router: authRouter, oauthConfigured } = require("./auth.js");
const resourcesRouter = require("../routes/resources.js");
const submissionsRouter = require("../routes/submissions.js");
const { isConfigured: firebaseConfigured } = require("../lib/firebase.js");
const { generalLimiter, submitLimiter, authLimiter } = require("../lib/rateLimit.js");

const app = express();
const PORT = process.env.PORT || 8787;
const INVITE_CODE = process.env.DISCORD_INVITE_CODE || "7tSPQjtkhz";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.set("trust proxy", 1);

app.get("/healthz", (req, res) => {
  res.json({
    ok: true,
    botStatsLive: isLive(),
    firebaseConfigured: firebaseConfigured(),
    oauthConfigured: oauthConfigured()
  });
});

app.use(generalLimiter);
app.use("/auth", authLimiter);
app.use("/api/auth", authLimiter);
app.use("/api/submissions", submitLimiter);

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(resourcesRouter);
app.use(submissionsRouter);

let statsCache = { status: "reading instruments…", members: null, online: null, fetchedAt: 0 };
const STATS_TTL_MS = 60 * 1000;

async function getDiscordStats() {
  const age = Date.now() - statsCache.fetchedAt;
  if (statsCache.fetchedAt && age < STATS_TTL_MS) return statsCache;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!res.ok) throw new Error("discord api " + res.status);
    const data = await res.json();
    statsCache = {
      status: "logged",
      members: data.approximate_member_count ?? null,
      online: data.approximate_presence_count ?? null,
      fetchedAt: Date.now()
    };
  } catch (err) {
    statsCache = { status: "unavailable — join to see", members: null, online: null, fetchedAt: Date.now() };
  }
  return statsCache;
}

app.get("/api/stats", async (req, res) => {
  const discord = await getDiscordStats();
  const catalog = await getLiveCatalogStats();
  res.json({ discord, catalog });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running at http://0.0.0.0:${PORT}`);
  console.log("Bot stats source: " + (isLive() ? "connected via BOT_STATS_URL" : "not configured (sample data)"));
  console.log("Firebase: " + (firebaseConfigured() ? "connected" : "not configured (in-memory storage)"));
  console.log("Discord OAuth: " + (oauthConfigured() ? "configured" : "not configured (admin login disabled)"));
});