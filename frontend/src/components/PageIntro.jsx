import "../styles/components/PageIntro.css";

export default function PageIntro({ eyebrow, title, desc }) {
  return (
    <section className="page-intro">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {desc && <p className="section-desc">{desc}</p>}
        </div>
      </div>
      <hr className="page-hairline" />
    </section>
  );
}
