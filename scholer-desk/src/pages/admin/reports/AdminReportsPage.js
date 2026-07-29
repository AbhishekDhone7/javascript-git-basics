import React, { useState } from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockReports } from '../../../utils/mockSelectors';
import downloadCsv from '../../../utils/downloadCsv';
import './AdminReportsPage.css';

function AdminReportsPage() {
  const [reports, setReports] = useState(mockReports.slice(0, 10));
  const [openOnly, setOpenOnly] = useState(false);
  const list = openOnly ? reports.filter((report) => report.status !== 'resolved') : reports;

  function toggleResolved(id) {
    setReports((current) => current.map((report) => report.id === id ? { ...report, status: report.status === 'resolved' ? 'open' : 'resolved' } : report));
  }

  return (
    <AppShell section="admin" active="reports">
      <section className="admin-reports-page">
        <header className="head-row"><div><h1 className="section-title">Reported Content</h1><p className="subtle">Monitor and resolve flags raised by the student community.</p></div><div className="cta"><AppButton variant="secondary" onClick={() => setOpenOnly((value) => !value)}>{openOnly ? 'Show All' : 'Open Only'}</AppButton><AppButton onClick={() => downloadCsv('reports.csv', list)}>Export CSV</AppButton></div></header>
        <div className="cards"><article className="surface-card"><h3>24</h3><p>Pending Reports</p></article><article className="surface-card"><h3>156</h3><p>Resolved Today</p></article><article className="surface-card"><h3>2.4h</h3><p>Avg. Response Time</p></article><article className="surface-card"><h3>3</h3><p>Critical Issues</p></article></div>
        <section className="surface-card table-wrap"><table><thead><tr><th>Reporter</th><th>Reported Post</th><th>Reason</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>{list.map((r)=><tr key={r.id}><td>{r.reportedBy}</td><td>{r.postId}</td><td>{r.reason}</td><td>{new Date(r.createdAt).toLocaleDateString()}</td><td>{r.status}</td><td><button type="button" onClick={() => toggleResolved(r.id)}>{r.status === 'resolved' ? 'Reopen' : 'Resolve'}</button></td></tr>)}</tbody></table></section>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default AdminReportsPage;