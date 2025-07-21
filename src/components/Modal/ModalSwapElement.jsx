// src/components/Modal/ModalSubmitAlbum.js
import { Image, X } from "lucide-react";
import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/Textarea";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Modal from "./Modal";
import ButtonSecondary from "../Button/ButtonSecondary";
import Select from "../Form/Select";
import { optionsElemetClassifications } from "@/data/dropdown";
import { ElementSwap } from "@/apps/Survey/Elements/ElementSwap"

export const ModalSwapElement = ({
  data = null,
  isOpen,
  onClose,
  onSubmit = () => {},
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[940px] max-h-[90vh] flex flex-col`}>
		  <div className="flex flex-col h-full overflow-y-auto">
		    <div className="flex items-start justify-between border-b border-neutral-400 p-6 flex-shrink-0">
		      <div>
		        <h2 className="text-xl font-semibold">
		          Swap Elements
		        </h2>
		      </div>
		      <button
		        onClick={onClose}
		        className="flex items-center justify-center"
		      >
		        <X className="size-5" />
		      </button>
		    </div>
		    <div className="flex-1 overflow-y-auto">
		      <div className="px-6 pb-6 pt-4 space-y-4">
		        <ElementSwap/>
		      </div>
		    </div>
		    <div className="flex justify-end space-x-2 p-6 border-t border-neutral-400 flex-shrink-0">
		      <ButtonSecondary
		        type={"button"}
		        label={"Cancel"}
		        onClick={onClose}
		      />
		      <ButtonPrimary type={"submit"} label={"Confirm"} />
		    </div>
		  </div>
		</Modal>
	);
};