export interface City {
    id: string;
    name: string;
    country: string;
  }
  
  export const cities: City[] = [
    // Thailand
    { id: 'bangkok', name: 'Bangkok', country: 'Thailand' },
    { id: 'chiangmai', name: 'Chiang Mai', country: 'Thailand' },
    { id: 'chiangrai', name: 'Chiang Rai', country: 'Thailand' },
    { id: 'phuket', name: 'Phuket', country: 'Thailand' },
    { id: 'kohsamui', name: 'Koh Samui', country: 'Thailand' },
    { id: 'krabi', name: 'Krabi', country: 'Thailand' },
    { id: 'kohphiphi', name: 'Koh Phi Phi', country: 'Thailand' },
    { id: 'kohlanta', name: 'Koh Lanta', country: 'Thailand' },
    { id: 'kohtao', name: 'Koh Tao', country: 'Thailand' },
    { id: 'kohchang', name: 'Koh Chang', country: 'Thailand' },
    { id: 'kohphangan', name: 'Koh Phangan', country: 'Thailand' },
    
    // Malaysia
    { id: 'kualalumpur', name: 'Kuala Lumpur', country: 'Malaysia' },
    { id: 'penang', name: 'Penang', country: 'Malaysia' },
    { id: 'langkawi', name: 'Langkawi', country: 'Malaysia' },
    
    // Turkey
    { id: 'istanbul', name: 'Istanbul', country: 'Turkey' },
    { id: 'ankara', name: 'Ankara', country: 'Turkey' },
    { id: 'izmir', name: 'Izmir', country: 'Turkey' },
    { id: 'bursa', name: 'Bursa', country: 'Turkey' },
    { id: 'cappadocia', name: 'Cappadocia', country: 'Turkey' },
    { id: 'antalya', name: 'Antalya', country: 'Turkey' },
    { id: 'bodrum', name: 'Bodrum', country: 'Turkey' },
    { id: 'fethiye', name: 'Fethiye', country: 'Turkey' },
    { id: 'pamukkale', name: 'Pamukkale', country: 'Turkey' },
    
    // Georgia
    { id: 'tbilisi', name: 'Tbilisi', country: 'Georgia' },
    { id: 'batumi', name: 'Batumi', country: 'Georgia' },
    { id: 'gudauri', name: 'Gudauri', country: 'Georgia' },
    { id: 'borjomi', name: 'Borjomi', country: 'Georgia' },
  ];
  
  export const getCitiesByCountry = (country: string): City[] => {
    return cities.filter(city => city.country === country);
  };
  
  export const getAllCities = (): City[] => {
    return cities;
  }; 