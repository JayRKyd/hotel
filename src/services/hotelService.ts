import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FirebaseService, FirebaseDocument, handleFirebaseError } from '@/lib/firebase/types';

export interface Hotel extends FirebaseDocument {
  name: string;
  country: string;
  city: string;
  description: string;
  photoUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  stars: number;
  price: number;
  amenities: string[];
  location: {
    lat: number;
    lng: number;
  };
  rooms?: {
    id: string;
    name: string;
    pdfUrl?: string;
  }[];
  roomType?: string;
  maxOccupancy?: string;
}

const COLLECTION = 'hotels';

export const hotelService: FirebaseService<Hotel> = {
  getAll: async () => {
    try {
      const q = query(collection(db, COLLECTION), orderBy('name'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Hotel));
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
      } as Hotel;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  create: async (data: Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>) => {
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
      } as Hotel;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  update: async (id: string, data: Partial<Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>>) => {
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
      // Uncomment and use the Firebase deletion code
      const docRef = doc(db, COLLECTION, id);
      await deleteDoc(docRef);
      
      console.log(`Hotel with ID: ${id} deleted successfully`);
      // No return value needed for void Promise
    } catch (error) {
      console.error('Error deleting hotel:', error);
      throw handleFirebaseError(error);
    }
  }
};

// File handling service for hotels
export const hotelImageService = {
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

  deleteImage: async (photoUrl: string) => {
    try {
      // If it's a Firebase Storage URL, delete it
      if (photoUrl.includes('firebase') || photoUrl.startsWith('gs://')) {
        const imageRef = ref(storage, photoUrl);
        await deleteObject(imageRef);
      }
      // If it's a base64 image, no need to delete from storage
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error for image deletion failures
      return false;
    }
  }
}; 