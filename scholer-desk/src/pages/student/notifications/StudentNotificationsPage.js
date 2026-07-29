import React from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockNotifications } from '../../../utils/mockSelectors';
import './StudentNotificationsPage.css';

function StudentNotificationsPage() {
  return (
    <AppShell section="student" active="notifications">
      <section className="notify-page">
        <h1 className="section-title">Notifications</h1>
        <p className="subtle">Stay updated with your latest post activities and system status.</p>
        <a href="#mark" className="mark">Mark all as read</a>
        <div className="list">
          {mockNotifications.map((item) => (
            <article key={item.id} className="surface-card">
              <div className="icon">{item.type === 'New Like' ? '♥' : item.type === 'Announcement' ? '⚙' : '💬'}</div>
              <div><h3>{item.type}</h3><p>{item.message}</p></div>
              <small>{new Date(item.createdAt).toLocaleDateString()}</small>
              {item.type === 'New Comment' ? <div className="actions"><AppButton>View Comment</AppButton><AppButton variant="outline">Dismiss</AppButton></div> : null}
            </article>
          ))}
        </div>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentNotificationsPage;