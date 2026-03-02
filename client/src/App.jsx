import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import EditNotePage from './pages/EditNotePage';
import NotFound from './pages/NotFound';
import { fetchCurrentUser } from './api/auth';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const handleAuthSuccess = (authUser) => {
    setUser(authUser);
  };

  return (
    <div className="app-shell">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="app-main">
        {initializing ? (
          <p className="text-sm text-muted">Loading session…</p>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" replace /> : <LoginPage onAuthSuccess={handleAuthSuccess} />
              }
            />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <RegisterPage onAuthSuccess={handleAuthSuccess} />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:id/edit"
              element={
                <ProtectedRoute user={user}>
                  <EditNotePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;

