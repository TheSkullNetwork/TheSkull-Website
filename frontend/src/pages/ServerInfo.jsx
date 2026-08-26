import PageIntro from "../components/PageIntro.jsx";
import "../styles/pages/ServerInfo.css";
import { rules, channelGroups, gettingInvolved } from "../data/serverInfo.js";

export default function ServerInfo() {
  return (
    <>
      <PageIntro
        eyebrow="Orientation"
        title="Server info"
        desc="Rules, how the server is laid out, and how to get more involved."
      />
      <section className="section">
        <div className="wrap">
          <div className="info-block">
            <p className="info-block-title">Rules</p>
            <div className="info-list">
              {rules.map((r) => (
                <div className="info-item" key={r.title}>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="info-block">
            <p className="info-block-title">Channel layout</p>
            <div className="channel-grid">
              {channelGroups.map((c) => (
                <div className="channel-card" key={c.name}>
                  <h4>{c.name}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="info-block">
            <p className="info-block-title">Getting involved</p>
            <div className="info-list">
              {gettingInvolved.map((g) => (
                <div className="info-item" key={g.title}>
                  <h4>{g.title}</h4>
                  <p>{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
