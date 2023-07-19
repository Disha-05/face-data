import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserForm.css'; // Import the CSS file for styling
import { FaMale, FaFemale, FaGenderless } from 'react-icons/fa';
import boy from '../assets/boy.png';
import girl from '../assets/girl.png';
import igdtuw from '../assets/igdtuw.png';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    state:'',
    religion: '',
    language: '',
  });

  const [formErrors, setFormErrors] = useState({
    nameError: '',
    ageError: '',
    sexError: '',
    stateError: '',
    religionError: '',
    languageError: '',
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
    let valid = true;
    const errors = {};

    if (formData.name.trim() === '') {
      errors.nameError = 'Name is required';
      valid = false;
    }

    if (formData.age === '') {
      errors.ageError = 'Age is required';
      valid = false;
    }

    if (formData.sex === '') {
      errors.sexError = 'Sex is required';
      valid = false;
    }

    if (formData.state === '') {
      errors.stateError = 'State is required';
      valid = false;
    }

    if (formData.religion === '') {
      errors.religionError = 'Religion is required';
      valid = false;
    }

    if (formData.language === '') {
      errors.languageError = 'Language is required';
      valid = false;
    }

    if (valid) {
      console.log(formData);
      navigate('/rec', { state: formData });
    } else {
      setFormErrors(errors);
    }
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
      
      <form className="user-form" onSubmit={handleSubmit}>
        <h1>User Information Form</h1>
        <div className='flex-container'>
          <label className="form-label">
            Name:
            </label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {formErrors.nameError && <span className="error-message">{formErrors.nameError}</span>}
         </div>
        
        <br />
        <div className='flex-container'>
          <label className="form-label">
            Age:
            </label>
            <select
              className="form-input"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            >
              <option value="">Select Age</option>
              {renderAgeOptions()}
            </select>
            {formErrors.ageError && <span className="error-message">{formErrors.ageError}</span>}
          
        </div>
        
        <br />

        <div className='flex-container'>
          <label className="form-label">
            Sex:
          </label>

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
              {formErrors.sexError && <span className="error-message">{formErrors.sexError}</span>}
            </label>
          </div>
        </div>
        
        <br />
        <div className='flex-container'>
          <label className="form-label">
            State:
            </label>
            <select
              className="form-input"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {formErrors.stateError && <span className="error-message">{formErrors.stateError}</span>}
          
        </div>

        <br />
        <div className='flex-container'>
        <label className="form-label">
          Religion:
          </label>
          <select
            className="form-input"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
          >
            <option value="">Select Religion</option>
            {religionOptions.map((religion) => (
              <option key={religion} value={religion}>
                {religion}
              </option>
            ))}
          </select>
          {formErrors.religionError && <span className="error-message">{formErrors.religionError}</span>}
        
        </div>
        
        <br />

        <div className='flex-container'>
        <label className="form-label">
          Language:
          </label>
          <select
            className="form-input"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="">Select Language</option>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          {formErrors.languageError && <span className="error-message">{formErrors.languageError}</span>}
        
        </div>
        
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
