import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Phone, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import MapView from '@/components/trip/MapView';
import FlightDetails from '@/components/trip/FlightDetails';
import PriceSummary from '@/components/trip/PriceSummary';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@/types/hotels';
import { tripService } from '@/services/tripService';
import { hotelService } from '@/services/hotelService';

// Mock data for different trips
const tripsData = {
  "trip1": {
    id: "trip1",
    clientName: "David Cohen",
    expiryDate: "2024-08-15",
    totalPrice: 12500,
    flight: {
      departureCity: "Tel Aviv",
      arrivalCity: "Bangkok",
      departureTime: "2024-04-18T10:30:00",
      arrivalTime: "2024-04-18T23:45:00",
      stopoverCity: "Dubai",
      stopoverTime: "2 hours",
      tripType: "Round Trip"
    },
    destinations: [
      {
        city: "Bangkok",
        checkIn: "18-04-2025",
        checkOut: "21-04-2025",
        hotels: [
          {
            id: "hotel1",
            name: "Centara Watergate Pavilion Hotel Bangkok",
            stars: 5,
            checkIn: "18-04-2025",
            checkOut: "21-04-2025",
            images: [
              "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            ],
            rating: {
              score: 8.7,
              label: "Excellent",
              reviews: 1406
            },
            description: "This modern hotel with a beautiful rooftop offers luxury and comfort in the heart of Bangkok. It's a great spot for tourists looking for easy access to shopping malls and restaurants.",
            amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Parking", "Air conditioning"],
            location: {
              lat: 13.7563,
              lng: 100.5018
            },
            roomDetails: {
              type: "Deluxe Room",
              mealPlan: "Breakfast",
              occupancy: {
                adults: 2,
                children: 1,
                infants: 0
              },
              pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
            }
          }
        ]
      },
      {
        city: "Krabi",
        checkIn: "21-04-2025",
        checkOut: "24-04-2025",
        hotels: [
          {
            id: "hotel2",
            name: "HOTEL DUSIT THANI",
            stars: 5,
            checkIn: "21-04-2025",
            checkOut: "24-04-2025",
            images: [
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1525&q=80"
            ],
            rating: {
              score: 9.1,
              label: "Exceptional",
              reviews: 2103
            },
            description: "Situated near the beach, this luxury resort offers stunning views of the ocean and limestone cliffs. Perfect for couples and families looking for a relaxing getaway.",
            amenities: ["Beachfront", "Pool", "Spa", "Free breakfast", "Restaurant", "Bar"],
            location: {
              lat: 8.0863,
              lng: 98.9062
            },
            roomDetails: {
              type: "Ocean View Suite",
              mealPlan: "Half-Board",
              occupancy: {
                adults: 2,
                children: 1,
                infants: 0
              },
              pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
            }
          }
        ]
      },
      {
        city: "Phuket",
        checkIn: "24-04-2025",
        checkOut: "30-04-2025",
        hotels: [
          {
            id: "hotel3",
            name: "Anantara ElevEast Pattaya",
            stars: 5,
            checkIn: "24-04-2025",
            checkOut: "30-04-2025",
            images: [
              "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1525&q=80",
              "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            ],
            rating: {
              score: 9.5,
              label: "Exceptional",
              reviews: 1832
            },
            description: "Luxurious beachfront resort with private pool villas and world-class dining options. Offers a range of activities and excursions to explore the beauty of Phuket.",
            amenities: ["Beachfront", "Private pools", "Spa", "Multiple restaurants", "Water sports", "Fitness center"],
            location: {
              lat: 7.9519,
              lng: 98.3381
            },
            roomDetails: {
              type: "Beachfront Villa",
              mealPlan: "All Inclusive",
              occupancy: {
                adults: 2,
                children: 0,
                infants: 0
              },
              pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
            }
          }
        ]
      }
    ]
  },
  "trip2": {
    id: "trip2",
    clientName: "Sarah Johnson",
    expiryDate: "2024-09-10",
    totalPrice: 8750,
    flight: {
      departureCity: "London",
      arrivalCity: "Chiang Mai",
      departureTime: "2025-05-05T08:15:00",
      arrivalTime: "2025-05-05T22:30:00",
      stopoverCity: "Bangkok",
      stopoverTime: "1.5 hours",
      tripType: "Round Trip"
    },
    destinations: [
      {
        city: "Chiang Mai",
        checkIn: "05-05-2025",
        checkOut: "10-05-2025",
        hotels: [
          {
            id: "hotel4",
            name: "Four Seasons Resort Chiang Mai",
            stars: 5,
            checkIn: "05-05-2025",
            checkOut: "10-05-2025",
            images: [
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            ],
            rating: {
              score: 9.3,
              label: "Exceptional",
              reviews: 1250
            },
            description: "Nestled among terraced rice fields and mountains in the Mae Rim Valley, this luxury resort offers elegant pavilions with private verandas and mountain views.",
            amenities: ["Pool", "Spa", "Restaurant", "Fitness center", "Tennis court", "Cooking school"],
            location: {
              lat: 18.8013,
              lng: 98.9675
            },
            roomDetails: {
              type: "Garden Pavilion",
              mealPlan: "Breakfast",
              occupancy: {
                adults: 2,
                children: 0,
                infants: 0
              },
              pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
            }
          }
        ]
      },
      {
        city: "Phuket",
        checkIn: "10-05-2025",
        checkOut: "15-05-2025",
        hotels: [
          {
            id: "hotel5",
            name: "Amanpuri Phuket",
            stars: 5,
            checkIn: "10-05-2025",
            checkOut: "15-05-2025",
            images: [
              "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1649&q=80"
            ],
            rating: {
              score: 9.7,
              label: "Exceptional",
              reviews: 890
            },
            description: "Set on a secluded coconut grove by the Andaman Sea, this exclusive resort features elegant pavilions and villas with private terraces and stunning sea views.",
            amenities: ["Private beach", "Pool", "Spa", "Restaurant", "Bar", "Water sports"],
            location: {
              lat: 7.9757,
              lng: 98.2794
            },
            roomDetails: {
              type: "Ocean Pavilion",
              mealPlan: "Half-Board",
              occupancy: {
                adults: 2,
                children: 0,
                infants: 0
              },
              pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
            }
          }
        ]
      }
    ]
  },
  "trip3": {
    id: "trip3",
    clientName: "Michael Brown",
    expiryDate: "2024-08-30",
    totalPrice: 9200,
    flight: {
      departureCity: "New York",
      arrivalCity: "Bangkok",
      departureTime: "2025-06-12T14:20:00",
      arrivalTime: "2025-06-13T18:45:00",
      stopoverCity: "Tokyo",
      stopoverTime: "3 hours",
      tripType: "Round Trip"
    },
    destinations: [
      {
        city: "Bangkok",
        checkIn: "13-06-2025",
        checkOut: "17-06-2025",
        hotels: [
          {
            id: "hotel6",
            name: "Mandarin Oriental Bangkok",
            stars: 5,
            checkIn: "13-06-2025",
            checkOut: "17-06-2025",
            images: [
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
            ],
            rating: {
              score: 9.8,
              label: "Exceptional",
              reviews: 2450
            },
            description: "This legendary hotel on the banks of the Chao Phraya River has been a favorite of travelers for over 140 years, offering timeless elegance and exceptional service.",
            amenities: ["River view", "Pool", "Spa", "Fine dining", "Butler service", "Fitness center"],
            location: {
              lat: 13.7248,
              lng: 100.5133
            },
            roomDetails: {
              type: "Deluxe River View Room",
              mealPlan: "Breakfast",
              occupancy: {
                adults: 2,
                children: 0,
                infants: 0
              },
              pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
            }
          }
        ]
      },
      {
        city: "Koh Samui",
        checkIn: "17-06-2025",
        checkOut: "22-06-2025",
        hotels: [
          {
            id: "hotel7",
            name: "Six Senses Samui",
            stars: 5,
            checkIn: "17-06-2025",
            checkOut: "22-06-2025",
            images: [
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
              "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            ],
            rating: {
              score: 9.4,
              label: "Exceptional",
              reviews: 1120
            },
            description: "Perched on a headland with spectacular views of the Gulf of Thailand, this resort offers luxurious villas with private infinity pools and personalized service.",
            amenities: ["Private pool", "Ocean view", "Spa", "Organic garden", "Restaurant", "Yoga pavilion"],
            location: {
              lat: 9.5680,
              lng: 100.0619
            },
            roomDetails: {
              type: "Hideaway Pool Villa",
              mealPlan: "Half-Board",
              occupancy: {
                adults: 2,
                children: 0,
                infants: 0
              },
              pdfUrl: "https://www.africau.edu/images/default/sample.pdf"
            }
          }
        ]
      }
    ]
  }
};

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tripData, setTripData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadTripDetails = async () => {
      try {
        setLoading(true);
        
        // Load trip data
        const tripData = await tripService.getById(id);
        if (!tripData) {
          setError('Trip not found');
          return;
        }
        
        setTripData(tripData);
        
        // Load hotels for each destination
        const destinationsWithHotels = await Promise.all(
          tripData.destinations.map(async (dest) => {
            if (dest.hotelId) {
              const hotel = await hotelService.getById(dest.hotelId);
              return {
                ...dest,
                hotel
              };
            }
            return dest;
          })
        );
        
        setTripData(tripData);
      } catch (error) {
        console.error('Error loading trip details:', error);
        setError('Failed to load trip details');
      } finally {
        setLoading(false);
      }
    };
    
    loadTripDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b6de]"></div>
      </div>
    );
  }
  
  if (!tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Trip not found</h2>
          <p className="text-gray-500 mt-2">The requested trip information is not available.</p>
          <Link to="/" className="mt-4 inline-block text-[#00b6de] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Prepare data for price summary
  const priceSummaryHotels = tripData.destinations.map((dest: any) => ({
    name: dest.hotels?.[0]?.name || 'Unknown Hotel',
    roomType: dest.hotels?.[0]?.roomDetails?.type || 'Standard Room',
    mealPlan: dest.hotels?.[0]?.roomDetails?.mealPlan || 'No Meals',
    checkIn: dest.checkIn || 'N/A',
    checkOut: dest.checkOut || 'N/A'
  }));

  return (
    <div className="bg-gray-50 pt-24">
      <Header />
      
      {/* Hero section */}
      <section className="bg-[#00b6de] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Thailand Adventure</h1>
              <p className="text-xl">Personalized Trip for {tripData.clientName}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2" size={18} />
                    <span>{tripData.destinations[0]?.checkIn} - {tripData.destinations[tripData.destinations.length-1]?.checkOut}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2" size={18} />
                    <span>{tripData.destinations.map((d: any) => d.city).join(', ')}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2" size={18} />
                    <span>2 Adults, 1 Child</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2" size={18} />
                    <span>Offer valid until {tripData.expiryDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trip details section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Your Trip Itinerary</h2>
                {/* Map button temporarily hidden */}
              </div>
              
              {/* Flight Details */}
              {tripData.flight && (
                <FlightDetails flight={tripData.flight} />
              )}
              
              {/* Map view temporarily hidden */}
              
              {/* Destination cards */}
              <div className="space-y-6">
                {tripData.destinations.map((destination: any, index: number) => (
                  <DestinationCard
                    key={index}
                    destination={destination.city}
                    checkIn={destination.checkIn}
                    checkOut={destination.checkOut}
                    hotels={destination.hotels?.length ? (destination.hotels as Hotel[]) : []}
                    onViewMap={() => {/* Map functionality temporarily disabled */}}
                  />
                ))}
              </div>
              
              {/* Price Summary */}
              <PriceSummary 
                flight={tripData.flight}
                hotels={priceSummaryHotels}
                totalPrice={tripData.totalPrice}
              />
            </div>
            
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Trip Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-700">Duration</h4>
                    <p>12 Days, 11 Nights</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Destinations</h4>
                    <p>{tripData.destinations.map((d: any) => d.city).join(', ')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Includes</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 5-star hotel accommodations</li>
                      <li>• Daily breakfast</li>
                      <li>• Airport transfers</li>
                      <li>• Inter-city transportation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Total Price</span>
                    <span className="text-2xl font-bold text-orange-600">${tripData.totalPrice}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Price for 2 adults, including all taxes and fees</p>
                  
                  <Button className="w-full bg-maswadeh-orange hover:bg-orange-600">
                    Request Modifications
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Need assistance?</p>
                    <a href="tel:+1234567890" className="flex items-center justify-center text-[#00b6de] font-semibold mt-1">
                      <Phone size={16} className="mr-1" />
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TripDetails; 