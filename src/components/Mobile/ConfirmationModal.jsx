import { Archive, X } from "lucide-react"
import { useMobile } from '@/context/Mobile/MobileContext';
import { useState, useEffect } from 'react';

export const ConfirmationModal = () => {
  const { confModal, setConfModal } = useMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (confModal?.isShow) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready, then trigger animation
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setShouldRender(false);
      }, 200);
    }
  }, [confModal?.isShow]);

  const handleClose = () => {
    setConfModal({title:"", content:"", submitButton:"", isShow:false});
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-200 ease-out ${
        isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
    >
      <div 
        className={`w-96 py-4 bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col gap-4 transition-all duration-200 ease-out transform ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2'
        }`}
      >
        <div className="px-4 flex flex-col gap-2.5">
          <div className="pb-2 flex flex-col gap-1">
            <div className="text-gray-800 text-base font-semibold font-inter leading-normal tracking-tight">
              {confModal?.title}
            </div>
            <div className="text-zinc-500 text-sm font-normal font-inter leading-snug tracking-tight">
              {confModal?.content}
            </div>
          </div>
        </div>
        
        <div className="px-4 flex flex-col gap-2">
          <button className="w-full px-6 py-3 bg-primary-200 hover:bg-primary-300 rounded-xl flex justify-center items-center gap-2 transition-colors">
            <span className="text-white text-sm font-semibold font-inter leading-snug tracking-tight">
              {confModal?.submitButton}
            </span>
          </button>
          
          <button 
            onClick={handleClose}
            className="w-full px-6 py-3 bg-white hover:bg-gray-50 rounded-xl border border-slate-200 flex justify-center items-center gap-2 transition-colors"
          >
            <span className="text-gray-800 text-sm font-semibold font-inter leading-snug tracking-tight">
              Close
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}