'use client'
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [time, setTime] = useState<number>(0);

  const scheduleNotification = (seconds: number) => {
    if (Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification('Time is up!', {
          body: 'This is your scheduled notification.',
        });
      }, seconds * 1000);
    } else {
      alert('Notifications are not enabled.');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          scheduleNotification(time);
        }
      });
    } else {
      scheduleNotification(time);
    }
  };

  return (
    <div>
      <h1>Schedule a Notification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="time">Time (seconds):</label>
          <input
            type="number"
            id="time"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Schedule Notification</button>
      </form>
    </div>
  );
};

export default Home;
