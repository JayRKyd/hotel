import React from 'react';
import { Users, Award, Clock, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#00b6de] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('aboutPage.title')}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t('aboutPage.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Maswadeh Tourism Team" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">{t('aboutPage.story.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('aboutPage.story.description')}
              </p>
              <p className="text-gray-700 mb-4">
                {t('aboutPage.story.history')}
              </p>
              <p className="text-gray-700">
                {t('aboutPage.story.expansion')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('aboutPage.values.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#00b6de]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#00b6de]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('aboutPage.mission.title')}</h3>
              <p className="text-gray-600">
                {t('aboutPage.mission.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#00b6de]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#00b6de]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('aboutPage.vision.title')}</h3>
              <p className="text-gray-600">
                {t('aboutPage.vision.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#00b6de]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#00b6de]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('aboutPage.passion.title')}</h3>
              <p className="text-gray-600">
                {t('aboutPage.passion.description')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-[#00b6de]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#00b6de]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('aboutPage.reliability.title')}</h3>
              <p className="text-gray-600">
                {t('aboutPage.reliability.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('aboutPage.team.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="Ahmad Maswadeh" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{t('aboutPage.team.ahmad')}</h3>
                <p className="text-[#00b6de] mb-3">{t('aboutPage.team.ceo')}</p>
                <p className="text-gray-600 mb-4">
                  {t('aboutPage.team.ahmadDescription')}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
                alt="Sarah Johnson" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{t('aboutPage.team.sarah')}</h3>
                <p className="text-[#00b6de] mb-3">{t('aboutPage.team.operations')}</p>
                <p className="text-gray-600 mb-4">
                  {t('aboutPage.team.sarahDescription')}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="Michael Chen" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{t('aboutPage.team.michael')}</h3>
                <p className="text-[#00b6de] mb-3">{t('aboutPage.team.consultant')}</p>
                <p className="text-gray-600 mb-4">
                  {t('aboutPage.team.michaelDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('common.contact')}</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 bg-[#00b6de] text-white">
                <h3 className="text-2xl font-bold mb-6">{t('common.contact')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Our Office</p>
                      <p>{t('common.address')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>{t('common.phone')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>{t('common.email')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">{t('common.officeHours')}</h4>
                  <p>{t('common.officeHoursDescription')}</p>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">{t('quotePage.form.message')}</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('quotePage.form.name')}</label>
                      <input type="text" className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('quotePage.form.name')}</label>
                      <input type="text" className="w-full p-2 border rounded-md" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('quotePage.form.email')}</label>
                    <input type="email" className="w-full p-2 border rounded-md" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('quotePage.form.message')}</label>
                    <textarea rows={4} className="w-full p-2 border rounded-md"></textarea>
                  </div>
                  
                  <Button className="w-full bg-[#00b6de] hover:bg-[#0099c9]">
                    {t('quotePage.form.submit')}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs; 