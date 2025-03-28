
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import WaveShape from '@/components/WaveShape';
import { Button } from '@/components/ui/button';
import { Plane, Globe, CreditCard, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-maswadeh-blue py-20 px-4 text-white">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Your Perfect Journey</h1>
              <p className="text-xl mb-8">
                Experience unforgettable adventures with Maswadeh Tourism & Travel. 
                Let us take you to the most beautiful destinations around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quote">
                  <Button className="bg-maswadeh-orange hover:bg-orange-600 text-white px-8 py-6 text-lg">
                    Get Quote
                  </Button>
                </Link>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Explore Destinations
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img src="/logo.png" alt="Maswadeh Tourism" className="w-3/4 max-w-md" />
            </div>
          </div>
        </section>
        
        {/* Wave Divider */}
        <WaveShape color="#e6f7fc" />
        
        {/* Features Section */}
        <section className="quote-section py-16 px-4">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-maswadeh-blue mb-4">Why Travel With Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive travel solutions with personalized service and competitive prices.
            </p>
          </div>
          
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-maswadeh-cyan rounded-full flex items-center justify-center mb-4">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Global Destinations</h3>
              <p className="text-gray-600">Explore hundreds of destinations across the globe with our expertly crafted packages.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-maswadeh-orange rounded-full flex items-center justify-center mb-4">
                <Plane className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Seamless Travel</h3>
              <p className="text-gray-600">From flights to accommodations, we handle all aspects of your journey with care.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-maswadeh-cyan rounded-full flex items-center justify-center mb-4">
                <CreditCard className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Best Value</h3>
              <p className="text-gray-600">Competitive pricing and special offers to make your dream vacation affordable.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-maswadeh-orange rounded-full flex items-center justify-center mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your safety is our priority with comprehensive travel insurance and support.</p>
            </div>
          </div>
          
          <div className="container mx-auto text-center mt-12">
            <Link to="/quote">
              <Button className="bg-maswadeh-blue hover:bg-blue-800 text-white px-8 py-6 text-lg">
                Request Your Quote Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-maswadeh-blue text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/logo.png" alt="Maswadeh Tourism & Travel" className="h-12 mb-4" />
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

export default Index;
