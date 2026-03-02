import React, { useState } from 'react';

const AuthForm = ({ mode, onSubmit, isLoading, error }) => {
  const isLogin = mode === 'login';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = isLogin ? { email, password } : { name, email, password };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-pad-lg stack-lg" style={{ maxWidth: 380 }}>
      <div className="stack-sm">
        <h1 className="text-lg">{isLogin ? 'Welcome back' : 'Create your workspace'}</h1>
        <p className="text-sm text-muted">
          {isLogin
            ? 'Sign in to see and manage your notes.'
            : 'Register once, jot ideas anywhere, on any device.'}
        </p>
      </div>

      {!isLogin && (
        <div className="field">
          <label htmlFor="name" className="field-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="email" className="field-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="field">
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="input"
        />
        <span className="helper-text">Minimum 6 characters.</span>
      </div>

      {error && <div className="alert">{error}</div>}

      <button type="submit" disabled={isLoading} className="btn btn-primary btn-full">
        {isLoading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
      </button>
    </form>
  );
};

export default AuthForm;

