import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} © 2021 All Rights Reserved | Indira Gandhi Delhi Technical University for Women (IGDTUW)
      </p>
    </footer>
  );
};

export default Footer;
