import { NavLink } from "react-router-dom";
import { useState } from 'react';

const BurgerMenu = () => {

    const [showLinks, setShowLinks] = useState(false)

    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }

    return (
        <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
            <div className="navbar_logo">BookBusters</div>
            <ul className='navbar_links'>
                <NavLink to="/Library">
                    <li>Ma bibliothèque</li>
                </NavLink>
                <NavLink to="/Favorites">
                    <li>Mes favoris</li>
                </NavLink>
                <NavLink to="/">
                    <li>Mes alertes</li>
                </NavLink>
                <NavLink to="/Account">
                    <li>Mon compte</li>
                </NavLink>
                <NavLink to="/Contact">
                    <li>Contact</li>
                </NavLink>
                <NavLink to="/Credits">
                    <li>Crédits</li>
                </NavLink>
                <NavLink to="/LegalNotice">
                    <li>Mentions légales</li>
                </NavLink>               
            </ul>                   
            <button className='navbar_burger' onClick={handleShowLinks}>
                <span className='burger-bar'></span>
            </button>       
        </nav>
    );
};

export default BurgerMenu;