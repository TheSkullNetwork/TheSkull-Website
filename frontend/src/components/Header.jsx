import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/components/Header.css";

export default function Header({ inviteUrl }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="brand">
          {!logoFailed ? (
            <img
              src="/logo.svg"
              alt="The Skull"
              className="brand-logo"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="brand-mark" aria-hidden="true">S</span>
          )}
          <span className="brand-text">THE SKULL</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>

        <nav
          ref={menuRef}
          id="mobile-nav"
          className={`site-nav ${menuOpen ? "mobile-open" : ""}`}
          aria-label="Primary"
        >
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/server-info" onClick={closeMenu}>Server Info</NavLink>
          <NavLink to="/staff" onClick={closeMenu}>Staff</NavLink>
          <NavLink to="/resources" onClick={closeMenu}>Resources</NavLink>
          <NavLink to="/articles" onClick={closeMenu}>Articles</NavLink>
          <NavLink to="/bot" onClick={closeMenu}>Bot</NavLink>
        </nav>

        <a className="btn btn-seal btn-small" href={inviteUrl} target="_blank" rel="noopener noreferrer">
          Join
        </a>
      </div>
    </header>
  );
}
