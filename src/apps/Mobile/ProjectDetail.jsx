import React, { useState, useRef, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { mockSurveys } from "@/data/surveys";
import { CardSurvey } from "@/components/Mobile/CardSurvey";

export const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState('Surveys');
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Mr. Phyton (School Instructor)",
      email: "mr.phyton@example.com",
      phone: "555-555-5555"
    }
  ]);

  // Ref to store timeout IDs for debouncing
  const debounceTimeouts = useRef({});

  const addNewContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: "",
      email: "",
      phone: ""
    };
    setContacts([...contacts, newContact]);
  };

  // Function to save contact (replace with your actual save logic)
  const saveContact = useCallback((contactId, field, value) => {
    // This is where you would make your API call or save operation
    console.log(`Saving contact ${contactId}: ${field} = ${value}`);
    // Example: await updateContactAPI(contactId, { [field]: value });
  }, []);

  const updateContact = useCallback((id, field, value) => {
    // Update the UI immediately
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );

    // Clear existing timeout for this specific contact and field
    const timeoutKey = `${id}-${field}`;
    if (debounceTimeouts.current[timeoutKey]) {
      clearTimeout(debounceTimeouts.current[timeoutKey]);
    }

    // Set new timeout for saving
    debounceTimeouts.current[timeoutKey] = setTimeout(() => {
      saveContact(id, field, value);
      delete debounceTimeouts.current[timeoutKey];
    }, 500);
  }, []);

  const removeContact = (id) => {
    // Clear any pending timeouts for this contact
    Object.keys(debounceTimeouts.current).forEach(key => {
      if (key.startsWith(`${id}-`)) {
        clearTimeout(debounceTimeouts.current[key]);
        delete debounceTimeouts.current[key];
      }
    });
    
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const TabNavigation = () => (
    <div className="w-full border-b border-slate-200 flex items-center gap-4 mb-6">
      {['Surveys', 'Attachment', 'Info'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="flex flex-col items-center gap-2 pb-2"
        >
          <div className="text-sm font-normal tracking-tight text-center"
               style={{ color: activeTab === tab ? '#0891b2' : '#1f2937' }}>
            {tab}
          </div>
          <div className={`h-1 w-full rounded-t-xl ${
            activeTab === tab ? 'bg-primary-200' : 'bg-white'
          }`} />
        </button>
      ))}
    </div>
  );

  const SurveysContent = () => (
    <div className="grid grid-cols-2 gap-4">
      {mockSurveys.map((survey) => (
        <CardSurvey
          key={survey.id}
          survey={survey}
        />
      ))}
    </div>
  );

  const AttachmentContent = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="py-2 bg-white rounded-lg border border-slate-200 flex flex-col gap-2">
        <div className="px-2 pb-2 border-b border-slate-200 flex items-center gap-1">
          <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-gray-800 text-xs font-normal truncate">File Name</div>
          </div>
        </div>
        <div className="px-2">
          <div className="w-full h-40 bg-zinc-200 rounded-md"></div>
        </div>
      </div>
      
      <div className="py-2 bg-white rounded-lg border border-slate-200 flex flex-col gap-2">
        <div className="px-2 pb-2 border-b border-slate-200 flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-gray-800 text-xs font-normal truncate">Image-01</div>
          </div>
        </div>
        <div className="px-2">
          <div className="w-full h-40 bg-zinc-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );

  const InfoContent = () => (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-gray-800 text-sm font-semibold">Site Address</label>
        <div className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 flex items-center">
          <div className="text-gray-800 text-sm">Wellington Square, Oxford OX1 2JD, UK</div>
        </div>
      </div>
      
      <div className="w-full h-px bg-slate-200"></div>
      
      {contacts.map((contact, index) => (
        <div key={contact.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-zinc-500 text-base">Contact {index === 0 ? '' : index + 1}</div>
              {index > 0 && (
                <button 
                  onClick={() => removeContact(contact.id)}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  <div className="w-4 h-4 bg-red-600 rounded flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-white"></div>
                  </div>
                </button>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 text-sm font-semibold">Site Contact Name</label>
              <div className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 flex items-center">
                <input
                  type="text"
                  placeholder="Input site contact name"
                  className="flex-1 text-sm text-gray-800 bg-transparent outline-none placeholder:text-zinc-500"
                  value={contact.name}
                  onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 text-sm font-semibold">Site Contact Email</label>
              <div className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 flex items-center">
                <input
                  type="email"
                  placeholder="Input site contact email"
                  className="flex-1 text-sm text-gray-800 bg-transparent outline-none placeholder:text-zinc-500"
                  value={contact.email}
                  onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 text-sm font-semibold">Site Contact Number</label>
              <div className="min-h-12 p-4 bg-white rounded-xl border border-slate-200 flex items-center">
                <input
                  type="tel"
                  placeholder="Input site contact number"
                  className="flex-1 text-sm text-gray-800 bg-transparent outline-none placeholder:text-zinc-500"
                  value={contact.phone}
                  onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button 
        onClick={addNewContact}
        className="flex items-center gap-2 text-cyan-700 text-sm font-semibold mb-6"
      >
        <Plus className="w-4 h-4" />
        Add Contact
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Surveys':
        return <SurveysContent />;
      case 'Attachment':
        return <AttachmentContent />;
      case 'Info':
        return <InfoContent />;
      default:
        return <SurveysContent />;
    }
  };

  return (
    <div className="space-y-6">
      <TabNavigation />
      {renderContent()}
    </div>
  );
};