import { useState } from "react";
import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/SubmitResource.css";
import { BACKEND_URL } from "../app/config.js";
import { cyberCategories } from "../data/resourcesCyber.js";
import { devCategories } from "../data/resourcesDev.js";

const CATEGORY_OPTIONS = [
  { value: "cybersecurity", label: "Cybersecurity & Hacking", subtypes: cyberCategories },
  { value: "developers", label: "Developer Resources", subtypes: devCategories }
];

const initialForm = { category: "cybersecurity", subtype: "osint", name: "", url: "", desc: "", tag: "", submitterNote: "" };

export default function SubmitResource() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [submittedId, setSubmittedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const activeCategory = CATEGORY_OPTIONS.find((c) => c.value === form.category);

  function update(field, value) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "category") {
        const cat = CATEGORY_OPTIONS.find((c) => c.value === value);
        next.subtype = cat?.subtypes[0]?.slug || "";
      }
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/submissions`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmittedId(data.submission?.id || null);
      setStatus({ type: "success", message: "Submitted — a staff member will review it soon." });
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Couldn't reach the server. Try again later." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageIntro
        eyebrow="Contribute"
        title="Submit a resource"
        desc="Found something worth adding to the library? Send it over — staff review every submission before it goes live."
      />
      <section className="section">
        <div className="wrap submit-layout">
          <div className="guidelines">
            <h3>Guidelines</h3>
            <ul>
              <li><strong>Free or clearly labeled.</strong> Paid resources are fine if the form makes that obvious.</li>
              <li><strong>Actually useful.</strong> Not a landing page for a product, not an affiliate link.</li>
              <li><strong>Working link.</strong> Double-check the URL loads before submitting.</li>
              <li><strong>One resource per submission.</strong> Send a few forms if you have several.</li>
              <li><strong>Legit and legal.</strong> No cracked tools, no leaked data, nothing that facilitates harm.</li>
              <li><strong>Short, honest description.</strong> What it actually is, not marketing copy.</li>
            </ul>
          </div>

          <form className="submit-form" onSubmit={handleSubmit}>
            <div className="form-row-split">
              <div className="form-row">
                <label htmlFor="category">Category</label>
                <select id="category" value={form.category} onChange={(e) => update("category", e.target.value)}>
                  {CATEGORY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="subtype">Topic</label>
                <select id="subtype" value={form.subtype} onChange={(e) => update("subtype", e.target.value)}>
                  {activeCategory.subtypes.map((s) => <option key={s.slug} value={s.slug}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="name">Resource name</label>
              <input id="name" required maxLength={100} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Have I Been Pwned" />
            </div>

            <div className="form-row">
              <label htmlFor="url">URL</label>
              <input id="url" required type="url" value={form.url} onChange={(e) => update("url", e.target.value)} placeholder="https://" />
            </div>

            <div className="form-row">
              <label htmlFor="desc">Description</label>
              <textarea id="desc" required maxLength={500} value={form.desc} onChange={(e) => update("desc", e.target.value)} placeholder="One or two sentences on what it is and why it's useful." />
              <span className="form-hint">{form.desc.length}/500</span>
            </div>

            <div className="form-row">
              <label htmlFor="tag">Tag (optional)</label>
              <input id="tag" maxLength={30} value={form.tag} onChange={(e) => update("tag", e.target.value)} placeholder="e.g. Free, Tool, Practice" />
            </div>

            <div className="form-row">
              <label htmlFor="note">Anything else? (optional)</label>
              <textarea id="note" maxLength={300} value={form.submitterNote} onChange={(e) => update("submitterNote", e.target.value)} placeholder="Context for the reviewer, not shown publicly." />
            </div>

            {status && (
              <div className={`form-status ${status.type}`}>
                <p>{status.message}</p>
                {status.type === "success" && submittedId && (
                  <p className="form-submission-id">
                    Your submission ID: <strong>{submittedId}</strong><br />
                    <a href={`/submissions/status?id=${submittedId}`}>Track status →</a>
                  </p>
                )}
              </div>
            )}

            <button className="btn btn-seal" type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit for review"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
