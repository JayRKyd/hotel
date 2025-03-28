
import React from 'react';
import { Star } from 'lucide-react';

const Reviews = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-playfair">Reviews</h2>
          <div className="flex justify-center items-center mb-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" 
              alt="Google" 
              className="h-6 mr-2"
            />
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 font-semibold">5.0</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {googleReviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-t-4 border-maswadeh-cyan"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-maswadeh-cyan to-maswadeh-blue flex items-center justify-center text-white font-bold mr-3">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 flex-grow">{review.text}</p>
              
              <div className="flex justify-between items-center">
                <a href="#" className="text-sm text-maswadeh-cyan hover:text-maswadeh-blue transition-colors">Read More</a>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" 
                  alt="Google" 
                  className="h-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const googleReviews = [
  {
    name: "Dror S.",
    text: "A reliable organization with available representatives. They listen to your voice at any time.",
    rating: 5
  },
  {
    name: "Joshua G.",
    text: "I was asked by Ron from Thailand Traveler's Center. I highly recommend!",
    rating: 5
  },
  {
    name: "Hila A.",
    text: "Ordered Thailand through them and it was superb.",
    rating: 5
  },
  {
    name: "Mina C.",
    text: "Highly recommended, dedication and care in planning your trip.",
    rating: 5
  },
  {
    name: "Masha K.",
    text: "Service and great agents, professional and honest, boneshvil hotel.",
    rating: 5
  }
];

export default Reviews;
