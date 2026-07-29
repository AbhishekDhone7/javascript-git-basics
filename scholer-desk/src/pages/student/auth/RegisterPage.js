import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('password') !== data.get('confirmPassword')) {
      setError('Passwords must match.');
      return;
    }
    setError('');
    navigate('/email-verification');
  }

  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Create your academic profile.</p></header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <TextInput label="Full Name" name="fullName" placeholder="Enter your full name" required />
          <TextInput label="Email Address" name="email" placeholder="student@university.edu" type="email" required />
          <div className="auth-row" style={{gap:'12px'}}>
            <div style={{flex:1}}><TextInput label="Student ID" name="studentId" placeholder="ID Number" required /></div>
            <div style={{flex:1}}><TextInput label="Department" name="department" placeholder="Select Dept" required /></div>
          </div>
          <div className="auth-row" style={{gap:'12px'}}>
            <div style={{flex:1}}><TextInput label="Password" name="password" placeholder="••••••••" type="password" minLength="8" required /></div>
            <div style={{flex:1}}><TextInput label="Confirm Password" name="confirmPassword" placeholder="••••••••" type="password" minLength="8" required /></div>
          </div>
          <label><input type="checkbox" required /> I agree to the Terms of Service and Privacy Policy.</label>
          {error ? <p className="auth-error" role="alert">{error}</p> : null}
          <AppButton type="submit">Register Account</AppButton>
          <p className="auth-footer">Already have an account? <Link to="/login">Log In</Link></p>
        </form>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default RegisterPage;