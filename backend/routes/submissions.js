const express = require("express");
const router = express.Router();
const submissions = require("../lib/submissionsStore.js");
const resources = require("../lib/resourcesStore.js");
const { requireAdmin } = require("../auth.js");
const { notifyDecision } = require("../lib/notify.js");
const jwt = require("jsonwebtoken");

const COOKIE_NAME = "skull_session";

function currentUser(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

router.post("/api/submissions", async (req, res) => {
  const { category, subtype, name, url, desc, tag, submitterNote } = req.body || {};

  if (!category || !subtype || !name || !url || !desc) {
    return res.status(400).json({ error: "category, subtype, name, url, and desc are required." });
  }
  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ error: "url must start with http:// or https://" });
  }
  if (name.length > 100 || desc.length > 500) {
    return res.status(400).json({ error: "name or description is too long." });
  }
  const tooLong =
    String(url).length > 500 ||
    String(category).length > 50 ||
    String(subtype).length > 50 ||
    String(tag || "").length > 40 ||
    String(submitterNote || "").length > 500;
  if (tooLong) {
    return res.status(400).json({ error: "One or more fields are too long." });
  }

  const user = currentUser(req);
  const created = await submissions.create({
    category, subtype, name, url, desc, tag: tag || null,
    submitterNote: submitterNote || null,
    submittedBy: user ? { id: user.id, username: user.username } : null
  });

  res.json({ submission: created });
});

router.get("/api/admin/submissions", requireAdmin, async (req, res) => {
  const items = await submissions.list(req.query.status || undefined);
  res.json({ items });
});

router.post("/api/admin/submissions/:id/approve", requireAdmin, async (req, res) => {
  const submission = await submissions.get(req.params.id);
  if (!submission) return res.status(404).json({ error: "Not found." });

  await resources.add({
    category: submission.category,
    subtype: submission.subtype,
    name: submission.name,
    url: submission.url,
    desc: submission.desc,
    tag: submission.tag
  });

  const updated = await submissions.setStatus(submission.id, "approved", { reviewedBy: req.user.username });
  const notified = await notifyDecision({ submission, decision: "approved" });

  res.json({ submission: updated, notified });
});

router.post("/api/admin/submissions/:id/deny", requireAdmin, async (req, res) => {
  const submission = await submissions.get(req.params.id);
  if (!submission) return res.status(404).json({ error: "Not found." });

  const reason = req.body?.reason || null;
  const updated = await submissions.setStatus(submission.id, "denied", { reviewedBy: req.user.username, reason });
  const notified = await notifyDecision({ submission, decision: "denied", reason });

  res.json({ submission: updated, notified });
});

module.exports = router;
