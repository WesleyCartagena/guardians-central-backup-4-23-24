import Card from 'react-bootstrap/Card'
import React, { useEffect, useState } from 'react';

const DailyResetTimer = () => {
    const [formattedHours, setFormattedHours] = useState('');
    const [formattedMinutes, setFormattedMinutes] = useState('');
    const [formattedSeconds, setFormattedSeconds] = useState('');

    useEffect(()=>{
    // Get current UTC Time
    const now = new Date();

    // Creates a Date object representing 1700UTC destiny's reset time
    const destinyDailyReset = new Date();
    destinyDailyReset.setUTCDate(destinyDailyReset.getUTCDate() + 1)
    destinyDailyReset.setUTCHours(17,0,0,0);

    // Gives a time difference in milliseconds
    const timeDifference = destinyDailyReset - now;

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
            setFormattedSeconds(
                `${String(seconds - 1).padStart(2, '0')}`);
                seconds--;
        }
        if (minutes > 0 && seconds === 0) {
            setFormattedMinutes(
                `${String(minutes - 1).padStart(2, '0')}`);
                minutes--;
                seconds = 60
        }
        if (hours > 0 && minutes === 0) {
            setFormattedHours(
                `${String(hours - 1).padStart(2, '0')}`);
                hours--;
                minutes = 60
        }
        if (hours === 0 && minutes === 0 && seconds === 0) {
            hours = 23
            minutes = 59
            seconds = 60
            setFormattedHours(hours)
            setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
            setFormattedSeconds(seconds)
        }     

    }, 1000);
    return () => timerInterval;
    },[]);

    return (
        <Card>
        <Card.Header className='fs-1'>Daily Reset Timer</Card.Header>
        <Card.Body className ="mb-0 fs-1">
                {formattedHours}:{formattedMinutes}:{formattedSeconds}
        </Card.Body>
      </Card>
    );
}

export default DailyResetTimer