import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">
          🚌 Ivoire<span className="accent">Bus</span>
        </NavLink>
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Accueil
          </NavLink>
          <NavLink to="/recherche" className={({ isActive }) => (isActive ? 'active' : '')}>
            Rechercher
          </NavLink>
          <NavLink to="/mes-reservations" className={({ isActive }) => (isActive ? 'active' : '')}>
            Mes réservations
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
