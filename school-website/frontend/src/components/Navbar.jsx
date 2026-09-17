import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">PAS</span>
          <span className="brand-text">Pioneer Academic School</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/teachers">Teachers</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="nav-auth">
          {user ? (
            <>
              <span className="user-chip">{user.name}</span>
              {user.role === "admin" && (
                <Link className="btn btn-small" to="/notes/add">
                  Add Note
                </Link>
              )}
              <button className="btn btn-ghost btn-small" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost btn-small" to="/login">
                Login
              </Link>
              <Link className="btn btn-small" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
