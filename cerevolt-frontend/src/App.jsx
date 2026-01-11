import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard";
import ExercisePlayer from "./components/Student/ExercisePlayer";
import ParentDashboard from "./pages/ParentDashboard";
import ParentInputsForm from "./components/Parent/ParentInputsForm";
import SchoolDashboard from "./components/School/SchoolDashboard";
import ClassReports from "./components/School/ClassReports";
import Chatbot from "./pages/Chatbot";
import OfflineKit from "./pages/OfflineKit";
import VideoPlayer from "./pages/VideoPlayer";
import Doctors from "./pages/Doctors";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/exercises/:exerciseId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ExercisePlayer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/videos"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <VideoPlayer />
          </ProtectedRoute>
        }
      />

      {/* Parent routes */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/input"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ParentInputsForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <Chatbot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <Doctors/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/offlinekit"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <OfflineKit />
          </ProtectedRoute>
        }
      />

      {/* School routes */}
      <Route
        path="/school"
        element={
          <ProtectedRoute allowedRoles={["school"]}>
            <SchoolDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/school/class/:classId"
        element={
          <ProtectedRoute allowedRoles={["school"]}>
            <ClassReports />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
