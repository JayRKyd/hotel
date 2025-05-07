import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { destinationService, destinationImageService, Destination } from '@/services/destinationService';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Loader2, MoveUp, MoveDown } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Destinations = () => {
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    countryId: '',
    description: '',
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  // Load destinations
  const loadDestinations = async () => {
    try {
      setLoading(true);
      const data = await destinationService.getAll();
      setDestinations(data);
    } catch (error) {
      toast.error(t('admin.destinations.errorLoading'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  // Handle image change
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

  // Open dialog for editing
  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      countryId: destination.countryId,
      description: destination.description || '',
      isActive: destination.isActive,
    });
    setImagePreview(destination.photoUrl);
    setDialogOpen(true);
  };

  // Open dialog for creating
  const handleCreate = () => {
    setEditingDestination(null);
    setFormData({
      name: '',
      countryId: '',
      description: '',
      isActive: true,
    });
    setImageFile(null);
    setImagePreview('');
    setDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      let photoUrl = imagePreview;
      
      // Only try to upload if there's a new image file
      if (imageFile) {
        try {
          // Use base64 encoding for now (simpler than Firebase Storage)
          photoUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
          });
        } catch (imgError) {
          console.error("Image upload error:", imgError);
          toast.error("Failed to upload image");
          setLoading(false);
          return;
        }
      }
      
      // Rest of your function remains the same
      const destinationData = {
        ...formData,
        photoUrl,
        hotels: [], // Add empty hotels array to satisfy the Destination interface
        sortOrder: editingDestination ? editingDestination.sortOrder : destinations.length
      };
      
      if (editingDestination) {
        // Update existing destination
        await destinationService.update(editingDestination.id, destinationData);
        toast.success('Destination updated successfully');
      } else {
        // Create new destination
        await destinationService.create(destinationData);
        toast.success('Destination created successfully');
      }
      
      setDialogOpen(false);
      loadDestinations();
    } catch (error) {
      toast.error('Error saving destination');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle destination deletion
  const handleDelete = async (destination: Destination) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      try {
        setLoading(true);
        
        // Delete image first
        if (destination.photoUrl) {
          await destinationImageService.deleteImage();
        }
        
        // Then delete the destination
        await destinationService.delete(destination.id);
        toast.success('Destination deleted successfully');
        loadDestinations();
      } catch (error) {
        toast.error('Error deleting destination');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle moving destination up in order
  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    
    try {
      setLoading(true);
      const currentDestination = destinations[index];
      const previousDestination = destinations[index - 1];
      
      await destinationService.batchReorder([
        { id: currentDestination.id, sortOrder: index - 1 },
        { id: previousDestination.id, sortOrder: index }
      ]);
      
      toast.success('Order updated successfully');
      await loadDestinations();
    } catch (error) {
      toast.error('Error updating order');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle moving destination down in order
  const handleMoveDown = async (index: number) => {
    if (index === destinations.length - 1) return;
    
    try {
      setLoading(true);
      const currentDestination = destinations[index];
      const nextDestination = destinations[index + 1];
      
      await destinationService.batchReorder([
        { id: currentDestination.id, sortOrder: index + 1 },
        { id: nextDestination.id, sortOrder: index }
      ]);
      
      toast.success('Order updated successfully');
      await loadDestinations();
    } catch (error) {
      toast.error('Error updating order');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && destinations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('admin.destinations.title')}</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          {t('admin.destinations.addDestinationButton')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <Card key={destination.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={destination.photoUrl}
                alt={destination.name}
                className="object-cover w-full h-full"
              />
              {!destination.isActive && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {t('admin.destinations.inactive')}
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{destination.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{destination.countryId}</p>
              <p className="text-sm line-clamp-2 mb-4">{destination.description}</p>
              <div className="flex justify-between items-center">
                <div className="space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === destinations.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(destination)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(destination)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Destination Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingDestination ? t('admin.destinations.editDestination') : t('admin.destinations.addDestination')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{t('admin.destinations.name')}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="countryId">{t('admin.destinations.countryId')}</Label>
              <Input
                id="countryId"
                name="countryId"
                value={formData.countryId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">{t('admin.destinations.description')}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isActive">{t('admin.destinations.active')}</Label>
            </div>
            <div>
              <Label htmlFor="image">{t('admin.destinations.image')}</Label>
              <div className="mt-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt={t('admin.destinations.preview')}
                    className="mt-2 rounded-lg max-h-40 object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={loading}
              >
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingDestination ? t('common.update') : t('common.create')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Destinations; 