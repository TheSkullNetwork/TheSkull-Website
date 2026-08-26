const express = require("express");
const router = express.Router();
const store = require("../lib/resourcesStore.js");
const { requireAdmin } = require("../auth.js");

router.get("/api/resources", async (req, res) => {
  try {
    const items = await store.list(req.query.category || undefined);
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/api/admin/resources", requireAdmin, async (req, res) => {
  const { category, subtype, name, url, desc, tag } = req.body || {};
  if (!category || !subtype || !name || !url || !desc) {
    return res.status(400).json({ error: "category, subtype, name, url, and desc are required." });
  }
  const created = await store.add({ category, subtype, name, url, desc, tag: tag || null });
  res.json({ item: created });
});

router.put("/api/admin/resources/:id", requireAdmin, async (req, res) => {
  const updated = await store.update(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ error: "Not found." });
  res.json({ item: updated });
});

router.delete("/api/admin/resources/:id", requireAdmin, async (req, res) => {
  const ok = await store.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "Not found." });
  res.json({ ok: true });
});

module.exports = router;
