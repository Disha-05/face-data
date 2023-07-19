import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import DataCollection from './components/DataCollection';
import RecordVideo from './components/RecordVideo';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <div>
    <Header/>
      <Router>
            <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/data" element={<DataCollection />} />
        <Route path="/rec" element={<RecordVideo />} />
      </Routes>
    <Footer/>
    </Router>
    </div>
   
  );
};

export default App;
