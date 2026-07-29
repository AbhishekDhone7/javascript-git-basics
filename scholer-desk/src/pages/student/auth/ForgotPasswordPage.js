import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function ForgotPasswordPage() {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Student Management System</p></header>
        <div className="auth-form">
          <h2>Forgot Password?</h2>
          <p>Enter your campus email address and we'll send you a secure reset link.</p>
          <TextInput label="Campus Email" placeholder="name@university.edu" />
          <Link to="/reset-password"><AppButton>Send Reset Link</AppButton></Link>
          <p className="auth-footer"><Link to="/login">← Back to Login</Link></p>
        </div>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default ForgotPasswordPage;