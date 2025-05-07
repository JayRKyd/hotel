import { FirebaseDocument } from '@/lib/firebase/types';

export type TripType = 'Tour Package' | 'Custom Trip' | 'Business Travel';

export interface QuoteRequest extends FirebaseDocument {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;

  // Trip Details
  destination: string;
  travelDate: string;
  duration: number;
  numberOfAdults: number;
  numberOfChildren: number;
  tripType: TripType;
  specialRequests?: string;

  // Status
  isQuoted: boolean;
  quotedAt?: Date;
  requestedAt: Date;
}