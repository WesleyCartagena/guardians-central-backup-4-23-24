import React, { useState,useEffect } from 'react';
import TwitterWidget from "../TwitterWidget/TwitterWidget"
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';

const TwitterTabs = () => {
    const twitterAccounts = {
        'BungieHelp': { id: 1 },
        'DestinyTheGame': { id: 2 },
        'Destiny2Team': { id: 3 },
    };

    const [activeTab, setTab] = useState('BungieHelp');
    const [isLoading, setLoading] = useState('');
    const handleTabSelect = (tab) => {
        setLoading('')
        setTab(tab)
    }

    // Sets a delay for spinner. Creates a visual trick to simulate loading between tabs
    useEffect(() => {
        const delay = setTimeout(() => {
            setLoading('visually-hidden');
        }, 1100); // Adjust the delay as needed
        return () => clearTimeout(delay); // Clean up the timeout when the component unmounts
    });

    // Renders a Account based on selected tab
    const renderSelectedAccount = () => {
        const selectedAccount = twitterAccounts[activeTab];
        if (selectedAccount) {
            return <TwitterWidget screenName={activeTab} />;
        }
    }

    return(
    <div className='p-4'>
        <Card>
            <Card.Header className='bg-dark'>
                <Nav variant="tabs">
                    {Object.keys(twitterAccounts).map((accountName) => (
                        <React.Fragment key={twitterAccounts[accountName].id}>
                        <Nav.Item>
                            <Nav.Link key={twitterAccounts[accountName].id} style={{color:'#b48608'}} active={activeTab === accountName} onClick={() => handleTabSelect(accountName)}>{accountName}</Nav.Link>
                        </Nav.Item>
                        </React.Fragment> 
                    ))}
                </Nav>
            </Card.Header>
            <Card.Body>
                <Spinner className = {isLoading} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                {renderSelectedAccount()}
            </Card.Body>
        </Card>
    </div>
    );
};

export default TwitterTabs