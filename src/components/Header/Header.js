import React from "react"
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <nav className="navbar bg-dark border-bottom border-body navbar-expand-sm" data-bs-theme="dark">
            <div className="container-fluid justify-content-end">
                <Link className="navbar-brand text-decoration-none" to="/">Guardian Central</Link>
                <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link className="text-decoration-none px-2" to="vanguard">Vanguard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-decoration-none px-2" to="crucible">Crucible</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-decoration-none px-2" to="gambit">Gambit</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
    
};

export default Header