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
      const now = new Date();
      const currentDay = now.getUTCDay();
      const daysUntilTuesday = (9 - currentDay) % 7; // 9 is Tuesday when Sunday is 0
      const nextTuesday = new Date(now);
      nextTuesday.setUTCDate(now.getUTCDate() + daysUntilTuesday);
      nextTuesday.setUTCHours(17, 0, 0, 0);
      const timeDifference = nextTuesday - now;
      return timeDifference;
    }

    // Calculate the initial time difference
    const initialTimeDifference = calculateTimeUntilNextTuesday();

    // Calculate the total number of seconds from the time difference
    let secondsDifference = Math.floor(initialTimeDifference / 1000);

    // Calculate days, hours, minutes, and seconds
    let days = Math.floor(secondsDifference / (3600 * 24));
    secondsDifference %= 3600 * 24;
    let hours = Math.floor(secondsDifference / 3600);
    secondsDifference %= 3600;
    let minutes = Math.floor(secondsDifference / 60);
    let seconds = secondsDifference % 60;

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
        if (hours > 0 && minutes === 0 && seconds === 0) {
            setFormattedHours(
                `${String(hours - 1).padStart(2, '0')}`);
                hours--;
                minutes = 60
        }
        if (days > 0 && hours === 0 && minutes === 0 && seconds === 0) {
            setFormattedDays(`${String(days - 1).padStart(2, '0')}d`);
                days--;
                hours = 23
                minutes = 59
                seconds = 60
                setFormattedHours(hours)
                setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
                setFormattedSeconds(seconds)
        }
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            days = 6
            hours = 23
            minutes = 59
            seconds = 60
            setFormattedDays(`${String(days).padStart(2, '0')}d`)
            setFormattedHours(hours)
            setFormattedMinutes(`${String(minutes).padStart(2, '0')}`);
            setFormattedSeconds(seconds)
        }        

    }, 1000);
    return () => timerInterval;

  }, []);

  return (
    <Card>
      <Card.Header className='fs-1 bg-dark'>Weekly Reset Timer</Card.Header>
      <Card.Body className="mb-0 fs-1 bg-light">
            {formattedDays} {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </Card.Body>
    </Card>
  );
};

export default WeeklyResetTimer;