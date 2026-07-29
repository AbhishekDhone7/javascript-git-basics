import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Student Management System</p></header>
        <form className="auth-form" onSubmit={(event) => { event.preventDefault(); navigate('/reset-password'); }}>
          <h2>Forgot Password?</h2>
          <p>Enter your campus email address and we'll send you a secure reset link.</p>
          <TextInput label="Campus Email" name="email" placeholder="name@university.edu" type="email" required />
          <AppButton type="submit">Send Reset Link</AppButton>
          <p className="auth-footer"><Link to="/login">← Back to Login</Link></p>
        </form>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default ForgotPasswordPage;