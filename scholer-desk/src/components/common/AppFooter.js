import React from 'react';
import { Link } from 'react-router-dom';
import './AppFooter.css';

function AppFooter({ compact = false }) {
  return (
    <footer className={`app-footer ${compact ? 'compact' : ''}`.trim()}>
      <div>
        <strong>ScholarDesk</strong>
        <p>© 2024 ScholarDesk Management System. All rights reserved.</p>
      </div>
      <nav>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/support">Contact Support</Link>
        <Link to="/api-docs">API Documentation</Link>
      </nav>
    </footer>
  );
}

export default AppFooter;