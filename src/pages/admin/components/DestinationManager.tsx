import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Search, ChevronDown, ChevronUp, Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/types/hotels';

// Mock data for demonstration
const mockDestinations = [
  {
    id: '1',
    name: 'Bangkok',
    checkIn: '18-04-2025',
    checkOut: '21-04-2025',
    isRecommended: true,
    hotels: [
      {
        id: '101',
        name: 'Centara Watergate Pavilion Hotel Bangkok',
        stars: 5,
        checkIn: '18-04-2025',
        checkOut: '21-04-2025',
        image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
        rating: { score: 8.7, label: 'Excellent', reviews: 1406 },
        description: 'This modern hotel with a beautiful rooftop offers luxury and comfort in the heart of Bangkok.',
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
        price: { regular: 299, special: 249, currency: '$', perNight: true }
      }
    ]
  },
  {
    id: '2',
    name: 'Phuket',
    checkIn: '24-04-2025',
    checkOut: '30-04-2025',
    isRecommended: true,
    hotels: [
      {
        id: '201',
        name: 'Anantara ElevEast Pattaya',
        stars: 5,
        checkIn: '24-04-2025',
        checkOut: '30-04-2025',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        rating: { score: 9.3, label: 'Exceptional', reviews: 1832 },
        description: 'Luxurious beachfront resort with private pool villas and world-class dining options.',
        amenities: ['Private beach', 'Infinity pool', 'Spa', 'Fine dining'],
        price: { regular: 499, special: 399, currency: '$', perNight: true }
      }
    ]
  }
];

const DestinationManager = () => {
  const [destinations, setDestinations] = useState(mockDestinations);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDestination, setExpandedDestination] = useState<string | null>(null);
  
  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleExpandDestination = (id: string) => {
    setExpandedDestination(expandedDestination === id ? null : id);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Destination Manager</h1>
        <Button 
          className="bg-maswadeh-blue hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          Add Destination
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredDestinations.map(destination => (
          <Card key={destination.id} className="overflow-hidden">
            <CardHeader className="py-4 px-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CardTitle className="text-lg font-medium">{destination.name}</CardTitle>
                  {destination.isRecommended && (
                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                      Recommended
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleExpandDestination(destination.id)}
                  >
                    {expandedDestination === destination.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {destination.checkIn} to {destination.checkOut} • {destination.hotels.length} hotels
              </div>
            </CardHeader>
            
            {expandedDestination === destination.id && (
              <CardContent className="p-0">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-medium">Hotels</h3>
                  <Button size="sm" className="bg-maswadeh-cyan hover:bg-cyan-600">
                    <Plus size={16} className="mr-1" />
                    Add Hotel
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Stars</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {destination.hotels.map(hotel => (
                      <TableRow key={hotel.id}>
                        <TableCell className="font-medium">{hotel.name}</TableCell>
                        <TableCell>
                          {'★'.repeat(hotel.stars)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-gray-500 line-through text-xs">
                              {hotel.price?.currency}{hotel.price?.regular}
                            </span>
                            <span className="font-medium text-maswadeh-orange">
                              {hotel.price?.currency}{hotel.price?.special}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="bg-maswadeh-blue text-white px-1.5 py-0.5 rounded text-xs font-bold mr-1">
                              {hotel.rating.score}
                            </span>
                            <span className="text-sm">{hotel.rating.label}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationManager; 