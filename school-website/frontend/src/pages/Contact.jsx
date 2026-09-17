import { useState } from "react";
import { API_URL } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <section className="section narrow">
      <h2>Contact Us</h2>
      <p className="section-sub">Questions? Send a message to the school office</p>
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={update} required />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={update}
            required
          />
        </label>
        <button className="btn" type="submit">
          Send Message
        </button>
        {status && <p className="status">{status}</p>}
      </form>
    </section>
  );
}
