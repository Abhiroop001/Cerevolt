import React, { useEffect, useState } from "react";
import AppShell from "../Layout/AppShell";
import { api } from "../../services/api";
import Loading from "../Common/Loading";

export default function ClassReports({ params }) {
  const classId = params?.classId || params?.id;

  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const cls = await api.get(`/classes/${classId}`).then(r => r.data);
        const rps = await api.get(`/reports`, { params: { studentId: cls.students } }).then(r => r.data);
        setReports(rps);
      } catch (e) {
        setReports([]);
      } finally {
        setLoading(false);
      }
    }
    if (classId) load();
  }, [classId]);

  if (loading) return <AppShell><Loading /></AppShell>;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Reports for Class {classId}</h1>

        {reports && reports.length ? (
          <table className="w-full bg-white rounded overflow-hidden">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-2">Student</th>
                <th className="p-2">Exercise</th>
                <th className="p-2">Score</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{r.studentId}</td>
                  <td className="p-2">{r.exerciseId}</td>
                  <td className="p-2">{r.score}%</td>
                  <td className="p-2">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-slate-500">No reports found for this class.</div>
        )}
      </div>
    </AppShell>
  );
}
