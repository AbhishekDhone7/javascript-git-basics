import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('password') !== data.get('confirmPassword')) {
      setError('Passwords must match.');
      return;
    }
    navigate('/success');
  }

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Secure your academic portal</p></header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <p>Please enter your new security credentials below.</p>
          <TextInput label="New Password" name="password" placeholder="••••••••" type="password" minLength="8" required />
          <TextInput label="Confirm Password" name="confirmPassword" placeholder="••••••••" type="password" minLength="8" required />
          {error ? <p className="auth-error" role="alert">{error}</p> : null}
          <AppButton type="submit">Update Password</AppButton>
          <p className="auth-footer"><Link to="/login">← Back to ScholarDesk Login</Link></p>
        </form>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default ResetPasswordPage;