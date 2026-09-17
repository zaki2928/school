import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/teachers`)
      .then((r) => r.json())
      .then(setTeachers)
      .catch(() => setTeachers([]));
  }, []);

  return (
    <section className="section">
      <h2>Our Teachers</h2>
      <p className="section-sub">Faculty who guide every student</p>
      <div className="card-grid">
        {teachers.map((t) => (
          <article key={t.id} className="card">
            <h3>{t.name}</h3>
            <p className="tag">{t.subject}</p>
            <p>{t.bio}</p>
            <p className="muted">{t.email}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
