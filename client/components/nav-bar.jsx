import React from 'react';

export default function NavBar(props) {
  return (
    <nav className="navbar-bg-color">
      <div className="bg-gradient-to-r gradient-cotton-candy" />
      <div className="px-8 max-w-6xl mx-auto">
        <div className="flex justify-between">
          <div>
            <a href="#" className="flex items-center py-2 px-3 navbar-item-color font-family-alber-sans">
              <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              <span>DnDFuze</span>
            </a>
          </div>
          <div />
          <div className="flex items-center space-x-3 navbar-item-color font-family-albert-sans navbar-items">
            Register
          </div>
          <div className="flex items-center space-x-3 navbar-item-color font-family-albert-sans navbar-items">
            Sign in
          </div>
        </div>
      </div>
    </nav>
  );
}
