import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs">
      {items.map((item, idx) => (
        <span key={item.label}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
          {idx < items.length - 1 ? ' / ' : ''}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;