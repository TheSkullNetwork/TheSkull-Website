import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";
import { BACKEND_URL } from "../app/config.js";
import "../styles/pages/MySubmissions.css";

export default function MySubmissions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/submissions/mine`, { credentials: "include" });
        if (res.status === 401) {
          setError("not_logged_in");
          return;
        }
        if (!res.ok) throw new Error("Something went wrong.");
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        setError(err.message || "Couldn't reach the server.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function formatDate(ts) {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  }

  if (loading) {
    return (
      <>
        <PageIntro eyebrow="Account" title="My submissions" desc="Submissions you've sent in." />
        <section className="section"><div className="wrap"><p className="my-sub-empty">Loading…</p></div></section>
      </>
    );
  }

  if (error === "not_logged_in") {
    return (
      <>
        <PageIntro eyebrow="Account" title="My submissions" desc="Submissions you've sent in." />
        <section className="section">
          <div className="wrap my-sub-auth">
            <p>You need to be logged in to see your submissions.</p>
            <a className="btn btn-seal btn-small" href={`${BACKEND_URL}/auth/discord`}>Log in with Discord</a>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageIntro eyebrow="Account" title="My submissions" desc="Submissions you've sent in." />
        <section className="section"><div className="wrap"><p className="my-sub-error">{error}</p></div></section>
      </>
    );
  }

  return (
    <>
      <PageIntro eyebrow="Account" title="My submissions" desc="Submissions you've sent in." />
      <section className="section">
        <div className="wrap">
          {items.length === 0 ? (
            <div className="my-sub-empty">
              <p>You haven't submitted anything yet.</p>
              <Link to="/submit-resource" className="btn btn-seal btn-small">Submit a resource</Link>
            </div>
          ) : (
            <div className="my-sub-list">
              {items.map((s) => (
                <div className="my-sub-card" key={s.id}>
                  <div className="my-sub-card-top">
                    <div>
                      <p className="my-sub-card-name">{s.name}</p>
                      <p className="my-sub-card-meta">{s.category}/{s.subtype}</p>
                    </div>
                    <span className={`sub-status-badge ${s.status}`}>{s.status}</span>
                  </div>
                  <dl className="my-sub-card-details">
                    <dt>Submitted</dt>
                    <dd>{formatDate(s.submittedAt)}</dd>
                    {s.reviewedAt && (
                      <>
                        <dt>Reviewed</dt>
                        <dd>{formatDate(s.reviewedAt)}</dd>
                      </>
                    )}
                    {s.reason && (
                      <>
                        <dt>Reason</dt>
                        <dd>{s.reason}</dd>
                      </>
                    )}
                  </dl>
                  <p className="my-sub-card-id">
                    ID: <code>{s.id}</code>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
