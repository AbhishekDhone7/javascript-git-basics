import React from 'react';
import './StatCard.css';

function StatCard({ title, value, meta, tone = 'neutral' }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <p>{title}</p>
      <h3>{value}</h3>
      {meta ? <span>{meta}</span> : null}
    </article>
  );
}

export default StatCard;