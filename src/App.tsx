import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CheckEmail from "./pages/auth/CheckEmail";
import HomePage from "./pages/HomePage";
import EmailConfirmed from "./pages/auth/EmailConfirmed";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import { useEffect } from "react";

import { useAuthStore } from "./stores/auth.store";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/check-email"
          element={
            <PublicRoute>
              <CheckEmail />
            </PublicRoute>
          }
        />

        <Route
          path="/email-confirmed"
          element={
            <PublicRoute>
              <EmailConfirmed />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
