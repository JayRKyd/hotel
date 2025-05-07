import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

export interface FirebaseDocument {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FirebaseService<T extends FirebaseDocument> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  create: (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => Promise<T>;
  update: (id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const convertDoc = <T extends DocumentData>(
  doc: QueryDocumentSnapshot<DocumentData>
): T & FirebaseDocument => {
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  } as T & FirebaseDocument;
};

export const handleFirebaseError = (error: unknown): Error => {
  console.error('Firebase error:', error);
  
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'permission-denied':
        return new Error('You do not have permission to perform this action');
      case 'not-found':
        return new Error('The requested resource was not found');
      case 'already-exists':
        return new Error('This resource already exists');
      default:
        return new Error(`Firebase error: ${error.message}`);
    }
  }
  
  return error instanceof Error ? error : new Error('An unknown error occurred');
}; 