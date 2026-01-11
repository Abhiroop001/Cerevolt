import React from "react";
import { Link } from "react-router-dom";


export default function RoleSidebar({ user, onLogout }) {
  if (!user) {
    return (
      <div className="p-4">
        <div className="text-lg font-bold">Cerevolt</div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6">
        <div className="text-lg font-bold">Cerevolt</div>
        <div className="text-sm text-slate-600 mt-1">{user.name}</div>
        <div className="text-xs text-slate-500">Role: {user.role}</div>
      </div>

      <nav className="flex-1 space-y-2">
        {user.role === "student" && (
          <>
            <Link to="/student" className="block p-2 rounded hover:bg-slate-100">Dashboard</Link>
            <Link to="/student/profile" className="block p-2 rounded hover:bg-slate-100">Profile</Link>
          </>
        )}

        {user.role === "parent" && (
          <>
            <Link to="/parent" className="block p-2 rounded hover:bg-slate-100">Dashboard</Link>
            <Link to="/parent/input" className="block p-2 rounded hover:bg-slate-100">Submit input</Link>
          </>
        )}

        {user.role === "school" && (
          <>
            <Link to="/school" className="block p-2 rounded hover:bg-slate-100">Dashboard</Link>
            <Link to="/school/classes" className="block p-2 rounded hover:bg-slate-100">Classes</Link>
          </>
        )}
      </nav>

      <div className="mt-4">
        <button onClick={onLogout} className="w-full py-2 bg-red-50 text-red-600 rounded">Logout</button>
      </div>
    </div>
  );
}
