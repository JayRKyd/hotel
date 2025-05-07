import { FirebaseDocument } from '@/lib/firebase/types';

export interface RecommendedPlace extends FirebaseDocument {
  destinationId: string;
  name: string;
  description: string;
  photoUrl: string;
  isActive: boolean;
  sortOrder: number;
  destination_name: string;
} 