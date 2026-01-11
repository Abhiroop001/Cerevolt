import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role"); // ✅ check role from localStorage

  if (!role) {
    // not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // role mismatch
    return <Navigate to="/login" replace />;
  }

  return children;
}
