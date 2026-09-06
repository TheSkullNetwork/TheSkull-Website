import PageIntro from "../components/PageIntro.jsx";
import { Link } from "react-router-dom";
import "../styles/pages/Legal.css";

export default function Privacy() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy Policy" desc="How we handle your data." />
      <section className="section">
        <div className="wrap legal-body">
          <p className="legal-updated">Last updated: September 2026</p>

          <h2>What we collect</h2>
          <p>
            When you visit <strong>theskull.vercel.app</strong>, we don't collect personal data
            through cookies or analytics. The site is a static frontend hosted on Vercel.
          </p>
          <p>
            If you log in with Discord to use the admin panel, we receive your Discord username
            and user ID through OAuth. This is used solely to verify your identity and check
            whether you have admin access. We do not store email addresses, IP addresses, or
            browsing data.
          </p>

          <h2>Discord OAuth data</h2>
          <ul>
            <li><strong>Discord user ID</strong> — used to check admin permissions</li>
            <li><strong>Discord username</strong> — displayed in the admin panel for audit logging</li>
            <li><strong>Avatar</strong> — received but not stored</li>
          </ul>
          <p>
            OAuth data is stored in a signed session cookie (<code>skull_session</code>) that
            expires after 7 days. It is not stored in a database.
          </p>

          <h2>Resource submissions</h2>
          <p>
            When you submit a resource, we store the submission details (name, URL, description,
            category) along with your Discord username if you were logged in. Submissions are
            reviewed by staff and either approved (added to the public library) or denied.
            Denied submissions are retained for record-keeping but are never made public.
          </p>

          <h2>Third-party services</h2>
          <ul>
            <li><strong>Vercel</strong> — hosts the frontend (see <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel's privacy policy</a>)</li>
            <li><strong>Discord</strong> — OAuth authentication (see <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">Discord's privacy policy</a>)</li>
            <li><strong>Firebase</strong> — stores resource and submission data (see <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase's privacy policy</a>)</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach out in our <a href="https://discord.gg/theskull" target="_blank" rel="noopener noreferrer">Discord server</a>.
          </p>
        </div>
      </section>
    </>
  );
}
