import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function ResetPasswordPage() {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Secure your academic portal</p></header>
        <div className="auth-form">
          <h2>Reset Password</h2>
          <p>Please enter your new security credentials below.</p>
          <TextInput label="New Password" placeholder="••••••••" type="password" />
          <TextInput label="Confirm Password" placeholder="••••••••" type="password" />
          <Link to="/success"><AppButton>Update Password</AppButton></Link>
          <p className="auth-footer"><Link to="/login">← Back to ScholarDesk Login</Link></p>
        </div>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default ResetPasswordPage;