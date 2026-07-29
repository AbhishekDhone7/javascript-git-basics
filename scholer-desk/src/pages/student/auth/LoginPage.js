import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function LoginPage({ admin = false }) {
  const navigate = useNavigate();
  const destination = admin ? '/admin/dashboard' : '/dashboard';

  function handleSubmit(event) {
    event.preventDefault();
    navigate(destination);
  }

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header">
          <div className="auth-logo">ScholarDesk</div>
          <p>{admin ? 'Administrator Management Portal' : 'Student Posts & Management Portal'}</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{admin ? 'Administrator Sign In' : 'Welcome Back'}</h2>
          <p>Please enter your credentials to access your {admin ? 'administration portal' : 'account'}.</p>
          <TextInput label="Email Address" name="email" placeholder="name@university.edu" type="email" required />
          <TextInput label="Password" name="password" placeholder="••••••••" rightText="show" type="password" required />
          <div className="auth-row"><label><input type="checkbox" /> Remember Me</label><Link to="/forgot-password">Forgot Password?</Link></div>
          <div className="auth-actions">
            <AppButton type="submit">{admin ? 'Sign In as Administrator' : 'Login'}</AppButton>
            <div className="auth-divider">OR</div>
            <AppButton variant="secondary" onClick={() => navigate(destination)}>Continue with Google</AppButton>
          </div>
          {admin ? (
            <p className="auth-footer"><Link to="/login">Continue to student login</Link></p>
          ) : (
            <p className="auth-footer">Don't have an account yet? <Link to="/register">Register as a Student</Link></p>
          )}
        </form>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default LoginPage;