import React from 'react';
import './SkeletonBlock.css';

function SkeletonBlock({ height = 16, width = '100%' }) {
  return <div className="skeleton-block" style={{ height, width }} />;
}

export default SkeletonBlock;