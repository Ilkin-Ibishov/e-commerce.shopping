import React, { useEffect, useState } from 'react';

const Notification = ({ message, show, onClose }) => {
  const [shouldShow, setShouldShow] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldShow(true);
      const timer = setTimeout(() => {
        setShouldShow(false);
        if (onClose) onClose(); // Callback for when it's time to hide the notification
      }, 3000); // Display time before fade, adjust as needed

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!shouldShow) return null;

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 transition-all ease-in-out duration-700 z-20 ${
        shouldShow ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      } bg-green-500 text-white px-4 py-2 rounded shadow`}
      style={{ transition: "opacity 700ms, transform 700ms" }}
    >
      {message}
    </div>
  );
};

export default Notification;
