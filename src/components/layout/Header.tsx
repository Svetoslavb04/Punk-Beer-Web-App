const Header = () => {
  return (
    <header className="w-100 d-flex justify-content-between align-items-center text-light">
      <a href="/" className="fs-2 text-light text-decoration-none">
        Punk Beer
      </a>
      <nav className="d-flex align-items-center gap-4 text-decoration-none fs-6">
        <li>Home</li>
        <li>Favourites</li>
      </nav>
    </header>
  );
};

export default Header;
