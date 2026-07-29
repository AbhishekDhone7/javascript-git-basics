import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import './AuthPages.css';

function SuccessPage() {
  return (
    <section className="auth-page">
      <div className="auth-shell" style={{textAlign:'center'}}>
        <div style={{fontSize:'3rem'}}>✅</div>
        <h2>Operation Successful</h2>
        <p>Your request has been processed successfully. You can now proceed to your dashboard using your updated credentials.</p>
        <Link to="/login"><AppButton>Return to Login</AppButton></Link>
        <p className="auth-footer">Having trouble? <a href="#support">Contact Support</a></p>
      </div>
      <AppFooter compact />
    </section>
  );
}

export default SuccessPage;