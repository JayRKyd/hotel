import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HotelForm from '@/components/admin/HotelForm';
import { hotelService } from '@/services/hotelService';
import { toast } from '@/components/ui/use-toast';
import type { Hotel } from '@/services/hotelService';
import { useTranslation } from 'react-i18next';

const NewHotel = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (data: Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Submitting hotel data:', data);

      setIsSubmitting(true);

      const result = await hotelService.create(data);
      console.log('Hotel created:', result);

      toast({
        title: t('common.success'),
        description: t('admin.hotels.createSuccess'),
      });

      navigate('/admin/hotels');
    } catch (error) {
      console.error('Error creating hotel:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('admin.hotels.createError'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/hotels');
  };

  return (
    <>
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate('/admin/hotels')}
        >
          <ArrowLeft size={16} className="mr-1" />
          {t('admin.hotels.backToHotels')}
        </Button>
        <h1 className="text-3xl font-bold">{t('admin.hotels.addNew')}</h1>
        <p className="text-gray-500">{t('admin.hotels.createDescription')}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <HotelForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </>
  );
};

export default NewHotel;