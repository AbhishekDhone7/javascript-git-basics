import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { postsWithMeta, mockComments } from '../../../utils/mockSelectors';
import './PostDetailsPage.css';

function PostDetailsPage() {
  const { id } = useParams();
  const post = postsWithMeta.find((item) => item.id === id) || postsWithMeta[0];
  const related = postsWithMeta.filter((item) => item.id !== post.id).slice(0, 3);
  const comments = mockComments.filter((item) => item.postId === post.id).slice(0, 2);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [notice, setNotice] = useState('');

  async function sharePost() {
    await navigator.clipboard?.writeText(window.location.href);
    setNotice('Post link copied.');
  }

  return (
    <AppShell section="student" active="posts">
      <section className="post-details-page">
        <div className="main-content surface-card">
          <img src={post.images?.[0]} alt={post.title} className="hero" />
          <div className="article-pad">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <h3>Bridging the Knowledge Gap</h3>
            <p>{post.description}</p>
            <blockquote>"AI can help student teams identify research gaps more efficiently, enabling deeper critical analysis."</blockquote>
            <div className="actions"><AppButton variant="outline" onClick={sharePost}>Share</AppButton><AppButton variant="outline" onClick={() => setSaved((value) => !value)}>{saved ? 'Saved' : 'Save'}</AppButton><AppButton to={`/posts/${post.id}/edit`}>Edit Post</AppButton></div>
            {notice ? <p role="status">{notice}</p> : null}
          </div>
        </div>
        <aside>
          <div className="surface-card related-list">
            <h3>Related Posts</h3>
            {related.map((item) => (
              <Link key={item.id} to={`/posts/${item.id}`}><article><img src={item.images?.[0]} alt={item.title} /><h4>{item.title}</h4></article></Link>
            ))}
          </div>
          <div className="surface-card subscribe-box">
            <h3>Stay Updated</h3>
            <p>Get latest scholarly insights delivered to your inbox.</p>
            <AppButton onClick={() => setSubscribed((value) => !value)}>{subscribed ? 'Subscribed' : 'Subscribe'}</AppButton>
          </div>
        </aside>
      </section>
      <section className="surface-card comments-box">
        <h2>Comments ({comments.length})</h2>
        {comments.map((item) => <p key={item.id}>{item.comment}</p>)}
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default PostDetailsPage;