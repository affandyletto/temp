// src/components/OffcanvasInformation.js

import { useEffect, useRef, useState } from "react";
import { CircleMinus, Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Form/Input";

export default function OffcanvasInformation({ isOpen, onClose }) {
  const ref = useRef(null);

  const [contacts, setContacts] = useState([
    {
      id: "default",
      name: "Mr. Python (School Instructor)",
      email: "mr.python@example.com",
      number: "555-555-5555",
      deletable: false,
    },
  ]);

  const handleAddContact = () => {
    setContacts((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: "",
        email: "",
        number: "",
        deletable: true,
      },
    ]);
  };

  const handleRemoveContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleChange = (id, field, value) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen
          ? "pointer-events-auto bg-black/30"
          : "pointer-events-none bg-transparent"
      }`}
    >
      <div
        ref={ref}
        className={`fixed top-0 right-0 h-full flex flex-col w-[374px] bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-b-neutral-400">
          <h2 className="text-xl font-semibold">Site Information</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center size-8 border border-neutral-400 hover:bg-primary-200 hover:bg-opacity-5 rounded-lg p-0.5"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="py-8 px-5 h-full overflow-y-auto">
          <div>
            <Input
              id={"input_address"}
              label={"Site Address"}
              value={"Wellington Square, Oxford OX1 2JD, UK"}
              readOnly
            />
          </div>

          <div className="w-full h-px my-6 border-b border-b-neutral-400"></div>

          <div className="space-y-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h6 className="text-base text-secondary">Contact</h6>
                  {contact.deletable && (
                    <button
                      className="flex items-center justify-center text-danger-200"
                      onClick={() => handleRemoveContact(contact.id)}
                    >
                      <CircleMinus className="size-5" />
                    </button>
                  )}
                </div>

                <Input
                  id={`name_${contact.id}`}
                  label="Site Contact Name"
                  placeholder="Input site contact name"
                  value={contact.name}
                  onChange={(e) =>
                    handleChange(contact.id, "name", e.target.value)
                  }
                />
                <Input
                  id={`email_${contact.id}`}
                  label="Site Contact Email"
                  placeholder="Input site contact email"
                  value={contact.email}
                  onChange={(e) =>
                    handleChange(contact.id, "email", e.target.value)
                  }
                />
                <Input
                  id={`number_${contact.id}`}
                  label="Site Contact Number"
                  placeholder="Input site contact number"
                  value={contact.number}
                  onChange={(e) =>
                    handleChange(contact.id, "number", e.target.value)
                  }
                />
              </div>
            ))}

            <button
              className="flex items-center justify-center space-x-2 text-primary-200 mt-4"
              onClick={handleAddContact}
            >
              <Plus className="size-5" />
              <span className="text-sm font-semibold">Add Contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
