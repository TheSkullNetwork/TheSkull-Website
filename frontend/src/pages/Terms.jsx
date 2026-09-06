import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/Legal.css";

export default function Terms() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Terms of Service" desc="Rules for using this site." />
      <section className="section">
        <div className="wrap legal-body">
          <p className="legal-updated">Last updated: September 2026</p>

          <h2>Acceptance</h2>
          <p>
            By accessing <strong>theskull.vercel.app</strong>, you agree to these terms. If you
            don't agree, don't use the site.
          </p>

          <h2>What this site is</h2>
          <p>
            The Skull website is a community resource library and informational site for a
            Discord community. It is not a commercial product. There are no paid services,
            subscriptions, or transactions.
          </p>

          <h2>User submissions</h2>
          <p>
            When you submit a resource, you confirm that:
          </p>
          <ul>
            <li>The resource is free to use or clearly labeled as paid</li>
            <li>The link is functional and points to the described resource</li>
            <li>The submission doesn't contain malware, phishing, or illegal content</li>
            <li>You have the right to share the resource</li>
          </ul>
          <p>
            Staff reserve the right to reject any submission without explanation.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The site design, code, and branding belong to The Skull community. The repository
            is open source for contribution purposes — you can read, fork, and submit PRs. You
            may not deploy a public copy of this site under your own domain or present it as
            The Skull.
          </p>

          <h2>External links</h2>
          <p>
            Resources in the library link to third-party sites. We are not responsible for
            the content, availability, or safety of external sites.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            This site is provided "as is" with no warranties. The Skull community is not
            liable for any damages arising from use of the site or its content.
          </p>
        </div>
      </section>
    </>
  );
}
