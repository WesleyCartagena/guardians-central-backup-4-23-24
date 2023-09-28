import React from 'react'
import { NavLink } from 'react-router-dom'

const Gambit = () => {
    return(
        <div>
            <h1>Welcome to the Guardians Central Gambit Page</h1>
            <NavLink to="/">
                <div>To Home Page</div>
            </NavLink>
        </div>
    );
}

export default Gambit