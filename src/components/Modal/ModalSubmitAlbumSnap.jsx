// src/components/Modal/ModalSubmitAlbum.js
import ToggleTabs from "@/components/Toggle/ToggleTabs";
import { Image, X } from "lucide-react";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "../Button/ButtonSecondary";
import ButtonAlbum from "../Button/ButtonAlbum";
import Select from "../Form/Select";
import { optionsElemetClassifications } from "@/data/dropdown";
import { useEffect, useState } from "react";

const ModalSubmitAlbumSnap = ({
  data = null,
  isOpen,
  onClose,
  onSubmit = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  
  const mockAlbums = [
    { id: 1, name: "Summer Vacation 2024", price: 0 },
    { id: 2, name: "Wedding Photos", price: 0 },
    { id: 3, name: "Birthday Party", price: 0 },
    { id: 4, name: "Family Portraits", price: 0 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Create Album
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-6 mt-4">
          <ToggleTabs
            tabs={["Create New Album", "Past Albums"]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
        {activeTab === 0 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="px-6 pb-6 pt-4 space-y-4"
          >
            <Input id={"title"} label={"New Album Title"} placeholder="Input album title" />
            <div className="flex justify-end space-x-2">
              <ButtonSecondary
                type={"button"}
                label={"Cancel"}
                onClick={onClose}
              />
              <ButtonPrimary type={"submit"} label={"Create Album"} />
            </div>
          </form>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-2 overflow-y-auto px-6 py-5 max-h-80">
              {mockAlbums.map((album) => (
                <div key={album.id} onClick={() => setSelectedAlbum(album.id)}>
                  <ButtonAlbum
                    id={album.id}
                    name={album.name}
                    price={album.price}
                    selected={selectedAlbum === album.id}
                    onClick={() => setSelectedAlbum(album.id)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 p-6 border-t border-neutral-400">
              <ButtonSecondary
                type={"button"}
                label={"Cancel"}
                onClick={onClose}
              />
              <ButtonPrimary 
                type={"button"} 
                label={"Select Album"} 
                onClick={() => onSubmit(selectedAlbum)}
                disabled={!selectedAlbum}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalSubmitAlbumSnap;