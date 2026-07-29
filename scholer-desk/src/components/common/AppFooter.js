import React from 'react';
import './AppFooter.css';

function AppFooter({ compact = false }) {
  return (
    <footer className={`app-footer ${compact ? 'compact' : ''}`.trim()}>
      <div>
        <strong>ScholarDesk</strong>
        <p>© 2024 ScholarDesk Management System. All rights reserved.</p>
      </div>
      <nav>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#support">Contact Support</a>
        <a href="#api">API Documentation</a>
      </nav>
    </footer>
  );
}

export default AppFooter;