import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="auth-screen" style={{ textAlign: 'center' }}>
      <div className="card card-pad-lg stack-md" style={{ maxWidth: 420 }}>
        <div className="stack-sm">
          <span className="badge-soft text-xs">404</span>
          <h1 className="text-lg">Page not found</h1>
          <p className="text-sm text-muted">
            The page you were looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>
        <div>
          <Link to="/" className="btn btn-primary">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


