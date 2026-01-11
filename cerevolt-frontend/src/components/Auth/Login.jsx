import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:2000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      localStorage.setItem("role", data.role);

      if (data.role === "student") navigate("/student");
      else if (data.role === "parent") navigate("/parent");
      else navigate("/school");

    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 w-full p-2 border rounded" />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-2 w-full p-2 border rounded" />

        {msg && <p className="text-red-600 mb-2">{msg}</p>}

        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
