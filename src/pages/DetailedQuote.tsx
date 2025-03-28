import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Upload, Map, CheckCircle, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import TravelerCenter from '@/components/TravelerCenter';
import Reviews from '@/components/Reviews';
import DestinationCard from '@/components/DestinationCard';

const DetailedQuote = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-maswadeh-light flex flex-col">
      {/* Custom header for the quote page */}
      <div className="bg-gradient-to-r from-maswadeh-blue to-maswadeh-cyan text-white shadow-lg py-3 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
          <div>
            <img src="/lovable-uploads/ad26f2ec-076f-40b6-942a-d5dfcd10d665.png" alt="Maswadeh Tourism Logo" className="h-10" />
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              size="sm" 
              className="bg-white text-maswadeh-cyan hover:bg-white/90"
            >
              <Phone size={16} className="mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content with unique styling */}
      <div className="bg-gradient-to-b from-maswadeh-light to-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row gap-8 mb-12">
            {/* Quote details section */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1 border-l-4 border-maswadeh-cyan">
              <h2 className="text-maswadeh-blue text-3xl font-bold mb-4 font-playfair">
                {userInfo.name}, your proposal is ready!
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                Your dream vacation to Thailand begins in:
              </p>
              
              {/* Countdown timer with enhanced style */}
              <div className="flex justify-center md:justify-start space-x-6 mb-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-maswadeh-cyan to-blue-500 text-white text-2xl font-bold rounded-lg p-4 min-w-[70px] shadow-md">
                    {userInfo.countdown.days}
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">Days</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-maswadeh-cyan to-blue-500 text-white text-2xl font-bold rounded-lg p-4 min-w-[70px] shadow-md">
                    {userInfo.countdown.hours}
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">Hours</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-maswadeh-cyan to-blue-500 text-white text-2xl font-bold rounded-lg p-4 min-w-[70px] shadow-md">
                    {userInfo.countdown.minutes}
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">Minutes</p>
                </div>
              </div>
              
              <div className="bg-maswadeh-light p-4 rounded-md mb-6">
                <p className="text-gray-700 flex items-center justify-between">
                  <span className="font-medium">Offer Number:</span> 
                  <span className="bg-white px-3 py-1 rounded-md font-bold text-maswadeh-blue">{userInfo.offerNumber}</span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button className="flex items-center bg-maswadeh-orange text-white hover:bg-orange-600 shadow-md">
                  <Upload size={18} className="mr-2" />
                  Passport Upload
                </Button>
                <Button className="flex items-center bg-maswadeh-blue text-white hover:bg-blue-700 shadow-md">
                  <Map size={18} className="mr-2" />
                  Route Map
                </Button>
              </div>
            </div>
            
            {/* Agent information card */}
            <div className="md:max-w-xs w-full">
              <Card className="overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-maswadeh-blue to-maswadeh-cyan p-4 text-white">
                  <h3 className="text-xl font-bold">Your Personal Travel Agent</h3>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-maswadeh-light flex items-center justify-center mb-3">
                      <span className="text-maswadeh-blue text-3xl font-bold">Y</span>
                    </div>
                    <h4 className="font-bold text-lg">Yuval</h4>
                    <p className="text-gray-600">Senior Travel Consultant</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone size={18} className="text-maswadeh-cyan mr-2" />
                      <p>Phone: 888+</p>
                    </div>
                    <a 
                      href="https://wa.me/888" 
                      className="flex items-center justify-center bg-[#25D366] hover:bg-green-500 text-white py-2 px-4 rounded-md w-full"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Contact via WhatsApp
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Itinerary title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-maswadeh-blue font-playfair inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-maswadeh-cyan after:bottom-0 after:left-0">
              Your Thailand Itinerary
            </h2>
          </div>
          
          {/* Destination cards - keeping the existing functionality but with styling updates */}
          <div className="space-y-6">
            {/* Bangkok */}
            <DestinationCard
              destination="Bangkok"
              checkIn="18-04-2025"
              checkOut="21-04-2025"
              isRecommended={true}
              hotels={[
                {
                  name: "Centara Watergate Pavilion Hotel Bangkok (VIP)",
                  stars: 5,
                  checkIn: "18-04-2023",
                  checkOut: "21-04-2023",
                  image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                  rating: {
                    score: 8.7,
                    label: "Excellent",
                    reviews: 1406
                  },
                  description: "This modern hotel with a beautiful rooftop offers luxury and comfort in the heart of Bangkok. It's a great spot for tourists looking for easy access to shopping malls and restaurants.",
                  amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Parking", "Air conditioning"]
                }
              ]}
              onViewMap={() => console.log("View map clicked")}
            />
            
            {/* Krabi */}
            <DestinationCard
              destination="Krabi"
              checkIn="21-04-2025"
              checkOut="24-04-2025"
              isRecommended={true}
              hotels={[
                {
                  name: "HOTEL DUSIT THANI",
                  stars: 5,
                  checkIn: "21-04-2023",
                  checkOut: "24-04-2023",
                  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                  rating: {
                    score: 9.1,
                    label: "Exceptional",
                    reviews: 2103
                  },
                  description: "Situated near the beach, this luxury resort offers stunning views of the ocean and limestone cliffs. Perfect for couples and families looking for a relaxing getaway.",
                  amenities: ["Beachfront", "Pool", "Spa", "Free breakfast", "Restaurant", "Bar"]
                }
              ]}
              onViewMap={() => console.log("View map clicked")}
            />
            
            {/* Phuket */}
            <DestinationCard
              destination="Phuket"
              checkIn="24-04-2025"
              checkOut="30-04-2025"
              isRecommended={true}
              hotels={[
                {
                  name: "Anantara ElevEast Pattaya",
                  stars: 5,
                  checkIn: "24-04-2023",
                  checkOut: "30-04-2023",
                  image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                  rating: {
                    score: 9.3,
                    label: "Exceptional",
                    reviews: 1832
                  },
                  description: "Luxurious beachfront resort with private pool villas and world-class dining options. Offers a range of activities and excursions to explore the beauty of Phuket.",
                  amenities: ["Private beach", "Infinity pool", "Spa", "Fine dining", "Water sports", "Kids club"]
                },
                {
                  name: "The Kee Resort & Spa Patong",
                  stars: 4,
                  checkIn: "24-04-2023",
                  checkOut: "30-04-2023",
                  image: "https://images.unsplash.com/photo-1570213489059-0aac6626cade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80",
                  rating: {
                    score: 8.8,
                    label: "Excellent",
                    reviews: 2574
                  },
                  description: "Located in the heart of Patong, this modern resort offers easy access to the beach, shopping, and nightlife. Features a rooftop pool with panoramic views.",
                  amenities: ["Rooftop pool", "Spa", "Restaurant", "Bar", "Fitness center", "Free WiFi"]
                },
                {
                  name: "Woraburi Pattaya Hotel & Resort",
                  stars: 4,
                  checkIn: "24-04-2023",
                  checkOut: "30-04-2023",
                  image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1525&q=80",
                  rating: {
                    score: 8.5,
                    label: "Very Good",
                    reviews: 1942
                  },
                  description: "Comfortable hotel with traditional Thai architecture and a relaxing atmosphere. Offers good value for money with convenient location near attractions.",
                  amenities: ["Pool", "Restaurant", "Room service", "Garden", "Airport shuttle", "Free WiFi"]
                }
              ]}
              onViewMap={() => console.log("View map clicked")}
            />
          </div>
          
          {/* Terms and conditions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Card className="max-w-md shadow-md hover:shadow-lg transition-shadow border-l-4 border-maswadeh-cyan p-4 flex items-center">
              <CheckCircle size={24} className="text-maswadeh-cyan mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-maswadeh-blue">Cancellation Policy</h4>
                <p className="text-sm text-gray-600">Review our flexible cancellation and modification terms</p>
              </div>
            </Card>
            
            <Card className="max-w-md shadow-md hover:shadow-lg transition-shadow border-l-4 border-maswadeh-orange p-4 flex items-center">
              <CheckCircle size={24} className="text-maswadeh-orange mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-maswadeh-blue">Booking Terms</h4>
                <p className="text-sm text-gray-600">Read and sign our booking terms and conditions</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Why choose us section - keeping functionality but adding distinct separation */}
      <div className="relative py-10">
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>
        <WhyChooseUs />
      </div>
      
      {/* Truncated sections - keeping fewer sections to differentiate from landing page */}
      <Testimonials />
      
      {/* Custom footer for quote page */}
      <div className="bg-maswadeh-blue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Ready to confirm your booking?</h3>
              <p className="text-blue-100">Our travel specialists are available to answer any questions</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-white text-maswadeh-blue hover:bg-white/90">
                <Phone size={18} className="mr-2" />
                Call Us: 888+
              </Button>
              <Button className="bg-maswadeh-orange hover:bg-orange-600">
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data for the UI
const userInfo = {
  name: "Salwa Halabi",
  offerNumber: "205028",
  countdown: {
    days: 20,
    hours: 2,
    minutes: 35
  }
};

export default DetailedQuote;
