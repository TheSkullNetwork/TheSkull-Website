import PageIntro from "../components/PageIntro.jsx";
import "../styles/components/About.css";

const notes = [
  { tag: "Note 01", text: "A place for people who like building things and breaking things — developers and security folks side by side." },
  { tag: "Note 02", text: "Community-run: suggestions get voted on, and active members are who staff look to first when roles open up." },
  { tag: "Note 03", text: "The server has its own custom-built bot, but the bot is a tool here — not the point of the place." }
];

export default function About() {
  return (
    <>
      <PageIntro eyebrow="Field Notes" title="What The Skull is" />
      <section className="section">
        <div className="wrap">
          <div className="about-body">
            <p>
              <strong>The Skull</strong> is a Discord community for people into development
              and cybersecurity — a place to talk shop, ask for help, share what you're
              building or breaking, and hang out with people who get it.
            </p>
            <p>
              It's organized like a well-kept collection: documented, structured, and
              maintained by people who actually use it. That shows up in the little
              things — a real resource library, a staff team you can actually reach,
              and a bot built specifically for this server instead of bolted on from
              a template.
            </p>
            <div className="note-cards">
              {notes.map((n) => (
                <div className="note-card" key={n.tag}>
                  <p className="note-tag">{n.tag}</p>
                  <p>{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
