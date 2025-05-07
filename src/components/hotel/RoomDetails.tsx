import React, { useState } from 'react';
import { FileText, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PDFViewer } from '@/components/PDFViewer';
import { RoomType } from '@/types/destinations';

interface RoomDetailsProps {
  rooms: RoomType[];
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [showPDF, setShowPDF] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Type</TableHead>
            <TableHead>Meal Plan</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.name}</TableCell>
              <TableCell>{room.mealPlan}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Users size={16} className="text-gray-500" />
                  <span>
                    {room.maxAdults} Adults, {room.maxChildren} Children
                    {room.maxInfants > 0 && `, ${room.maxInfants} Infants`}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {room.photos.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowPhotos(true);
                      }}
                    >
                      Photos
                    </Button>
                  )}
                  {room.pdfUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoom(room);
                        setShowPDF(true);
                      }}
                    >
                      <FileText size={14} className="mr-1" />
                      Details
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PDF Viewer Dialog */}
      <Dialog open={showPDF} onOpenChange={setShowPDF}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedRoom?.name} - Room Details</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden h-full">
            {selectedRoom?.pdfUrl ? (
              <PDFViewer url={selectedRoom.pdfUrl} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>No PDF available for this room type</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Photos Gallery Dialog */}
      <Dialog open={showPhotos} onOpenChange={setShowPhotos}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedRoom?.name} - Room Photos</DialogTitle>
          </DialogHeader>
          {selectedRoom?.photos && selectedRoom.photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {selectedRoom.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-100 rounded-md overflow-hidden"
                >
                  <img
                    src={photo}
                    alt={`${selectedRoom.name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p>No photos available for this room type</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomDetails; 