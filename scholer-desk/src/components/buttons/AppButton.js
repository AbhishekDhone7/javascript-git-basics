import React from 'react';
import './AppButton.css';

function AppButton({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`app-button app-button--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default AppButton;