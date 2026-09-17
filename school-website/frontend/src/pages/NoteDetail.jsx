import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../api";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/notes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setNote(data);
      })
      .catch(() => setError("Could not load note"));
  }, [id]);

  if (error) {
    return (
      <section className="section narrow">
        <p className="error">{error}</p>
        <Link to="/notes">← Back to notes</Link>
      </section>
    );
  }

  if (!note) {
    return (
      <section className="section narrow">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="section narrow">
      <Link className="back" to="/notes">
        ← Back to notes
      </Link>
      <p className="tag">{note.subject}</p>
      <h2>{note.title}</h2>
      <p className="muted">
        {note.class_name} · {new Date(note.created_at).toLocaleDateString()}
      </p>
      <pre className="note-body">{note.content}</pre>
    </section>
  );
}
