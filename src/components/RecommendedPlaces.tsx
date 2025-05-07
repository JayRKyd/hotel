import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { recommendedPlaces } from '@/data/recommendedPlaces';
import { useTranslation } from 'react-i18next';

const RecommendedPlaces = () => {
  const { t } = useTranslation();
  // Use static data directly
  const places = recommendedPlaces.slice(0, 6);

  // If no places to show, display a message (this is unlikely with static data)
  if (places.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('recommendedPlaces.noPlaces')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {places.map((place) => (
        <Card key={place.id} className="overflow-hidden group">
          <div className="relative h-48 overflow-hidden bg-gray-200">
            {/* Placeholder for image until you add them later */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              {place.photoUrl ? (
                <img
                  src={place.photoUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                t('recommendedPlaces.imagePlaceholder')
              )}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {place.description}
            </p>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 flex items-center">
                <MapPin size={14} className="mr-1" />
                {place.destination_name}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecommendedPlaces;