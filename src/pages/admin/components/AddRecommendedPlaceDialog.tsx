import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecommendedPlace, Destination } from '@/types/destinations';

interface AddRecommendedPlaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destinations: Destination[];
  initialData: RecommendedPlace | null;
  onSubmit: (place: Partial<RecommendedPlace>) => void;
}

const AddRecommendedPlaceDialog: React.FC<AddRecommendedPlaceDialogProps> = ({
  open,
  onOpenChange,
  destinations,
  initialData,
  onSubmit
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<RecommendedPlace>>({
    name: '',
    description: '',
    photoUrl: '',
    destinationId: '0',
    isActive: true,
    sortOrder: '0'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        description: '',
        photoUrl: '',
        destinationId: '0',
        isActive: true,
        sortOrder: '0'
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? t('admin.recommendedPlaces.editPlace') : t('admin.recommendedPlaces.addNewPlace')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="destination">{t('admin.destinations.destination')}</Label>
            <Select
              value={formData.destinationId?.toString()}
              onValueChange={(value) => setFormData({
                ...formData,
                destinationId: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('admin.recommendedPlaces.selectDestination')} />
              </SelectTrigger>
              <SelectContent>
                {destinations.map(dest => (
                  <SelectItem key={dest.id} value={dest.id.toString()}>
                    {dest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">{t('admin.recommendedPlaces.placeName')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({
                ...formData,
                name: e.target.value
              })}
              placeholder={t('admin.recommendedPlaces.enterPlaceName')}
            />
          </div>

          <div>
            <Label htmlFor="description">{t('admin.recommendedPlaces.description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({
                ...formData,
                description: e.target.value
              })}
              placeholder={t('admin.recommendedPlaces.enterDescription')}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="photo">{t('admin.recommendedPlaces.photoUrl')}</Label>
            <Input
              id="photo"
              value={formData.photoUrl}
              onChange={(e) => setFormData({
                ...formData,
                photoUrl: e.target.value
              })}
              placeholder={t('admin.recommendedPlaces.enterPhotoUrl')}
            />
            {formData.photoUrl && (
              <div className="mt-2 aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={formData.photoUrl}
                  alt={t('admin.recommendedPlaces.preview')}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {initialData ? t('common.update') : t('common.create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecommendedPlaceDialog; 