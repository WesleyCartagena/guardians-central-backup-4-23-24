import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import DailyResetTimer from '../DailyResetTimer/DailyResetTimer';
import WeeklyResetTimer from '../WeeklyResetTimer/WeeklyResetTimer';
import './TimerCard.css';

const TimerCard = () => {
  const [activeTab, setTab] = useState('daily'); 
  const handleTabSelect = (tab) => {
    setTab(tab)
  }

  // Renders a timer based on selected tab
  const renderSelectedTimer = () => {
    if (activeTab === 'daily') {
      return <DailyResetTimer />;
    } else if (activeTab === 'weekly') {
      return <WeeklyResetTimer />;
    }
  }
  return (
    <Card className=''>
      <Card.Header className='bg-dark'>
        <Nav variant="tabs" defaultActiveKey="#daily">
          <Nav.Item >
            <Nav.Link style={{color:'#b48608'}} active={activeTab === 'daily'} onClick={() => handleTabSelect('daily')}>Daily Reset Timer</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{color:'#b48608'}}active={activeTab === 'weekly'} onClick={() => handleTabSelect('weekly')}>Weekly Reset Timer</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className=''>
          {renderSelectedTimer()}
      </Card.Body>
    </Card>
  );
}

export default TimerCard;