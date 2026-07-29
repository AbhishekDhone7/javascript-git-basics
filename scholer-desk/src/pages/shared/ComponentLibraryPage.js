import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../../components/buttons/AppButton';
import TextInput from '../../components/forms/TextInput';
import StatCard from '../../components/cards/StatCard';
import PostCard from '../../components/posts/PostCard';
import DataTable from '../../components/tables/DataTable';
import Pagination from '../../components/tables/Pagination';
import ModalDialog from '../../components/modals/ModalDialog';
import PageLoader from '../../components/loaders/PageLoader';
import SkeletonBlock from '../../components/loaders/SkeletonBlock';
import AlertBanner from '../../components/feedback/AlertBanner';
import UserBadge from '../../components/profile/UserBadge';
import { mockUsers, postsWithMeta } from '../../utils/mockSelectors';
import './ComponentLibraryPage.css';

function ComponentLibraryPage() {
  const post = postsWithMeta[0];
  const user = mockUsers[0];
  const columns = [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }];
  const rows = mockUsers.slice(0, 3).map((u) => ({ name: u.name, role: u.role, status: u.status }));
  const [demoStatus, setDemoStatus] = useState('Choose a component action to test it.');

  return (
    <section className="component-library-page page-container">
      <header><h1>UI Component Library</h1><p>Reusable components extracted from the design system snapshots.</p><Link to="/component-library/expanded">View Expanded Library</Link></header>

      <article className="surface-card block"><h2>Buttons</h2><div className="row"><AppButton onClick={() => setDemoStatus('Primary action selected.')}>Primary</AppButton><AppButton variant="outline" onClick={() => setDemoStatus('Outline action selected.')}>Outline</AppButton><AppButton variant="secondary" onClick={() => setDemoStatus('Secondary action selected.')}>Secondary</AppButton><AppButton variant="ghost" onClick={() => setDemoStatus('Ghost action selected.')}>Ghost</AppButton></div><p role="status">{demoStatus}</p></article>

      <article className="surface-card block"><h2>Inputs</h2><div className="form-grid"><TextInput label="Email" placeholder="student@college.edu" /><TextInput label="Password" placeholder="••••••••" type="password" rightText="show" /></div></article>

      <article className="surface-card block"><h2>Cards & Profile</h2><div className="grid two"><StatCard title="Total Posts" value="124" /><UserBadge name={user.name} department={user.department} image={user.profileImage} status={user.status} /></div></article>

      <article className="surface-card block"><h2>Post Card</h2><PostCard title={post.title} description={post.description} author={post.author} time={new Date(post.createdAt).toLocaleDateString()} likes={post.likes} comments={post.commentsCount} category={post.category?.name} image={post.images?.[0]} /></article>

      <article className="surface-card block"><h2>Table & Pagination</h2><DataTable columns={columns} rows={rows} /><div style={{marginTop:'10px'}}><Pagination pages={5} current={2} onChange={(page) => setDemoStatus(`Page ${page} selected.`)} /></div></article>

      <article className="surface-card block"><h2>Feedback</h2><div className="stack"><AlertBanner type="info" message="Informational alert for updates." /><AlertBanner type="success" message="Operation completed successfully." /><AlertBanner type="danger" message="Something needs your attention." /></div></article>

      <article className="surface-card block"><h2>Loader & Skeleton</h2><div className="row"><PageLoader text="Loading posts..." /><SkeletonBlock width="180px" height={16} /><SkeletonBlock width="260px" height={16} /></div></article>

      <article className="surface-card block"><h2>Modal Preview</h2><ModalDialog title="Delete Post" message="Are you sure you want to delete this post? This action cannot be undone." primary="Delete" secondary="Cancel" onConfirm={() => setDemoStatus('Modal confirmed.')} onCancel={() => setDemoStatus('Modal cancelled.')} /></article>
    </section>
  );
}

export default ComponentLibraryPage;