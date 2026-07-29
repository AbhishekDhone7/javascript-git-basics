import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function EmailVerificationPage() {
  const navigate = useNavigate();
  const [resent, setResent] = useState(false);
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Academic Management</p></header>
        <form className="auth-form" style={{textAlign:'center'}} onSubmit={(event) => { event.preventDefault(); navigate('/success'); }}>
          <h2>Verify your email</h2>
          <p>We've sent a 6-digit verification code. Enter it below to confirm your account.</p>
          <div className="otp-grid">{Array.from({ length: 6 }).map((_, i) => <input aria-label={`Verification digit ${i + 1}`} inputMode="numeric" pattern="[0-9]" maxLength="1" required key={i} />)}</div>
          <AppButton type="submit">Verify Account</AppButton>
          <p className="auth-footer">Didn't receive the email? <button className="link-button" type="button" onClick={() => setResent(true)}>Resend Verification Code</button></p>
          {resent ? <p role="status">A new verification code has been sent.</p> : null}
          <p className="auth-footer"><Link to="/login">← Back to Login</Link></p>
        </form>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default EmailVerificationPage;