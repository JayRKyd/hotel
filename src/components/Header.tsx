import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header p-4 fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-maswadeh-blue/95 backdrop-blur-sm shadow-lg' : 'bg-maswadeh-blue'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Maswadeh Tourism & Travel" className="h-12" />
        </Link>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-20 md:top-0 left-0 md:left-auto right-0 md:right-auto bg-maswadeh-blue md:bg-transparent flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 p-4 md:p-0 z-50`}>
          <Link 
            to="/" 
            className={`text-white hover:text-maswadeh-cyan font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-maswadeh-cyan after:origin-center after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${location.pathname === '/' ? 'after:scale-x-100' : ''}`}
          >
            {t('common.home')}
          </Link>
          <Link 
            to="/quote" 
            className={`text-white hover:text-maswadeh-cyan font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-maswadeh-cyan after:origin-center after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${location.pathname === '/quote' ? 'after:scale-x-100' : ''}`}
          >
            {t('common.quote')}
          </Link>
          <Link 
            to="/detailed-quote" 
            className={`text-white hover:text-maswadeh-cyan font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-maswadeh-cyan after:origin-center after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${location.pathname === '/detailed-quote' ? 'after:scale-x-100' : ''}`}
          >
            {t('common.detailedQuote')}
          </Link>
 

          <Link 
            to="/about" 
            className={`text-white hover:text-maswadeh-cyan font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-maswadeh-cyan after:origin-center after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${location.pathname === '/about-us' ? 'after:scale-x-100' : ''}`}
          >
            {t('common.about')}
          </Link>
          <Link 
            to="/admin" 
            className={`text-white hover:text-maswadeh-cyan font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-maswadeh-cyan after:origin-center after:transform after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${location.pathname.startsWith('/admin') ? 'after:scale-x-100' : ''}`}
          >
            {t('header.adminPanel')}
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <div className="md:hidden">
            <button 
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
