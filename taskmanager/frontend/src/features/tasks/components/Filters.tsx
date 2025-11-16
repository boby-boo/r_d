import { createPortal } from 'react-dom';
import { useFilters } from '../../../context/FiltersContext';
import { FILTER_OPTIONS } from '../../../shared/constants';

const Filters = () => {
  const { filters, setFilters, isFiltersOpen, toggleFilters } = useFilters();

  if (!isFiltersOpen) return null;
  const root = document.getElementById('filters');
  if (!root) return null;

  return createPortal(
    <>
      <div className="filters-overlay active" onClick={toggleFilters}></div>

      <div className="filters-modal">
        <h3>Filters</h3>

        {Object.entries(FILTER_OPTIONS).map(([key, group]) => (
          <div key={key}>
            <label
              htmlFor={key}
              style={{ display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}
            >
              {group.label}
            </label>

            <select
              id={key}
              value={(filters as any)[key] || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
            >
              <option value="">{group.mainOption}</option>
              {Object.entries(group.options).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <label
          htmlFor="deadline"
          style={{ display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}
        >
          Deadline
        </label>
        <input
          id="deadline"
          type="date"
          value={filters.deadline}
          onChange={(e) => setFilters((prev) => ({ ...prev, deadline: e.target.value }))}
        />

        <button onClick={toggleFilters}>Close</button>
      </div>
    </>,
    root
  );
};

export default Filters;
