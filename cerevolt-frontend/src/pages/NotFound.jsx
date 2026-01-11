import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-slate-600 mb-4">Page not found</p>
        <Link to="/" className="text-cerevoltBlue">Go home</Link>
      </div>
    </div>
  );
}
