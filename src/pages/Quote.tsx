
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import QuoteBox from '@/components/QuoteBox';
import WaveShape from '@/components/WaveShape';
import { Plane, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Quote = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section - Enhanced with more height and spacing */}
        <section className="relative bg-maswadeh-blue py-24 px-4 text-white min-h-[60vh] flex items-center">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('quotePage.title')}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              {t('quotePage.subtitle')}
            </p>
            <Link to="/detailed-quote">
              <Button className="bg-maswadeh-orange hover:bg-orange-600 text-white px-8 py-6 text-lg">
                {t('common.detailedQuote')}
              </Button>
            </Link>
          </div>
          {/* Background elements */}
          <div className="absolute top-1/4 right-0 w-80 h-80 opacity-10">
            <Plane size={300} />
          </div>
          <div className="absolute bottom-0 left-10 w-64 h-64 opacity-5">
            <Plane size={240} className="rotate-45" />
          </div>
        </section>
        
        {/* Wave Divider */}
        <WaveShape color="#e6f7fc" />
        
        {/* Quote Form Section */}
        <section className="quote-section py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-maswadeh-blue mb-6">{t('homePage.whyChooseUs.title')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-cyan p-3 rounded-full text-white">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">{t('homePage.destinations.title')}</h3>
                      <p className="text-gray-600">{t('homePage.destinations.subtitle')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-orange p-3 rounded-full text-white">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">{t('homePage.whyChooseUs.reason1.title')}</h3>
                      <p className="text-gray-600">{t('homePage.whyChooseUs.reason1.description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-cyan p-3 rounded-full text-white">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">{t('homePage.whyChooseUs.reason2.title')}</h3>
                      <p className="text-gray-600">{t('homePage.whyChooseUs.reason2.description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-orange p-3 rounded-full text-white">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">{t('homePage.whyChooseUs.reason3.title')}</h3>
                      <p className="text-gray-600">{t('homePage.whyChooseUs.reason3.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex justify-center">
                <QuoteBox />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-maswadeh-blue text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/images/logo4.png" alt="Maswadeh Tourism & Travel" className="h-12 mb-4" />
              <p className="text-sm max-w-md">
                Maswadeh Tourism & Travel provides premium travel experiences with personalized service and competitive pricing.
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="mb-2">&copy; {new Date().getFullYear()} Maswadeh Tourism & Travel</p>
              <p className="text-sm text-gray-300">All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Quote;
