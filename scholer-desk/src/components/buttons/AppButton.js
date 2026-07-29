import React from 'react';
import { Link } from 'react-router-dom';
import './AppButton.css';

function AppButton({ children, variant = 'primary', className = '', to, type = 'button', ...props }) {
  const buttonClassName = `app-button app-button--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link className={buttonClassName} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} type={type} {...props}>
      {children}
    </button>
  );
}

export default AppButton;