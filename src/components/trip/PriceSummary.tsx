import React from 'react';
import { Receipt } from 'lucide-react';

interface PriceSummaryProps {
  flight?: {
    departureCity: string;
    arrivalCity: string;
    tripType: string;
  };
  hotels: Array<{
    name: string;
    roomType: string;
    mealPlan: string;
    checkIn: string;
    checkOut: string;
  }>;
  totalPrice: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ flight, hotels, totalPrice }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-xl font-bold mb-4 pb-2 border-b flex items-center">
        <Receipt className="mr-2 text-[#00b6de]" />
        Trip Price Summary
      </h3>
      
      {flight && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Flight</h4>
          <div className="pl-4 text-sm">
            <p>{flight.departureCity} to {flight.arrivalCity} ({flight.tripType})</p>
          </div>
        </div>
      )}
      
      {hotels.map((hotel, index) => (
        <div key={index} className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">
            Hotel {index + 1}: {hotel.name}
          </h4>
          <div className="pl-4 text-sm space-y-1">
            <p>Room Type: {hotel.roomType}</p>
            <p>Meal Plan: {hotel.mealPlan}</p>
            <p>Stay: {hotel.checkIn} - {hotel.checkOut}</p>
          </div>
        </div>
      ))}
      
      <div className="mt-6 pt-4 border-t flex justify-between items-center">
        <span className="text-lg font-semibold">Total Price</span>
        <span className="text-2xl font-bold text-orange-600">${totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceSummary; 