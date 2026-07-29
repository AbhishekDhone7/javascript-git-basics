import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function EmailVerificationPage() {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Academic Management</p></header>
        <div className="auth-form" style={{textAlign:'center'}}>
          <h2>Verify your email</h2>
          <p>We've sent a 6-digit verification code. Enter it below to confirm your account.</p>
          <div className="otp-grid">{Array.from({ length: 6 }).map((_, i) => <input key={i} />)}</div>
          <Link to="/success"><AppButton>Verify Account</AppButton></Link>
          <p className="auth-footer">Didn't receive the email? <a href="#resend">Resend Verification Code</a></p>
          <p className="auth-footer"><Link to="/login">← Back to Login</Link></p>
        </div>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default EmailVerificationPage;