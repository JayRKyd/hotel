import React, { useState, useEffect, useRef } from 'react';
import type { Hotel } from '@/services/hotelService';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Plus, Trash, FileText, Loader, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { destinationService } from '@/services/destinationService';
import MapPicker from '@/components/admin/MapPicker';
import { cities, City } from '@/data/cities';
import { Checkbox } from "@/components/ui/checkbox";
import { useLoadScript } from '@react-google-maps/api';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_LIBRARIES } from '@/lib/maps/config';

// Form schema
const hotelFormSchema = z.object({
  name: z.string().min(3, { message: 'Hotel name must be at least 3 characters' }),
  country: z.string().min(2, { message: 'Country is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  photoUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  stars: z.number().min(1).max(5),
  price: z.number().min(0),
  amenities: z.array(z.string()).default(['WiFi', 'Parking', 'Pool'])
});

type HotelFormValues = z.infer<typeof hotelFormSchema>;

interface HotelFormProps {
  initialData?: Hotel;
  onSubmit: (data: Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const HotelForm: React.FC<HotelFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.photoUrl || '');
  const [citiesList, setCitiesList] = useState<City[]>(cities);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [location, setLocation] = useState(
    initialData?.location || { lat: 31.9539, lng: 35.9106 }
  );
  const [isSearchingPlace, setIsSearchingPlace] = useState(false);
  const [placeResults, setPlaceResults] = useState<Array<{id: string, name: string, description: string}>>([]);
  const [open, setOpen] = useState(false);
  const autocompleteTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Load Google Maps script with Places library
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES as any,
  });
  
  // Initialize form
  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      country: initialData?.country || '',
      city: initialData?.city || '',
      description: initialData?.description || '',
      photoUrl: initialData?.photoUrl || '',
      isActive: initialData?.isActive ?? true,
      isFeatured: initialData?.isFeatured ?? false,
      stars: initialData?.stars || 3,
      price: initialData?.price || 0,
      amenities: initialData?.amenities || ['WiFi', 'Parking', 'Pool'],
    },
  });
  
  useEffect(() => {
    // If a country is selected, filter cities by country
    if (selectedCountry) {
      setCitiesList(cities.filter(city => city.country === selectedCountry));
    } else {
      setCitiesList(cities);
    }
  }, [selectedCountry]);
  
  // Handle place search
  const handlePlaceSearch = (value: string) => {
    if (!isLoaded || value.length < 3) {
      setPlaceResults([]);
      return;
    }
    
    // Clear any existing timeout
    if (autocompleteTimeout.current) {
      clearTimeout(autocompleteTimeout.current);
    }
    
    // Add a small delay to prevent too many API calls while typing
    autocompleteTimeout.current = setTimeout(() => {
      setIsSearchingPlace(true);
      
      // Create a new AutocompleteService
      const autocompleteService = new google.maps.places.AutocompleteService();
      
      // Search for places matching the hotel name
      autocompleteService.getPlacePredictions(
        {
          input: value,
          types: ['lodging'], // Restrict to hotels/lodging
        },
        (predictions, status) => {
          setIsSearchingPlace(false);
          
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            setPlaceResults([]);
            return;
          }
          
          // Format predictions for the dropdown
          const results = predictions.map(prediction => ({
            id: prediction.place_id,
            name: prediction.structured_formatting.main_text,
            description: prediction.structured_formatting.secondary_text || '',
          }));
          
          setPlaceResults(results);
          if (results.length > 0) {
            setOpen(true);
          }
        }
      );
    }, 300);
  };
  
  // Handle place selection
  const handlePlaceSelect = (placeId: string, placeName: string) => {
    form.setValue('name', placeName);
    setOpen(false);
    
    if (!isLoaded) return;
    
    setIsSearchingPlace(true);
    
    // Create a PlacesService
    const placesService = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    
    // Get details for the selected place
    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'geometry', 'address_components'],
      },
      (place, detailsStatus) => {
        setIsSearchingPlace(false);
        
        if (detailsStatus !== google.maps.places.PlacesServiceStatus.OK || !place) {
          return;
        }
        
        // Extract country and city from address components
        let country = '';
        let city = '';
        
        place.address_components?.forEach((component) => {
          if (component.types.includes('country')) {
            country = component.long_name;
          }
          if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (!city && component.types.includes('administrative_area_level_1')) {
            // Use administrative area if locality is not available
            city = component.long_name;
          }
        });
        
        // Update form with place details
        if (country) form.setValue('country', country);
        if (city) form.setValue('city', city);
        
        // Update location if coordinates are available
        if (place.geometry?.location) {
          const newLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setLocation(newLocation);
        }
      }
    );
  };
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const onFormSubmit = async (data: HotelFormValues) => {
    try {
      // Handle image upload if needed
      let photoUrl = imagePreview;
      
      if (imageFile) {
        // Upload image logic here
      }
      
      // Submit the form with all data
      onSubmit({
        name: data.name,
        stars: data.stars,
        country: data.country,
        city: data.city,
        description: data.description,
        photoUrl,
        location,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        price: data.price,
        amenities: data.amenities
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Hotel Name with Autocomplete */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('admin.hotels.form.name')}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="hotel-name"
                            placeholder="Search for hotel name"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              handlePlaceSearch(e.target.value);
                            }}
                            className="w-full pr-10"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            {isSearchingPlace ? (
                              <Loader className="h-4 w-4 animate-spin text-gray-400" />
                            ) : (
                              <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandEmpty>No hotels found</CommandEmpty>
                        <CommandGroup>
                          {placeResults.map((place) => (
                            <CommandItem
                              key={place.id}
                              value={place.id}
                              onSelect={() => handlePlaceSelect(place.id, place.name)}
                            >
                              <div className="flex flex-col">
                                <span>{place.name}</span>
                                <span className="text-xs text-gray-500">{place.description}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Type a hotel name to search and autofill location details
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>{t('admin.hotels.form.country')}</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCountry(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Turkey">Turkey</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.hotels.form.city')}</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(Number(value))} 
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {citiesList.map(city => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Star Rating */}
            <FormField
              control={form.control}
              name="stars"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.hotels.form.stars')}</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(Number(value))} 
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select star rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('admin.hotels.form.description')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter hotel description" 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Hotel Image */}
            <div>
              <FormLabel>{t('admin.hotels.form.image')}</FormLabel>
              <div className="mt-2">
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Hotel preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Upload className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('hotel-image')?.click()}
                    >
                      {t('admin.hotels.form.image')}
                    </Button>
                    <Input
                      id="hotel-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended size: 1200x800px. Max size: 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Location Map */}
            <div className="mb-6">
              <FormLabel>{t('admin.hotels.form.location')}</FormLabel>
              <p className="text-sm text-gray-500 mb-2">
                Click on the map to set the hotel location
              </p>
              <MapPicker 
                initialLocation={location}
                onLocationChange={(newLocation) => {
                  setLocation(newLocation);
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" className="bg-[#00b6de] hover:bg-[#00a0c4]">
            {initialData ? t('admin.hotels.form.update') : t('admin.hotels.form.create')}
          </Button>
        </div>
        
        {/* Add this inside the form, in the settings section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('admin.hotels.form.active')}</FormLabel>
                  <FormDescription>
                    This hotel will be visible on the website
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t('admin.hotels.form.featured')}</FormLabel>
                  <FormDescription>
                    This hotel will appear on the detailed quote page
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default HotelForm;