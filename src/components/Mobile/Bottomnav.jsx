import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, LayoutDashboard, Camera, Image } from 'lucide-react';

// Bottom Navigation Component
export const Bottomnav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 'projects', icon: LayoutDashboard, label: 'OneSurvey', path: '/projects' },
    { id: 'job-capture', icon: Camera, label: 'Job Capture', path: '/job-capture' }, // You'll need to add this route
    { id: 'onesnap', icon: Image, label: 'OneSnap', path: '/oneSnap' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getActiveTab = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/projects')) return 'projects';
    if (currentPath.startsWith('/oneSnap')) return 'onesnap';
    if (currentPath.startsWith('/job-capture')) return 'job-capture';
    return 'projects'; // default
  };

  const activeTab = getActiveTab();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 rounded-t-lg">
      <div className="flex justify-around items-center px-4 py-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="flex flex-col items-center gap-1 min-w-0 flex-1"
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-primary-200' : 'text-zinc-500'}`} />
              <span className={`text-xs ${isActive ? 'text-primary-200 font-semibold' : 'text-zinc-500'}`}>
                {item.label}
              </span>
              <div className={`w-6 h-1 rounded-full ${isActive ? 'bg-primary-200' : 'bg-transparent'}`}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};