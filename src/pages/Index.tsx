import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import WaveShape from '@/components/WaveShape';
import Testimonials from '@/components/Testimonials';
import Reviews from '@/components/Reviews';
import TravelerCenter from '@/components/TravelerCenter';
import { Button } from '@/components/ui/button';
import { Plane, Globe, CreditCard, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with improved background and increased size */}
        <section className="relative bg-maswadeh-blue py-20 px-4 text-white overflow-hidden hero-section">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80')] bg-cover bg-center"></div>
          </div>
          
          <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10 hero-content">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-8 font-playfair">{t('homePage.hero.title')}</h1>
              <p className="text-xl md:text-2xl mb-10">{t('homePage.hero.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/detailed-quote">
                  <Button className="hover-scale bg-maswadeh-orange hover:bg-orange-600 text-white px-8 py-6 text-lg group transition-all duration-300">
                    {t('common.detailedQuote')}
                    <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/quote">
                  <Button className="hover-scale bg-maswadeh-cyan hover:bg-cyan-600 text-white px-8 py-6 text-lg group transition-all duration-300">
                    {t('homePage.hero.cta')}
                    <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center animate-fade-in">
              <img src="/logo.png" alt="Maswadeh Tourism" className="w-3/4 max-w-md drop-shadow-lg" />
            </div>
          </div>
        </section>
        
        {/* Wave Divider with animation */}
        <WaveShape color="#e6f7fc" className="wave-animate" />
        
        {/* Features Section with improved hover effects */}
        <section className="quote-section py-16 px-4">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-maswadeh-blue mb-4 font-playfair">{t('homePage.whyChooseUs.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('homePage.whyChooseUs.subtitle')}</p>
          </div>
          
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-maswadeh-cyan">
              <div className="mx-auto w-16 h-16 bg-maswadeh-cyan rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:scale-110">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Global Destinations</h3>
              <p className="text-gray-600">Explore hundreds of destinations across the globe with our expertly crafted packages.</p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-maswadeh-orange">
              <div className="mx-auto w-16 h-16 bg-maswadeh-orange rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:scale-110">
                <Plane className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">{t('homePage.whyChooseUs.reason1.title')}</h3>
              <p className="text-gray-600">{t('homePage.whyChooseUs.reason1.description')}</p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-maswadeh-cyan">
              <div className="mx-auto w-16 h-16 bg-maswadeh-cyan rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:scale-110">
                <CreditCard className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">{t('homePage.whyChooseUs.reason2.title')}</h3>
              <p className="text-gray-600">{t('homePage.whyChooseUs.reason2.description')}</p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-maswadeh-orange">
              <div className="mx-auto w-16 h-16 bg-maswadeh-orange rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:scale-110">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">{t('homePage.whyChooseUs.reason3.title')}</h3>
              <p className="text-gray-600">{t('homePage.whyChooseUs.reason3.description')}</p>
            </div>
          </div>
          
          <div className="container mx-auto text-center mt-12">
            <Link to="/detailed-quote">
              <Button className="bg-maswadeh-blue hover:bg-blue-800 text-white px-8 py-6 text-lg mr-4 hover-scale group transition-all duration-300">
                View Sample Quote
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/quote">
              <Button className="bg-maswadeh-orange hover:bg-orange-600 text-white px-8 py-6 text-lg hover-scale group transition-all duration-300">
                {t('homePage.hero.cta')}
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Traveler Center Section */}
        <TravelerCenter />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Reviews Section */}
        <Reviews />
      </main>
      
      {/* Footer */}
      <footer className="bg-maswadeh-blue text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/logo.png" alt="Maswadeh Tourism & Travel" className="h-12 mb-4" />
              <p className="text-sm max-w-md">{t('homePage.hero.subtitle')}</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="mb-2">&copy; {new Date().getFullYear()} Maswadeh Tourism & Travel</p>
              <p className="text-sm text-gray-300">{t('footer.allRightsReserved')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
