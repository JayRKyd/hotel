import { RecommendedPlace } from '@/types/destinations';

export const recommendedPlaces: RecommendedPlace[] = [
  // Thailand - Bangkok
  {
    id: 'place-1',
    destinationId: 'bangkok',
    name: 'Grand Palace',
    description: 'The Grand Palace is a complex of buildings in Bangkok, Thailand. It served as the official residence of the Kings of Siam since 1782.',
    photoUrl: '/images/places/grand-palace.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '1',
    destination_name: 'Bangkok'
  },
  {
    id: 'place-2',
    destinationId: 'bangkok',
    name: 'Wat Arun',
    description: 'Wat Arun is a Buddhist temple in Bangkok, Thailand, on the west bank of the Chao Phraya River. The temple is known for its distinctive spires.',
    photoUrl: '/images/places/wat-arun.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '2',
    destination_name: 'Bangkok'
  },
  
  // Thailand - Phuket
  {
    id: 'place-3',
    destinationId: 'phuket',
    name: 'Patong Beach',
    description: 'Patong Beach is the most famous beach in Phuket, with a wide stretch of sand and vibrant nightlife.',
    photoUrl: '/images/places/patong-beach.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '3',
    destination_name: 'Phuket'
  },
  
  // Turkey - Istanbul
  {
    id: 'place-4',
    destinationId: 'istanbul',
    name: 'Hagia Sophia',
    description: 'Hagia Sophia is a historic landmark in Istanbul, Turkey, known for its impressive dome and Byzantine architecture.',
    photoUrl: '/images/places/hagia-sophia.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '4',
    destination_name: 'Istanbul'
  },
  {
    id: 'place-5',
    destinationId: 'istanbul',
    name: 'Blue Mosque',
    description: 'The Blue Mosque, also known as the Sultan Ahmed Mosque, is a historic mosque in Istanbul famous for its blue tiles.',
    photoUrl: '/images/places/blue-mosque.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '5',
    destination_name: 'Istanbul'
  },
  
  // Turkey - Cappadocia
  {
    id: 'place-6',
    destinationId: 'cappadocia',
    name: 'Hot Air Balloon Ride',
    description: 'Experience the breathtaking landscapes of Cappadocia from above with a hot air balloon ride at sunrise.',
    photoUrl: '/images/places/cappadocia-balloons.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '6',
    destination_name: 'Cappadocia'
  },
  
  // Georgia - Tbilisi
  {
    id: 'place-7',
    destinationId: 'tbilisi',
    name: 'Old Town Tbilisi',
    description: 'Explore the charming cobblestone streets and colorful houses of Old Town Tbilisi.',
    photoUrl: '/images/places/tbilisi-old-town.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '7',
    destination_name: 'Tbilisi'
  },
  
  // Malaysia - Kuala Lumpur
  {
    id: 'place-8',
    destinationId: 'kualalumpur',
    name: 'Petronas Twin Towers',
    description: 'Visit the iconic Petronas Twin Towers, once the tallest buildings in the world, offering spectacular views of Kuala Lumpur.',
    photoUrl: '/images/places/petronas-towers.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '8',
    destination_name: 'Kuala Lumpur'
  },
  
  // Malaysia - Langkawi
  {
    id: 'place-9',
    destinationId: 'langkawi',
    name: 'Langkawi Sky Bridge',
    description: 'A curved pedestrian cable-stayed bridge offering breathtaking views of the Langkawi islands and the Andaman Sea.',
    photoUrl: '/images/places/langkawi-sky-bridge.jpg', // You'll add this image later
    isActive: true,
    sortOrder: '9',
    destination_name: 'Langkawi'
  }
];
