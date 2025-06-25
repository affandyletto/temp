// src/components/OffcanvasInformation.jsx

import { useState } from "react";
import { CircleMinus, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Input from "../Form/Input";
import Offcanvas from "./Offcanvas";

const OffcanvasInformation = ({ isOpen, onClose }) => {
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

  return (
    <Offcanvas title={"Site Information"} isOpen={isOpen} onClose={onClose}>
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
    </Offcanvas>
  );
};

export default OffcanvasInformation;
