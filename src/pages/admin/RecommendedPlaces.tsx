import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Image, ArrowUp, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { RecommendedPlace } from '@/types/destinations';
import { destinationService } from '@/services/destinationService';
import AddRecommendedPlaceDialog from './components/AddRecommendedPlaceDialog';

const RecommendedPlaces = () => {
  const { t } = useTranslation();
  const [places, setPlaces] = useState<RecommendedPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [destinations, setDestinations] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<RecommendedPlace | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [placesData, destinationsData] = await Promise.all([
        destinationService.getRecommendedPlaces(),
        destinationService.getDestinations()
      ]);
      setPlaces(placesData);
      setDestinations(destinationsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEdit = async (place: Partial<RecommendedPlace>) => {
    try {
      if (editingPlace) {
        await destinationService.updateRecommendedPlace(Number(editingPlace.id), place);
      } else {
        await destinationService.createRecommendedPlace(place as Omit<RecommendedPlace, 'id'>);
      }
      loadData();
      setDialogOpen(false);
      setEditingPlace(null);
    } catch (error) {
      console.error('Error saving place:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('admin.recommendedPlaces.confirmDelete'))) {
      try {
        await destinationService.deleteRecommendedPlace(Number(id));
        loadData();
      } catch (error) {
        console.error('Error deleting place:', error);
      }
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newPlaces = [...places];
    const place = newPlaces[index];
    const prevPlace = newPlaces[index - 1];
    
    try {
      await Promise.all([
        destinationService.updateRecommendedPlace(Number(place.id), { sortOrder: String(Number(place.sortOrder) - 1) }),
        destinationService.updateRecommendedPlace(Number(prevPlace.id), { sortOrder: String(Number(prevPlace.sortOrder) + 1) })
      ]);
      loadData();
    } catch (error) {
      console.error('Error reordering places:', error);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === places.length - 1) return;
    const newPlaces = [...places];
    const place = newPlaces[index];
    const nextPlace = newPlaces[index + 1];
    
    try {
      await Promise.all([
        destinationService.updateRecommendedPlace(Number(place.id), { sortOrder: String(Number(place.sortOrder) + 1) }),
        destinationService.updateRecommendedPlace(Number(nextPlace.id), { sortOrder: String(Number(nextPlace.sortOrder) - 1) })
      ]);
      loadData();
    } catch (error) {
      console.error('Error reordering places:', error);
    }
  };

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination = !selectedDestination || place.destinationId.toString() === selectedDestination;
    return matchesSearch && matchesDestination;
  });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">{t('admin.recommendedPlaces.title')}</h1>
          <Button 
            className="bg-maswadeh-blue hover:bg-blue-700"
            onClick={() => {
              setEditingPlace(null);
              setDialogOpen(true);
            }}
          >
            <Plus size={16} className="mr-2" />
            {t('admin.recommendedPlaces.addPlace')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder={t('admin.recommendedPlaces.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.recommendedPlaces.filterByDestination')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{t('admin.recommendedPlaces.allDestinations')}</SelectItem>
              {destinations.map(dest => (
                <SelectItem key={dest.id} value={dest.id.toString()}>
                  {dest.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place, index) => (
            <Card key={place.id}>
              <CardContent className="p-4">
                <div className="aspect-video mb-4 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={place.photoUrl}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {place.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPlace(place);
                        setDialogOpen(true);
                      }}
                    >
                      <Edit size={14} className="mr-1" />
                      {t('common.edit')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(place.id.toString())}
                    >
                      <Trash2 size={14} className="mr-1" />
                      {t('common.delete')}
                    </Button>
                  </div>

                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={index === 0}
                      onClick={() => handleMoveUp(index)}
                    >
                      <ArrowUp size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={index === filteredPlaces.length - 1}
                      onClick={() => handleMoveDown(index)}
                    >
                      <ArrowDown size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddRecommendedPlaceDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          destinations={destinations}
          initialData={editingPlace}
          onSubmit={handleAddEdit}
        />
      </div>
    </AdminLayout>
  );
};

export default RecommendedPlaces; 