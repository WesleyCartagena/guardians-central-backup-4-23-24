import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Crucible from './pages/Crucible'
import Vanguard from './pages/Vanguard'
import Gambit from './pages/Gambit'  
import Layout from './components/ui/Layout'

import './App.scss';

function App () {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/message")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);

    return (
        <>
           <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home serverMessage={message} />} />
                    <Route path="crucible" element={ <Crucible/> } />
                    <Route path="vanguard" element={ <Vanguard/> } />
                    <Route path="gambit" element={ <Gambit/> } />
                </Route>
            </Routes>
        </>
    );
}
export default App