import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-maswadeh-blue text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src="/images/logo4.png" alt="Maswadeh Tourism & Travel" className="h-12 mb-4" />
            <p className="text-sm max-w-md">
              {t('homePage.hero.subtitle')}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="mb-2">&copy; {new Date().getFullYear()} Maswadeh Tourism & Travel</p>
            <p className="text-sm text-gray-300">{t('footer.allRightsReserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 