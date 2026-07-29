import React from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import StatCard from '../../../components/cards/StatCard';
import AppFooter from '../../../components/common/AppFooter';
import { postsWithMeta } from '../../../utils/mockSelectors';
import './StudentDashboardPage.css';

function StudentDashboardPage() {
  const recent = postsWithMeta.slice(0, 3);
  return (
    <AppShell section="student" active="dashboard">
      <section className="student-dashboard">
        <div className="welcome surface-card">
          <span>Semester Autumn 2024</span>
          <h1>Hello, Alex Johnson</h1>
          <p>Your academic portfolio is growing. You've published 3 new posts this week and received 12 new comments.</p>
          <div>
            <AppButton variant="outline">View All Posts</AppButton>
            <AppButton>Manage Profile</AppButton>
          </div>
        </div>
        <aside className="stat-grid">
          <StatCard title="Total Posts" value="12" />
          <StatCard title="Published" value="10" tone="success" />
          <StatCard title="Drafts" value="2" />
        </aside>
        <section className="activity surface-card">
          <header><h2>Recent Activity</h2><a href="#history">View History</a></header>
          {recent.map((item) => (
            <article key={item.id}>
              <img src={item.author?.profileImage} alt={item.author?.name} />
              <div>
                <h3>{item.author?.name} interacted with "{item.title}"</h3>
                <p>{item.description}</p>
                <small>{new Date(item.createdAt).toDateString()}</small>
              </div>
            </article>
          ))}
        </section>
        <section className="insight surface-card">
          <h2>Analytics Overview</h2>
          <p>Post Visibility <b>+12%</b></p>
          <div className="meter"><span style={{width:'78%'}} /></div>
          <p>Engagement Rate <b>4.8%</b></p>
          <div className="meter"><span style={{width:'52%'}} /></div>
          <AppButton variant="outline">Detailed Analytics</AppButton>
        </section>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentDashboardPage;