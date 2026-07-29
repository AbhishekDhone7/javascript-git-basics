import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Topbar.css';

function Topbar({ section }) {
  const admin = section === 'admin';
  const navigate = useNavigate();
  const links = admin
    ? [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/posts', label: 'Posts' },
        { to: '/admin/categories', label: 'Categories' },
        { to: '/admin/analytics', label: 'Analytics' },
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
      <form className="search-wrap" onSubmit={(event) => {
        event.preventDefault();
        const query = new FormData(event.currentTarget).get('query');
        navigate(`${admin ? '/admin/posts' : '/posts'}${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      }}>
        <input name="query" aria-label="Search" placeholder={admin ? 'Search entries...' : 'Search posts...'} />
      </form>
      <div className="actions">
        <Link to={admin ? '/admin/reports' : '/notifications'} aria-label="Notifications">🔔</Link>
        <Link to={admin ? '/admin/settings' : '/settings'} aria-label="Help and settings">❔</Link>
        <Link to={admin ? '/admin/settings' : '/profile'} aria-label="Profile"><img src="https://i.pravatar.cc/60?img=22" alt="profile" /></Link>
      </div>
    </header>
  );
}

export default Topbar;