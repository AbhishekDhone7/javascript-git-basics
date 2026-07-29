import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import PostCard from '../../../components/posts/PostCard';
import AppFooter from '../../../components/common/AppFooter';
import { postsWithMeta } from '../../../utils/mockSelectors';
import './StudentPostsPage.css';

function StudentPostsPage() {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Academic', 'Campus Life', 'Sports', 'Research'];
  const query = searchParams.get('q')?.trim().toLowerCase() || '';
  const list = postsWithMeta.filter((post) => {
    const matchesFilter = activeFilter === 'All' || post.category?.name === activeFilter;
    const matchesQuery = !query || `${post.title} ${post.description} ${post.author?.name}`.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  }).slice(0, 6);

  return (
    <AppShell section="student" active="posts">
      <section className="student-feed-page">
        <h1 className="section-title">Posts Feed</h1>
        <p className="subtle">Discover what's happening around ScholarDesk</p>
        <div className="feed-filters">{filters.map((item) => <button type="button" key={item} className={activeFilter === item ? 'active' : ''} onClick={() => setActiveFilter(item)}>{item}</button>)}</div>
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
              to={`/posts/${post.id}`}
            />
          ))}
        </div>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default StudentPostsPage;