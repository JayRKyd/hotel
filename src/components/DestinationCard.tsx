
import React from 'react';
import { Star, ChevronLeft, ChevronRight, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HotelProps {
  name: string;
  stars: number;
  checkIn: string;
  checkOut: string;
  rating?: {
    score: number;
    label: string;
    reviews: number;
  };
  description?: string;
  amenities?: string[];
  image: string;
}

interface DestinationCardProps {
  destination: string;
  checkIn: string;
  checkOut: string;
  hotels: HotelProps[];
  isRecommended?: boolean;
  onViewMap?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  checkIn,
  checkOut,
  hotels,
  isRecommended = false,
  onViewMap
}) => {
  const [activeHotelIndex, setActiveHotelIndex] = React.useState(0);
  const activeHotel = hotels[activeHotelIndex];
  
  const nextHotel = () => {
    setActiveHotelIndex((prev) => (prev === hotels.length - 1 ? 0 : prev + 1));
  };
  
  const prevHotel = () => {
    setActiveHotelIndex((prev) => (prev === 0 ? hotels.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Destination Header */}
      <div className="bg-slate-800 text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          {isRecommended && (
            <span className="bg-[#00b6de] text-white text-xs px-2 py-1 rounded-full mr-2 flex items-center">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-1"></span>
              Recommended Places
            </span>
          )}
        </div>
        <div className="text-right">
          <h3 className="text-xl font-semibold lowercase first-letter:uppercase">{destination}</h3>
          <div className="text-xs">
            <span>Check-in: {checkIn}</span>
            <span className="mx-1">•</span>
            <span>Check-out: {checkOut}</span>
          </div>
        </div>
      </div>
      
      {/* Progress Indicators */}
      <div className="bg-amber-500 flex justify-center py-1">
        {hotels.map((_, index) => (
          <span 
            key={index} 
            className={`inline-block w-2 h-2 rounded-full mx-1 ${index === activeHotelIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
      
      {/* Hotel Image with Navigation */}
      <div className="relative">
        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${activeHotel.image})` }}>
          {hotels.length > 1 && (
            <>
              <button 
                onClick={prevHotel} 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1 text-white hover:bg-black/50"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextHotel} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1 text-white hover:bg-black/50"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Hotel Information */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center">
              <span className="bg-teal-500 text-white text-xs px-2 py-0.5 rounded mr-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-1"></span>
                Traveler's Choice
              </span>
            </div>
            <h4 className="text-lg font-bold mt-1">{activeHotel.name}</h4>
            <div className="flex my-1">
              {Array.from({ length: activeHotel.stars }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          {activeHotel.rating && (
            <div className="text-right">
              <div className="flex items-center">
                <div className="bg-green-600 text-white font-bold rounded px-2 py-1 text-sm mr-1">
                  {activeHotel.rating.score}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{activeHotel.rating.label}</div>
                  <div className="text-xs text-gray-500">{activeHotel.rating.reviews} reviews</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {activeHotel.description && (
          <p className="text-sm text-gray-600 mb-3">
            {activeHotel.description}
          </p>
        )}
        
        {activeHotel.amenities && activeHotel.amenities.length > 0 && (
          <div className="mb-3">
            <h5 className="text-sm font-semibold mb-1">Amenities:</h5>
            <div className="flex flex-wrap gap-1">
              {activeHotel.amenities.map((amenity, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#00b6de] border-[#00b6de] hover:bg-[#00b6de] hover:text-white"
            onClick={onViewMap}
          >
            <Map size={16} className="mr-1" />
            Show on map
          </Button>
          
          <div className="text-right">
            <div className="text-xs text-gray-500">Price per night</div>
            <div className="text-xl font-bold text-orange-600">$2,950</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
