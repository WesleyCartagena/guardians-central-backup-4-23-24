import React, { useState } from 'react';
import TwitterWidget from "../TwitterWidget/TwitterWidget"
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

const TwitterTabs = () => {
    const twitterAccounts = {
        'BungieHelp': { id: 1 },
        'DestinyTheGame': { id: 2 },
        'Destiny2Team': { id: 3 },
    };
    //      {twitterAccounts.map(item => ( <li key={item.id}>{item.account}</li>))}

    const [activeTab, setTab] = useState('BungieHelp'); 
    const handleTabSelect = (tab) => {
      setTab(tab)
    }
  
    // Renders a timer based on selected tab
    const renderSelectedAccount = () => {
        const selectedAccount = twitterAccounts[activeTab];
        if (selectedAccount) {
            return <TwitterWidget screenName={activeTab} />;
        }
    }
    return(
      <Card>
      <Card.Header className='bg-dark'>
        <Nav variant="tabs">
            {Object.keys(twitterAccounts).map((accountName) => ( 
                <Nav.Item>
                    <Nav.Link key={twitterAccounts[accountName].id} style={{color:'#b48608'}} active={activeTab === accountName} onClick={() => handleTabSelect(accountName)}>{accountName}</Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
      </Card.Header>
      <Card.Body>
          {renderSelectedAccount()}
      </Card.Body>
    </Card>
    );
};

export default TwitterTabs