import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Hotel, MapPin, Users, Calendar, Package, Settings, Globe, Loader2, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { destinationService } from '@/services/destinationService';
import { hotelService } from '@/services/hotelService';
import { tripService } from '@/services/tripService';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalTrips: 0,
    activeHotels: 0,
    pendingTrips: 0,
    totalRevenue: 0
  });
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load data from Firebase with error handling
        let destinations = [];
        let hotels = [];
        let trips = [];
        
        try {
          destinations = await destinationService.getAll();
        } catch (error) {
          console.error('Error loading destinations:', error);
        }
        
        try {
          hotels = await hotelService.getAll();
        } catch (error) {
          console.error('Error loading hotels:', error);
        }
        
        try {
          trips = await tripService.getAll();
        } catch (error) {
          console.error('Error loading trips:', error);
        }
        
        // Calculate stats
        const activeHotels = hotels.filter(hotel => hotel.isActive).length;
        const pendingTrips = trips.filter(trip => trip.status === 'pending').length;
        
        // Set stats
        setStats({
          totalTrips: trips.length,
          activeHotels,
          pendingTrips,
          totalRevenue: 0
        });
        
        // Get recent trips (limited to 4)
        if (trips.length > 0) {
          const sortedTrips = [...trips]
            .sort((a, b) => {
              if (!a.createdAt || !b.createdAt) return 0;
              return b.createdAt.getTime() - a.createdAt.getTime();
            })
            .slice(0, 4)
            .map(trip => ({
              id: trip.id,
              clientName: trip.clientName || 'No Name',
              destinations: Array.isArray(trip.destinations) ? trip.destinations : [],
              dates: `${trip.startDate || ''} - ${trip.endDate || ''}`,
              status: trip.status || 'Draft',
              price: trip.price?.toString() || '0'
            }));
          
          setRecentTrips(sortedTrips);
        }
      } catch (error) {
        console.error('Error in dashboard data loading:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{t('admin.dashboard.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('admin.dashboard.totalTripsCount')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalTrips}</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.dashboard.fromFirebase')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('admin.dashboard.activeHotelsCount')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeHotels}</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.dashboard.fromFirebase')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('admin.dashboard.pendingTrips')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pendingTrips}</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.dashboard.awaitingClientResponse')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('admin.dashboard.totalRevenue')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{t('admin.dashboard.yearToDate')}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('admin.dashboard.recentTrips')}</CardTitle>
            <CardDescription>{t('admin.dashboard.latestTripRequests')}</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTrips.length > 0 ? (
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-semibold">{trip.clientName}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin size={14} className="mr-1" />
                        <span>{trip.destinations.join(', ')}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>{trip.dates}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        trip.status === 'active' ? 'bg-green-100 text-green-800' :
                        trip.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </div>
                      <div className="text-sm font-bold mt-1">${trip.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>{t('admin.dashboard.noTripsFound')}</p>
              </div>
            )}
            <Link to="/admin/trips">
              <Button variant="outline" className="w-full mt-4">{t('admin.dashboard.viewAllTrips')}</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.dashboard.quickActions')}</CardTitle>
            <CardDescription>{t('admin.dashboard.commonTasks')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/admin/hotels/new">
                <Button variant="outline" className="w-full justify-start">
                  <Hotel className="mr-2" size={18} />
                  {t('admin.hotels.addNew')}
                </Button>
              </Link>
              <Link to="/admin/hotels">
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="mr-2" size={18} />
                  {t('admin.dashboard.manageHotels')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 