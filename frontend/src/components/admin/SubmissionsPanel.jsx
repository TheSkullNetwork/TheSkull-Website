import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config.js";

export default function SubmissionsPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [denyingId, setDenyingId] = useState(null);
  const [reason, setReason] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/submissions?status=pending`, { credentials: "include" });
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function approve(id) {
    setBusyId(id);
    try {
      await fetch(`${BACKEND_URL}/api/admin/submissions/${id}/approve`, { method: "POST", credentials: "include" });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function deny(id) {
    setBusyId(id);
    try {
      await fetch(`${BACKEND_URL}/api/admin/submissions/${id}/deny`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reason || null })
      });
      setDenyingId(null);
      setReason("");
      await load();
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <p className="admin-empty">Loading submissions…</p>;
  if (items.length === 0) return <p className="admin-empty">No pending submissions right now.</p>;

  return (
    <div>
      {items.map((s) => (
        <div className="admin-card" key={s.id}>
          <div className="admin-card-top">
            <div>
              <p className="admin-card-name">{s.name}</p>
              <p className="admin-card-meta">
                {s.category}/{s.subtype} · {s.url}
                {s.submittedBy?.username ? ` · from ${s.submittedBy.username}` : " · anonymous"}
              </p>
            </div>
            <div className="admin-card-actions">
              <button className="admin-btn approve" disabled={busyId === s.id} onClick={() => approve(s.id)}>Approve</button>
              <button className="admin-btn deny" disabled={busyId === s.id} onClick={() => setDenyingId(denyingId === s.id ? null : s.id)}>Deny</button>
            </div>
          </div>
          <p className="admin-card-desc">{s.desc}</p>
          {s.submitterNote && <p className="admin-card-desc"><em>Note: {s.submitterNote}</em></p>}
          {denyingId === s.id && (
            <div className="deny-reason-row">
              <input
                placeholder="Reason (optional, sent to submitter)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <button className="admin-btn deny" disabled={busyId === s.id} onClick={() => deny(s.id)}>Confirm deny</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
