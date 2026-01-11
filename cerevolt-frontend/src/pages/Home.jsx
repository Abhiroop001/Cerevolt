import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Cerevolt</h1>
        <p className="text-slate-600 mb-6">Role-based learning platform MVP — Student, Parent, School</p>
        <div className="space-x-3">
          <Link to="/login" className="px-4 py-2 bg-cerevoltBlue text-white rounded">Login</Link>
          <Link to="/signup" className="px-4 py-2 border rounded">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
