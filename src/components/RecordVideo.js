import React, { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/RecordVideo.css';

const RecordVideo = () => {
  // Import the SpeechRecognition API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showFaceMetric, setShowFaceMetric] = useState(false);
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);

  const handleNextMetric = () => {
    setCurrentMetricIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % faceMetrics.length;
      if (nextIndex === 0) {
        setShowFaceMetric(false);
        mediaRecorderRef.current.stop();
        captureImage();
      } else {
        const toastMessage = faceMetrics[nextIndex];
        const speech = new SpeechSynthesisUtterance(toastMessage);
        window.speechSynthesis.speak(speech);
        captureImage();
      }
      if(nextIndex!==0){
        return nextIndex;
      }
      
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

    setIsRecording(false);
    setShowFaceMetric(false);
    setCurrentMetricIndex(0);
    setMediaStream(null);
    chunksRef.current = [];
  };

  const handleSubmitVideo = () => {
    toast.success('Video submitted!', { toastStyle: { className: 'custom-toast' }, position: 'top-right', style: { top: '50px' }, autoClose: 3500 });



    const confirmationMessage = 'Video submitted!';
    const speech = new SpeechSynthesisUtterance(confirmationMessage);
    window.speechSynthesis.speak(speech);
  };

  const faceMetrics = ['Look Front', 'Look Up', 'Look Down', 'Look Left', 'Look Right', 'Put your mask on', 'Put your spectacles on'];

  useEffect(() => {
    if (isRecording && currentMetricIndex === 0) {
      const toastMessage = faceMetrics[currentMetricIndex];
      const speech = new SpeechSynthesisUtterance(toastMessage);
      window.speechSynthesis.speak(speech);
      recognition.start();
      return () => {
        recognition.stop();
      };
    }
  }, [isRecording, currentMetricIndex]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }, []);

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
      {showFaceMetric && <div className="face-metric-card">{faceMetrics[currentMetricIndex]}</div>}
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
      <ToastContainer position="top-right" style={{ top: '50px' }} />

    </div>
  );
};

export default RecordVideo;
