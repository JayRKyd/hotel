import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from '@/lib/maps/config';
import { useTranslation } from 'react-i18next';

interface MapPickerProps {
  initialLocation?: { lat: number; lng: number };
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ initialLocation, onLocationChange }) => {
  const { t } = useTranslation();
  const [markerPosition, setMarkerPosition] = useState(
    initialLocation || { lat: 31.9539, lng: 35.9106 } // Default to Amman, Jordan
  );
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  
  // Use the shared Google Maps loader
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES as any,
  });
  
  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);
  
  useEffect(() => {
    if (isLoaded) {
      setMapLoaded(true);
    }
  }, [isLoaded]);
  
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setMarkerPosition(newPosition);
      onLocationChange(newPosition);
    }
  };
  
  // Manual coordinate input component
  const ManualCoordinateInput = () => (
    <div className="h-64 bg-gray-100 flex flex-col items-center justify-center p-4 border border-red-300 rounded">
      <p className="text-red-500 font-medium mb-2">{t('admin.mapPicker.loadError')}</p>
      <p className="text-sm text-gray-600 text-center">
        {t('admin.mapPicker.enterManually')}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.mapPicker.latitude')}</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded" 
            value={markerPosition.lat}
            onChange={(e) => {
              const newPos = { ...markerPosition, lat: parseFloat(e.target.value) };
              setMarkerPosition(newPos);
              onLocationChange(newPos);
            }}
            step="0.0001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.mapPicker.longitude')}</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded" 
            value={markerPosition.lng}
            onChange={(e) => {
              const newPos = { ...markerPosition, lng: parseFloat(e.target.value) };
              setMarkerPosition(newPos);
              onLocationChange(newPos);
            }}
            step="0.0001"
          />
        </div>
      </div>
    </div>
  );

  // If there's an error loading the map, show manual input
  if (loadError) {
    return <ManualCoordinateInput />;
  }
  
  return (
    <div className="h-64 w-full">
      {!isLoaded && (
        <div className="h-64 bg-gray-100 flex items-center justify-center">{t('admin.mapPicker.loading')}</div>
      )}
      
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={markerPosition}
          zoom={13}
          onClick={handleMapClick}
          onLoad={() => console.log('Map loaded successfully')}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapPicker;