import React from 'react';
import { Plane } from 'lucide-react';

interface FlightDetailsProps {
  flight: {
    departureCity: string;
    arrivalCity: string;
    departureTime: string;
    arrivalTime: string;
    stopoverCity?: string;
    stopoverTime?: string;
    tripType: string;
  };
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h2 className="text-xl font-bold flex items-center">
          <Plane className="mr-2 text-[#00b6de]" />
          Flight Details
        </h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="text-sm text-gray-500">Departure</div>
            <div className="text-xl font-bold">{flight.departureCity}</div>
            <div className="text-lg">{flight.departureTime}</div>
          </div>
          
          {flight.stopoverCity && (
            <div className="flex-1 px-6 py-4">
              <div className="relative">
                <div className="absolute top-1/2 w-full h-0.5 bg-gray-300"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  <div className="text-xs text-center">
                    <div>{flight.stopoverCity}</div>
                    <div className="font-medium">{flight.stopoverTime} layover</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center md:text-right">
            <div className="text-sm text-gray-500">Arrival</div>
            <div className="text-xl font-bold">{flight.arrivalCity}</div>
            <div className="text-lg">{flight.arrivalTime}</div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm">
          <span className="inline-block px-2 py-1 bg-gray-100 rounded-full">
            {flight.tripType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails; 