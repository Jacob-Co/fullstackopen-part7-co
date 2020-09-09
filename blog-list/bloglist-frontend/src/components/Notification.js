import React from 'react';
import { useSelector } from 'react-redux';

import '../component-styles/notification.css';

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) return null

  const { message, status } = notification

  return (
    <div className={`notification ${status}`}>
      {message}
    </div>
  );
};

export default Notification;
