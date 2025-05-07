import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/admin/AdminLayout';
import HotelForm from '@/components/admin/HotelForm';

// Dummy data for hotels (would be replaced with Firebase data)
const hotelsData = [
  {
    id: 'hotel1',
    name: 'Centara Watergate Pavilion Hotel Bangkok',
    city: 'Bangkok',
    starRating: 5,
    description: 'This modern hotel with a beautiful rooftop offers luxury and comfort in the heart of Bangkok. It\'s a great spot for tourists looking for easy access to shopping malls and restaurants.',
    rooms: [
      { id: 'room1', type: 'Deluxe Room', pdfUrl: '#' },
      { id: 'room2', type: 'Superior Room', pdfUrl: '#' }
    ],
    location: { lat: 13.7563, lng: 100.5018 },
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 'hotel2',
    name: 'HOTEL DUSIT THANI',
    city: 'Krabi',
    starRating: 5,
    description: 'A luxurious beachfront resort offering stunning views of the Andaman Sea. Features spacious rooms, multiple dining options, and a world-class spa.',
    rooms: [
      { id: 'room3', type: 'Ocean View Suite', pdfUrl: '#' },
      { id: 'room4', type: 'Garden Villa', pdfUrl: '#' }
    ],
    location: { lat: 8.0863, lng: 98.9062 },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 'hotel3',
    name: 'Anantara ElevEast Pattaya',
    city: 'Phuket',
    starRating: 5,
    description: 'An elegant resort nestled on the pristine shores of Phuket. Offers private villas with pools, exceptional dining experiences, and personalized service.',
    rooms: [
      { id: 'room5', type: 'Beachfront Villa', pdfUrl: '#' },
      { id: 'room6', type: 'Luxury Suite', pdfUrl: '#' }
    ],
    location: { lat: 7.9519, lng: 98.3381 },
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1525&q=80'
  }
];

const EditHotel = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching hotel data from Firebase
    const fetchHotel = () => {
      setLoading(true);
      
      // Find hotel in dummy data
      const foundHotel = hotelsData.find(h => h.id === id);
      
      setTimeout(() => {
        setHotel(foundHotel || null);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    
    fetchHotel();
  }, [id]);
  
  const handleSubmit = (data: any) => {
    // Here you would normally update the data in Firebase
    console.log('Form submitted:', data);
    
    // For now, just navigate back to the hotels list
    navigate('/admin/hotels');
  };
  
  const handleCancel = () => {
    navigate('/admin/hotels');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => navigate('/admin/hotels')}
          >
            <ArrowLeft size={16} className="mr-1" />
            {t('admin.hotels.backToHotels')}
          </Button>
          <h1 className="text-3xl font-bold">{t('admin.hotels.edit')}</h1>
          <p className="text-gray-500">{t('admin.hotels.updateInfo')}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : hotel ? (
            <HotelForm 
              initialData={hotel} 
              onSubmit={handleSubmit} 
              onCancel={handleCancel} 
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('admin.hotels.notFound')}</p>
              <Button 
                className="mt-4"
                onClick={() => navigate('/admin/hotels')}
              >
                {t('admin.hotels.backToHotels')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditHotel; 