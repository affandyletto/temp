// src/components/Modal/ModalCopyProject.js

import { CircleCheckBig, X } from "lucide-react";
import Modal from "./Modal";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import { useState } from "react";

const ModalCopyProject = ({ isOpen, onClose, value, setValue }) => {
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const handleSubmit = () => {
    setIsDuplicating(true);
    setUploadProgress(0);
    simulateUpload();
  };

  const handleClose = () => {
    setIsDuplicating(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} sizeModal={`w-[936px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">Duplicate Project</h2>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
        </div>
        {isDuplicating ? (
          <div className="p-6 pb-10 space-y-4">
            {uploadProgress === 100 && (
              <div className="flex items-start space-x-3 bg-success-100 rounded-lg px-4 py-3 text-success-300">
                <CircleCheckBig className="size-6" />
                <div>
                  <h6 className="text-base font-semibold">
                    Duplication Successfully!
                  </h6>
                  <span className="text-sm">Redirecting to dashboard...</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  Duplicating Project{uploadProgress < 100 && "..."}
                </span>
                <span className="text-sm text-secondary">
                  {uploadProgress}% {uploadProgress === 100 && "Complete"}
                </span>
              </div>
              <div className="w-full h-2 bg-neutral-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-200 rounded-full transition-all duration-300"
                  style={{
                    width: `${uploadProgress}%`,
                    background: `linear-gradient(to right, #3A74C2, #003F7D)`,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="px-6 pb-6 pt-4 space-y-4"
          >
            <Input
              id={"floorplan_name"}
              label={"New Project Name"}
              placeholder="Input new project name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required={true}
            />

            <div className="flex justify-end space-x-2">
              <ButtonSecondary
                type={"button"}
                label={"Cancel"}
                onClick={handleClose}
              />
              <ButtonPrimary type={"submit"} label={"Duplicate Now"} />
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ModalCopyProject;
