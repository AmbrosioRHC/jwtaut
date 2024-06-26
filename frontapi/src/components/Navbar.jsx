import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/signup">Registro</Link></li>
        <li><Link to="/login">Iniciar sesión</Link></li>
        <li><Link to="/private">Área Privada</Link></li>
        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;

