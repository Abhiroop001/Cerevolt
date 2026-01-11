import React, { useContext } from "react";
import RoleSidebar from "./RoleSidebar";
import { AuthContext } from "../../context/AuthContext";


export default function AppShell({ children }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:block w-64 border-r bg-white">
        <RoleSidebar user={user} onLogout={logout} />
      </aside>

      <main className="flex-1">
        <header className="md:hidden bg-white border-b p-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Cerevolt</div>
          <div>
            <button onClick={logout} className="text-sm text-red-600">Logout</button>
          </div>
        </header>

        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
