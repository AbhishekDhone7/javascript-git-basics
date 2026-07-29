import React from 'react';
import { Link } from 'react-router-dom';
import './MobileBottomNav.css';

function MobileBottomNav({ section, active }) {
  const links = section === 'admin'
    ? [
        { key: 'dashboard', label: 'Dashboard', to: '/admin/dashboard' },
        { key: 'students', label: 'Students', to: '/admin/students' },
        { key: 'posts', label: 'Posts', to: '/admin/posts' },
        { key: 'settings', label: 'Settings', to: '/admin/settings' }
      ]
    : [
        { key: 'posts', label: 'Posts', to: '/posts' },
        { key: 'dashboard', label: 'Dashboard', to: '/dashboard' },
        { key: 'profile', label: 'Profile', to: '/profile' },
        { key: 'settings', label: 'Settings', to: '/settings' }
      ];

  return (
    <nav className="mobile-bottom-nav">
      {links.map((item) => (
        <Link key={item.key} className={active === item.key ? 'active' : ''} to={item.to}>{item.label}</Link>
      ))}
    </nav>
  );
}

export default MobileBottomNav;