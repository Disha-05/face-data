import React, { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecordVideo = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showFaceMetric, setShowFaceMetric] = useState(false);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  const handleStartRecording = () => {
    setShowFaceMetric(true);
    setCurrentMetricIndex(0); // Reset the current metric index to start from the front
    chunksRef.current = []; // Clear the chunksRef
    setRecordedVideo(null); // Clear the recorded video URL

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        setMediaStream(stream);

        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.addEventListener('stop', handleSaveVideo);
        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
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

    setIsRecording(false); // Reset the recording state
    setShowFaceMetric(false); // Hide the face metric card
    setCurrentMetricIndex(0); // Reset the current metric index
    setMediaStream(null); // Clear the media stream
    chunksRef.current = []; // Clear the chunksRef
  };

  const handleSubmitVideo = () => {
    // Perform the video submission logic here
    alert('Video submitted!'); // Show the alert for video submission
  };

  const faceMetrics = ['Front', 'Up', 'Down', 'Left', 'Right', 'With Mask', 'With Spectacles'];

  useEffect(() => {
    let intervalId;
    if (isRecording) {
      intervalId = setInterval(() => {
        setCurrentMetricIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex === faceMetrics.length) {
            clearInterval(intervalId);
            setShowFaceMetric(false);
            mediaRecorderRef.current.stop(); // Stop recording after all face metrics
          } else {
            // Show toast message for the current face metric
            toast.info(faceMetrics[nextIndex], {
              autoClose: 3000, // Automatically close the toast after 3 seconds
              position: toast.POSITION.TOP_CENTER // Set the position of the toast
            });
          }
          return nextIndex % faceMetrics.length;
        });
      }, 3000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRecording]);

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
      {!isRecording ? (
        <button onClick={handleStartRecording}>
          {recordedVideo ? 'Re-record' : 'Start Recording'}
        </button>
      ) : (
        <button disabled>Recording...</button>
      )}
      {recordedVideo && (
        <div>
          <video src={recordedVideo} controls />
          <button onClick={handleSubmitVideo}>Submit Video</button>
        </div>
      )}
      {showFaceMetric && (
        <div className="face-metric-card">{faceMetrics[currentMetricIndex]}</div>
      )}
      <ToastContainer /> {/* Add the ToastContainer component */}
    </div>
  );
};

export default RecordVideo;