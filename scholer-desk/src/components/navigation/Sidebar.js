import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../buttons/AppButton';
import './Sidebar.css';

function Sidebar({ section, active }) {
  const admin = section === 'admin';
  const links = admin
    ? [
        { key: 'dashboard', label: 'Dashboard', to: '/admin/dashboard' },
        { key: 'students', label: 'Students', to: '/admin/students' },
        { key: 'posts', label: 'Posts', to: '/admin/posts' },
        { key: 'reports', label: 'Reports', to: '/admin/reports' },
        { key: 'settings', label: 'Settings', to: '/admin/settings' }
      ]
    : [
        { key: 'dashboard', label: 'Dashboard', to: '/dashboard' },
        { key: 'posts', label: 'Posts', to: '/posts' },
        { key: 'profile', label: 'Profile', to: '/profile' },
        { key: 'settings', label: 'Settings', to: '/settings' },
        { key: 'notifications', label: 'Notifications', to: '/notifications' }
      ];

  return (
    <div className="sd-sidebar">
      <div>
        <h2>{admin ? 'Student Admin' : 'ScholarDesk'}</h2>
        <p>{admin ? 'Management Portal' : 'Student Admin Management'}</p>
      </div>
      <nav>
        {links.map((link) => (
          <Link key={link.key} className={active === link.key ? 'active' : ''} to={link.to}>{link.label}</Link>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <AppButton className="full" variant="primary">+ Create Post</AppButton>
      </div>
    </div>
  );
}

export default Sidebar;