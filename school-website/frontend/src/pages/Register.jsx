import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { useAuth } from "../AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    class_name: "Class 10",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Register failed");
      login(data.user);
      navigate("/notes");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="section narrow">
      <h2>Student Register</h2>
      <p className="section-sub">Create your student account</p>
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
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            required
          />
        </label>
        <label>
          Class
          <input
            name="class_name"
            value={form.class_name}
            onChange={update}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      <p className="muted">
        Already have account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
