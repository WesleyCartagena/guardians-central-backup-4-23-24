import Card from 'react-bootstrap/Card'
import React, { useEffect, useState } from 'react';

const DailyResetTimer = () => {
    const [formattedHours, setFormattedHours] = useState('');
    const [formattedMinutes, setFormattedMinutes] = useState('');
    const [formattedSeconds, setFormattedSeconds] = useState('');

    useEffect(()=>{
    // Get current Time and convert date object to UTC Object
    const now = new Date();
    const nowUtcDate = new Date(now.toUTCString())

    // Creates a Date object representing 1700UTC destiny's reset time
    const destinyDailyReset = new Date(nowUtcDate);
    destinyDailyReset.setUTCHours(17,0,0,0);

    // Gives a time difference in milliseconds
    let timeDifference = destinyDailyReset - nowUtcDate;
    
    // Adds a day if time time difference is negative
    if (timeDifference < 0 ) {
        destinyDailyReset.setUTCDate(destinyDailyReset.getUTCDate() + 1)
        timeDifference = destinyDailyReset - nowUtcDate;
    }

    // Calculate the seconds from the remaining time
    const secondsDifference = Math.floor(timeDifference / 1000);

    // Calculate hours, minutes, and seconds
    let hours = Math.floor(secondsDifference / 3600);
    let remainingSeconds = secondsDifference % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;
    
    // Setting hours minutes and seconds for initial component load
    const formattedHourStr = `${String(hours).padStart(2, '0')}`;
    const formattedMinutesStr = `${String(minutes).padStart(2, '0')}`;
    const formattedSecondsStr = `${String(seconds).padStart(2, '0')}`;
    
    setFormattedHours(formattedHourStr)
    setFormattedMinutes(formattedMinutesStr)
    setFormattedSeconds(formattedSecondsStr)

    // Countdown timer 
    const timerInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            setFormattedSeconds(`${String(seconds).padStart(2, '0')}`);
        }
          if (minutes > 0 && seconds === 0) {
            minutes--;
            seconds = 59
            setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
            setFormattedSeconds(`${String(seconds).padStart(2, '0')}`);
        }
          if (hours > 0 && minutes === 0 && seconds === 0) {
            hours--;
            minutes = 59
            seconds = 59
            setFormattedHours(`${String(hours).padStart(2, '0')}`);
            setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
            setFormattedSeconds(`${String(seconds).padStart(2, '0')}`);
        }
        if (hours === 0 && minutes === 0 && seconds === 0) {
            hours = 24
            minutes = 0
            seconds = 0
            setFormattedHours(`${String(hours).padStart(2, '0')}`)
            setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
            setFormattedSeconds(`${String(seconds).padStart(2, '0')}`)
        }     

    }, 1000);
    return () => timerInterval;
    },[]);

    return (
        <Card>
        <Card.Header className='fs-2 bg-dark'>Daily Reset Timer</Card.Header>
        <Card.Body className ="mb-0 fs-2 bg-light">
                {formattedHours}:{formattedMinutes}:{formattedSeconds}
        </Card.Body>
      </Card>
    );
}

export default DailyResetTimer