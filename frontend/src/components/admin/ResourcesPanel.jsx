import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config.js";
import { cyberCategories } from "../../data/resourcesCyber.js";
import { devCategories } from "../../data/resourcesDev.js";

const CATEGORY_OPTIONS = [
  { value: "cybersecurity", label: "Cybersecurity & Hacking", subtypes: cyberCategories },
  { value: "developers", label: "Developer Resources", subtypes: devCategories }
];

const emptyForm = { category: "cybersecurity", subtype: "osint", name: "", url: "", desc: "", tag: "" };

export default function ResourcesPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/resources`, { credentials: "include" });
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setAdding(true);
    try {
      await fetch(`${BACKEND_URL}/api/admin/resources`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setForm(emptyForm);
      await load();
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    setBusyId(id);
    try {
      await fetch(`${BACKEND_URL}/api/admin/resources/${id}`, { method: "DELETE", credentials: "include" });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  const activeCategory = CATEGORY_OPTIONS.find((c) => c.value === form.category);
  const grouped = items.reduce((acc, r) => {
    const key = `${r.category}/${r.subtype}`;
    (acc[key] ||= []).push(r);
    return acc;
  }, {});

  return (
    <div>
      <form className="admin-add-form" onSubmit={handleAdd}>
        <div className="admin-add-form-grid">
          <select value={form.category} onChange={(e) => {
            const cat = CATEGORY_OPTIONS.find((c) => c.value === e.target.value);
            setForm((f) => ({ ...f, category: e.target.value, subtype: cat.subtypes[0].slug }));
          }}>
            {CATEGORY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select value={form.subtype} onChange={(e) => setForm((f) => ({ ...f, subtype: e.target.value }))}>
            {activeCategory.subtypes.map((s) => <option key={s.slug} value={s.slug}>{s.label}</option>)}
          </select>
        </div>
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <input required type="url" placeholder="https://" value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} />
        <textarea required placeholder="Description" value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} />
        <input placeholder="Tag (optional)" value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))} />
        <button className="btn btn-seal btn-small" type="submit" disabled={adding} style={{ justifySelf: "start" }}>
          {adding ? "Adding…" : "Add resource"}
        </button>
      </form>

      {loading ? (
        <p className="admin-empty">Loading resources…</p>
      ) : (
        Object.entries(grouped).map(([key, group]) => (
          <div key={key}>
            <p className="resource-group-title">{key}</p>
            {group.map((r) => (
              <div className="admin-card" key={r.id}>
                <div className="admin-card-top">
                  <div>
                    <p className="admin-card-name">{r.name}</p>
                    <p className="admin-card-meta">{r.url}</p>
                  </div>
                  <div className="admin-card-actions">
                    <button className="admin-btn delete" disabled={busyId === r.id} onClick={() => handleDelete(r.id)}>Delete</button>
                  </div>
                </div>
                <p className="admin-card-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
