import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import TextInput from '../../../components/forms/TextInput';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function RegisterPage() {
  return (
    <section className="auth-page">
      <div className="auth-shell">
        <header className="auth-header"><div className="auth-logo">ScholarDesk</div><p>Create your academic profile.</p></header>
        <div className="auth-form">
          <h2>Create Account</h2>
          <TextInput label="Full Name" placeholder="Enter your full name" />
          <TextInput label="Email Address" placeholder="student@university.edu" />
          <div className="auth-row" style={{gap:'12px'}}>
            <div style={{flex:1}}><TextInput label="Student ID" placeholder="ID Number" /></div>
            <div style={{flex:1}}><TextInput label="Department" placeholder="Select Dept" /></div>
          </div>
          <div className="auth-row" style={{gap:'12px'}}>
            <div style={{flex:1}}><TextInput label="Password" placeholder="••••••••" type="password" /></div>
            <div style={{flex:1}}><TextInput label="Confirm Password" placeholder="••••••••" type="password" /></div>
          </div>
          <label><input type="checkbox" /> I agree to the Terms of Service and Privacy Policy.</label>
          <Link to="/email-verification"><AppButton>Register Account</AppButton></Link>
          <p className="auth-footer">Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default RegisterPage;