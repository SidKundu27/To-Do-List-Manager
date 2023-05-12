import React from 'react';

const FilterSelector = ({ filter, handleFilterChange }) => {
  return (
    <div className="filter-row">
      <select value={filter} onChange={handleFilterChange} className="filter-selector">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  )
}

export default FilterSelector