import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Clock, Upload, Map, CheckCircle, Phone, MessageSquare, ArrowLeft, DollarSign, Users, Wifi, Coffee, Car, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import TravelerCenter from '@/components/TravelerCenter';
import Reviews from '@/components/Reviews';
import DestinationCard from '@/components/DestinationCard';
import Footer from '@/components/Footer';
import RecommendedPlaces from '@/components/RecommendedPlaces';
import { destinationService } from '@/services/destinationService';
import type { Destination } from '@/services/destinationService';
import { tripService } from '@/services/tripService';
import { hotelService } from '@/services/hotelService';
import type { Hotel } from '@/types/hotels';

// Extended destination interface for the DetailedQuote component
interface QuoteDestination extends Partial<Destination> {
  name: string;
  country?: string;
  dates?: string;
  nights?: number;
  hotel?: Hotel;
}

const DetailedQuote = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [destinations, setDestinations] = useState<QuoteDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trip, setTrip] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // If we have an ID, load that specific quote
        if (id) {
          const tripData = await tripService.getById(id);
          if (!tripData) {
            setError('Quote not found');
            return;
          }
          
          setTrip(tripData);
          
          // Load hotels for each destination
          const destinationsWithHotels = await Promise.all(
            tripData.destinations.map(async (dest) => {
              if (dest.hotelId) {
                const hotel = await hotelService.getById(dest.hotelId);
                return {
                  ...dest,
                  hotel,
                  name: hotel?.name || 'Unknown Destination'
                };
              }
              return {
                ...dest,
                name: 'Unknown Destination'
              };
            })
          );
          
          setDestinations(destinationsWithHotels as QuoteDestination[]);
        } 
        // Otherwise, load featured hotels
        else {
          // Load all featured hotels
          const allHotels = await hotelService.getAll();
          const featuredHotels = allHotels.filter(hotel => hotel.isFeatured);
            
          if (featuredHotels.length === 0) {
            // If no featured hotels, use mock data or leave empty
            setDestinations([]);
            return;
          }
            
          // Group hotels by destination/city
          const hotelsByDestination = featuredHotels.reduce((acc, hotel) => {
            const key = hotel.city;
            if (!acc[key]) {
              // Convert Date objects to strings if they exist
              const processedHotel = {
                ...hotel,
                createdAt: hotel.createdAt instanceof Date ? hotel.createdAt.toISOString() : hotel.createdAt,
                updatedAt: hotel.updatedAt instanceof Date ? hotel.updatedAt.toISOString() : hotel.updatedAt
              };
              
              acc[key] = {
                name: hotel.city,
                country: hotel.country,
                dates: '18-04-2025 - 21-04-2025', // Example dates
                nights: 3, // Default value
                hotel: processedHotel
              } as QuoteDestination;
            }
            return acc;
          }, {} as Record<string, QuoteDestination>);
            
          // Convert to array for rendering
          setDestinations(Object.values(hotelsByDestination));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

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
            <ArrowLeft size={16} className="mr-1" />
            {t('detailedQuotePage.backToHome')}
          </Button>
          <div>
            <h1 className="text-white text-2xl font-bold">Maswadeh Tourism</h1>
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
                {userInfo.name}, {t('detailedQuotePage.proposalReady')}
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                {t('detailedQuotePage.dreamVacation')}
              </p>
              
              {/* Countdown timer with enhanced style */}
              <div className="flex justify-center md:justify-start space-x-6 mb-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-maswadeh-cyan to-blue-500 text-white text-2xl font-bold rounded-lg p-4 min-w-[70px] shadow-md">
                    {userInfo.countdown.days}
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">{t('detailedQuotePage.offerDetails.days')}</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-maswadeh-cyan to-blue-500 text-white text-2xl font-bold rounded-lg p-4 min-w-[70px] shadow-md">
                    {userInfo.countdown.hours}
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">{t('detailedQuotePage.offerDetails.hours')}</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-maswadeh-cyan to-blue-500 text-white text-2xl font-bold rounded-lg p-4 min-w-[70px] shadow-md">
                    {userInfo.countdown.minutes}
                  </div>
                  <p className="text-gray-600 mt-2 font-medium">{t('detailedQuotePage.offerDetails.minutes')}</p>
                </div>
              </div>
              
              {/* Price summary */}
              <div className="bg-maswadeh-light p-6 rounded-md mb-6">
                <h3 className="text-xl font-bold text-maswadeh-blue mb-3">{t('detailedQuotePage.pricing.packagePriceSummary')}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{t('detailedQuotePage.pricing.regularPrice')}:</span>
                  <span className="text-gray-500 line-through">${userInfo.pricing.regularPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{t('detailedQuotePage.pricing.specialOffer')}:</span>
                  <span className="text-2xl font-bold text-maswadeh-orange">${userInfo.pricing.specialPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{t('detailedQuotePage.pricing.youSave')}:</span>
                  <span className="text-green-600 font-medium">${userInfo.pricing.regularPrice - userInfo.pricing.specialPrice} (${userInfo.pricing.discountPercentage}%)</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {t('detailedQuotePage.pricing.pricePerPerson')}
                </div>
              </div>
              
              <div className="bg-maswadeh-light p-4 rounded-md mb-6">
                <p className="text-gray-700 flex items-center justify-between">
                  <span className="font-medium">{t('detailedQuotePage.offerDetails.offerNumber')}:</span> 
                  <span className="bg-white px-3 py-1 rounded-md font-bold text-maswadeh-blue">{userInfo.offerNumber}</span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button className="flex items-center bg-maswadeh-orange text-white hover:bg-orange-600 shadow-md">
                  <Upload size={18} className="mr-2" />
                  {t('detailedQuotePage.buttons.passportUpload')}
                </Button>
                <Button className="flex items-center bg-maswadeh-blue text-white hover:bg-blue-700 shadow-md">
                  <Map size={18} className="mr-2" />
                  {t('detailedQuotePage.buttons.routeMap')}
                </Button>
              </div>
            </div>
            
            {/* Agent information card */}
            <div className="md:max-w-xs w-full">
              <Card className="overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-maswadeh-blue to-maswadeh-cyan p-4 text-white">
                  <h3 className="text-xl font-bold">{t('detailedQuotePage.agent.personalAgent')}</h3>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-maswadeh-light flex items-center justify-center mb-3">
                      <span className="text-maswadeh-blue text-3xl font-bold">Y</span>
                    </div>
                    <h4 className="font-bold text-lg">Yuval</h4>
                    <p className="text-gray-600">{t('detailedQuotePage.agent.seniorConsultant')}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone size={18} className="text-maswadeh-cyan mr-2" />
                      <p>{t('detailedQuotePage.agent.phone')}: 888+</p>
                    </div>
                    <a 
                      href="https://wa.me/888" 
                      className="flex items-center justify-center bg-[#25D366] hover:bg-green-500 text-white py-2 px-4 rounded-md w-full"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      {t('detailedQuotePage.agent.contactViaWhatsapp')}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Itinerary title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-maswadeh-blue font-playfair inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-maswadeh-cyan after:bottom-0 after:left-0">
              {t('detailedQuotePage.itinerary.yourItinerary')}
            </h2>
          </div>
          
          {/* Destination cards */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">{t('detailedQuotePage.itinerary.loadingDestinations')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
              </div>
            ) : destinations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">{t('detailedQuotePage.itinerary.noDestinations')}</p>
              </div>
            ) : (
              destinations.map((destination, index) => (
                <div key={index} className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">{destination.name}</h2>
                  <p className="text-gray-600 mb-4">{destination.dates}</p>
                  
                  {destination.hotel ? (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                      <div className="flex flex-col md:flex-row">
                        {/* Hotel Image */}
                        <div className="md:w-1/3 h-64 md:h-auto">
                          <img 
                            src={destination.hotel.photoUrl} 
                            alt={destination.hotel.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Hotel Details */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{destination.hotel.name}</h3>
                              <div className="flex items-center mt-1">
                                <MapPin size={16} className="text-gray-500 mr-1" />
                                <span className="text-gray-600 text-sm">{destination.hotel.city}, {destination.hotel.country}</span>
                              </div>
                            </div>
                            <div className="flex">
                              {Array.from({ length: destination.hotel.stars }).map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400" fill="#FACC15" />
                              ))}
                            </div>
                          </div>
                          
                          {/* Amenities */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2">{t('detailedQuotePage.hotel.amenities')}:</h4>
                            <div className="flex flex-wrap gap-2">
                              {destination.hotel.amenities.map((amenity, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-md text-xs">
                                  {amenity === 'WiFi' && <Wifi size={12} className="mr-1" />}
                                  {amenity === 'Breakfast' && <Coffee size={12} className="mr-1" />}
                                  {amenity === 'Parking' && <Car size={12} className="mr-1" />}
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Room Information */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2">{t('detailedQuotePage.hotel.roomType')}:</h4>
                            <p className="text-sm">{destination.hotel.roomType || t('detailedQuotePage.hotel.standardRoom')}</p>
                            <div className="flex items-center mt-1">
                              <Users size={16} className="text-gray-500 mr-1" />
                              <span className="text-gray-600 text-sm">
                                {t('detailedQuotePage.hotel.maxOccupancy')}: {destination.hotel.maxOccupancy || '2 Adults, 1 Child'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Stay Duration */}
                          <div className="flex items-center mt-4">
                            <Clock size={16} className="text-gray-500 mr-1" />
                            <span className="text-gray-600 text-sm">
                              {destination.nights || 3} {t('detailedQuotePage.hotel.nightsStay')}
                            </span>
                          </div>
                          
                          {/* PDF Download Button - Only show if hotel has a PDF */}
                          {destination.hotel.pdfUrl && (
                            <div className="mt-4">
                              <a
                                href={destination.hotel.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-maswadeh-cyan text-white rounded-md hover:bg-blue-600 transition-colors"
                              >
                                <FileText size={16} className="mr-2" />
                                {t('detailedQuotePage.buttons.viewHotelDetails')}
                                <Download size={16} className="ml-2" />
                              </a>
                              <p className="text-xs text-gray-500 mt-1">
                                {t('detailedQuotePage.buttons.downloadPdf')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-6 mb-6 text-center">
                      <p className="text-gray-600">{t('detailedQuotePage.itinerary.noHotelInfo')}</p>
                    </div>
                  )}
                  
                  {/* Daily activities section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">{t('detailedQuotePage.itinerary.dailyActivities')}</h3>
                    {/* Render activities here */}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Package inclusions and exclusions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  {t('detailedQuotePage.packageDetails.included')}
                </h3>
                <ul className="space-y-2">
                  {packageDetails.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                  {t('detailedQuotePage.packageDetails.notIncluded')}
                </h3>
                <ul className="space-y-2">
                  {packageDetails.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Terms and conditions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Card className="max-w-md shadow-md hover:shadow-lg transition-shadow border-l-4 border-maswadeh-cyan p-4 flex items-center">
              <CheckCircle size={24} className="text-maswadeh-cyan mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-maswadeh-blue">{t('detailedQuotePage.terms.cancellationPolicy')}</h4>
                <p className="text-sm text-gray-600">{t('detailedQuotePage.terms.cancellationText')}</p>
              </div>
            </Card>
            
            <Card className="max-w-md shadow-md hover:shadow-lg transition-shadow border-l-4 border-maswadeh-orange p-4 flex items-center">
              <CheckCircle size={24} className="text-maswadeh-orange mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-maswadeh-blue">{t('detailedQuotePage.terms.bookingTerms')}</h4>
                <p className="text-sm text-gray-600">{t('detailedQuotePage.terms.bookingTermsText')}</p>
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
      
      {/* Recommended Places Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-maswadeh-blue mb-4">
              {t('detailedQuotePage.recommendedPlaces.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('detailedQuotePage.recommendedPlaces.subtitle')}
            </p>
          </div>
          <RecommendedPlaces />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
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
  },
  pricing: {
    regularPrice: 3499,
    specialPrice: 2799,
    discountPercentage: 20
  }
};

// Package details
const packageDetails = {
  inclusions: [
    "All hotel accommodations as per itinerary",
    "Daily breakfast at hotels",
    "Private airport transfers",
    "Guided city tours in Bangkok, Krabi, and Phuket",
    "Island hopping tour in Krabi",
    "Phi Phi Islands excursion",
    "All entrance fees to attractions mentioned in itinerary",
    "English-speaking tour guides",
    "24/7 travel assistance"
  ],
  exclusions: [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Optional activities not mentioned in itinerary",
    "Meals not specified",
    "Tips and gratuities"
  ]
};

export default DetailedQuote;
