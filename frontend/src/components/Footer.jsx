import "../styles/components/Footer.css";

export default function Footer({ inviteUrl, orgUrl, isSample }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p>The Skull — community archive. {isSample ? "· sample data" : "· live data"}</p>
        <div className="footer-links">
          <a href={inviteUrl} target="_blank" rel="noopener noreferrer">Discord</a>
          <a href={orgUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/articles">Articles</a>
          <a href="/submit-resource">Submit a Resource</a>
        </div>
      </div>
    </footer>
  );
}
