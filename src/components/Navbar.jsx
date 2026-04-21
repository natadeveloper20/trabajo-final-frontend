import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar card-glass">
            <div className="navbar-brand">
                <h1>ProjectHub</h1>
            </div>
            <div className="navbar-user">
                <span>Bienvenido, <strong>{user?.firstName}</strong></span>
                <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;
