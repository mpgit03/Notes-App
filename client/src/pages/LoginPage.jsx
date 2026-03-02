import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../api/auth';

const LoginPage = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (payload) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await loginUser(payload);
      onAuthSuccess(data.user);
      navigate('/');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="stack-md" style={{ alignItems: 'center' }}>
        <AuthForm mode="login" onSubmit={handleLogin} isLoading={isLoading} error={error} />
        <p className="auth-side-text">
          Do not have an account?{' '}
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

