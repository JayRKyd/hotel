import React from 'react';
import { Plane, Building, Package, Calendar, Globe, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Services = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#00b6de] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our comprehensive range of travel services designed to make your journey seamless and memorable.
          </p>
        </div>
      </section>
      
      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <Plane className="text-white h-20 w-20" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Flight Bookings</h3>
                <p className="text-gray-600 mb-4">
                  We offer competitive rates on flights to destinations worldwide, with options for economy, business, and first-class travel.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>Best price guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>Multiple airlines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>Flexible booking options</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#00b6de] hover:bg-[#0099c9]">
                  Book a Flight
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center">
                <Building className="text-white h-20 w-20" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Hotel Accommodations</h3>
                <p className="text-gray-600 mb-4">
                  From luxury resorts to boutique hotels, we provide a wide range of accommodation options to suit every preference and budget.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>Exclusive hotel partnerships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>Special room upgrades</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>24/7 customer support</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#00b6de] hover:bg-[#0099c9]">
                  Find Hotels
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-orange-500 to-amber-400 flex items-center justify-center">
                <Package className="text-white h-20 w-20" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Vacation Packages</h3>
                <p className="text-gray-600 mb-4">
                  Our carefully curated vacation packages combine flights, hotels, and activities for a hassle-free travel experience.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>All-inclusive options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>Customizable itineraries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00b6de] mr-2">✓</span>
                    <span>Group discounts available</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#00b6de] hover:bg-[#0099c9]">
                  Explore Packages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Services */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="h-12 w-12 text-[#00b6de] mb-4" />
              <h3 className="text-xl font-bold mb-2">Tour Bookings</h3>
              <p className="text-gray-600">
                Book guided tours, day trips, and excursions with experienced local guides to enhance your travel experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CreditCard className="h-12 w-12 text-[#00b6de] mb-4" />
              <h3 className="text-xl font-bold mb-2">Travel Insurance</h3>
              <p className="text-gray-600">
                Protect your trip with comprehensive travel insurance covering medical emergencies, trip cancellations, and more.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe className="h-12 w-12 text-[#00b6de] mb-4" />
              <h3 className="text-xl font-bold mb-2">Visa Assistance</h3>
              <p className="text-gray-600">
                Get expert guidance on visa requirements and application processes for your destination countries.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#00b6de] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Dream Vacation?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact our travel experts today and let us create a personalized travel experience tailored to your preferences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-[#00b6de] hover:bg-gray-100">
              Get a Quote
            </Button>
            <Button className="bg-transparent border-2 border-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services; 