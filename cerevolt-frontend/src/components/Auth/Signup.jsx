import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [meta, setMeta] = useState({});
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch("http://localhost:2000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, email, password, meta })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      localStorage.setItem("role", data.role);

      if (data.role === "student") navigate("/student");
      else if (data.role === "parent") navigate("/parent");
      else navigate("/school");

    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Create account</h1>

        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="mb-2 w-full p-2 border rounded" />
        
        <select value={role} onChange={(e) => setRole(e.target.value)} className="mb-2 w-full p-2 border rounded">
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="school">School</option>
        </select>

        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mb-2 w-full p-2 border rounded" />
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-2 w-full p-2 border rounded" />

        {role === "student" && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input placeholder="Class" onChange={(e) => setMeta((m) => ({ ...m, class: e.target.value }))} className="p-2 border rounded" />
            <input placeholder="School ID" onChange={(e) => setMeta((m) => ({ ...m, schoolId: e.target.value }))} className="p-2 border rounded" />
          </div>
        )}

        {err && <p className="text-red-600 mb-2">{err}</p>}

        <button className="w-full bg-blue-600 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}
