import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then((r) => r.json())
      .then(setCourses)
      .catch(() => setCourses([]));
  }, []);

  return (
    <section className="section">
      <h2>Courses</h2>
      <p className="section-sub">Subjects offered at our school</p>
      <div className="card-grid">
        {courses.map((c) => (
          <article key={c.id} className="card">
            <h3>{c.title}</h3>
            <p className="tag">{c.grade_level}</p>
            <p>{c.description}</p>
            <p className="muted">Teacher: {c.teacher_name || "TBA"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
