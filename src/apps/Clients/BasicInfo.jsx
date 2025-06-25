// src/apps/Clients/BasicInfo.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockClients } from "@/data/clients";
import { Building, Contact, Pencil } from "lucide-react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ModalSubmitClient from "@/components/Modal/ModalSubmitClient";

const BasicInfo = () => {
  const [dataClient, setDataClient] = useState(null);
  // Handle Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleAddClient = () => {
    setIsEditOpen(false);
  };

  const { id } = useParams();

  useEffect(() => {
    setDataClient(mockClients.find((item) => item.id === id));
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Detail {dataClient?.name}</h2>
        <div>
          <ButtonPrimary
            icon={Pencil}
            label={"Edit Client"}
            onClick={() => setIsEditOpen(true)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-400 rounded-lg">
          <div className="flex items-center gap-2 border-b border-neutral-400 p-4">
            <Building className="size-6" />
            <h6 className="text-xl font-semibold leading-none">
              Client Information
            </h6>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs text-secondary">Company Name</label>
              <p className="text-sm font-semibold">{dataClient?.name}</p>
            </div>
            <div>
              <label className="text-xs text-secondary">Industry</label>
              <p className="text-sm font-semibold">Software Development</p>
            </div>
            <div>
              <label className="text-xs text-secondary">Location</label>
              <p className="text-sm font-semibold">Austin, TX</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-neutral-400 rounded-lg">
          <div className="flex items-center gap-2 border-b border-neutral-400 p-4">
            <Contact className="size-6" />
            <h6 className="text-xl font-semibold leading-none">
              Primary Contact
            </h6>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="text-xs text-secondary">Contact Name</label>
              <p className="text-sm font-semibold">Michael Cen</p>
            </div>
            <div>
              <label className="text-xs text-secondary">Email</label>
              <a
                href="mailto:michael@techstart.com"
                target="_blank"
                rel="noreferrer"
                className="block text-sm font-semibold text-blue-100"
              >
                michael@techstart.com
              </a>
            </div>
            <div>
              <label className="text-xs text-secondary">Phone</label>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="block text-sm font-semibold text-blue-100"
              >
                +1 (512) 555-0123
              </a>
            </div>
          </div>
        </div>
      </div>
      <ModalSubmitClient
        data={dataClient}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleAddClient}
      />
    </div>
  );
};

export default BasicInfo;
