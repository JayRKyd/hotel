
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';

const QuoteBox = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    duration: '',
    adults: '2',
    children: '0',
    tripType: 'tour',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote requested:', formData);
    toast.success('Your quote request has been submitted successfully!', {
      description: 'We will contact you shortly with your personalized travel offer.',
    });
    
    // Reset form after submission
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      destination: '',
      travelDate: '',
      duration: '',
      adults: '2',
      children: '0',
      tripType: 'tour',
      specialRequests: ''
    });
  };

  return (
    <Card className="w-full max-w-lg shadow-lg border-t-4 border-t-maswadeh-cyan">
      <CardHeader className="bg-gradient-to-r from-maswadeh-cyan to-blue-400 text-white rounded-t-md">
        <CardTitle className="text-2xl font-bold text-center">Request Your Travel Quote</CardTitle>
        <CardDescription className="text-white text-center">
          Fill out the form below and we'll get back to you with a personalized quote
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              name="fullName"
              placeholder="Enter your full name" 
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="your@email.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                placeholder="+1 234 567 8900" 
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('destination', value)}
              value={formData.destination}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dubai">Dubai, UAE</SelectItem>
                <SelectItem value="cairo">Cairo, Egypt</SelectItem>
                <SelectItem value="istanbul">Istanbul, Turkey</SelectItem>
                <SelectItem value="bali">Bali, Indonesia</SelectItem>
                <SelectItem value="paris">Paris, France</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="travelDate">Travel Date</Label>
              <Input 
                id="travelDate" 
                name="travelDate"
                type="date" 
                value={formData.travelDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Days)</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('duration', value)}
                value={formData.duration}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-4">3-4 days</SelectItem>
                  <SelectItem value="5-7">5-7 days</SelectItem>
                  <SelectItem value="8-10">8-10 days</SelectItem>
                  <SelectItem value="11-14">11-14 days</SelectItem>
                  <SelectItem value="15+">15+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults">Number of Adults</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('adults', value)}
                value={formData.adults}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6+">6+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="children">Number of Children</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('children', value)}
                value={formData.children}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5+">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Trip Type</Label>
            <RadioGroup 
              defaultValue="tour" 
              onValueChange={(value) => handleSelectChange('tripType', value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-2"
              value={formData.tripType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tour" id="tour" />
                <Label htmlFor="tour">Tour Package</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business">Business Travel</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea 
              id="specialRequests" 
              name="specialRequests"
              placeholder="Any special requirements or preferences..." 
              className="min-h-[80px]"
              value={formData.specialRequests}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full bg-maswadeh-orange hover:bg-orange-600 text-white">
            Submit Quote Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteBox;
