import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <section className="section">
      <h2>School Events</h2>
      <p className="section-sub">Upcoming activities and celebrations</p>
      <div className="timeline">
        {events.map((e) => (
          <article key={e.id} className="timeline-item">
            <time>{new Date(e.event_date).toLocaleDateString()}</time>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p className="muted">📍 {e.location}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
