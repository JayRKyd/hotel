import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

interface Hotel {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  city: string;
}

interface MapViewProps {
  hotels: Hotel[];
}

const MapView: React.FC<MapViewProps> = ({ hotels }) => {
  const [selectedHotel, setSelectedHotel] = React.useState<Hotel | null>(null);
  
  // In a real app, you would use an environment variable for the API key
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY_HERE"
  });
  
  const mapCenter = React.useMemo(() => {
    if (hotels.length === 0) return { lat: 13.7563, lng: 100.5018 }; // Default to Bangkok
    
    // Calculate the center of all hotel locations
    const sumLat = hotels.reduce((sum, hotel) => sum + hotel.location.lat, 0);
    const sumLng = hotels.reduce((sum, hotel) => sum + hotel.location.lng, 0);
    
    return {
      lat: sumLat / hotels.length,
      lng: sumLng / hotels.length
    };
  }, [hotels]);
  
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };
  
  if (!isLoaded) return <div className="h-96 flex items-center justify-center bg-gray-100">Loading map...</div>;
  
  return (
    <div className="h-96 w-full">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={6}
        options={mapOptions}
      >
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={hotel.location}
            onClick={() => setSelectedHotel(hotel)}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }}
          />
        ))}
        
        {selectedHotel && (
          <InfoWindow
            position={selectedHotel.location}
            onCloseClick={() => setSelectedHotel(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-sm">{selectedHotel.name}</h3>
              <p className="text-xs text-gray-600">{selectedHotel.city}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView; 