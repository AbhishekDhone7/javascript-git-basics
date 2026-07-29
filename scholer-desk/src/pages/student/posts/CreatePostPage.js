import React from 'react';
import AppShell from '../../../components/layout/AppShell';
import TextInput from '../../../components/forms/TextInput';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockCategories, mockTags } from '../../../utils/mockSelectors';
import './CreatePostPage.css';

function CreatePostPage() {
  return (
    <AppShell section="student" active="posts">
      <section className="create-post-page">
        <div className="editor-zone">
          <h1 className="section-title">Create Post</h1>
          <TextInput label="Post Title" placeholder="Enter a compelling title for your student update..." />
          <div className="surface-card editor-body"><div className="toolbar">B I U • List • Link • Img</div><div className="canvas">Start writing the student announcement or blog post here...</div></div>
        </div>
        <aside className="surface-card post-side">
          <h3>Cover Image</h3>
          <div className="upload-box">Click or drag to upload</div>
          <h3>Category</h3>
          <select>{mockCategories.map((c) => <option key={c.id}>{c.name}</option>)}</select>
          <h3>Tags</h3>
          <div className="chip-wrap">{(mockTags || []).slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="side-actions"><AppButton>Publish Post</AppButton><AppButton variant="outline">Save Draft</AppButton></div>
        </aside>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default CreatePostPage;