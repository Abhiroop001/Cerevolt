import React, { useContext } from "react";
import AppShell from "../Layout/AppShell";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Loading from "../Common/Loading";
import { Link } from "react-router-dom";

async function fetchLinkedStudents(linkedIds) {
  if (!linkedIds || linkedIds.length === 0) return [];
  const promises = linkedIds.map((id) => api.get(`/students/${id}`).then(r => r.data));
  return Promise.all(promises);
}

export default function ParentDashboard() {
  const { user } = useContext(AuthContext);
  const linked = user?.linkedStudents || [];

  const { data, isLoading } = useQuery(["parent-students", linked], () => fetchLinkedStudents(linked), {
    enabled: !!user
  });

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Parent Dashboard</h1>
        <p className="text-sm text-slate-600 mb-6">Linked students under your account</p>

        {isLoading ? <Loading /> : (
          <div className="space-y-3">
            {data && data.length > 0 ? data.map(s => (
              <div key={s.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.class}</div>
                </div>
                <div className="space-x-2">
                  <Link to={`/parent/students/${s.id}`} className="text-cerevoltBlue">View</Link>
                  <Link to="/parent/input" className="text-slate-600">Add input</Link>
                </div>
              </div>
            )) : <div className="text-slate-500">No linked students found.</div>}
          </div>
        )}
      </div>
    </AppShell>
  );
}
