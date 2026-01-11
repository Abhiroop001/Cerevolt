import React, { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ParentInputsForm() {
  const [studentId, setStudentId] = useState("");
  const [noteType, setNoteType] = useState("behavior");
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { studentId, noteType, noteText, date: new Date().toISOString().slice(0, 10) };
      await api.post("/parentInputs", payload);
      setMsg("Input submitted");
      setTimeout(() => navigate("/parent"), 800);
    } catch (e) {
      setMsg("Failed to submit");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl mb-3">Submit Input for Student</h2>
      <form onSubmit={submit} className="space-y-4">
        <label>
          <span className="text-sm">Student ID</span>
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} className="mt-1 block w-full border rounded p-2" placeholder="e.g. s1" />
        </label>

        <label>
          <span className="text-sm">Type</span>
          <select value={noteType} onChange={(e) => setNoteType(e.target.value)} className="mt-1 block w-full border rounded p-2">
            <option value="behavior">Behavior</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          <span className="text-sm">Note</span>
          <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} className="mt-1 block w-full border rounded p-2" />
        </label>

        {msg && <div className="text-slate-600">{msg}</div>}

        <button disabled={saving} className="py-2 px-4 rounded bg-cerevoltBlue text-white">{saving ? "Saving..." : "Submit"}</button>
      </form>
    </div>
  );
}
