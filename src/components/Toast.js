import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const [message, setMessage] = useState('');
  const messages = ['Look Up', 'Look Down', 'Look Right', 'Look Left'];
  let currentIndex = 0;
  const lastIndex = messages.length - 1;
  const [lastMessageShown, setLastMessageShown] = useState(false);

  useEffect(() => {
        const interval = setInterval(() => {
      setMessage(messages[currentIndex]);
      currentIndex = (currentIndex + 1) % messages.length;
      if (currentIndex === lastIndex) {
        setLastMessageShown(true);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (message) {
      toast.info(message);

      if (lastMessageShown) {
        setTimeout(() => {
          toast.dismiss(); // Dismiss the toast after the last message is displayed
        }, 5000);
      }
    }
  }, [message, currentIndex, lastIndex]);

  return (
    <>
      <ToastContainer /> {/* Render the toast container */}
    </>
  );
};

export default Toast;
