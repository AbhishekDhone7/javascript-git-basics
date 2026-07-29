import React from 'react';
import AppShell from '../../../components/layout/AppShell';
import PostCard from '../../../components/posts/PostCard';
import AppFooter from '../../../components/common/AppFooter';
import { postsWithMeta } from '../../../utils/mockSelectors';
import './StudentPostsPage.css';

function StudentPostsPage() {
  const list = postsWithMeta.slice(0, 6);
  const filters = ['All', 'Academic', 'Campus Life', 'Sports', 'Research'];

  return (
    <AppShell section="student" active="posts">
      <section className="student-feed-page">
        <h1 className="section-title">Posts Feed</h1>
        <p className="subtle">Discover what's happening around ScholarDesk</p>
        <div className="feed-filters">{filters.map((item, i) => <button key={item} className={i===0 ? 'active' : ''}>{item}</button>)}</div>
        <div className="feed-grid">
          {list.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              author={post.author}
              time={new Date(post.createdAt).toLocaleDateString()}
              likes={post.likes}
              comments={post.commentsCount}
              category={post.category?.name}
              image={post.images?.[0]}
            />
          ))}
        </div>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentPostsPage;