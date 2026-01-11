import React, { createContext, useState, useEffect } from "react";
import { api, attachToken } from "../services/api";

/**
 * Simple AuthContext for demo:
 * - Stores token in localStorage key `cv_token`
 * - login/signup call mock endpoints in json-server
 * - In production use httpOnly cookies and server-driven session
 */

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("cv_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      attachToken(token);
      // in mock server we simulate /auth/me by verifying token value is user id
      (async function fetchMe() {
        setLoading(true);
        try {
          // the mock uses token as user id for quick demo
          const res = await api.get(`/users/${token}`);
          setUser(res.data);
        } catch (e) {
          setUser(null);
          localStorage.removeItem("cv_token");
          setToken(null);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // json-server: filter users by email & password
      const res = await api.get(`/users`, { params: { email, password } });
      const users = res.data;
      if (!users || users.length === 0) {
        throw new Error("Invalid credentials");
      }
      const u = users[0];
      // For demo: token = user.id
      localStorage.setItem("cv_token", u.id);
      setToken(u.id);
      attachToken(u.id);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      // For mock: POST to /users
      const res = await api.post("/users", payload);
      const u = res.data;
      localStorage.setItem("cv_token", u.id);
      setToken(u.id);
      attachToken(u.id);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("cv_token");
    setToken(null);
    setUser(null);
    attachToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
