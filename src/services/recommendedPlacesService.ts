import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { RecommendedPlace } from '@/types/recommendedPlaces';
import { FirebaseService, convertDoc } from '@/lib/firebase/types';
import { handleFirebaseError } from '@/lib/firebase/errors';
import { getDoc } from 'firebase/firestore';
const COLLECTION = 'recommendedPlaces';

export const recommendedPlacesService: FirebaseService<RecommendedPlace> = {
  getAll: async () => {
    try {
      const q = query(
        collection(db, COLLECTION),
        where('isActive', '==', true),
        orderBy('sortOrder')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => convertDoc<RecommendedPlace>(doc));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return convertDoc<RecommendedPlace>(snapshot);
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  create: async (data: Omit<RecommendedPlace, 'id' | 'createdAt' | 'updatedAt'>) => {
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
      };
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  update: async (id: string, data: Partial<Omit<RecommendedPlace, 'id' | 'createdAt' | 'updatedAt'>>) => {
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

export const recommendedPlacesImageService = {
  uploadImage: async (file: File): Promise<string> => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `images/places/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  deleteImage: async (url: string) => {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }
}; 