import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-100 d-flex justify-content-between align-items-center text-light">
      <Link to="/" className="fs-2 fw-light">
        Beans Love Beers
      </Link>
      <nav className="d-flex align-items-center gap-4 fs-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
      </nav>
    </header>
  );
};

export default Header;
