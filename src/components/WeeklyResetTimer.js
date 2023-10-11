import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';

const WeeklyResetTimer = () => {
  const [formattedDays, setFormattedDays] = useState('');
  const [formattedHours, setFormattedHours] = useState('');
  const [formattedMinutes, setFormattedMinutes] = useState('');
  const [formattedSeconds, setFormattedSeconds] = useState('');

  useEffect(() => {
    // Create a function to calculate the time until the next Tuesday at 17:00 UTC
    function calculateTimeUntilNextTuesday() {
      let now = new Date();
      let currentDay = now.getUTCDay();
      let daysUntilTuesday = (9 - currentDay) % 7; // 9 is Tuesday when Sunday is 0
      let nextTuesday = new Date(now);
      nextTuesday.setUTCDate(now.getUTCDate() + daysUntilTuesday);
      nextTuesday.setUTCHours(17, 0, 0, 0);
      let timeDifference = nextTuesday - now;
      // Adds a 7 days if time time difference is negative
      if (timeDifference < 0 ) {
        nextTuesday.setUTCDate(nextTuesday.getUTCDate() + 7)
        timeDifference = nextTuesday - now;
      }
      return timeDifference;
    }

    // Calculate the initial time difference
    let initialTimeDifference = calculateTimeUntilNextTuesday();


    // Calculate the total number of seconds from the time difference
    let secondsDifference = Math.floor(initialTimeDifference / 1000);

    // Calculate days, hours, minutes, and seconds
    let days = Math.floor(secondsDifference / (3600 * 24));
    secondsDifference %= 3600 * 24;
    let hours = Math.floor(secondsDifference / 3600);
    secondsDifference %= 3600;
    let minutes = Math.floor(secondsDifference / 60);
    // Weekly reset timer was off by a second so I added the second here
    let seconds = secondsDifference % 60 + 1;
    
    // Setting days hours minutes and seconds for initial component load
    const formattedDaysStr = `${String(days).padStart(2, '0')}d`;
    const formattedHoursStr = `${String(hours).padStart(2, '0')}`;
    const formattedMinutesStr = `${String(minutes).padStart(2, '0')}`;
    const formattedSecondsStr = `${String(seconds).padStart(2, '0')}`;

    setFormattedDays(formattedDaysStr);
    setFormattedHours(formattedHoursStr);
    setFormattedMinutes(formattedMinutesStr);
    setFormattedSeconds(formattedSecondsStr);

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
        if (days > 0 && hours === 0 && minutes === 0 && seconds === 0) {
          days--;
          hours = 23
          minutes = 59
          seconds = 59
          setFormattedDays(`${String(days).padStart(2, '0')}d`);
          setFormattedHours(`${String(hours).padStart(2, '0')}`);
          setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
          setFormattedSeconds(`${String(seconds).padStart(2, '0')}`);
        }
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          days = 7
          hours = 0
          minutes = 0
          seconds = 0
          setFormattedDays(`${String(days).padStart(2, '0')}d`);
          setFormattedHours(`${String(hours).padStart(2, '0')}`);
          setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
          setFormattedSeconds(`${String(seconds).padStart(2, '0')}`);
        }        

    }, 1000);
    return () => timerInterval;

  }, []);

  return (
    <Card>
      <Card.Header className='fs-2 bg-dark'>Weekly Reset Timer</Card.Header>
      <Card.Body className="mb-0 fs-2 bg-light">
            {formattedDays} {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </Card.Body>
    </Card>
  );
};

export default WeeklyResetTimer;