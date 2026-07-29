import React, { useState } from 'react';
import AppButton from '../../components/buttons/AppButton';
import EmptyState from '../../components/feedback/EmptyState';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import './ExpandedComponentLibraryPage.css';

function ExpandedComponentLibraryPage() {
  const [status, setStatus] = useState('Interactive component examples are ready.');
  return (
    <section className="expanded-library-page page-container">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Component Library', to: '/component-library' }, { label: 'Expanded' }]} />
      <h1>Expanded UI Component Library</h1>
      <p>Extended component patterns and compositional examples.</p>
      <div className="chips">{['Chip', 'Tag', 'Filter', 'Badge', 'Status'].map((i) => <span key={i}>{i}</span>)}</div>
      <article className="surface-card section"><h2>Call to Action Group</h2><div className="cta"><AppButton onClick={() => setStatus('Primary action selected.')}>Primary Action</AppButton><AppButton variant="outline" onClick={() => setStatus('Secondary action selected.')}>Secondary Action</AppButton><AppButton variant="secondary" onClick={() => setStatus('Destructive action selected.')}>Destructive Action</AppButton></div><p role="status">{status}</p></article>
      <article className="surface-card section"><h2>Empty Patterns</h2><EmptyState title="No Records Found" description="Try adjusting your filters or create a new entry." actionText="Create Entry" onAction={() => setStatus('Create entry selected.')} /></article>
      <AppButton to="/component-library" variant="ghost">Back to Base Library</AppButton>
    </section>
  );
}

export default ExpandedComponentLibraryPage;