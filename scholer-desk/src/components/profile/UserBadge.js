import React from 'react';
import './UserBadge.css';

function UserBadge({ name, department, image, status = 'active' }) {
  return (
    <div className="user-badge">
      <img src={image} alt={name} />
      <div>
        <h4>{name}</h4>
        <p>{department}</p>
      </div>
      <span className={status}>{status}</span>
    </div>
  );
}

export default UserBadge;