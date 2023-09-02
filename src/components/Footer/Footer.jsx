import React from 'react';
import './Footer.css'; // Import CSS for styling (create this file if it doesn't exist)

function Footer() {
  return (
    <div className="footer">
    <footer >
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} InfoSecIITR. All rights reserved.
        </p>
        <p>
          Visit our website: 
          <a
            href="https://infoseciitr.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            InfoSecIITR
          </a>
        </p>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
