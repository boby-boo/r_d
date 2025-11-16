import { NavLink } from 'react-router-dom';
import { ListFilter } from 'lucide-react';
import { useFilters } from '../../context/FiltersContext';
import Filters from '../../features/tasks/components/Filters';

const Header = () => {
  const { toggleFilters } = useFilters();

  return (
    <>
      <header className="header">
        <NavLink to="/" className="header-title">
          TM
        </NavLink>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/">Tasks</NavLink>
            </li>
            <li>
              <NavLink to="/tasks/create">Create Task</NavLink>
            </li>
            <li style={{ cursor: 'pointer' }}>
              <ListFilter onClick={toggleFilters} />
            </li>
          </ul>
        </nav>
      </header>
      <Filters />
    </>
  );
};

export default Header;
