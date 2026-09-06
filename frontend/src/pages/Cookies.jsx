import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/Legal.css";

export default function Cookies() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Cookies Policy" desc="What we store and why." />
      <section className="section">
        <div className="wrap legal-body">
          <p className="legal-updated">Last updated: September 2026</p>

          <h2>Overview</h2>
          <p>
            This site uses minimal cookies. We don't use analytics, advertising, or tracking
            cookies.
          </p>

          <h2>Session cookie</h2>
          <p>
            If you log in with Discord, we set a single <code>httpOnly</code> session cookie:
          </p>
          <ul>
            <li><strong>Name:</strong> <code>skull_session</code></li>
            <li><strong>Purpose:</strong> Keeps you logged in to the admin panel</li>
            <li><strong>Duration:</strong> 7 days</li>
            <li><strong>Contains:</strong> A signed JWT with your Discord user ID and username</li>
            <li><strong>HttpOnly:</strong> Yes — not accessible via JavaScript</li>
            <li><strong>Secure:</strong> Yes in production (HTTPS only)</li>
            <li><strong>SameSite:</strong> Lax</li>
          </ul>

          <h2>No other cookies</h2>
          <p>
            The site does not set any cookies for analytics, advertising, or tracking purposes.
            Vercel may set infrastructure cookies for edge caching, but these are not controlled
            by us.
          </p>

          <h2>Managing cookies</h2>
          <p>
            You can clear the session cookie by logging out, or by deleting cookies for this
            site in your browser settings. The site functions normally without the session
            cookie — you just won't be able to access the admin panel.
          </p>
        </div>
      </section>
    </>
  );
}
