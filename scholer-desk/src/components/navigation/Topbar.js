import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

function Topbar({ section }) {
  const admin = section === 'admin';
  const links = admin
    ? [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/posts', label: 'Posts' },
        { to: '/admin/reports', label: 'Reports' }
      ]
    : [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/posts', label: 'Posts' },
        { to: '/notifications', label: 'Reports' }
      ];

  return (
    <header className="sd-topbar">
      <div className="mobile-only logo">ScholarDesk</div>
      <div className="desktop-only topbar-brand">{admin ? 'ScholarDesk' : 'ScholarDesk'}</div>
      <nav className="desktop-only">
        {links.map((link) => (
          <Link key={link.to} to={link.to}>{link.label}</Link>
        ))}
      </nav>
      <div className="search-wrap"><input placeholder={admin ? 'Search entries...' : 'Search posts...'} /></div>
      <div className="actions"><span>🔔</span><span>❔</span><img src="https://i.pravatar.cc/60?img=22" alt="profile" /></div>
    </header>
  );
}

export default Topbar;