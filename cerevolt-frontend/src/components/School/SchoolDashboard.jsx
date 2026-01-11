import React, { useContext } from "react";
import AppShell from "../Layout/AppShell";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Loading from "../Common/Loading";
import { Link } from "react-router-dom";

async function fetchClasses(schoolId) {
  const res = await api.get("/classes", { params: { schoolId } });
  return res.data;
}

export default function SchoolDashboard() {
  const { user } = useContext(AuthContext);
  const schoolId = user?.schoolId || user?.id;

  const { data, isLoading } = useQuery(["classes", schoolId], () => fetchClasses(schoolId), {
    enabled: !!schoolId
  });

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">School Dashboard</h1>
        <p className="text-sm text-slate-600 mb-6">Manage classes and view reports</p>

        {isLoading ? <Loading /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data && data.length ? data.map(cls => (
              <div key={cls.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
                <div>
                  <div className="font-medium">Class {cls.id}</div>
                  <div className="text-xs text-slate-500">Students: {cls.students?.length || 0}</div>
                </div>
                <div>
                  <Link to={`/school/class/${cls.id}`} className="text-cerevoltBlue">View reports</Link>
                </div>
              </div>
            )) : <div className="text-slate-500">No classes found</div>}
          </div>
        )}
      </div>
    </AppShell>
  );
}
