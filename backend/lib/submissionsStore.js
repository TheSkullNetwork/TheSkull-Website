const { randomUUID } = require("crypto");
const { db, isConfigured } = require("./firebase.js");

let memoryStore = [];

async function list(status) {
  if (isConfigured()) {
    let query = db.collection("submissions");
    if (status) query = query.where("status", "==", status);
    const snap = await query.orderBy("submittedAt", "desc").get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  const rows = status ? memoryStore.filter((s) => s.status === status) : memoryStore;
  return [...rows].sort((a, b) => b.submittedAt - a.submittedAt);
}

async function get(id) {
  if (isConfigured()) {
    const doc = await db.collection("submissions").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }
  return memoryStore.find((s) => s.id === id) || null;
}

async function create(submission) {
  const id = randomUUID();
  const doc = { ...submission, id, status: "pending", submittedAt: Date.now() };
  if (isConfigured()) {
    await db.collection("submissions").doc(id).set(doc);
    return doc;
  }
  memoryStore.push(doc);
  return doc;
}

async function setStatus(id, status, extra = {}) {
  const patch = { status, reviewedAt: Date.now(), ...extra };
  if (isConfigured()) {
    await db.collection("submissions").doc(id).update(patch);
    const updated = await db.collection("submissions").doc(id).get();
    return { id, ...updated.data() };
  }
  const idx = memoryStore.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  memoryStore[idx] = { ...memoryStore[idx], ...patch };
  return memoryStore[idx];
}

module.exports = { list, get, create, setStatus };
