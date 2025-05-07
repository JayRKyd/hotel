export interface Country {
    id: string;
    name: string;
    isActive?: boolean;
  }
  
  export interface Destination {
    id: string;
    countryId: string;
    name: string;
    isActive: boolean;
    sortOrder: number;
    description?: string;
    photoUrl?: string;
    hotels?: any[];
  }
  
  export interface RecommendedPlace {
    id: string;
    destinationId: string; // This will be treated as string in the code
    name: string;
    description: string;
    photoUrl: string;
    isActive: boolean;
    sortOrder: string; // Changed from number to string to match usage
    destination_name: string;
  }
  
  export interface RoomType {
    id: number;
    hotelId: number;
    name: string;
    mealPlan: 'No Meals' | 'Breakfast' | 'Half-Board' | 'All Inclusive' | 'Ultra All Inclusive';
    maxAdults: number;
    maxChildren: number;
    maxInfants: number;
    pdfUrl: string;
    photos: string[];
  }