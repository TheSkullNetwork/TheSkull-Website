import "../styles/components/Cta.css";

export default function Cta({ inviteUrl }) {
  return (
    <section className="section cta-section">
      <div className="wrap cta-wrap">
        <h2>Come look at the collection yourself</h2>
        <p>New drawers get added often. The best way to see what's inside is from the inside.</p>
        <a className="btn btn-seal btn-large" href={inviteUrl} target="_blank" rel="noopener noreferrer">
          Join The Skull
        </a>
      </div>
    </section>
  );
}
