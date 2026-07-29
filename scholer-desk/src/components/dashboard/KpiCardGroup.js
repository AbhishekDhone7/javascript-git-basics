import React from 'react';
import StatCard from '../cards/StatCard';
import './KpiCardGroup.css';

function KpiCardGroup({ items = [] }) {
  return (
    <div className="kpi-group">
      {items.map((item) => (
        <StatCard key={item.title} title={item.title} value={item.value} meta={item.meta} tone={item.tone} />
      ))}
    </div>
  );
}

export default KpiCardGroup;