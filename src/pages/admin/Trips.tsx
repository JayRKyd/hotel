import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Calendar, MapPin, Users, Edit, Trash2, Eye, Mail, Phone, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import AdminLayout from '@/components/admin/AdminLayout';
import { quoteService } from '@/services/quoteService';
import type { QuoteRequest } from '@/types/quotes';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

const AdminTrips = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      console.log('Loading quotes...');
      const data = await quoteService.getAll();
      console.log('Quotes loaded:', data);
      setQuotes(data);
    } catch (error) {
      console.error('Error loading quotes:', error);
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('admin.trips.loadError')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteStatusChange = async (id: string, isQuoted: boolean) => {
    try {
      await quoteService.updateQuoteStatus(id, isQuoted);
      await loadQuotes(); // Reload to get updated data
      toast({
        title: isQuoted ? t('admin.trips.markedAsQuoted') : t('admin.trips.markedAsNotQuoted'),
        description: isQuoted ? t('admin.trips.quoteMarkedAsSent') : t('admin.trips.quoteMarkedAsNotSent'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('admin.trips.updateStatusError')
      });
    }
  };

  // Filter quotes based on search and filters
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true :
                         filterStatus === 'quoted' ? quote.isQuoted :
                         filterStatus === 'pending' ? !quote.isQuoted : true;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">{t('admin.trips.title')}</h1>
          <Link to="/admin/trips/new">
            <Button className="bg-[#00b6de] hover:bg-[#00a0c4]">
              <Plus size={18} className="mr-2" />
              {t('admin.trips.addNew')}
            </Button>
          </Link>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder={t('admin.trips.searchPlaceholder')}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder={t('admin.trips.filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('admin.trips.allQuotes')}</SelectItem>
              <SelectItem value="quoted">{t('admin.trips.quoted')}</SelectItem>
              <SelectItem value="pending">{t('admin.trips.pending')}</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="newest">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Quote Requests Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">{t('admin.trips.client')}</TableHead>
                <TableHead>{t('admin.trips.contact')}</TableHead>
                <TableHead>{t('admin.trips.destination')}</TableHead>
                <TableHead>{t('admin.trips.travelDate')}</TableHead>
                <TableHead>{t('admin.trips.travelers')}</TableHead>
                <TableHead>{t('admin.trips.tripType')}</TableHead>
                <TableHead>{t('admin.trips.status')}</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading quote requests...
                  </TableCell>
                </TableRow>
              ) : filteredQuotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    {t('admin.trips.noQuotesFound')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotes.map(quote => (
                  <TableRow key={quote.id}>
                    <TableCell>
                      <div className="font-medium">{quote.fullName}</div>
                      <div className="text-sm text-gray-500">
                        {t('admin.trips.requested')}: {format(quote.requestedAt, 'MMM d, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm">
                        <Mail size={14} className="text-gray-500" />
                        <span>{quote.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm mt-1">
                        <Phone size={14} className="text-gray-500" />
                        <span>{quote.phoneNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} className="text-gray-500" />
                        <span>{quote.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-gray-500" />
                        <span>{format(new Date(quote.travelDate), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {t('admin.trips.duration')}: {quote.duration} {t('quotePage.form.days')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="text-gray-500" />
                        <span>
                          {quote.numberOfAdults} {t('quotePage.form.adults')}, {quote.numberOfChildren} {t('quotePage.form.children')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {quote.tripType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={quote.isQuoted}
                          onCheckedChange={(checked) => 
                            handleQuoteStatusChange(quote.id, checked as boolean)
                          }
                        />
                        <span className={quote.isQuoted ? 'text-green-600' : 'text-gray-500'}>
                          {quote.isQuoted ? t('admin.trips.quoted') : t('admin.trips.notQuoted')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          // Show quote details modal
                          toast({
                            title: t('admin.trips.specialRequests'),
                            description: quote.specialRequests || t('admin.trips.noSpecialRequests'),
                          });
                        }}
                      >
                        <Eye size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTrips; 