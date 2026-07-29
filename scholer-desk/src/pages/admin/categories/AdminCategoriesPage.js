import React, { useState } from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppFooter from '../../../components/common/AppFooter';
import DataTable from '../../../components/tables/DataTable';
import EmptyState from '../../../components/feedback/EmptyState';
import { mockCategories } from '../../../utils/mockSelectors';
import './AdminCategoriesPage.css';

function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [adding, setAdding] = useState(false);
  const columns = [
    { key: 'name', label: 'Category' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' }
  ];

  const rows = categories.map((item) => ({
    name: item.name,
    description: item.description,
    status: item.status
  }));

  return (
    <AppShell section="admin" active="categories">
      <section className="admin-categories-page">
        <h1 className="section-title">Categories</h1>
        <p className="subtle">Manage post taxonomy and visibility by academic domain.</p>
        <article className="surface-card"><DataTable columns={columns} rows={rows} /></article>
        {adding ? <form className="surface-card category-form" onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setCategories((current) => [...current, { id: `category-${current.length + 1}`, name: data.get('name'), description: data.get('description'), status: 'active' }]);
          setAdding(false);
        }}><h2>Add Category</h2><input name="name" placeholder="Category name" required /><input name="description" placeholder="Description" required /><button type="submit">Create Category</button><button type="button" onClick={() => setAdding(false)}>Cancel</button></form> : <EmptyState title="Create New Category" description="Define a new category to better organize campus posts and discussions." actionText="Add Category" icon="🗂" onAction={() => setAdding(true)} />}
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default AdminCategoriesPage;