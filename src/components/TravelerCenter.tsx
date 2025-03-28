
import React from 'react';
import { Play } from 'lucide-react';

const TravelerCenter = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80" 
          alt="Thailand Beach" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center mb-8 md:mb-0">
          <div className="bg-white bg-opacity-90 p-8 rounded-xl max-w-md mx-auto">
            <button className="w-20 h-20 rounded-full bg-[#00b6de] flex items-center justify-center mx-auto mb-6">
              <Play size={32} className="text-white ml-1" />
            </button>
          </div>
        </div>
        
        <div className="md:w-1/2 text-white">
          <h2 className="text-4xl font-bold mb-2">Thailand Traveler Center</h2>
          <h3 className="text-3xl font-bold mb-6">Accompanying you all the way</h3>
          
          <h4 className="text-xl font-bold mb-3">The Traveler Center guarantees the best price!</h4>
          <p className="text-lg mb-6">
            The prices through us are better than working with the various websites, better than booking with travel agents! Choose your better! First-class service was the heart of our plan.
          </p>
          
          <ul className="space-y-2 text-lg">
            <li className="flex items-start">
              <span className="text-[#00b6de] font-bold mr-2">✓</span>
              Professional service and personal attention
            </li>
            <li className="flex items-start">
              <span className="text-[#00b6de] font-bold mr-2">✓</span>
              Direct connections with top hotels and airlines
            </li>
            <li className="flex items-start">
              <span className="text-[#00b6de] font-bold mr-2">✓</span>
              24/7 support during your entire trip
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TravelerCenter;
