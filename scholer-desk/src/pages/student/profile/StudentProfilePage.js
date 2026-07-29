import React from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import StatCard from '../../../components/cards/StatCard';
import AppFooter from '../../../components/common/AppFooter';
import { mockUsers, postsWithMeta } from '../../../utils/mockSelectors';
import './StudentProfilePage.css';

function StudentProfilePage() {
  const user = mockUsers[0];
  const myPosts = postsWithMeta.filter((p) => p.authorId === user.id).slice(0, 3);

  return (
    <AppShell section="student" active="profile">
      <section className="profile-page">
        <div className="surface-card hero">
          <img src={user.profileImage} alt={user.name} />
          <div>
            <h1>{user.name}</h1>
            <p>{user.department} · Class of 2025</p>
            <p>{user.bio}</p>
          </div>
        </div>
        <div className="stats"><StatCard title="Total Posts" value="42" /><StatCard title="Likes Received" value="1.2k" /><article className="score surface-card"><h3>Scholar Score</h3><strong>984 pts</strong></article></div>
        <div className="grid">
          {myPosts.map((post) => (
            <Link className="profile-post-link" key={post.id} to={`/posts/${post.id}`}><article className="surface-card">
                <img src={post.images?.[0]} alt={post.title} />
                <div className="pad"><span>{post.status}</span><h3>{post.title}</h3><p>{post.description}</p></div>
              </article></Link>
          ))}
        </div>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentProfilePage;