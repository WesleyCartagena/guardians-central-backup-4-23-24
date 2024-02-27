import React, { useState, useEffect } from "react";
import '../App.scss'
import TimerCard from '../components/TimerCard';
import Accordian from '../components/Accordian'
import TwitterTabs from '../components/TwitterTabs';
import './Home.scss'

const Home = (props) => {
    const [message, setMessage] = useState("");
    const [testConnectionData, setTestConnectionData] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8000/message")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));

        // Fetch testConnection data
        fetch("http://localhost:8000/testConnection")
        .then((res) => res.json())
        .then((data) => setTestConnectionData(data.testConnectionData))
    }, []);
    
    
    return(
        <div className="home">
            <div className='d-inline-flex flex-column justify-content-center w-100 gc-main-container'>
                <TimerCard/>
                <Accordian/>
                <TwitterTabs/>
                <h1>{message}</h1>
                {/*
                <div>
                    {testConnectionData && testConnectionData.map((item, index) => (
                        <div key={index}>
                            <p>ID: {item.Id}</p>
                            <p>JSON: {item.Json}</p>
                        </div>
                    ))}
                </div>*/}
            </div>
        </div>
    );

}
export default Home;