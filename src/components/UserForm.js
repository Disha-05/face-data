import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserForm.css'; // Import the CSS file for styling
import { FaMale, FaFemale, FaGenderless } from 'react-icons/fa';
import boy from '../assets/boy.png';
import girl from '../assets/girl.png';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    state:'',
    religion: '',
    language: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    navigate('/data', { state: formData });
  };

  const renderAgeOptions = () => {
    const ageOptions = [];
    for (let i = 10; i <= 85; i++) {
      ageOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return ageOptions;
  };

  const religionOptions = [
    'Hindu',
    'Muslim',
    'Christian',
    'Sikh',
    'Buddhist',
    'Jain',
    'Other',
  ];

  const stateOptions = ["Andhra Pradesh",  "Arunachal Pradesh",  "Assam",  "Bihar",  "Chhattisgarh",  "Goa",  "Gujarat",  "Haryana",  "Himachal Pradesh",  "Jharkhand",  "Karnataka",  "Kerala",  "Madhya Pradesh",  "Maharashtra",  "Manipur",  "Meghalaya",  "Mizoram",  "Nagaland",  "Odisha",  "Punjab",  "Rajasthan",  "Sikkim",  "Tamil Nadu",  "Telangana",  "Tripura",  "Uttar Pradesh",  "Uttarakhand",  "West Bengal"];

  const languageOptions = [
    
    'Hindi',
    'English',
    'Assamese',
    'Bengali',
    'Bodo',
    'Dogri',
    'Gujrati',
    'Kannada',
    'Kashmiri',
    'Konkani',
    'Maithili',
    'Malayalam',
    'Manipuri',
    'Marathi',
    'Nepali',
    'Odia',
    'Punjabi',
    'Sanskrit',
    'Santali',
    'Sindhi',
    'Tamil',
    'Telugu',
    'Urdu',
    'Other',
  ];

  return (
    <div className="user-form-card">
      <div className="user-form-heading">
      <div className="image-container">
      <img src={girl} alt="Girl" className="heading-image" />
        <img src={boy} alt="Boy" className="heading-image" />
        </div>
        <h2>Let's Get Started</h2>
      </div>
      <form className="user-form" onSubmit={handleSubmit}>
        <h1>User Information Form</h1>
        <label className="form-label">
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Age:
          <select
            className="form-input"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          >
            <option value="">Select Age</option>
            {renderAgeOptions()}
          </select>
        </label>
        <br />
        <label className="form-label">
  Sex:
</label>
<br />
<div className="radio-container">
  <label className="radio-label">
    <input
      type="radio"
      name="sex"
      value="male"
      checked={formData.sex === 'male'}
      onChange={handleChange}
    />
    <span className={`radio-button ${formData.sex === 'male' ? 'selected' : ''}`}>
      <FaMale className={`gender-icon ${formData.sex === 'male' ? 'selected' : ''}`} />
    </span>
    Male
  </label>
  <label className="radio-label">
    <input
      type="radio"
      name="sex"
      value="female"
      checked={formData.sex === 'female'}
      onChange={handleChange}
    />
    <span className={`radio-button ${formData.sex === 'female' ? 'selected' : ''}`}>
      <FaFemale className={`gender-icon ${formData.sex === 'female' ? 'selected' : ''}`} />
    </span>
    Female
  </label>
  <label className="radio-label">
    <input
      type="radio"
      name="sex"
      value="other"
      checked={formData.sex === 'other'}
      onChange={handleChange}
    />
    <span className={`radio-button ${formData.sex === 'other' ? 'selected' : ''}`}>
      <FaGenderless className={`gender-icon ${formData.sex === 'other' ? 'selected' : ''}`} />
    </span>
    Other
  </label>
</div>
<br />
<label className="form-label">
          State:
          <select
            className="form-input"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="form-label">
          Religion:
          <select
            className="form-input"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
          >
            <option value="">Select Religion</option>
            {religionOptions.map((religion) => (
              <option key={religion} value={religion}>
                {religion}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label className="form-label">
          Language:
          <select
            className="form-input"
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Select Language</option>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
