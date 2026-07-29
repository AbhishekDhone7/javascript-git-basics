import React from 'react';
import AppButton from '../../components/buttons/AppButton';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <AppButton to="/">Return Home</AppButton>
    </section>
  );
}

export default NotFoundPage;