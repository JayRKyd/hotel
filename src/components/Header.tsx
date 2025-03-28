
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Maswadeh Tourism & Travel" className="h-12" />
        </Link>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-20 md:top-0 left-0 md:left-auto right-0 md:right-auto bg-[#001e64] md:bg-transparent flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 p-4 md:p-0 z-50`}>
          <Link to="/" className="text-white hover:text-maswadeh-cyan font-medium">Home</Link>
          <Link to="/quote" className="text-white hover:text-maswadeh-cyan font-medium">Get Quote</Link>
          <Link to="/detailed-quote" className="text-white hover:text-maswadeh-cyan font-medium">Sample Quote</Link>
          <Link to="#" className="text-white hover:text-maswadeh-cyan font-medium">Destinations</Link>
          <Link to="#" className="text-white hover:text-maswadeh-cyan font-medium">Services</Link>
          <Link to="#" className="text-white hover:text-maswadeh-cyan font-medium">Contact</Link>
        </nav>
        <div className="md:hidden">
          <button 
            className="text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
