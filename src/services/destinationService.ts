import { Country, RecommendedPlace } from '@/types/destinations';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy, writeBatch, where } from 'firebase/firestore';
import { FirebaseDocument, handleFirebaseError } from '@/lib/firebase/types';
import { DestinationHotels } from '@/types/hotels';
import { mockDestinations } from '@/data/mockDestinations';

export interface Destination extends FirebaseDocument {
  name: string;
  countryId: string;
  description: string;
  photoUrl: string;
  isActive: boolean;
  sortOrder: string | number;
  hotels: DestinationHotels[];
}

const COLLECTION = 'destinations';

export const destinationService = {
  getAll: async () => {
    try {
      const q = query(collection(db, COLLECTION), orderBy('sortOrder'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Destination));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      
      return {
        id: snapshot.id,
        ...snapshot.data(),
        createdAt: snapshot.data().createdAt?.toDate(),
        updatedAt: snapshot.data().updatedAt?.toDate(),
      } as Destination;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  create: async (data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return {
        id: docRef.id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Destination;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  update: async (id: string, data: Partial<Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },
  
  // Reordering functionality
  reorder: async (id: string, newSortOrder: number) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        sortOrder: newSortOrder,
        updatedAt: new Date()
      });
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  // Batch update for reordering multiple items
  batchReorder: async (updates: { id: string; sortOrder: number }[]) => {
    try {
      const batch = writeBatch(db);
      
      updates.forEach(({ id, sortOrder }) => {
        const docRef = doc(db, COLLECTION, id);
        batch.update(docRef, { 
          sortOrder,
          updatedAt: new Date()
        });
      });

      await batch.commit();
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  // Countries
  getCountries: async (): Promise<Country[]> => {
    try {
      const q = query(collection(db, 'countries'), orderBy('name'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Country));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  // Destinations
  getDestinations: async (countryId?: string): Promise<Destination[]> => {
    try {
      let q = query(collection(db, COLLECTION), orderBy('sortOrder'));
      
      if (countryId) {
        q = query(collection(db, COLLECTION), 
          where('countryId', '==', countryId),
          orderBy('sortOrder')
        );
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Destination));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  // Recommended Places
  getRecommendedPlaces: async (destinationId?: string): Promise<RecommendedPlace[]> => {
    try {
      // Import the recommended places data
      const { recommendedPlaces } = await import('@/data/recommendedPlaces');
      
      // If a destinationId is provided, filter the places
      if (destinationId) {
        return recommendedPlaces.filter(place => 
          place.destinationId === destinationId && place.isActive
        );
      }
      
      // Otherwise return all active places
      return recommendedPlaces.filter(place => place.isActive);
    } catch (error) {
      console.error('Error loading recommended places:', error);
      return [];
    }
  },

  createRecommendedPlace: async (place: Omit<RecommendedPlace, 'id'>): Promise<RecommendedPlace> => {
    throw new Error('Not implemented');
  },

  updateRecommendedPlace: async (id: number, place: Partial<RecommendedPlace>): Promise<RecommendedPlace> => {
    throw new Error('Not implemented');
  },

  deleteRecommendedPlace: async (id: number): Promise<void> => {
    throw new Error('Not implemented');
  }
};

// File handling service for destinations using base64
export const destinationImageService = {
  uploadImage: async (file: File): Promise<string> => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  deleteImage: async () => {
    // No need to delete from storage since image is in Firestore
    return Promise.resolve();
  }
}; 