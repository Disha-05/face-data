import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const DataCollection = () => {
  const location = useLocation();
  console.log(location.state); 
  const formData = location.state;
  console.log(formData); 
  if (!formData) {
    return <div>Loading...</div>; // Or handle the case when data is not available
  }

  return (
    <div>
      <h1>Data Collection</h1>
      <ul>
        <li>Name: {formData.name}</li>
        <li>Age: {formData.age}</li>
        <li>Sex: {formData.sex}</li>
        <li>State:{formData.state}</li>
        <li>Religion: {formData.religion}</li>
        <li>Language: {formData.language}</li>
      </ul>
    </div>
  );
};

export default DataCollection;
