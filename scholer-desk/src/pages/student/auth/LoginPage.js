import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function LoginPage() {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header">
          <div className="auth-logo">ScholarDesk</div>
          <p>Student Admin & Management Portal</p>
        </header>
        <form className="auth-form">
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to access your account.</p>
          <TextInput label="Email Address" placeholder="name@university.edu" />
          <TextInput label="Password" placeholder="••••••••" rightText="show" type="password" />
          <div className="auth-row"><label><input type="checkbox" /> Remember Me</label><Link to="/forgot-password">Forgot Password?</Link></div>
          <div className="auth-actions">
            <Link to="/dashboard"><AppButton>Login</AppButton></Link>
            <div className="auth-divider">OR</div>
            <AppButton variant="secondary">Login with Google</AppButton>
          </div>
          <p className="auth-footer">Don't have an account yet? <Link to="/register">Register as a Student</Link></p>
        </form>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default LoginPage;