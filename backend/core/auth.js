const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URI,
  FRONTEND_URL,
  ADMIN_DISCORD_IDS,
  JWT_SECRET
} = process.env;

const COOKIE_NAME = "skull_session";
const adminIds = (ADMIN_DISCORD_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);

function oauthConfigured() {
  return Boolean(DISCORD_CLIENT_ID && DISCORD_CLIENT_SECRET && DISCORD_REDIRECT_URI && JWT_SECRET);
}

router.get("/auth/discord", (req, res) => {
  if (!oauthConfigured()) {
    return res.status(500).send("Discord OAuth isn't configured on this server yet (missing env vars).");
  }
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify"
  });
  res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
});

router.get("/auth/discord/callback", async (req, res) => {
  if (!oauthConfigured()) {
    return res.status(500).send("Discord OAuth isn't configured on this server yet (missing env vars).");
  }
  const { code } = req.query;
  if (!code) return res.status(400).send("Missing code.");

  try {
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: DISCORD_REDIRECT_URI
      })
    });
    if (!tokenRes.ok) throw new Error("token exchange failed (" + tokenRes.status + ")");
    const tokenData = await tokenRes.json();

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    if (!userRes.ok) throw new Error("fetching user failed (" + userRes.status + ")");
    const discordUser = await userRes.json();

    const isAdmin = adminIds.includes(discordUser.id);
    const session = jwt.sign(
      { id: discordUser.id, username: discordUser.username, avatar: discordUser.avatar, isAdmin },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie(COOKIE_NAME, session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.redirect((FRONTEND_URL || "http://localhost:5173") + "/admin");
  } catch (err) {
    console.log("[auth] OAuth callback failed: " + err.message);
    res.status(500).send("Login failed: " + err.message);
  }
});

router.get("/api/auth/me", (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.json({ loggedIn: false });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

router.post("/api/auth/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
});

function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Not logged in." });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    if (!user.isAdmin) return res.status(403).json({ error: "Not an admin." });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid session." });
  }
}

function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: "Not logged in." });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid session." });
  }
}

module.exports = { router, requireAdmin, requireAuth, oauthConfigured };
