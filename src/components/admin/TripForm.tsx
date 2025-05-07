import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { X, Plus, Plane, Hotel, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePicker } from '../ui/date-picker';

// Form schema
const getTripFormSchema = (t: any) => z.object({
  clientName: z.string().min(2, { message: t('admin.tripForm.validation.clientNameRequired') }),
  status: z.string(),
  totalPrice: z.number().min(0),
});

type TripFormValues = z.infer<ReturnType<typeof getTripFormSchema>>;



interface Destination {
  id: string;
  city: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  hotels: {
    id: string;
    hotelId: string;
    roomType: string;
    numberOfRooms: number;
    occupancy: {
      adults: number;
      children: number;
      infants: number;
    };
  }[];
}

interface Flight {
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  stopoverCity: string;
  stopoverTime: string;
  tripType: 'Round Trip' | 'One Way';
}

interface TripFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

// Dummy data for hotels (would be replaced with Firebase data)
const hotelsData = [
  {
    id: 'hotel1',
    name: 'Centara Watergate Pavilion Hotel Bangkok',
    city: 'Bangkok',
    rooms: [
      { id: 'room1', type: 'Deluxe Room' },
      { id: 'room2', type: 'Superior Room' }
    ]
  },
  {
    id: 'hotel2',
    name: 'HOTEL DUSIT THANI',
    city: 'Krabi',
    rooms: [
      { id: 'room3', type: 'Ocean View Suite' },
      { id: 'room4', type: 'Garden Villa' }
    ]
  },
  {
    id: 'hotel3',
    name: 'Anantara ElevEast Pattaya',
    city: 'Phuket',
    rooms: [
      { id: 'room5', type: 'Beachfront Villa' },
      { id: 'room6', type: 'Luxury Suite' }
    ]
  }
];

// List of cities
const cities = ['Bangkok', 'Phuket', 'Krabi', 'Chiang Mai', 'Pattaya', 'Koh Samui', 'Hua Hin'];

const TripForm: React.FC<TripFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState<Destination[]>(
    initialData?.destinations || [
      {
        id: '1',
        city: '',
        checkIn: undefined,
        checkOut: undefined,
        hotels: [
          {
            id: '1',
            hotelId: '',
            roomType: '',
            numberOfRooms: 1,
            occupancy: {
              adults: 2,
              children: 0,
              infants: 0,
            },
          },
        ],
      },
    ]
  );
  
  const [includeFlight, setIncludeFlight] = useState(!!initialData?.flight);
  const [flight, setFlight] = useState<Flight>(
    initialData?.flight || {
      departureCity: '',
      arrivalCity: '',
      departureTime: '',
      arrivalTime: '',
      stopoverCity: '',
      stopoverTime: '',
      tripType: 'Round Trip',
    }
  );
  
  // Initialize form
  const form = useForm<TripFormValues>({
    resolver: zodResolver(getTripFormSchema(t)),
    defaultValues: {
      clientName: initialData?.clientName || '',
      status: initialData?.status || 'Draft',
      totalPrice: initialData?.totalPrice || 0,
    },
  });
  
  // Add new destination
  const addDestination = () => {
    setDestinations(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        city: '',
        checkIn: undefined,
        checkOut: undefined,
        hotels: [
          {
            id: Date.now().toString() + '-hotel',
            hotelId: '',
            roomType: '',
            numberOfRooms: 1,
            occupancy: {
              adults: 2,
              children: 0,
              infants: 0,
            },
          },
        ],
      },
    ]);
  };
  
  // Remove destination
  const removeDestination = (id: string) => {
    setDestinations(prev => prev.filter(dest => dest.id !== id));
  };
  
  // Update destination city
  const updateDestinationCity = (id: string, city: string) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === id ? { ...dest, city } : dest
      )
    );
  };
  
  // Update destination dates
  const updateDestinationDates = (id: string, checkIn: Date | undefined, checkOut: Date | undefined) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === id ? { ...dest, checkIn, checkOut } : dest
      )
    );
  };
  
  // Add hotel to destination
  const addHotelToDestination = (destinationId: string) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === destinationId
          ? {
              ...dest,
              hotels: [
                ...dest.hotels,
                {
                  id: Date.now().toString(),
                  hotelId: '',
                  roomType: '',
                  numberOfRooms: 1,
                  occupancy: {
                    adults: 2,
                    children: 0,
                    infants: 0,
                  },
                },
              ],
            }
          : dest
      )
    );
  };
  
  // Remove hotel from destination
  const removeHotelFromDestination = (destinationId: string, hotelId: string) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === destinationId
          ? {
              ...dest,
              hotels: dest.hotels.filter(hotel => hotel.id !== hotelId),
            }
          : dest
      )
    );
  };
  
  // Update hotel in destination
  const updateHotelInDestination = (
    destinationId: string,
    hotelId: string,
    field: string,
    value: any
  ) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === destinationId
          ? {
              ...dest,
              hotels: dest.hotels.map(hotel =>
                hotel.id === hotelId
                  ? { ...hotel, [field]: value }
                  : hotel
              ),
            }
          : dest
      )
    );
  };
  
  // Update hotel occupancy
  const updateHotelOccupancy = (
    destinationId: string,
    hotelId: string,
    field: 'adults' | 'children' | 'infants',
    value: number
  ) => {
    setDestinations(prev =>
      prev.map(dest =>
        dest.id === destinationId
          ? {
              ...dest,
              hotels: dest.hotels.map(hotel =>
                hotel.id === hotelId
                  ? {
                      ...hotel,
                      occupancy: {
                        ...hotel.occupancy,
                        [field]: value,
                      },
                    }
                  : hotel
              ),
            }
          : dest
      )
    );
  };
  
  // Update flight field
  const updateFlightField = (field: keyof Flight, value: string) => {
    setFlight(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  // Handle form submission
  const onFormSubmit = (data: TripFormValues) => {
    // Combine form data with destinations and flight
    const formData = {
      ...data,
      destinations,
      flight: includeFlight ? flight : null,
    };
    
    onSubmit(formData);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Client Name */}
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.tripForm.clientName')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('admin.tripForm.enterClientName')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            {/* Trip Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.tripForm.status')}</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Draft">{t('admin.tripForm.statuses.draft')}</SelectItem>
                      <SelectItem value="Pending">{t('admin.tripForm.statuses.pending')}</SelectItem>
                      <SelectItem value="Confirmed">{t('admin.tripForm.statuses.confirmed')}</SelectItem>
                      <SelectItem value="Completed">{t('admin.tripForm.statuses.completed')}</SelectItem>
                      <SelectItem value="Cancelled">{t('admin.tripForm.statuses.cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Flight Information */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Plane size={18} className="mr-2" />
              Flight Information
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="includeFlight"
                checked={includeFlight}
                onChange={(e) => setIncludeFlight(e.target.checked)}
              />
              <label htmlFor="includeFlight">{t('admin.tripForm.includeFlightDetails')}</label>
            </div>
          </div>
          
          {includeFlight && (
            <div className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">{t('admin.tripForm.tabs.tripDetails')}</TabsTrigger>
                <TabsTrigger value="itinerary">{t('admin.tripForm.tabs.itinerary')}</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>Departure City</FormLabel>
                  <Input
                    placeholder="Enter departure city"
                    value={flight.departureCity}
                    onChange={(e) => updateFlightField('departureCity', e.target.value)}
                  />
                </div>
                <div>
                  <FormLabel>Arrival City</FormLabel>
                  <Input
                    placeholder="Enter arrival city"
                    value={flight.arrivalCity}
                    onChange={(e) => updateFlightField('arrivalCity', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>Departure Time</FormLabel>
                  <Input
                    placeholder="Enter departure time"
                    value={flight.departureTime}
                    onChange={(e) => updateFlightField('departureTime', e.target.value)}
                  />
                </div>
                <div>
                  <FormLabel>Arrival Time</FormLabel>
                  <Input
                    placeholder="Enter arrival time"
                    value={flight.arrivalTime}
                    onChange={(e) => updateFlightField('arrivalTime', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>Stopover City (optional)</FormLabel>
                  <Input
                    placeholder="Enter stopover city"
                    value={flight.stopoverCity}
                    onChange={(e) => updateFlightField('stopoverCity', e.target.value)}
                  />
                </div>
                <div>
                  <FormLabel>Stopover Time (optional)</FormLabel>
                  <Input
                    placeholder="Enter stopover time"
                    value={flight.stopoverTime}
                    onChange={(e) => updateFlightField('stopoverTime', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <FormLabel>Trip Type</FormLabel>
                <Select 
                  value={flight.tripType}
                  onValueChange={(value) => updateFlightField('tripType', value as 'Round Trip' | 'One Way')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Round Trip">{t('admin.tripForm.roundTrip')}</SelectItem>
                    <SelectItem value="One Way">{t('admin.tripForm.oneWay')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        {/* Destinations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Destinations</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mb-4"
              onClick={addDestination}
            >
              <Plus size={16} className="mr-1" />
              {t('admin.tripForm.addDestination')}
            </Button>
          </div>
          
          <div className="space-y-6">
            {destinations.map((destination, index) => (
              <Card key={destination.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{t('admin.tripForm.destination')} {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDestination(destination.id)}
                      disabled={destinations.length === 1}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <FormLabel>City</FormLabel>
                      <Select
                        value={destination.city}
                        onValueChange={(value) => updateDestinationCity(destination.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <FormLabel>Check-in Date</FormLabel>
                      <DatePicker
                        date={destination.checkIn}
                        onSelect={(date) => updateDestinationDates(destination.id, date, destination.checkOut)}
                      />
                    </div>
                    
                    <div>
                      <FormLabel>Check-out Date</FormLabel>
                      <DatePicker
                        date={destination.checkOut}
                        onSelect={(date) => updateDestinationDates(destination.id, destination.checkIn, date)}
                      />
                    </div>
                  </div>
                  
                  {/* Hotels */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-medium flex items-center">
                        <Hotel size={16} className="mr-1" />
                        Hotels
                      </h5>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addHotelToDestination(destination.id)}
                      >
                        <Plus size={14} className="mr-1" />
                        {t('admin.tripForm.addHotel')}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {destination.hotels.map((hotel) => (
                        <div key={hotel.id} className="border rounded-md p-3">
                          <div className="flex items-center gap-2 mb-4">
                            <Plane className="h-5 w-5" />
                            <h3 className="text-lg font-medium">{t('admin.tripForm.flightInformation')}</h3>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <h6 className="text-sm font-medium">{t('admin.tripForm.hotel')}</h6>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeHotelFromDestination(destination.id, hotel.id)}
                              disabled={destination.hotels.length === 1}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <FormLabel className="text-xs">{t('admin.tripForm.hotel')}</FormLabel>
                              <Select
                                value={hotel.hotelId}
                                onValueChange={(value) => updateHotelInDestination(destination.id, hotel.id, 'hotelId', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select hotel" />
                                </SelectTrigger>
                                <SelectContent>
                                  {hotelsData
                                    .filter((h) => h.city === destination.city || !destination.city)
                                    .map((h) => (
                                      <SelectItem key={h.id} value={h.id}>
                                        {h.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <FormLabel className="text-xs">{t('admin.tripForm.roomType')}</FormLabel>
                              <Select
                                value={hotel.roomType}
                                onValueChange={(value) => updateHotelInDestination(destination.id, hotel.id, 'roomType', value)}
                                disabled={!hotel.hotelId}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {hotelsData
                                    .find((h) => h.id === hotel.hotelId)
                                    ?.rooms.map((room) => (
                                      <SelectItem key={room.id} value={room.id}>
                                        {room.type}
                                      </SelectItem>
                                    )) || []}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                              <FormLabel className="text-xs">{t('admin.tripForm.numberOfRooms')}</FormLabel>
                              <Input
                                type="number"
                                min="1"
                                value={hotel.numberOfRooms}
                                onChange={(e) => updateHotelInDestination(destination.id, hotel.id, 'numberOfRooms', parseInt(e.target.value) || 1)}
                              />
                            </div>
                            
                            <div>
                              <FormLabel className="text-xs">{t('admin.tripForm.adults')}</FormLabel>
                              <Input
                                type="number"
                                min="1"
                                value={hotel.occupancy.adults}
                                onChange={(e) => updateHotelOccupancy(destination.id, hotel.id, 'adults', parseInt(e.target.value) || 1)}
                              />
                            </div>
                            
                            <div>
                              <FormLabel className="text-xs">{t('admin.tripForm.children')}</FormLabel>
                              <Input
                                type="number"
                                min="0"
                                value={hotel.occupancy.children}
                                onChange={(e) => updateHotelOccupancy(destination.id, hotel.id, 'children', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            
                            <div>
                              <FormLabel className="text-xs">{t('admin.tripForm.infants')}</FormLabel>
                              <Input
                                type="number"
                                min="0"
                                value={hotel.occupancy.infants}
                                onChange={(e) => updateHotelOccupancy(destination.id, hotel.id, 'infants', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Total Price */}
        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('admin.tripForm.totalPrice')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={t('admin.tripForm.enterTotalPrice')}
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" className="bg-[#00b6de] hover:bg-[#00a0c4]">
            {initialData ? t('admin.tripForm.updateTrip') : t('admin.tripForm.createTrip')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TripForm; 