import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Crucible from './pages/Crucible/Crucible'
import Layout from './components/Layout/Layout'
import './App.css';

function App () {
    return (
        <>
           <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="crucible" element={ <Crucible/> } />
                </Route>
            </Routes>
        </>
    );
}
export default App