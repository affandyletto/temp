// src/components/Modal/ModalAccessories.jsx

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import {
  mocksElements as initialElements,
  mocksAccessories as initialAccessories,
} from "@/data/elementManager";
import Modal from "./Modal";
import ButtonIcon from "@/components/Button/ButtonIcon";
import InputSearch from "@/components/Form/InputSearch";
import ButtonElement from "@/components/Button/ButtonElement";
import FieldAccessory from "@/components/Form/FieldAccessory";
import ButtonAccessory from "../Button/ButtonAccessory";

const ModalAccessories = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");

  // Elements
  const [elements, setElements] = useState(initialElements);

  const handleSelectElement = (id) => {
    setElements((prev) =>
      prev.map((el) => ({
        ...el,
        selected: el.id === id,
      }))
    );
  };

  const filteredElements = useMemo(() => {
    return elements.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [elements, search]);

  const selectedElement = elements.find((el) => el.selected);

  // Accessories
  const [accessories, setAccessories] = useState(initialAccessories);

  const handleSelectAccessory = (id) => {
    setAccessories((prev) =>
      prev.map((el) => ({
        ...el,
        selected: el.id === id,
      }))
    );
  };

  const handleUpdateAccessory = (id) => {
    setAccessories((prev) =>
      prev.map((el) => ({
        ...el,
        selected: false,
      }))
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal="w-[1075px]">
      <div className="grid grid-cols-3">
        {/* Panel kiri - Element List */}
        <div className="h-[659px] bg-neutral-200 border-r border-neutral-400 rounded-l-lg p-6 flex flex-col">
          <h1 className="text-2xl font-semibold mb-4">Elements</h1>

          <InputSearch
            placeholder="Search elements..."
            search={search}
            setSearch={setSearch}
          />

          {/* Scrollable List */}
          {filteredElements?.length ? (
            <div className="mt-4 flex-1 overflow-y-auto space-y-1 pr-1 mb-16">
              {filteredElements.map(({ id, name, total, selected }) => (
                <ButtonElement
                  key={id}
                  id={id}
                  name={name}
                  total={total}
                  selected={selected}
                  onClick={() => handleSelectElement(id)}
                />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center px-10">
              <div className="text-center">
                <p className="text-sm font-semibold">
                  The Element you are looking for was not found
                </p>
                <span className="text-xs text-secondary">
                  Try checking the spelling of the user name or using other
                  keywords.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Panel kanan */}
        <div className="col-span-2 p-6 flex flex-col max-h-[659px] h-[659px] ">
          <div className="flex items-start justify-between border-b border-b-neutral-400 pb-4 mb-6">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">
                {selectedElement?.name} - Accessories
              </h2>
              <p className="text-sm text-secondary">
                Manage accessories for {selectedElement?.name} by checking the
                boxes below.
              </p>
            </div>
            <ButtonIcon
              icon={X}
              sizeIcon="size-5"
              sizeBtn="size-11"
              onClick={onClose}
            />
          </div>

          <div className="mb-6">
            <FieldAccessory />
          </div>

          {filteredElements?.length ? (
            <div className="flex-1 space-y-2 overflow-y-auto">
              {accessories.map(({ id, name, price, selected }) => (
                <ButtonAccessory
                  id={id}
                  name={name}
                  price={price}
                  selected={selected}
                  onClick={() => handleSelectAccessory(id)}
                  onSave={() => handleUpdateAccessory(id)}
                  onCancel={() => handleUpdateAccessory(id)}
                />
              ))}
            </div>
          ) : (
            <div className="h-[410px] flex items-center justify-center px-10">
              <div className="text-center">
                <p className="text-sm font-semibold">Your list is empty</p>
                <span className="text-xs text-secondary">
                  Add your first accessories to get started.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAccessories;
