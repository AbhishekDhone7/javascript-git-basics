import React from 'react';
import './AlertBanner.css';

function AlertBanner({ type = 'info', message }) {
  return <div className={`alert-banner alert-${type}`}>{message}</div>;
}

export default AlertBanner;