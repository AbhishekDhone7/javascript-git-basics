import React from 'react';
import AppShell from '../../../components/layout/AppShell';
import KpiCardGroup from '../../../components/dashboard/KpiCardGroup';
import DataTable from '../../../components/tables/DataTable';
import AppFooter from '../../../components/common/AppFooter';
import './AdminAnalyticsPage.css';

function AdminAnalyticsPage() {
  const kpis = [
    { title: 'Monthly Reach', value: '128K', meta: '+11%', tone: 'success' },
    { title: 'Avg Engagement', value: '7.4%', meta: '+2.1%', tone: 'success' },
    { title: 'Drop-offs', value: '3.2%', meta: '-0.8%', tone: 'success' },
    { title: 'Flag Density', value: '0.4%', meta: 'Stable', tone: 'neutral' }
  ];

  const columns = [
    { key: 'name', label: 'Category' },
    { key: 'views', label: 'Views' },
    { key: 'comments', label: 'Comments' },
    { key: 'growth', label: 'Growth' }
  ];

  const rows = [
    { name: 'React', views: '28,340', comments: '2,106', growth: '+14%' },
    { name: 'JavaScript', views: '22,114', comments: '1,842', growth: '+9%' },
    { name: 'Career', views: '16,390', comments: '1,099', growth: '+6%' },
    { name: 'Events', views: '12,029', comments: '734', growth: '+4%' }
  ];

  return (
    <AppShell section="admin" active="analytics">
      <section className="admin-analytics-page">
        <h1 className="section-title">Analytics</h1>
        <p className="subtle">Track post performance and community engagement trends.</p>
        <KpiCardGroup items={kpis} />
        <article className="surface-card chart-block"><h2>Traffic Distribution</h2><div className="chart-area" /></article>
        <article className="surface-card"><h2>Top Performing Categories</h2><DataTable columns={columns} rows={rows} /></article>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default AdminAnalyticsPage;