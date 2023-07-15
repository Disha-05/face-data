import React, { useRef, useState } from 'react';
import Toast from './Toast';


const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showToast, setShowToast] = useState(false);


  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        setMediaStream(stream);

        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setShowToast(true); // Show the toast message
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      setShowToast(false); // Stop the toast message
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleSaveVideo = () => {
    if (chunksRef.current.length > 0) {
      const recordedBlob = new Blob(chunksRef.current, { type: chunksRef.current[0].type });
      const videoUrl = URL.createObjectURL(recordedBlob);
      setRecordedVideo(videoUrl);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
      {!isRecording ? (
        <button onClick={handleStartRecording}>Start Recording</button>
      ) : (
        <button onClick={handleStopRecording}>Stop Recording</button>
      )}
      {chunksRef.current.length > 0 && !isRecording && (
        <button onClick={handleSaveVideo}>Save Video</button>
      )}
      {recordedVideo && <video src={recordedVideo} controls />}
      {showToast && <Toast />} {/* Show the toast component */}
    </div>
  );
};

export default VideoRecorder;