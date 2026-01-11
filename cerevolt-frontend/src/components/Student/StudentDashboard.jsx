import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import AppShell from "../Layout/AppShell";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Loading from "../Common/Loading";

async function fetchStudent(studentId) {
  const res = await api.get(`/students/${studentId}`);
  return res.data;
}

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const studentId = user?.id || user?.id; 

  const { data, isLoading, error } = useQuery(["student", studentId], () => fetchStudent(studentId), {
    enabled: !!studentId
  });

  if (isLoading) return <AppShell><Loading /></AppShell>;
  if (error) return <AppShell><div className="p-4">Error loading student data</div></AppShell>;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {data.name}</h1>
          <p className="text-sm text-slate-600">Class: {data.class}</p>
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-3">Your Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.modules?.map((mod) => (
              <article key={mod.id} className="p-4 bg-white rounded shadow">
                <h3 className="font-medium">{mod.title}</h3>
                <p className="text-sm text-slate-600">{mod.summary}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Link to={`/student/exercises/${mod.exerciseId}`} className="text-cerevoltBlue">Start Exercise</Link>
                  <span className="text-xs text-slate-500">Exercise: {mod.exerciseId}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
