import { NavLink } from 'react-router-dom'

const Home = () => {
    return(
        <div>
            <h1>Welcome to the Guardians Central Home Page</h1>
            <NavLink to="crucible">
                <div>To Crucible Page</div>
            </NavLink>
            <NavLink to="vanguard">
                <div>To Vanguard Page</div>
            </NavLink>
            <NavLink to="gambit">
                <div>To Gambit Page</div>
            </NavLink>
        </div>
    );
}

export default Home;

