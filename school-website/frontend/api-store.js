// =====================================================
 // DEMO DATA STORE (no MySQL needed)
 // Same API shape as MySQL routes — easy to switch later
 // =====================================================

let users = [
  { id: 1, name: "Admin User", email: "admin@school.com", password: "admin123", role: "admin", class_name: null },
  { id: 2, name: "Riya Sharma", email: "riya@student.com", password: "student123", role: "student", class_name: "Class 10" },
  { id: 3, name: "Aman Verma", email: "aman@student.com", password: "student123", role: "student", class_name: "Class 9" },
];

let teachers = [
  { id: 1, name: "Mrs. Priya Mehta", subject: "Mathematics", email: "priya@school.com", phone: "9876500001", bio: "10+ years teaching Maths. Loves making algebra simple." },
  { id: 2, name: "Mr. Rajesh Kumar", subject: "Science", email: "rajesh@school.com", phone: "9876500002", bio: "Physics & Chemistry specialist." },
  { id: 3, name: "Ms. Ananya Das", subject: "English", email: "ananya@school.com", phone: "9876500003", bio: "Focus on writing skills and literature." },
  { id: 4, name: "Mr. Vikram Singh", subject: "Computer Science", email: "vikram@school.com", phone: "9876500004", bio: "Teaches coding, web and databases." },
];

let courses = [
  { id: 1, title: "Mathematics", description: "Algebra, Geometry and Mensuration", grade_level: "Class 10", teacher_id: 1, teacher_name: "Mrs. Priya Mehta" },
  { id: 2, title: "Science", description: "Physics, Chemistry and Biology basics", grade_level: "Class 9", teacher_id: 2, teacher_name: "Mr. Rajesh Kumar" },
  { id: 3, title: "English Literature", description: "Poetry, prose and grammar", grade_level: "Class 10", teacher_id: 3, teacher_name: "Ms. Ananya Das" },
  { id: 4, title: "Computer Basics", description: "HTML, CSS, JS and databases", grade_level: "Class 9-10", teacher_id: 4, teacher_name: "Mr. Vikram Singh" },
];

let notes = [
  {
    id: 1,
    title: "Algebra Formulas",
    subject: "Mathematics",
    class_name: "Class 10",
    content: "Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\n(a+b)² = a² + 2ab + b²\n(a-b)² = a² - 2ab + b²\na² - b² = (a+b)(a-b)",
    uploaded_by: 1,
    created_at: "2026-09-01T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Laws of Motion",
    subject: "Science",
    class_name: "Class 9",
    content: "Newton 1: Object stays at rest or uniform motion unless force acts.\nNewton 2: F = ma\nNewton 3: Every action has equal and opposite reaction.",
    uploaded_by: 1,
    created_at: "2026-09-02T10:00:00.000Z",
  },
  {
    id: 3,
    title: "Essay Writing Tips",
    subject: "English",
    class_name: "Class 10",
    content: "1. Start with a clear introduction.\n2. Use 3 body paragraphs.\n3. End with a conclusion.\n4. Check spelling and grammar.",
    uploaded_by: 1,
    created_at: "2026-09-03T10:00:00.000Z",
  },
  {
    id: 4,
    title: "HTML Basics",
    subject: "Computer Science",
    class_name: "Class 9-10",
    content: "HTML = structure of a webpage.\nTags: <html>, <head>, <body>, <h1>, <p>, <a>, <img>\nExample: <h1>Hello School</h1>",
    uploaded_by: 1,
    created_at: "2026-09-04T10:00:00.000Z",
  },
];

let notices = [
  { id: 1, title: "School Reopening", body: "School reopens on Monday 8:00 AM. Bring your ID cards.", important: 1, created_at: "2026-09-01T10:00:00.000Z" },
  { id: 2, title: "Parent-Teacher Meeting", body: "PTM will be held this Saturday from 10 AM to 1 PM.", important: 1, created_at: "2026-09-05T10:00:00.000Z" },
  { id: 3, title: "Library Hours", body: "Library is open Mon–Fri, 9 AM to 4 PM.", important: 0, created_at: "2026-09-08T10:00:00.000Z" },
];

let events = [
  { id: 1, title: "Annual Day", description: "Music, dance and prize distribution", event_date: "2026-12-15", location: "School Auditorium" },
  { id: 2, title: "Science Fair", description: "Students showcase science projects", event_date: "2026-11-10", location: "Science Block" },
  { id: 3, title: "Sports Meet", description: "Inter-house sports competitions", event_date: "2026-10-20", location: "School Ground" },
];

let gallery = [
  { id: 1, title: "Campus", image_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", caption: "Our beautiful campus" },
  { id: 2, title: "Classroom", image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", caption: "Smart classrooms" },
  { id: 3, title: "Library", image_url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800", caption: "Quiet study space" },
  { id: 4, title: "Sports", image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=800", caption: "Sports day moments" },
];

let contacts = [];
let nextNoteId = 5;
let nextUserId = 4;
let nextContactId = 1;

module.exports = {
  users,
  teachers,
  courses,
  getNotes: () => notes,
  getNote: (id) => notes.find((n) => n.id === Number(id)),
  addNote: (note) => {
    const row = { ...note, id: nextNoteId++, created_at: new Date().toISOString() };
    notes.unshift(row);
    return row;
  },
  deleteNote: (id) => {
    notes = notes.filter((n) => n.id !== Number(id));
  },
  notices,
  events,
  gallery,
  findUser: (email, password) => users.find((u) => u.email === email && u.password === password),
  findUserByEmail: (email) => users.find((u) => u.email === email),
  addUser: (user) => {
    const row = { ...user, id: nextUserId++, role: "student" };
    users.push(row);
    return row;
  },
  addContact: (c) => {
    contacts.push({ ...c, id: nextContactId++, created_at: new Date().toISOString() });
  },
};
