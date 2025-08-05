import { Search, LogOut, Camera, Image, Signal, Wifi, Battery } from 'lucide-react';


export const Topnav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-10">
      <div className="flex justify-between items-center px-4 py-4 max-w-md mx-auto">
        <img 
          src="/images/Logo.webp" 
          alt="Logo" 
          className="w-10 h-10 object-contain"
        />
        <span className="text-primary-200 text-base font-semibold absolute left-1/2 transform -translate-x-1/2">
          OneSurvey
        </span>
        <button className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
          <LogOut className="w-5 h-5 text-red-700" />
        </button>
      </div>
    </div>
  );
};