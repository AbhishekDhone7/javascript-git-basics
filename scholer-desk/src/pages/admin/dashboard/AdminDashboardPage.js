import React, { useState } from 'react';
import AppShell from '../../../components/layout/AppShell';
import StatCard from '../../../components/cards/StatCard';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockReports } from '../../../utils/mockSelectors';
import downloadCsv from '../../../utils/downloadCsv';
import './AdminDashboardPage.css';

function AdminDashboardPage() {
  const pending = mockReports.slice(0, 4);
  const [range, setRange] = useState(7);
  return (
    <AppShell section="admin" active="dashboard">
      <section className="admin-dashboard-page">
        <header className="head-row"><div><h1 className="section-title">Admin Overview</h1><p className="subtle">Real-time monitoring of campus publications and activity.</p></div><div className="cta"><AppButton variant="outline" onClick={() => setRange((value) => value === 7 ? 30 : 7)}>Last {range} Days</AppButton><AppButton onClick={() => downloadCsv('admin-overview.csv', pending)}>Export Report</AppButton></div></header>
        <div className="stats">
          <StatCard title="Total Students" value="2,548" tone="success" meta="+12%" />
          <StatCard title="Total Posts" value="14,890" tone="success" meta="+5.4%" />
          <StatCard title="Active Users" value="842" tone="danger" meta="-2%" />
          <StatCard title="Pending Approvals" value="37" tone="danger" meta="Urgent" />
        </div>
        <div className="analytics">
          <article className="surface-card chart"><h2>Posts Trend</h2><div className="line" /></article>
          <article className="surface-card activity"><h2>User Activity</h2>{['Morning','Noon','Evening','Night'].map((slot,i)=><div key={slot} className="bar-row"><span>{slot}</span><div><b style={{width:[76,54,88,33][i]+'%'}} /></div></div>)}</article>
        </div>
        <section className="surface-card table-wrap">
          <h2>Recent Pending Approvals</h2>
          <table><thead><tr><th>Post</th><th>Reporter</th><th>Reason</th><th>Status</th></tr></thead><tbody>{pending.map((r)=><tr key={r.id}><td>{r.postId}</td><td>{r.reportedBy}</td><td>{r.reason}</td><td>{r.status}</td></tr>)}</tbody></table>
        </section>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default AdminDashboardPage;