import React, { useState } from 'react';
import { Plus, MoreVertical, MapPin, User, Clock, Circle } from 'lucide-react';
import SurveyComment from "@/components/Section/SurveyComment"

export const ElementDetails = () => {
  const [activeTab, setActiveTab] = useState('Photos');

  const tabs = ['Status', 'Photos', 'Fields', 'Comments'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Photos':
        return (
          <div className="w-full flex justify-between items-start gap-2">
            {/* Photo Card 1 */}
            <div className="flex-1 py-2 bg-white rounded-lg border border-gray-300 flex flex-col gap-2">
              <div className="relative">
                <button className="absolute right-3 top-3 p-2 bg-white rounded-lg border border-slate-200 flex justify-center items-center">
                  <MoreVertical className="w-4 h-4 text-black" />
                </button>
                <div className="px-2">
                  <img className="w-full h-32 rounded-md object-cover" src="https://placehold.co/171x123" alt="OneSnap" />
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <div className="text-gray-800 text-xs font-semibold">OneSnap Label</div>
                    <div className="text-zinc-500 text-[10px]">OneSnap Description Example</div>
                  </div>
                  
                  <div className="h-px bg-slate-200" />
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-center items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <div className="flex-1 text-zinc-500 text-[10px]">05/21/2025 11:37 AM PDT</div>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <User className="w-3 h-3 text-zinc-500" />
                        <div className="flex-1 text-zinc-500 text-[10px]">Uploaded by Miftahul</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start items-start gap-1">
                      <div className="p-1 rounded-md border border-slate-200 flex justify-start items-center">
                        <MapPin className="w-3 h-3 text-gray-800" />
                      </div>
                      <div className="p-1 rounded-md border border-slate-200 flex justify-start items-center">
                        <Circle className="w-3 h-3 text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Card 2 */}
            <div className="flex-1 py-2 bg-white rounded-lg border border-gray-300 flex flex-col gap-2">
              <div className="relative">
                <button className="absolute right-3 top-3 p-2 bg-white rounded-lg border border-slate-200 flex justify-center items-center">
                  <MoreVertical className="w-4 h-4 text-black" />
                </button>
                <div className="px-2">
                  <img className="w-full h-32 rounded-md object-cover" src="https://placehold.co/171x123" alt="OneSnap" />
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <div className="text-gray-800 text-xs font-semibold">OneSnap Label</div>
                    <div className="text-zinc-500 text-[10px]">OneSnap Description Example</div>
                  </div>
                  
                  <div className="h-px bg-slate-200" />
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-center items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <div className="flex-1 text-zinc-500 text-[10px]">05/21/2025 11:37 AM PDT</div>
                      </div>
                      <div className="flex justify-center items-center gap-1">
                        <User className="w-3 h-3 text-zinc-500" />
                        <div className="flex-1 text-zinc-500 text-[10px]">Uploaded by Miftahul</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start items-start gap-1">
                      <div className="p-1 rounded-md border border-slate-200 flex justify-start items-center">
                        <MapPin className="w-3 h-3 text-gray-800" />
                      </div>
                      <div className="p-1 rounded-md border border-slate-200 flex justify-start items-center">
                        <Circle className="w-3 h-3 text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Status':
        return (
          <div className="w-full flex flex-col gap-2">
            <div className="p-3 bg-slate-50 rounded-lg flex justify-start items-center gap-4">
              <div className="flex-1 text-zinc-500 text-sm">Not Applicable</div>
              <div className="w-5 h-5 flex justify-center items-center">
                <div className="w-4 h-4 rounded-full bg-zinc-500 flex justify-center items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
              </div>
            </div>
            
            {['Non-operational', 'Semi-operational', 'Operational'].map((status) => (
              <div key={status} className="p-3 rounded-lg flex justify-start items-center gap-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex-1 text-gray-800 text-sm">{status}</div>
                <div className="w-5 h-5 flex justify-center items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-black" />
                </div>
              </div>
            ))}
          </div>
        );

      case 'Fields':
        return (
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-0.5">
                <div className="text-gray-800 text-sm font-semibold">Label Form</div>
              </div>
              <input
                type="text"
                placeholder="Label name"
                className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 text-gray-800 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-0.5">
                <div className="text-gray-800 text-sm font-semibold">Name</div>
              </div>
              <input
                type="text"
                placeholder="Input name"
                className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 text-gray-800 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-0.5">
                <div className="text-gray-800 text-sm font-semibold">Description</div>
              </div>
              <textarea
                placeholder="Input description"
                rows={6}
                className="h-44 p-4 bg-white rounded-xl border border-slate-200 text-gray-800 text-sm placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'Comments':
        return (
          <div className="w-full">
            <SurveyComment isOpen={true} isMobile={true}/>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white">
      {/* NOISE SENSOR SECTION - BIG AND VISIBLE */}
      <div className="px-5 py-6 mt-16">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex justify-center items-center">
            <span className="text-primary-200 text-sm font-semibold">NS</span>
          </div>
          <div className="flex-1">
            <h2 className="text-black text-lg font-semibold mb-2">Noise Sensor</h2>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-500">Label:</span>
                <span className="text-gray-800">-</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-500">Status:</span>
                <span className="text-gray-800">N/A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Photo Button */}
      <div className="px-5 pb-4">
        <button className="w-[192px] px-5 py-3 bg-primary-200 rounded-lg flex justify-center items-center gap-2">
          <Plus className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-semibold">Upload Photo</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="px-5 border-b border-slate-200 mt-2">
        <div className="flex justify-start items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex flex-col justify-start items-center gap-2 pb-3"
            >
              <span className={`text-sm font-medium ${
                activeTab === tab ? 'text-primary-200' : 'text-gray-800'
              }`}>
                {tab}
              </span>
              <div className={`w-full h-1 rounded-t-xl ${
                activeTab === tab ? 'bg-primary-200' : 'bg-transparent'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-5 py-5">
        {renderTabContent()}
      </div>
    </div>
  );
};