import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import DataCollection from './components/DataCollection';
import RecordVideo from './components/RecordVideo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/data" element={<DataCollection />} />
        <Route path="/rec" element={<RecordVideo />} />
      </Routes>
    </Router>
  );
};

export default App;
