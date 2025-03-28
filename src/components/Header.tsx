
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Maswadeh Tourism & Travel" className="h-12" />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-maswadeh-cyan font-medium">Home</Link>
          <Link to="/quote" className="text-white hover:text-maswadeh-cyan font-medium">Get Quote</Link>
          <Link to="#" className="text-white hover:text-maswadeh-cyan font-medium">Destinations</Link>
          <Link to="#" className="text-white hover:text-maswadeh-cyan font-medium">Services</Link>
          <Link to="#" className="text-white hover:text-maswadeh-cyan font-medium">Contact</Link>
        </nav>
        <div className="md:hidden">
          <button className="text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
