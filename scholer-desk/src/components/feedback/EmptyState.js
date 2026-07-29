import React from 'react';
import AppButton from '../buttons/AppButton';
import './EmptyState.css';

function EmptyState({ title, description, actionText = 'Create', icon = '📭', to, onAction }) {
  return (
    <div className="empty-state surface-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <AppButton to={to} onClick={onAction}>{actionText}</AppButton>
    </div>
  );
}

export default EmptyState;