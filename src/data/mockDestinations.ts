import { Destination } from '@/types/destinations';
import { DestinationHotels } from '@/types/hotels';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bangkok',
    countryId: 'thailand',
    isActive: true,
    sortOrder: 1,
    hotels: []
  },
  {
    id: '2',
    name: 'Phuket',
    countryId: 'thailand',
    isActive: true,
    sortOrder: 2,
    hotels: []
  },
  {
    id: '3',
    name: 'Istanbul',
    countryId: 'turkey',
    isActive: true,
    sortOrder: 3,
    hotels: []
  }
];
