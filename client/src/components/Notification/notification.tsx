import React from 'react';
import { FaBell } from 'react-icons/fa';
import './notification.css';

interface NotificationIconProps {
  hasNotifications: boolean;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ hasNotifications }) => {
  return (
    <div className="notification-icon-container">
      <FaBell size={24} color={hasNotifications ? 'red' : 'gray'} />
      {hasNotifications && <span className="notification-badge" />}
    </div>
  );
};

export default NotificationIcon;
