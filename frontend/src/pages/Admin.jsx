import { useState } from "react";
import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/Admin.css";
import { useAuth } from "../hooks/useAuth.js";
import SubmissionsPanel from "../components/admin/SubmissionsPanel.jsx";
import ResourcesPanel from "../components/admin/ResourcesPanel.jsx";

export default function Admin() {
  const { user, isAdmin, loading, logout, loginUrl } = useAuth();
  const [tab, setTab] = useState("submissions");

  return (
    <>
      <PageIntro eyebrow="Staff Only" title="Admin panel" />
      <section className="section">
        <div className="wrap">
          {loading && <p className="admin-empty">Checking session…</p>}

          {!loading && !user && (
            <div className="admin-gate">
              <h3>Sign in required</h3>
              <p>Log in with the Discord account on the admin allowlist.</p>
              <a className="btn btn-seal" href={loginUrl}>Login with Discord</a>
            </div>
          )}

          {!loading && user && !isAdmin && (
            <div className="admin-gate">
              <h3>Not authorized</h3>
              <p>You're logged in as <strong>{user.username}</strong>, but this account isn't on the admin list.</p>
              <button className="btn btn-ghost" onClick={logout}>Log out</button>
            </div>
          )}

          {!loading && isAdmin && (
            <>
              <div className="admin-header">
                <div className="admin-user">Signed in as <strong>{user.username}</strong></div>
                <button className="btn btn-ghost btn-small" onClick={logout}>Log out</button>
              </div>

              <div className="admin-tabs">
                <button className={`admin-tab${tab === "submissions" ? " active" : ""}`} onClick={() => setTab("submissions")}>
                  Pending Submissions
                </button>
                <button className={`admin-tab${tab === "resources" ? " active" : ""}`} onClick={() => setTab("resources")}>
                  Manage Resources
                </button>
              </div>

              {tab === "submissions" ? <SubmissionsPanel /> : <ResourcesPanel />}
            </>
          )}
        </div>
      </section>
    </>
  );
}
