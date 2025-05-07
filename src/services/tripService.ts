import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FirebaseService, FirebaseDocument, handleFirebaseError } from '@/lib/firebase/types';

export interface TripDestination {
  destinationId: string;
  hotelId: string;
  nights: number;
}

export interface Trip extends FirebaseDocument {
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  startDate: string;
  endDate: string;
  destinations: TripDestination[];
  isActive: boolean;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  clientName?: string;
  clientEmail?: string;
}

const COLLECTION = 'trips';

export const tripService: FirebaseService<Trip> = {
  getAll: async () => {
    try {
      const q = query(collection(db, COLLECTION), orderBy('name'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Trip));
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
      } as Trip;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  create: async (data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => {
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
      } as Trip;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  update: async (id: string, data: Partial<Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>>) => {
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
  }
};

// File handling service for trips
export const tripImageService = {
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