import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/admin/AdminLayout';
import TripForm from '@/components/admin/TripForm';

// Dummy data for trips (would be replaced with Firebase data)
const tripsData = [
  {
    id: 'trip1',
    clientName: 'David Cohen',
    destinations: [
      {
        id: 'dest1',
        city: 'Bangkok',
        checkIn: new Date('2025-04-18'),
        checkOut: new Date('2025-04-22'),
        hotels: [
          {
            id: 'hotel1-trip1',
            hotelId: 'hotel1',
            roomType: 'room1',
            numberOfRooms: 1,
            occupancy: {
              adults: 2,
              children: 1,
              infants: 0,
            },
          },
        ],
      },
      {
        id: 'dest2',
        city: 'Phuket',
        checkIn: new Date('2025-04-22'),
        checkOut: new Date('2025-04-30'),
        hotels: [
          {
            id: 'hotel2-trip1',
            hotelId: 'hotel3',
            roomType: 'room5',
            numberOfRooms: 1,
            occupancy: {
              adults: 2,
              children: 1,
              infants: 0,
            },
          },
        ],
      },
    ],
    flight: {
      departureCity: 'New York',
      arrivalCity: 'Bangkok',
      departureTime: '10:00 AM',
      arrivalTime: '11:30 PM',
      stopoverCity: 'Dubai',
      stopoverTime: '2 hours',
      tripType: 'Round Trip',
    },
    status: 'Active',
    totalPrice: 12500,
  },
  {
    id: 'trip2',
    clientName: 'Sarah Johnson',
    destinations: [
      {
        id: 'dest3',
        city: 'Chiang Mai',
        checkIn: new Date('2025-05-05'),
        checkOut: new Date('2025-05-10'),
        hotels: [
          {
            id: 'hotel1-trip2',
            hotelId: 'hotel2',
            roomType: 'room3',
            numberOfRooms: 2,
            occupancy: {
              adults: 2,
              children: 0,
              infants: 0,
            },
          },
        ],
      },
    ],
    status: 'Pending',
    totalPrice: 8750,
  },
];

const EditTrip = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching trip data from Firebase
    const fetchTrip = () => {
      setLoading(true);
      
      // Find trip in dummy data
      const foundTrip = tripsData.find(t => t.id === id);
      
      setTimeout(() => {
        setTrip(foundTrip || null);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    
    fetchTrip();
  }, [id]);
  
  const handleSubmit = (data: any) => {
    // Here you would normally update the data in Firebase
    console.log('Form submitted:', data);
    
    // For now, just navigate back to the trips list
    navigate('/admin/trips');
  };
  
  const handleCancel = () => {
    navigate('/admin/trips');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => navigate('/admin/trips')}
          >
            <ArrowLeft size={16} className="mr-1" />
            {t('admin.trips.backToTrips')}
          </Button>
          <h1 className="text-3xl font-bold">{t('admin.trips.edit')}</h1>
          <p className="text-gray-500">{t('admin.trips.updateDescription')}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : trip ? (
            <TripForm 
              initialData={trip} 
              onSubmit={handleSubmit} 
              onCancel={handleCancel} 
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('admin.trips.notFound')}</p>
              <Button 
                className="mt-4"
                onClick={() => navigate('/admin/trips')}
              >
                {t('admin.trips.backToTrips')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditTrip; 