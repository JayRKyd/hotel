
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import QuoteBox from '@/components/QuoteBox';
import WaveShape from '@/components/WaveShape';
import { Plane, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Quote = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-maswadeh-blue py-16 px-4 text-white">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Travel Quote</h1>
            <p className="text-xl max-w-2xl mx-auto mb-6">
              Let us help you plan your perfect journey with competitive prices and personalized service
            </p>
            <Link to="/detailed-quote">
              <Button className="bg-maswadeh-orange hover:bg-orange-600 text-white">
                See Example Quote
              </Button>
            </Link>
          </div>
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <Plane size={240} />
          </div>
        </section>
        
        {/* Wave Divider */}
        <WaveShape color="#e6f7fc" />
        
        {/* Quote Form Section */}
        <section className="quote-section py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-maswadeh-blue mb-6">Why Choose Maswadeh Tourism & Travel?</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-cyan p-3 rounded-full text-white">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">Exotic Destinations</h3>
                      <p className="text-gray-600">Explore handpicked destinations with expert local guides who know the hidden gems.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-orange p-3 rounded-full text-white">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">Flexible Scheduling</h3>
                      <p className="text-gray-600">Plan your trip on your own terms with our flexible booking options.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-cyan p-3 rounded-full text-white">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">Group & Family Packages</h3>
                      <p className="text-gray-600">Special rates for groups and families with customized itineraries.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-maswadeh-orange p-3 rounded-full text-white">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-maswadeh-blue">24/7 Support</h3>
                      <p className="text-gray-600">Our travel experts are available round the clock to assist you during your journey.</p>
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

export default Quote;
