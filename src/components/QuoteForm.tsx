import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { quoteService } from '@/services/quoteService';
import type { TripType } from '@/types/quotes';

const createFormSchema = (t: any) => z.object({
  fullName: z.string().min(2, t('validation.nameMinLength')),
  email: z.string().email(t('validation.invalidEmail')),
  phoneNumber: z.string().min(10, t('validation.phoneMinLength')),
  destination: z.string().min(1, t('validation.destinationRequired')),
  travelDate: z.date({ required_error: t('validation.dateRequired') }),
  duration: z.number().min(1, t('validation.durationMinimum')),
  numberOfAdults: z.number().min(1, t('validation.adultsMinimum')),
  numberOfChildren: z.number().min(0, t('validation.childrenNonNegative')),
  tripType: z.enum(['Tour Package', 'Custom Trip', 'Business Travel'] as const),
  specialRequests: z.string().optional()
});

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfAdults: 1,
      numberOfChildren: 0,
      tripType: 'Tour Package' as TripType
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Convert form values to QuoteRequest format
    const quoteData = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      destination: values.destination,
      travelDate: values.travelDate.toISOString(),
      duration: values.duration,
      numberOfAdults: values.numberOfAdults,
      numberOfChildren: values.numberOfChildren,
      tripType: values.tripType,
      specialRequests: values.specialRequests || ''
    };
    try {
      console.log('Submitting quote request:', quoteData);
      setIsSubmitting(true);
      const result = await quoteService.create(quoteData);
      console.log('Quote request created:', result);
      
      toast({
        title: t('quotePage.form.success'),
        description: t('quotePage.form.success'),
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t('quotePage.form.error'),
        description: t('quotePage.form.error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('quotePage.form.name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('quotePage.form.name')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('quotePage.form.email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('quotePage.form.phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 8900" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('quotePage.form.tripType')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('quotePage.form.selectDestination')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bangkok">Bangkok</SelectItem>
                    <SelectItem value="phuket">Phuket</SelectItem>
                    <SelectItem value="krabi">Krabi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="travelDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('quotePage.form.departureDate')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (Days)</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[3,5,7,10,14].map(days => (
                        <SelectItem key={days} value={days.toString()}>{days} {t('quotePage.form.days')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="numberOfAdults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('quotePage.form.adults')}</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('quotePage.form.selectNumber')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1,2,3,4,5,6].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfChildren"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('quotePage.form.children')}</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('quotePage.form.selectNumber')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[0,1,2,3,4].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tripType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('quotePage.form.tripType')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('quotePage.form.selectTripType')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tour Package">{t('quotePage.form.tripTypes.tourPackage')}</SelectItem>
                    <SelectItem value="Custom Trip">{t('quotePage.form.tripTypes.customTrip')}</SelectItem>
                    <SelectItem value="Business Travel">{t('quotePage.form.tripTypes.businessTravel')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('quotePage.form.message')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('quotePage.form.specialRequestsPlaceholder')}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('common.loading') : t('quotePage.form.submit')}
        </Button>
      </form>
    </Form>
  );
}