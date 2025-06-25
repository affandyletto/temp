// src/components/Modal/ModalConfirm.js

import Modal from "./Modal";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";

const ModalConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  title = "",
  message = "",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[640px]`}>
      <div>
        <div className="flex items-start justify-between p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-secondary">{message}</p>
          </div>
        </div>
        <div className="px-6 pb-6 pt-4 space-y-4">
          <div className="flex justify-end gap-2">
            <ButtonSecondary type={"button"} label={"No"} onClick={onClose} />
            <ButtonPrimary
              type={"button"}
              label={"Yes"}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
