import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

export default function Home() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/notices`)
      .then((r) => r.json())
      .then(setNotices)
      .catch(() => setNotices([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Welcome to</p>
          <h1 className="brand-hero">Pioneer Academic School</h1>
          <p className="lede">
            A friendly place to learn, share notes, and grow — built for
            students, teachers and parents.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/notes">
              Browse Notes
            </Link>
            <Link className="btn btn-outline" to="/about">
              About Us
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true" />
      </section>

      <section className="section">
        <h2>Notice Board</h2>
        <p className="section-sub">Latest announcements from school</p>
        <div className="notice-list">
          {notices.length === 0 && (
            <p className="muted">
              No notices yet. Start MySQL + backend to load data.
            </p>
          )}
          {notices.map((n) => (
            <article key={n.id} className={`notice ${n.important ? "important" : ""}`}>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section features">
        <h2>What you can do here</h2>
        <div className="feature-grid">
          <Link to="/notes" className="feature">
            <span>📝</span>
            <h3>Study Notes</h3>
            <p>Read subject notes uploaded by teachers</p>
          </Link>
          <Link to="/teachers" className="feature">
            <span>👩‍🏫</span>
            <h3>Teachers</h3>
            <p>Meet our faculty</p>
          </Link>
          <Link to="/events" className="feature">
            <span>📅</span>
            <h3>Events</h3>
            <p>Annual day, sports, science fair</p>
          </Link>
          <Link to="/contact" className="feature">
            <span>✉️</span>
            <h3>Contact</h3>
            <p>Send a message to school office</p>
          </Link>
        </div>
      </section>
    </>
  );
}
