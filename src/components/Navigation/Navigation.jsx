import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const NavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.nav}>
          <li>
            <NavLink className={NavLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={NavLinkClass} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}