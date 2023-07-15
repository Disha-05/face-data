import { nets } from 'face-api.js';

export const loadModels = async () => {
  await nets.tinyFaceDetector.loadFromUri('/models');
  await nets.faceLandmark68Net.loadFromUri('/models');
  await nets.tinyYolov2.loadFromUri('/models');
  // Add any other models you require
};
