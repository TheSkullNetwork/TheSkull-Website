const { randomUUID } = require("crypto");
const { db, isConfigured } = require("./firebase.js");
const { cyberCategories } = require("../data/resourcesCyber.js");
const { devCategories } = require("../data/resourcesDev.js");

function flatten() {
  const out = [];
  for (const cat of cyberCategories) {
    for (const item of cat.items) {
      out.push({ id: randomUUID(), category: "cybersecurity", subtype: cat.slug, ...item });
    }
  }
  for (const cat of devCategories) {
    for (const item of cat.items) {
      out.push({ id: randomUUID(), category: "developers", subtype: cat.slug, ...item });
    }
  }
  return out;
}

let memoryStore = flatten();

async function list(category) {
  if (isConfigured()) {
    let query = db.collection("resources");
    if (category) query = query.where("category", "==", category);
    const snap = await query.get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return category ? memoryStore.filter((r) => r.category === category) : memoryStore;
}

async function add(resource) {
  const id = randomUUID();
  const doc = { ...resource, id, createdAt: Date.now() };
  if (isConfigured()) {
    await db.collection("resources").doc(id).set(doc);
    return doc;
  }
  memoryStore.push(doc);
  return doc;
}

async function update(id, patch) {
  if (isConfigured()) {
    await db.collection("resources").doc(id).update(patch);
    const updated = await db.collection("resources").doc(id).get();
    return { id, ...updated.data() };
  }
  const idx = memoryStore.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  memoryStore[idx] = { ...memoryStore[idx], ...patch };
  return memoryStore[idx];
}

async function remove(id) {
  if (isConfigured()) {
    await db.collection("resources").doc(id).delete();
    return true;
  }
  const before = memoryStore.length;
  memoryStore = memoryStore.filter((r) => r.id !== id);
  return memoryStore.length < before;
}

module.exports = { list, add, update, remove };
