import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/components/Header.css";

export default function Header({ inviteUrl }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="brand">
          {!logoFailed ? (
            <img
              src="/logo.png"
              alt="The Skull"
              className="brand-logo"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="brand-mark" aria-hidden="true">S</span>
          )}
          <span className="brand-text">THE SKULL</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/server-info">Server Info</NavLink>
          <NavLink to="/staff">Staff</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <NavLink to="/bot">Bot</NavLink>
        </nav>
        <a className="btn btn-seal btn-small" href={inviteUrl} target="_blank" rel="noopener noreferrer">
          Join
        </a>
      </div>
    </header>
  );
}
