// src/components/Form/DraggableFieldInformation.jsx

import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Plus } from "lucide-react";
import Input from "./Input";
import Select from "./Select";
import ButtonSecondary from "../Button/ButtonSecondary";
import ButtonIcon from "../Button/ButtonIcon";
import { v4 as uuidv4 } from "uuid";

const SortableItem = ({ item, index, onChange, onDelete, options }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleInputChange = (e) => {
    onChange(item.id, { ...item, label: e.target.value });
  };

  const handleSelectChange = (value) => {
    onChange(item.id, { ...item, value });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center gap-4"
    >
      <button
        {...listeners}
        className="flex items-center justify-center w-6 -mr-2 cursor-grab"
      >
        <GripVertical className="size-6" />
      </button>

      <div className="w-full">
        <Input
          id={`label-${item.id}`}
          placeholder="Example"
          value={item.label}
          readOnly={item.isDefault}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full">
        <Select
          id={`select-${item.id}`}
          placeholder="Select information"
          options={options}
          value={item.value}
          readOnly={item.isDefault}
          onChange={handleSelectChange}
        />
      </div>

      <div className="shrink-0">
        <ButtonIcon
          icon={Trash2}
          sizeIcon="size-5"
          sizeBtn="size-[52px]"
          onClick={() => !item.isDefault && onDelete(item.id)}
          isRed={!item.isDefault && true}
          disabled={item.isDefault}
        />
      </div>
    </div>
  );
};

const DraggableFieldInformation = ({ label = "", options }) => {
  const [items, setItems] = useState([
    {
      id: uuidv4(),
      label: "Label",
      value: "short-text",
      isDefault: true,
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleChange = (id, newItem) => {
    setItems((prev) => prev.map((item) => (item.id === id ? newItem : item)));
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        id: uuidv4(),
        label: "",
        value: "",
        isDefault: false,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {label && <p className="text-sm">{label}</p>}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                item={item}
                index={index}
                onChange={handleChange}
                onDelete={handleDelete}
                options={options}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <ButtonSecondary
        icon={Plus}
        type="button"
        label="Add Field"
        onClick={handleAdd}
      />
    </div>
  );
};

export default DraggableFieldInformation;
