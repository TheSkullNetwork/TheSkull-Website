import { Link } from "react-router-dom";
import "../styles/pages/NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="wrap">
        <p className="not-found-code">404</p>
        <h2>Page not found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-ghost">Back to home</Link>
      </div>
    </section>
  );
}
