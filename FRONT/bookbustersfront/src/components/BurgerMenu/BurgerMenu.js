import { Link } from "react-router-dom";
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
                <Link to="/Library" style={{textDecoration: 'none'}}>
                    <li>Ma bibliothèque</li>
                </Link>
                <Link to="/Favorites" style={{textDecoration: 'none'}}>
                    <li>Mes favoris</li>
                </Link>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <li>Mes alertes</li>
                </Link>
                <Link to="/Account"  style={{textDecoration: 'none'}}>
                    <li>Mon compte</li>
                </Link>
                <Link to="/Contact" style={{textDecoration: 'none'}}>
                    <li>Contact</li>
                </Link>
                <Link to="/Credits" style={{textDecoration: 'none'}}>
                    <li>Crédits</li>
                </Link>
                <Link to="/LegalNotice" style={{textDecoration: 'none'}}>
                    <li>Mentions légales</li>
                </Link>
            </ul>
            <button className='navbar_burger' onClick={handleShowLinks}>
                <span className='burger-bar'></span>
            </button>
        </nav>
    );
};

export default BurgerMenu;
