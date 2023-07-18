import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import DataCollection from './components/DataCollection';
import VideoRecorder from './components/VideoRecorder';
import FaceData from './components/FaceData';
import RecordVideo from './components/RecordVideo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/data" element={<DataCollection />} />
        <Route path="/video" element={<VideoRecorder />} />
        <Route path="/face" element={<FaceData />} />
        <Route path="/rec" element={<RecordVideo />} />
      </Routes>
    </Router>
  );
};

export default App;
