import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { useAuth } from "../AuthContext";

export default function AddNote() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    class_name: "Class 10",
    content: "",
  });
  const [msg, setMsg] = useState("");

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch(`${API_URL}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, uploaded_by: user.id }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "Failed");
      return;
    }
    navigate(`/notes/${data.id}`);
  }

  return (
    <section className="section narrow">
      <h2>Add Study Note</h2>
      <p className="section-sub">Admin only — upload notes for students</p>
      <form className="form" onSubmit={submit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={update} required />
        </label>
        <label>
          Subject
          <select name="subject" value={form.subject} onChange={update}>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
            <option>Computer Science</option>
          </select>
        </label>
        <label>
          Class
          <input
            name="class_name"
            value={form.class_name}
            onChange={update}
          />
        </label>
        <label>
          Content
          <textarea
            name="content"
            rows="10"
            value={form.content}
            onChange={update}
            required
          />
        </label>
        {msg && <p className="error">{msg}</p>}
        <button className="btn" type="submit">
          Save Note
        </button>
      </form>
    </section>
  );
}
