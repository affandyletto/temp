// src/components/Modal/ModalGeneratePdf.jsx
import { ChevronDown, ExternalLink, Trash2 } from "lucide-react";

import Select from "@/components/Form/Select";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";

const ModalHistory = ({
  data = null,
  isOpen,
  onClose,
  onSubmit = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const historyData = [
    {
      name: "Miftahul Faizin",
      info: "Miftahul Faizin has added Note #1",
      date: "7/16/2025, 6:54:29 AM",
      type: "Icon Addition"
    },
    {
      name: "Miftahul Faizin",
      info: "Miftahul Faizin has added Note #1",
      date: "7/16/2025, 6:54:29 AM",
      type: "Icon Addition"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filterr=[
    { label: "Show all", value: "showall" },
    ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[947px]`}>
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">History</h2>
        <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
      </div>
      
      <hr className="border-slate-200 mb-6" />
      
      {/* Filter */}
      <div className="mb-6 w-[390px]">
        <Select
          id="select_stage"
          label="Filter Type"
          placeholder="Show all"
          options={filterr}
          value="showall"
          onChange={(e) => console.log(e)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left p-4 text-sm font-normal text-zinc-500">Name</th>
              <th className="text-left p-4 text-sm font-normal text-zinc-500">Info</th>
              <th className="text-left p-4 text-sm font-normal text-zinc-500 min-w-48">Date</th>
              <th className="text-left p-4 text-sm font-normal text-zinc-500">Type</th>
              <th className="text-left p-4 text-sm font-normal text-zinc-500 w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-800">{item.name}</td>
                <td className="p-4 text-sm text-gray-800">{item.info}</td>
                <td className="p-4 text-sm text-gray-800">{item.date}</td>
                <td className="p-4 text-sm text-gray-800">{item.type}</td>
                <td className="p-4">
                  <button className="flex items-center gap-2 text-primary-200 hover:text-primary-300 transition-colors">
                    <span className="text-xs font-semibold">See Element</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clear History Button */}
      <div className="flex justify-end mt-6">
        <button className="flex items-center gap-2 px-10 py-4 bg-primary-200 hover:bg-primary-300 text-white rounded-2xl font-semibold text-sm transition-colors">
          <Trash2 className="w-5 h-5" />
          Clear History
        </button>
      </div>
    </div>
    </Modal>
  );
};

export default ModalHistory;
