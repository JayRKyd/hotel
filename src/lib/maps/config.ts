// Google Maps API configuration
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Libraries to load with Google Maps
export const GOOGLE_MAPS_LIBRARIES = ['places'];

// Helper function to check if the Maps API is loaded successfully
export const handleMapsError = (error: Error) => {
  console.error('Google Maps API Error:', error);
  
  if (error.message.includes('ApiTargetBlockedMapError')) {
    console.warn(
      'This API key may have domain restrictions. ' +
      'For local development, you may need to enable it for localhost or get a development key.'
    );
  }
};
