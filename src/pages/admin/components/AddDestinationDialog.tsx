import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AddDestinationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (destination: {
    name: string;
    checkIn: string;
    checkOut: string;
    isRecommended: boolean;
  }) => void;
}

const AddDestinationDialog: React.FC<AddDestinationDialogProps> = ({
  open,
  onOpenChange,
  onAdd
}) => {
  const { t } = useTranslation();
  const [newDestination, setNewDestination] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    isRecommended: false
  });
  
  const handleSubmit = () => {
    onAdd(newDestination);
    setNewDestination({
      name: '',
      checkIn: '',
      checkOut: '',
      isRecommended: false
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('admin.destinations.addNewDestination')}</DialogTitle>
          <DialogDescription>
            {t('admin.destinations.addNewDestinationDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination-name" className="text-right">
              {t('admin.destinations.destination')}
            </Label>
            <Input
              id="destination-name"
              value={newDestination.name}
              onChange={(e) => setNewDestination({...newDestination, name: e.target.value})}
              className="col-span-3"
              placeholder={t('admin.destinations.destinationPlaceholder')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="check-in" className="text-right">
              {t('admin.destinations.checkIn')}
            </Label>
            <Input
              id="check-in"
              value={newDestination.checkIn}
              onChange={(e) => setNewDestination({...newDestination, checkIn: e.target.value})}
              className="col-span-3"
              placeholder={t('admin.destinations.datePlaceholder')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="check-out" className="text-right">
              {t('admin.destinations.checkOut')}
            </Label>
            <Input
              id="check-out"
              value={newDestination.checkOut}
              onChange={(e) => setNewDestination({...newDestination, checkOut: e.target.value})}
              className="col-span-3"
              placeholder={t('admin.destinations.datePlaceholder')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is-recommended" className="text-right">
              {t('admin.destinations.recommended')}
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="is-recommended"
                checked={newDestination.isRecommended}
                onCheckedChange={(checked) => setNewDestination({...newDestination, isRecommended: checked})}
              />
              <Label htmlFor="is-recommended">
                {t('admin.destinations.markAsRecommended')}
              </Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit}>
            {t('admin.destinations.addDestination')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDestinationDialog; 