export class FirebaseError extends Error {
    constructor(
      message: string,
      public code: string,
      public originalError?: Error
    ) {
      super(message);
      this.name = 'FirebaseError';
    }
  }
  
  export const handleFirebaseError = (error: any): FirebaseError => {
    console.error('Firebase Error:', error);
    
    if (error instanceof FirebaseError) {
      return error;
    }
  
    return new FirebaseError(
      error.message || 'An unknown error occurred',
      error.code || 'unknown',
      error
    );
  }; 