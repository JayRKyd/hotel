import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import TripForm from '@/components/admin/TripForm';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const NewTrip = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: any) => {
    try {
      console.log('Submitting trip data:', data);
      
      setIsSubmitting(true);
      
      // Here you would normally save the trip data to your backend
      // For now, we'll just simulate a successful creation
      setTimeout(() => {
        toast({
          title: t('common.success'),
          description: t('admin.trips.createSuccess'),
        });
        
        navigate('/admin/trips');
      }, 1000);
    } catch (error) {
      console.error('Error creating trip:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('admin.trips.createError'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/admin/trips');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => navigate('/admin/trips')}
          >
            <ArrowLeft size={16} className="mr-1" />
            {t('admin.trips.backToTrips')}
          </Button>
          <h1 className="text-3xl font-bold">{t('admin.trips.addNew')}</h1>
          <p className="text-gray-500">{t('admin.trips.createDescription')}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <TripForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewTrip; 