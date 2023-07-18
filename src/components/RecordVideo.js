import React, { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/RecordVideo.css';

const RecordVideo = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showFaceMetric, setShowFaceMetric] = useState(false);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [currentToastId, setCurrentToastId] = useState(null);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);

  const handleNextMetric = () => {
    setCurrentMetricIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % faceMetrics.length;
      if (nextIndex === 0) {
        setShowFaceMetric(false);
        mediaRecorderRef.current.stop();
        captureImage();
      } else {
        // Dismiss the previous toast if it exists
        if (currentToastId) {
          toast.dismiss(currentToastId);
        }

        // Show toast message for the next face metric
        const toastId = toast.info(faceMetrics[nextIndex], {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false, // Remove the timer from the toast
        });
        setCurrentToastId(toastId);
        captureImage();
      }
      return nextIndex;
    });
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/png');
    setCapturedImages((prevImages) => [...prevImages, image]);
  };

  const handleStartRecording = () => {
    setShowFaceMetric(true);
    setCurrentMetricIndex(0);
    chunksRef.current = [];
    setRecordedVideo(null);
    setCapturedImages([]);

    // Remove any existing toasts before starting recording
    toast.dismiss();

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
        setIsRecordingStarted(true);
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
    if (isRecording && currentMetricIndex === 0) {
      // Show initial toast message for the first face metric
      const toastId = toast.info(faceMetrics[currentMetricIndex], {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false, // Remove the timer from the toast
      });

      setCurrentToastId(toastId);

      return () => {
        // Remove the toast when the component unmounts or when the next toast is shown
        if (currentToastId) {
          toast.dismiss(currentToastId);
        }
      };
    }
  }, [isRecording, currentMetricIndex]);

  return (
    <div className="record-video-container">
      <div className="video-container">
        <video ref={videoRef} autoPlay={true} className="video-preview" />
        {!isRecordingStarted ? (
          <button className="record-button" onClick={handleStartRecording}>
            {recordedVideo ? 'Re-record' : 'Start Recording'}
          </button>
        ) : (
          <>
            {isRecording ? (
              <button className="record-button" disabled>
                Recording...
              </button>
            ) : (
              <button className="record-button" onClick={handleStartRecording}>
                Re-record
              </button>
            )}
          </>
        )}
      </div>
      {recordedVideo && !isRecording && (
        <div className="recorded-video-container">
          <video src={recordedVideo} controls className="recorded-video" />
          
        </div>
      )}
      {showFaceMetric && (
        <div className="face-metric-card">{faceMetrics[currentMetricIndex]}</div>
      )}
      {isRecordingStarted && (
        <button className="next-metric-button" onClick={handleNextMetric} disabled={!isRecording}>
          Capture
        </button>
      )}
      {capturedImages.length > 0 && !isRecording && (
        <div className="captured-images-container">
          {capturedImages.map((image, index) => (
            <img key={index} src={image} alt={`Captured ${index + 1}`} className="captured-image" />
          ))}
          <button className="submit-button" onClick={handleSubmitVideo}>
            Submit
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RecordVideo;
