import React, { useState } from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockNotifications, postsWithMeta } from '../../../utils/mockSelectors';
import './StudentNotificationsPage.css';

function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  function dismiss(id) {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }

  return (
    <AppShell section="student" active="notifications">
      <section className="notify-page">
        <h1 className="section-title">Notifications</h1>
        <p className="subtle">Stay updated with your latest post activities and system status.</p>
        <button type="button" className="mark link-button" onClick={() => setNotifications((current) => current.map((item) => ({ ...item, isRead: true })))}>Mark all as read</button>
        <div className="list">
          {notifications.map((item) => (
            <article key={item.id} className={`surface-card ${item.isRead ? 'read' : ''}`}>
              <div className="icon">{item.type === 'New Like' ? '♥' : item.type === 'Announcement' ? '⚙' : '💬'}</div>
              <div><h3>{item.type}</h3><p>{item.message}</p></div>
              <small>{new Date(item.createdAt).toLocaleDateString()}</small>
              <div className="actions"><AppButton to={`/posts/${postsWithMeta[0].id}`}>{item.type === 'New Comment' ? 'View Comment' : 'View Post'}</AppButton><AppButton variant="outline" onClick={() => dismiss(item.id)}>Dismiss</AppButton></div>
            </article>
          ))}
          {notifications.length === 0 ? <p className="surface-card empty-notifications">You're all caught up.</p> : null}
        </div>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentNotificationsPage;