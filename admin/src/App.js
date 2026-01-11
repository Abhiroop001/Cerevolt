import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Addproduct from "./pages/Addproduct";
import Listproduct from "./pages/Listproduct";
import Editproduct from "./pages/Editproduct";
import Addretreat from "./pages/Addretreat";
import Listretreat from "./pages/Listretreat";
import Editretreat from "./pages/Editretreat";
import Addvideos from "./pages/Addvideos";
import Listvideos from "./pages/Listvideos";
import Adddoctor from "./pages/Adddoctor";
import Listdoctor from "./pages/Listdoctor";
import Login from "./pages/Login";
import "./App.css";

function App() {
  // ✅ Protect routes that require login
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("uname");
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ------------------ LOGIN ------------------ */}
        <Route path="/login" element={<Login />} />

        {/* ------------------ DASHBOARD ------------------ */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ------------------ PRODUCT MANAGEMENT ------------------ */}
        <Route
          path="/addproduct"
          element={
            <PrivateRoute>
              <Addproduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/listproduct"
          element={
            <PrivateRoute>
              <Listproduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/editproduct/:id"
          element={
            <PrivateRoute>
              <Editproduct />
            </PrivateRoute>
          }
        />

        {/* ------------------ RETREAT MANAGEMENT ------------------ */}
        <Route
          path="/addretreat"
          element={
            <PrivateRoute>
              <Addretreat />
            </PrivateRoute>
          }
        />
        <Route
          path="/listretreat"
          element={
            <PrivateRoute>
              <Listretreat />
            </PrivateRoute>
          }
        />
        <Route
          path="/editretreat/:id"
          element={
            <PrivateRoute>
              <Editretreat />
            </PrivateRoute>
          }
        />

        {/* ------------------ VIDEO MANAGEMENT ------------------ */}
        <Route
          path="/addvideos"
          element={
            <PrivateRoute>
              <Addvideos />
            </PrivateRoute>
          }
        />
        <Route
          path="/listvideos"
          element={
            <PrivateRoute>
              <Listvideos />
            </PrivateRoute>
          }
        />
        <Route
          path="/adddoctor"
          element={
            <PrivateRoute>
              <Adddoctor />
            </PrivateRoute>
          }
        />
        <Route
          path="/listdoctor"
          element={
            <PrivateRoute>
              <Listdoctor />
            </PrivateRoute>
          }
        />
        {/* (optional)
        <Route
          path="/editdoctor/:id"
          element={
            <PrivateRoute>
              <Editdoctor />
            </PrivateRoute>
          }
        /> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
