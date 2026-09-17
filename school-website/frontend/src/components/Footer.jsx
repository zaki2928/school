export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>Pioneer Academic School</strong>
          <p>Learning with clarity, care and curiosity.</p>
        </div>
        <div>
          <p>📍 12 Knowledge Road, Your City</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@pioneeracademic.school</p>
        </div>
        <p className="copy">© {new Date().getFullYear()} Pioneer Academic School</p>
      </div>
    </footer>
  );
}
