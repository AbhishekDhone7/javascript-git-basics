import React from 'react';
import './PageLoader.css';

function PageLoader({ text = 'Loading...' }) {
  return (
    <div className="page-loader">
      <span className="dot" />
      <p>{text}</p>
    </div>
  );
}

export default PageLoader;