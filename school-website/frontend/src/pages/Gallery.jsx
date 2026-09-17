import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="section">
      <h2>Gallery</h2>
      <p className="section-sub">Moments from campus life</p>
      <div className="gallery-grid">
        {items.map((g) => (
          <figure key={g.id} className="gallery-item">
            <img src={g.image_url} alt={g.title || "School"} loading="lazy" />
            <figcaption>
              <strong>{g.title}</strong>
              <span>{g.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
