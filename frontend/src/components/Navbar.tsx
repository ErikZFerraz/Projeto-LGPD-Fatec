import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import logo from "../../public/logo.png";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef(null);
  const { user } = useAuth();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMenu(false);
    }, 200);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="FITZONE" />
        <h1 className="navbar-title">FITZONE</h1>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Início</Link></li>

        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
          </>
        ) : (
          <li
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="#" className="dropdown-label">
              Configurações ▾
            </Link>
            {showMenu && (
              <ul className="dropdown-menu">
                <li><Link to="/perfil">Perfil</Link></li>
                <li>
                  <Link to={user?.is_admin ? "/adminTermos" : "/userTermos"}>
                    {user?.is_admin ? "Termos (Admin)" : "Termos"}
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
