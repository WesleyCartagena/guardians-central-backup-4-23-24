import { NavLink } from 'react-router-dom'

const Home = () => {
    return(
        <div>
            <h1>Welcome to the Guardians Central Home Page</h1>
            <NavLink to="crucible">
                <button className="btn btn-primary">To Crucible Page</button>
            </NavLink>
            <NavLink to="vanguard">
                <button className="btn btn-primary">To Vanguard Page</button>
            </NavLink>
            <NavLink to="gambit">
                <button className="btn btn-primary">To Gambit Page</button>
            </NavLink>
        </div>
    );
}

export default Home;

