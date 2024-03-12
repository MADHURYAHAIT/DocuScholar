import React, { useState, useEffect } from 'react';
import moment from 'moment';

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [Time, setTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const formattedDateTime = moment().format('dddd, MMM D');
      const formattedTime = moment().format('HH:mm'); // Use 'HH' for 24-hour format
      setCurrentDateTime(formattedDateTime);
      setTime(formattedTime);
    };

    // Update every second
    const intervalId = setInterval(updateDateTime, 10000); // Change to 1000 for updating every second

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='dt'>
      <b>{currentDateTime}</b>, {Time}
    </div>
  );
};

export default DateTimeComponent;
