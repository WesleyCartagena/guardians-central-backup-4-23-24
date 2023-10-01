import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import DailyResetTimer from '../DailyResetTimer/DailyResetTimer';
import WeeklyResetTimer from '../WeeklyResetTimer/WeeklyResetTimer';

const TimerCard = () => {
  const [activeTab, setTab] = useState('daily'); 
  const handleTabSelect = (tab) => {
    setTab(tab)
  }

  const renderSelectedTimer = () => {
    if (activeTab === 'daily') {
      return <DailyResetTimer />;
    } else if (activeTab === 'weekly') {
      return <WeeklyResetTimer />;
    }
  }
  return (
    <Card className='w-50'>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#daily">
          <Nav.Item>
            <Nav.Link active={activeTab === 'daily'} onClick={() => handleTabSelect('daily')}>Daily Reset Timer</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'weekly'} onClick={() => handleTabSelect('weekly')}>Weekly Reset Timer</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {renderSelectedTimer()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TimerCard;