import React from 'react'
import { NavLink } from 'react-router-dom'

const Vanguard = () => {
    return(
        <div>
            <h1>Welcome to the Guardians Central Vanguard Page</h1>
            <NavLink to="/">
                <div>To Home Page</div>
            </NavLink>
        </div>
    );
}

export default Vanguard