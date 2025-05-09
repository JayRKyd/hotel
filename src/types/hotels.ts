export interface HotelRating {
  score: number;
  label: string;
  reviews: number;
}

export interface Location {
  lat: number;
  lng: number;
}

// This interface is used for the form in AdminLayoutRoute.tsx
export interface HotelFormData {
  name: string;
  stars: number;
  country: string;
  city: string;
  description: string;
  photoUrl: string;
  pdfUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  price: number;
  amenities: string[];
  location: Location;
}

// This interface is used for displaying hotels in DestinationCard.tsx
export interface Hotel {
  id?: string;
  name: string;
  stars: number;
  checkIn?: string;
  checkOut?: string;
  image?: string;
  photoUrl?: string;
  pdfUrl?: string;
  rating?: HotelRating;
  description?: string;
  amenities?: string[];
  price?: number;
  country?: string;
  city?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  location?: Location;
  roomType?: string;
  maxOccupancy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DestinationHotels {
  destination: string;
  checkIn: string;
  checkOut: string;
  hotels: Hotel[];
  isRecommended?: boolean;
}