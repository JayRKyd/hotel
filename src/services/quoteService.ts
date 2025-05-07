import { db } from '@/lib/firebase/config';
import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { QuoteRequest } from '@/types/quotes';
import { handleFirebaseError } from '@/lib/firebase/types';

const COLLECTION = 'quoteRequests';

export const quoteService = {
  // Create a new quote request
  create: async (data: Omit<QuoteRequest, 'id' | 'isQuoted' | 'requestedAt' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        isQuoted: false,
        requestedAt: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      return {
        id: docRef.id,
        ...data,
        isQuoted: false,
        requestedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      } as QuoteRequest;
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  // Get all quote requests
  getAll: async () => {
    try {
      const q = query(
        collection(db, COLLECTION), 
        orderBy('requestedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        requestedAt: doc.data().requestedAt?.toDate(),
        quotedAt: doc.data().quotedAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as QuoteRequest));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  // Get quote requests by status
  getByStatus: async (isQuoted: boolean) => {
    try {
      const q = query(
        collection(db, COLLECTION),
        where('isQuoted', '==', isQuoted),
        orderBy('requestedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        requestedAt: doc.data().requestedAt?.toDate(),
        quotedAt: doc.data().quotedAt?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as QuoteRequest));
    } catch (error) {
      throw handleFirebaseError(error);
    }
  },

  // Update quote status
  updateQuoteStatus: async (id: string, isQuoted: boolean) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        isQuoted,
        quotedAt: isQuoted ? Timestamp.now() : null,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      throw handleFirebaseError(error);
    }
  }
};