import React, { useState } from 'react';
import WebcamComponent from './WebcamComponent';
import FaceDetector from './FaceDetector';

const FaceData = () => {
  const [videoBlob, setVideoBlob] = useState(null);
  const [recording, setRecording] = useState(false);

  const handleStartVideo = () => {
    setRecording(true);
  };

  const handleStopVideo = (blob) => {
    setVideoBlob(blob);
    setRecording(false);
  };

  return (
    <div>
      {!videoBlob ? (
        <div>
          {!recording ? (
            <button onClick={handleStartVideo}>Start Video</button>
          ) : (
            <WebcamComponent onVideoStop={handleStopVideo} />
          )}
        </div>
      ) : (
        <FaceDetector videoBlob={videoBlob} />
      )}
    </div>
  );
};

export default FaceData;
