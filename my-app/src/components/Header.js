import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">
            <img src="/logo.svg" alt="Investza" className="logo" />
          </Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
        <div className="nav-cta">
          <button className="nav-button">Review my Portfolio</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
