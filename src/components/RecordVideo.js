import React, { useRef, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/RecordVideo.css';
import axios from 'axios';
import * as faceapi from 'face-api.js';


const RecordVideo = () => {
  // Import the SpeechRecognition API
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const canvasRef = useRef(null);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [videoString, setVideoString]=useState(null);
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

  // const captureImage = () => {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;
  //   const context = canvas.getContext('2d');
  //   context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  //   const image = canvas.toDataURL('image/png');
  //   setCapturedImages((prevImages) => [...prevImages, image]);
  // };

  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    // Detect faces on the captured frame
    const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions());
  
    // Crop and save the detected face images
    detections.forEach((detection, index) => {
      const { x, y, width, height } = detection.box;
      const faceCanvas = document.createElement('canvas');
      faceCanvas.width = width;
      faceCanvas.height = height;
      const faceContext = faceCanvas.getContext('2d');
      faceContext.drawImage(canvas, x, y, width, height, 0, 0, width, height);
      const faceImage = faceCanvas.toDataURL('image/png');
      setCapturedImages((prevImages) => [...prevImages, faceImage]);
    });
  };
  

  // const faceMyDetect = async () => {
  //   const canvas = faceapi.createCanvasFromMedia(videoRef.current);
  //   document.body.append(canvas);
  
  //   const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
  //   faceapi.matchDimensions(canvas, displaySize);
  
  //   setInterval(async () => {
  //     const detections = await faceapi.detectAllFaces(videoRef.current,
  //       new faceapi.TinyFaceDetectorOptions());
  
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
  //     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  //     faceapi.draw.drawDetections(canvas, resizedDetections);
  //   }, 1000);
  // };
  
  const faceMyDetect = ()=>{
    setInterval(async()=>{
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions())

      // DRAW YOU FACE IN WEBCAM
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
      faceapi.matchDimensions(canvasRef.current,{
        width:940,
        height:650
      })

      const resized = faceapi.resizeResults(detections,{
         width:940,
        height:650
      })

      faceapi.draw.drawDetections(canvasRef.current,resized)
      


    },100)
  }

  

//   const faceMyDetect = ()=>{
//     const canvas=faceapi.createCanvasFromMedia(videoRef)
//     document.body.append(canvas)
//     const displaySize={width: videoRef.width, height: videoRef.height}
//     setInterval(async()=>{
//       const detections = await faceapi.detectAllFaces(videoRef.current,
//         new faceapi.TinyFaceDetectorOptions())
// console.log(detections)
//       // DRAW YOU FACE IN WEBCAM
//       const resizedDetections= faceapi.resizeResults(detections, displaySize) 
//       faceapi.draw.drawDetections(canvas.resizedDetections)
      


//     },100)
//   }
  

  // const handleStartRecording = async () => {
  //   setShowFaceMetric(true);
  //   setCurrentMetricIndex(0);
  //   chunksRef.current = [];
  //   setRecordedVideo(null);
  //   setCapturedImages([]);
  //   setVideoString(null);

  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then(async(stream) => {
  //       videoRef.current.srcObject = stream;
  //       mediaRecorderRef.current = new MediaRecorder(stream);
  //       //setMediaStream(stream);

  //       mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
  //       mediaRecorderRef.current.addEventListener('stop', handleSaveVideo);
  //       //mediaRecorderRef.current.start();

  //       // Start face detection
  // await faceapi.nets.tinyFaceDetector.loadFromUri('/models'); // Load face detection model
  
  // const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());

  // if (detections.length > 0) {
  //   faceMyDetect();
  //   setIsRecordingStarted(true);
  //   mediaRecorderRef.current.start();
  //   setIsRecording(true);
    
  // } else {
  //   console.log('No face detected.');
  //   // Handle case when no face is detected (e.g., show an error message)
  //   alert("No face detected");
  // }
  //     })
  //     .catch((error) => {
  //       console.error('Error accessing camera:', error);
  //     });
  // };

  const handleStartRecording = async () => {
    setShowFaceMetric(true);
    setCurrentMetricIndex(0);
    chunksRef.current = [];
    setRecordedVideo(null);
    setCapturedImages([]);
    setVideoString(null);
  
    try {
      // Check camera permission
      const cameraPermission = await navigator.permissions.query({ name: 'camera' });
  
      if (cameraPermission.state === 'granted') {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.addEventListener('stop', handleSaveVideo);
  
        // Load the face detection model
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        
        // Detect faces
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
  
        if (detections.length > 0) {
          faceMyDetect();
          setIsRecordingStarted(true);
          mediaRecorderRef.current.start();
          setIsRecording(true);
        } else {
          console.log('No face detected.');
          // Handle case when no face is detected (e.g., show an error message)
          alert('No face detected');
        }
      } else if (cameraPermission.state === 'prompt') {
        // The user might be prompted to grant permission
        console.log('Camera permission prompt');
      } else {
        // Permission denied
        console.error('Camera permission denied');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
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
  
      const blobToBase64 = (videoUrl) => {
        return new Promise(async (resolve, _) => {
          // do a request to the blob uri
          const response = await fetch(videoUrl);
  
          // response has a method called .blob() to get the blob file
          const blob = await response.blob();
  
          // instantiate a file reader
          const fileReader = new FileReader();
  
          // read the file
          fileReader.readAsDataURL(blob);
  
          fileReader.onloadend = function () {
            resolve(fileReader.result); // Here is the base64 string
          };
        });
      };

  
      // Using an IIFE to use await inside a non-async function
      (async () => {
        const base64String = await blobToBase64(videoUrl);
        console.log(base64String); // i.e: data:image/jpeg;base64,/9j/4AAQSkZJ..
        setVideoString(base64String);
      
      })();
    }
  
    setIsRecording(false);
    setShowFaceMetric(false);
    setCurrentMetricIndex(0);
    setMediaStream(null);
    chunksRef.current = [];
  };
  

  const handleSubmitVideo = () => {

    toast.success('Video submitted!', { toastStyle: { className: 'custom-toast' }, position: 'top-right', style: { top: '50px' }, autoClose: 3500 });

    const dataToSend = {
      ...formData,
      recordedVideoUrl: videoString,
      lookFrontMetric: capturedImages[0] ,
      lookUpMetric: capturedImages[1],
      lookDownMetric: capturedImages[2],
      lookLeftMetric: capturedImages[3],
      lookRightMetric: capturedImages[4],
      maskOnMetric: capturedImages[5],
      spectaclesOnMetric: capturedImages[6],
    };

    axios
      .post('http://localhost:8082/api/formDataRoutes', dataToSend)
      .then((res) => {
        // Handle successful response
        // setFormData({
        //   name: '',
        //   age: '',
        //   sex: '',
        //   state: '',
        //   religion: '',
        //   language: '',
        // });
        // navigate('/data', { state: formData });
      })
      .catch((err) => {
        console.log('Error in Form Data Collection!');
      });
  
    const confirmationMessage = 'Video submitted!';
    const speech = new SpeechSynthesisUtterance(confirmationMessage);
    window.speechSynthesis.speak(speech);
    navigate('/');
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
        <canvas ref={canvasRef} className="face-canvas" />
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
