import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("school_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("school_user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("school_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
