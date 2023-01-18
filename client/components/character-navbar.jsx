import React from 'react';
import { Link } from 'react-router-dom';

export default function CharacterNavbar(props) {
  return (
    <nav className="navbar-bg-color">
      <div className="flex flex-row px-8 max-w-6xl mx-auto">
        <a href="#" className="flex items-center py-2 px-3 navbar-item-color font-family-albert-sans">
          <svg className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor">
            <path strokeLinecap="round"
                strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          <span className="mr-10">DnDFuze</span>
        </a>
        <div className="flex items-center space-x-10 navbar-item-color font-family-albert-sans navbar-items">
          <Link to='/characters'>Characters</Link>
          <Link to='/characters/create'>Create</Link>
          <Link to ='/sign-out'>Sign Out</Link>
        </div>
      </div>
    </nav>
  );
}
