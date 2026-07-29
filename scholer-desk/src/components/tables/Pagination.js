import React, { useEffect, useState } from 'react';
import './Pagination.css';

function Pagination({ pages = 5, current = 1, onChange }) {
  const [activePage, setActivePage] = useState(current);

  useEffect(() => setActivePage(current), [current]);

  function changePage(nextPage) {
    const page = Math.min(Math.max(nextPage, 1), pages);
    setActivePage(page);
    onChange?.(page);
  }

  return (
    <div className="pagination">
      <button type="button" aria-label="Previous page" disabled={activePage === 1} onClick={() => changePage(activePage - 1)}>{'<'}</button>
      {Array.from({ length: pages }).map((_, i) => (
        <button type="button" key={i} className={activePage === i + 1 ? 'active' : ''} onClick={() => changePage(i + 1)}>{i + 1}</button>
      ))}
      <button type="button" aria-label="Next page" disabled={activePage === pages} onClick={() => changePage(activePage + 1)}>{'>'}</button>
    </div>
  );
}

export default Pagination;