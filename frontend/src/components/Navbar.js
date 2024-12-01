import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: Add styles for the header

function Navbar() {
  return (
    <nav className="header">
      <ul className="nav-links">
        <li>
          <Link to="/components">Component Form</Link>
        </li>
        <li>
          <Link to="/vehicles">Vehicle Form</Link>
        </li>
        <li>
          <Link to="/issues">Issue Form</Link>
        </li>
        <li>
          <Link to="/revenue">Revenue Graphs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
