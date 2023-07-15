import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = ({ onVideoStop }) => {
  const webcamRef = useRef(null);

  const handleVideoStop = () => {
    const videoBlob = webcamRef.current.video.blob;
    // Call a function or pass the videoBlob to the parent component for saving
    onVideoStop(videoBlob);
  };

  return <Webcam audio={false} ref={webcamRef} onUserMediaStop={handleVideoStop} />;
};

export default WebcamComponent;
