const rateLimit = require("express-rate-limit");

const jsonHandler = (message) => (req, res) => {
  res.status(429).json({ error: message });
};

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: jsonHandler("Too many requests — slow down and try again soon.")
});

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: jsonHandler("Submission limit reached (3 per hour) — try again later.")
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: jsonHandler("Too many login attempts — try again in a few minutes.")
});

module.exports = { generalLimiter, submitLimiter, authLimiter };
