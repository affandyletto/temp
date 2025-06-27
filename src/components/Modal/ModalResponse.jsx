// src/components/Modal/ModalResponse.jsx

import { CircleCheckBig, CircleX } from "lucide-react";
import Modal from "./Modal";

const ModalResponse = ({ isOpen, onClose, isSuccess = true, message = "" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[394px]`}>
      <div
        className={`flex items-start gap-3 py-3 px-4 rounded-lg ${
          isSuccess
            ? "bg-success-100 text-success-400"
            : "bg-red-100 text-danger-300"
        }`}
      >
        {isSuccess ? <CircleCheckBig /> : <CircleX />}
        <div className="space-y-1">
          <h2 className="text-base font-semibold">
            {isSuccess ? "Success" : "Failed"}
          </h2>
          <p
            className={`text-sm ${
              isSuccess ? "text-success-300" : "text-danger-200"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalResponse;
