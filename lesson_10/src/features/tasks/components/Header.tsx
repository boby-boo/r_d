import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/" className="header-title">TM</NavLink>
      <nav className="nav">
        <ul>
          <li><NavLink to="/">Tasks</NavLink></li>
          <li><NavLink to="/tasks/create">Create Task</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;