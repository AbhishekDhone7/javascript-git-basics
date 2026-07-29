import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../components/buttons/AppButton';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/"><AppButton>Return Home</AppButton></Link>
    </section>
  );
}

export default NotFoundPage;