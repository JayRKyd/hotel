import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Building2, 
  Plane, 
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const logoPath = '/logo.png';

const getSidebarLinks = (t: any) => [
  { icon: LayoutDashboard, label: t('admin.dashboard.title'), path: '/admin' },
  { icon: Building2, label: t('admin.hotels.title'), path: '/admin/hotels' },
  { icon: Plane, label: t('admin.trips.title'), path: '/admin/trips' },
];

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();
  
  const sidebarLinks = getSidebarLinks(t);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center px-4 py-5 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {isSidebarOpen ? (
            <Link to="/admin" className="flex items-center">
              <img
                src={logoPath}
                alt="Maswadeh Tourism Logo"
                className="h-16 w-auto"
              />
            </Link>
          ) : (
            <img
              src={logoPath}
              alt="Maswadeh Tourism Logo"
              className="h-10 w-auto"
            />
          )}
        </div>
        
        {/* Sidebar links */}
        <nav className="mt-5">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`flex items-center py-3 px-4 text-sm font-medium ${
                isSidebarOpen ? 'justify-start' : 'justify-center'
              } ${
                location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <link.icon className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`} />
              {isSidebarOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
        
        {/* Toggle button */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-full"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div 
        className={`${isSidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300 p-6`}
      >
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;