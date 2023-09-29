import React from "react"
import { Link } from "react-router-dom";

const Header = () => {
    return(
        <nav class="navbar bg-dark border-bottom border-body navbar-expand-sm" data-bs-theme="dark">
            <div class="container-fluid justify-content-end">
                <Link class="navbar-brand text-decoration-none" to="/">Guardian Central</Link>
                <div class="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 mb-lg-0 ">
                        <li class="nav-item">
                            <Link class="text-decoration-none px-2" to="vanguard">Vanguard</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="text-decoration-none px-2" to="crucible">Crucible</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="text-decoration-none px-2" to="gambit">Gambit</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
    
};

export default Header