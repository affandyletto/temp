// src/components/Modal/ModalAddFloorPlan.js

import { X } from "lucide-react";
import Input from "@/components/Form/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import React, { useState, useEffect } from 'react';

import Modal from "./Modal";

const BasicFormModal = ({ header, label, placeholder, initialValue, isOpen, onClose, onSubmit }) => {
  const [name, setName]=useState(initialValue)

  useEffect(()=>{
  	if(isOpen){
  		setName(initialValue)
  	}
  },[isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} sizeModal={`w-[640px]`}>
      <div>
        <div className="flex items-start justify-between border-b border-neutral-400 p-6">
          <div>
            <h2 className="text-xl font-semibold">{header}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <X className="size-5" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name);
          }}
          className="px-6 pb-6 pt-4 space-y-4"
        >
          <Input
            id={"floorplan_name"}
            label={label}
            placeholder={placeholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <div className="flex justify-end">
            <ButtonPrimary type={"submit"} label={"Submit"} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BasicFormModal;
