
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import WaveShape from '@/components/WaveShape';
import Testimonials from '@/components/Testimonials';
import Reviews from '@/components/Reviews';
import TravelerCenter from '@/components/TravelerCenter';
import { Button } from '@/components/ui/button';
import { Plane, Globe, CreditCard, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with improved background */}
        <section className="relative bg-maswadeh-blue py-20 px-4 text-white overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80')] bg-cover bg-center"></div>
          </div>
          
          <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">Discover Your Perfect Journey</h1>
              <p className="text-xl mb-8">
                Experience unforgettable adventures with Maswadeh Tourism & Travel. 
                Let us take you to the most beautiful destinations around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/detailed-quote">
                  <Button className="hover-scale bg-maswadeh-orange hover:bg-orange-600 text-white px-8 py-6 text-lg group transition-all duration-300">
                    View Sample Quote
                    <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/quote">
                  <Button className="hover-scale bg-maswadeh-cyan hover:bg-cyan-600 text-white px-8 py-6 text-lg group transition-all duration-300">
                    Get Quote
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
            <h2 className="text-3xl font-bold text-maswadeh-blue mb-4 font-playfair">Why Travel With Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive travel solutions with personalized service and competitive prices.
            </p>
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
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Seamless Travel</h3>
              <p className="text-gray-600">From flights to accommodations, we handle all aspects of your journey with care.</p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-maswadeh-cyan">
              <div className="mx-auto w-16 h-16 bg-maswadeh-cyan rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:scale-110">
                <CreditCard className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Best Value</h3>
              <p className="text-gray-600">Competitive pricing and special offers to make your dream vacation affordable.</p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-maswadeh-orange">
              <div className="mx-auto w-16 h-16 bg-maswadeh-orange rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:scale-110">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-maswadeh-blue mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your safety is our priority with comprehensive travel insurance and support.</p>
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
                Request Your Quote Now
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
