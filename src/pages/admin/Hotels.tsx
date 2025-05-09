import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Star, Edit, Trash2, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { hotelService, hotelFileService } from '@/services/hotelService';
import type { Hotel } from '@/types/hotels';
import { toast } from '@/components/ui/use-toast';
import { Switch } from "@/components/ui/switch";

const AdminHotels = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterStars, setFilterStars] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<string>('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const data = await hotelService.getAll();
      
      // Convert Date objects to strings to match the Hotel type from types/hotels.ts
      const processedData = data.map(hotel => ({
        ...hotel,
        createdAt: hotel.createdAt instanceof Date ? hotel.createdAt.toISOString() : hotel.createdAt,
        updatedAt: hotel.updatedAt instanceof Date ? hotel.updatedAt.toISOString() : hotel.updatedAt
      }));
      
      setHotels(processedData);
    } catch (error) {
      console.error('Error loading hotels:', error);
      toast({
        title: t('common.error'),
        description: "Failed to load hotels",
        variant: "destructive",
      });
    }
  };
  
  // Filter hotels based on search and filters
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity ? hotel.city === filterCity : true;
    const matchesStars = filterStars ? hotel.stars === parseInt(filterStars) : true;
    const matchesFeatured = filterFeatured === 'featured' 
      ? hotel.isFeatured 
      : filterFeatured === 'not-featured' 
        ? !hotel.isFeatured 
        : true;
    
    return matchesSearch && matchesCity && matchesStars && matchesFeatured;
  });
  
  // Get unique cities for filter
  const cities = Array.from(new Set(hotels.map(hotel => hotel.city)));
  
  // Update the delete handler to modify the state directly
  const handleDelete = async (id: string, photoUrl?: string) => {
    if (window.confirm(t('admin.hotels.deleteConfirm'))) {
      try {
        // First delete the image if it exists
        if (photoUrl) {
          await hotelFileService.deleteImage(photoUrl);
        }
        
        // Then delete the hotel from Firebase
        await hotelService.delete(id);
        
        // Update the UI by removing the deleted hotel
        setHotels(hotels.filter(hotel => hotel.id !== id));
        
        toast({
          title: t('common.success'),
          description: t('admin.hotels.deleteSuccess'),
          variant: "default",
        });
      } catch (error) {
        console.error('Error deleting hotel:', error);
        
        toast({
          title: t('common.error'),
          description: t('admin.hotels.loadError'),
          variant: "destructive",
        });
      }
    }
  };
  
  // Add this function to handle toggling the featured status
  const toggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      await hotelService.update(id, { isFeatured });
      
      // Update the local state
      setHotels(hotels.map(hotel => 
        hotel.id === id ? { ...hotel, isFeatured } : hotel
      ));
      
      toast({
        title: t('common.success'),
        description: isFeatured ? t('admin.hotels.addedToFeatured') : t('admin.hotels.removedFromFeatured'),
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast({
        title: t('common.error'),
        description: "Failed to update hotel",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{t('admin.hotels.title')}</h1>
          <Link to="/admin/hotels/new">
            <Button className="bg-[#00b6de] hover:bg-[#00a0c4]">
              <Plus size={16} className="mr-2" />
              {t('admin.hotels.addNew')}
            </Button>
          </Link>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder={t('admin.hotels.form.searchHotel')}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.hotels.form.filterByCity')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.hotels.form.allCities')}</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city || "unknown"}>{city || "Unknown"}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterStars} onValueChange={setFilterStars}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.hotels.form.filterByRating')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.hotels.form.allRatings')}</SelectItem>
              {[3, 4, 5].map(stars => (
                <SelectItem key={stars} value={stars.toString()}>{stars} {t('admin.hotels.form.stars')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterFeatured} onValueChange={setFilterFeatured}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.hotels.form.filterByFeatured')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.hotels.form.allHotels')}</SelectItem>
              <SelectItem value="featured">{t('admin.hotels.form.featured')}</SelectItem>
              <SelectItem value="not-featured">{t('admin.hotels.form.notFeatured')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Hotels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="h-48 relative">
                <img 
                  src={hotel.photoUrl} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span>{hotel.city}</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">{t('admin.hotels.form.featured')}</span>
                  <Switch
                    checked={hotel.isFeatured}
                    onCheckedChange={(checked) => toggleFeatured(hotel.id, checked)}
                  />
                </div>
                
                <div className="mb-3">
                  <h4 className="text-sm font-semibold mb-1">{t('admin.hotels.form.amenities')}:</h4>
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities?.map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit size={14} className="mr-1" />
                        {t('common.edit')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('admin.hotels.edit')}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>{t('admin.hotels.editFormPlaceholder')}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700" 
                    onClick={() => handleDelete(hotel.id, hotel.photoUrl)}
                  >
                    <Trash2 size={16} />
                    {t('common.delete')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHotels; 