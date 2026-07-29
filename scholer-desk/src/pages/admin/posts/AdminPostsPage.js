import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { postsWithMeta } from '../../../utils/mockSelectors';
import downloadCsv from '../../../utils/downloadCsv';
import './AdminPostsPage.css';

function AdminPostsPage() {
  const [posts, setPosts] = useState(postsWithMeta.slice(0, 8));
  const [pendingOnly, setPendingOnly] = useState(false);
  const list = pendingOnly ? posts.filter((post) => post.status !== 'published') : posts;

  function updateStatus(id, status) {
    setPosts((current) => current.map((post) => post.id === id ? { ...post, status } : post));
  }

  return (
    <AppShell section="admin" active="posts">
      <section className="admin-posts-page">
        <header className="head-row"><div><h1 className="section-title">Posts Management</h1><p className="subtle">Review, moderate, and organize student submissions.</p></div><div className="cta"><AppButton variant="outline" onClick={() => setPendingOnly((value) => !value)}>{pendingOnly ? 'Show All' : 'Pending Only'}</AppButton><AppButton onClick={() => downloadCsv('posts.csv', list.map(({ id, title, status, author, category }) => ({ id, title, status, author: author?.name, category: category?.name })))}>Export CSV</AppButton></div></header>
        <div className="top-cards"><article className="surface-card"><h3>24</h3><p>Pending Review</p></article><article className="surface-card"><h3>1.2k</h3><p>Approved Posts</p></article><article className="surface-card dark"><h3>Moderation Queue</h3><p>Average response time: 4.2 hours</p></article></div>
        <section className="surface-card table-wrap"><table><thead><tr><th>Post Title</th><th>Author</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead><tbody>{list.map((p)=><tr key={p.id}><td>{p.title}</td><td>{p.author?.name}</td><td>{p.category?.name}</td><td>{p.status}</td><td className="table-actions"><button type="button" title="Approve" onClick={() => updateStatus(p.id, 'published')}>✓</button><button type="button" title="Reject" onClick={() => updateStatus(p.id, 'rejected')}>✕</button><Link title="View post" to={`/posts/${p.id}`}>View</Link></td></tr>)}</tbody></table></section>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default AdminPostsPage;