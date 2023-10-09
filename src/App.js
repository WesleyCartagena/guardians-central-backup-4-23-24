import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Crucible from './pages/Crucible/Crucible'
import Vanguard from './pages/Vanguard/Vanguard'
import Gambit from './pages/Gambit/Gambit'  
import Layout from './components/Layout/Layout'
import React, { useEffect } from "react";
import './App.scss';

function App () {

    useEffect(() => {
        fetch("http://localhost:8000")
        .then((res) => res.json());
    }, []);

    return (
        <>
           <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="crucible" element={ <Crucible/> } />
                    <Route path="vanguard" element={ <Vanguard/> } />
                    <Route path="gambit" element={ <Gambit/> } />
                </Route>
            </Routes>
        </>
    );
}
export default App