import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span>Notes Studio</span>
          <span className="navbar-badge">MERN</span>
        </Link>
        <div className="navbar-user">
          {user ? (
            <>
              <span className="navbar-user-name">{user.name}</span>
              <button className="btn btn-outline btn-xs" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

