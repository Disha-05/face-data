import React from 'react';
import logo from '../assets/igdtuw.png'; // Replace with your logo image
import '../styles/Header.css';


const Header = () => {
    return (
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <div className="organization-details">
            <h1 className="organization-name">Indira Gandhi Delhi Technical University for Women (IGDTUW)</h1>
            <p className="address">Kashmere Gate, Delhi - 110006</p>
            <p className="address">(An ISO 9001:2015 Certified University)</p>
          </div>
        </div>
      
      </header>
    );
  };
  
  export default Header;