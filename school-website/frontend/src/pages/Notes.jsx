import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import { useAuth } from "../AuthContext";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const url = subject
      ? `${API_URL}/api/notes?subject=${encodeURIComponent(subject)}`
      : `${API_URL}/api/notes`;
    fetch(url)
      .then((r) => r.json())
      .then(setNotes)
      .catch(() => setNotes([]));
  }, [subject]);

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>Study Notes</h2>
          <p className="section-sub">Read notes by subject and class</p>
        </div>
        {user?.role === "admin" && (
          <Link className="btn" to="/notes/add">
            + Add Note
          </Link>
        )}
      </div>

      <div className="filters">
        <button
          className={!subject ? "chip active" : "chip"}
          onClick={() => setSubject("")}
        >
          All
        </button>
        {["Mathematics", "Science", "English", "Computer Science"].map((s) => (
          <button
            key={s}
            className={subject === s ? "chip active" : "chip"}
            onClick={() => setSubject(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {notes.length === 0 && (
          <p className="muted">No notes found. Login as admin to add some.</p>
        )}
        {notes.map((n) => (
          <Link key={n.id} to={`/notes/${n.id}`} className="card card-link">
            <p className="tag">{n.subject}</p>
            <h3>{n.title}</h3>
            <p className="muted">{n.class_name}</p>
            <p className="preview">{n.content.slice(0, 90)}...</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
