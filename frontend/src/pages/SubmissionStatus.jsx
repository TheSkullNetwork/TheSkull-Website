import { useState } from "react";
import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro.jsx";
import { BACKEND_URL } from "../app/config.js";
import "../styles/pages/SubmissionStatus.css";

export default function SubmissionStatus() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLookup(e) {
    e.preventDefault();
    if (!id.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/submissions/${id.trim()}/status`);
      if (res.status === 404) throw new Error("No submission found with that ID.");
      if (!res.ok) throw new Error("Something went wrong.");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(ts) {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  }

  return (
    <>
      <PageIntro
        eyebrow="Track"
        title="Check submission status"
        desc="Enter the submission ID from your confirmation to see where it's at."
      />
      <section className="section">
        <div className="wrap sub-status-layout">
          <form className="sub-status-form" onSubmit={handleLookup}>
            <label htmlFor="sub-id">Submission ID</label>
            <div className="sub-status-input-row">
              <input
                id="sub-id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="e.g. a1b2c3d4-e5f6-..."
                required
              />
              <button className="btn btn-seal btn-small" type="submit" disabled={loading}>
                {loading ? "Looking up..." : "Check"}
              </button>
            </div>
          </form>

          {error && <div className="sub-status-error">{error}</div>}

          {result && (
            <div className="sub-status-card">
              <div className="sub-status-header">
                <h3>{result.name}</h3>
                <span className={`sub-status-badge ${result.status}`}>{result.status}</span>
              </div>
              <dl className="sub-status-details">
                <dt>Category</dt>
                <dd>{result.category} / {result.subtype}</dd>
                <dt>Submitted</dt>
                <dd>{formatDate(result.submittedAt)}</dd>
                {result.reviewedAt && (
                  <>
                    <dt>Reviewed</dt>
                    <dd>{formatDate(result.reviewedAt)}</dd>
                  </>
                )}
                {result.reason && (
                  <>
                    <dt>Reason</dt>
                    <dd>{result.reason}</dd>
                  </>
                )}
              </dl>
            </div>
          )}

          <p className="sub-status-hint">
            Don't have an ID? <Link to="/submit-resource">Submit a resource</Link>
          </p>
        </div>
      </section>
    </>
  );
}
