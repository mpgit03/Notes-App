import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../api/auth';

const RegisterPage = ({ onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (payload) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await registerUser(payload);
      onAuthSuccess(data.user);
      navigate('/');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="stack-md" style={{ alignItems: 'center' }}>
        <AuthForm mode="register" onSubmit={handleRegister} isLoading={isLoading} error={error} />
        <p className="auth-side-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
