import React from 'react';
import Sidebar from '../navigation/Sidebar';
import Topbar from '../navigation/Topbar';
import MobileBottomNav from '../navigation/MobileBottomNav';
import './AppShell.css';

function AppShell({ section = 'student', active = 'dashboard', children }) {
  return (
    <div className="app-shell">
      <aside className="desktop-only"><Sidebar section={section} active={active} /></aside>
      <div className="app-shell-main">
        <Topbar section={section} />
        <main>{children}</main>
      </div>
      <MobileBottomNav section={section} active={active} />
    </div>
  );
}

export default AppShell;