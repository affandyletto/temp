// src/components/Modal/ModalGeneratePdf.jsx

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import CardPhoto from "../Card/CardPhoto";
import LoaderCircleProgress from "../ProgressBar/LoaderCircleProgress";

const ModalGeneratePdf = ({
  data = null,
  isOpen,
  onClose,
  onSubmit = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[947px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">Generate PDF</h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-4 space-y-5">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <LoaderCircleProgress duration={2000} />
              <span className="text-base">Loading 0/2</span>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-4">
                <h6 className="text-xl font-semibold">
                  Created By: {data?.createdBy}
                </h6>
                <div className="space-y-1 text-base">
                  <p>Project: {data?.projectName}</p>
                  <p>Title: {data?.name}</p>
                  <p>Date: {data?.date}</p>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-3 gap-6 h-[320px] overflow-y-auto">
                {data?.photos?.map(({ id, ...rest }) => (
                  <CardPhoto key={id} {...rest} />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <ButtonPrimary
              type={"button"}
              label={"Generate PDF"}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalGeneratePdf;
