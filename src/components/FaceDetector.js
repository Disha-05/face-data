import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetector = ({ videoBlob }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModelsAndDetect = async () => {
      await faceapi.loadSsdMobilenetv1Model('/models');
      await faceapi.loadFaceLandmarkModel('/models');
      await faceapi.loadFaceRecognitionModel('/models');

      const video = videoRef.current;
      const videoEl = document.createElement('video');
      videoEl.src = URL.createObjectURL(videoBlob);

      videoEl.addEventListener('loadedmetadata', async () => {
        video.width = videoEl.videoWidth;
        video.height = videoEl.videoHeight;
        video.srcObject = videoEl.srcObject;

        const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks();
        // Analyze the detected faces and movements here
      });
    };

    loadModelsAndDetect();

    return () => {
      // Clean up any resources if needed
    };
  }, [videoBlob]);

  return <video ref={videoRef} autoPlay muted />;
};

export default FaceDetector;
