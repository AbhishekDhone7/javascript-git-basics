import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import TextInput from '../../../components/forms/TextInput';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockCategories, mockTags } from '../../../utils/mockSelectors';
import './CreatePostPage.css';

function CreatePostPage() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  function toggleTag(tag) {
    setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/posts');
  }

  return (
    <AppShell section="student" active="posts">
      <form className="create-post-page" onSubmit={handleSubmit}>
        <div className="editor-zone">
          <h1 className="section-title">Create Post</h1>
          <TextInput label="Post Title" name="title" placeholder="Enter a compelling title for your student update..." required />
          <div className="surface-card editor-body"><div className="toolbar">B I U • List • Link • Img</div><textarea className="canvas" name="content" placeholder="Start writing the student announcement or blog post here..." required /></div>
        </div>
        <aside className="surface-card post-side">
          <h3>Cover Image</h3>
          <label className="upload-box">Click to upload<input type="file" accept="image/*" /></label>
          <h3>Category</h3>
          <select name="category">{mockCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          <h3>Tags</h3>
          <div className="chip-wrap">{(mockTags || []).slice(0, 6).map((tag) => <button type="button" className={selectedTags.includes(tag) ? 'active' : ''} key={tag} onClick={() => toggleTag(tag)}>{tag}</button>)}</div>
          <div className="side-actions"><AppButton type="submit">Publish Post</AppButton><AppButton variant="outline" onClick={() => navigate('/posts')}>Save Draft</AppButton></div>
        </aside>
      </form>
      <AppFooter />
    </AppShell>
  );
}

export default CreatePostPage;