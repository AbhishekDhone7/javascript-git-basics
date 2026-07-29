import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import TextInput from '../../../components/forms/TextInput';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { postsWithMeta } from '../../../utils/mockSelectors';
import './EditPostPage.css';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = postsWithMeta.find((item) => item.id === id) || postsWithMeta[0];

  return (
    <AppShell section="student" active="posts">
      <section className="edit-post-page">
        <h1 className="section-title">Edit Post</h1>
        <form className="surface-card form-card" onSubmit={(event) => { event.preventDefault(); navigate(`/posts/${post.id}`); }}>
          <TextInput label="Post Title" name="title" defaultValue={post.title} required />
          <div className="textarea-wrap">
            <label>Post Content</label>
            <textarea defaultValue={`${post.content}\n\n${post.description}`} />
          </div>
          <div className="meta">Current category: <strong>{post.category?.name}</strong></div>
          <div className="actions"><AppButton type="submit">Update Post</AppButton><AppButton variant="outline" onClick={() => navigate('/posts')}>Save Draft</AppButton></div>
        </form>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default EditPostPage;