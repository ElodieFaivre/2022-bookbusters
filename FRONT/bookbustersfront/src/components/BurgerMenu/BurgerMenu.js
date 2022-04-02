import { NavLink } from "react-router-dom";

const BurgerMenu = () => {
    return (
        <div>
            <nav>
                <div className="navbar">
                    <div className="container nav-container">
                        <input className="checkbox" type="checkbox" name="" id="" />
                        <div className="hamburger-lines">
                            <span className="line line1"></span>
                            <span className="line line2"></span>
                            <span className="line line3"></span>
                        </div>  
                        <div className="menu-items">
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
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default BurgerMenu;