// src/components/Form/DraggablePartList.jsx

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import Input from "@/components/Form/Input";
import ButtonIcon from "@/components/Button/ButtonIcon";

const SortableItem = ({ item, onChange, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
          id={`name-${item.id}`}
          placeholder="Input part name"
          value={item.name}
          onChange={(e) => onChange(item.id, { ...item, name: e.target.value })}
          required
        />
      </div>

      <div className="w-full">
        <Input
          id={`price-${item.id}`}
          type="number"
          placeholder="Input price"
          value={item.value}
          onChange={(e) =>
            onChange(item.id, { ...item, value: e.target.value })
          }
          padding="pl-9"
          spanComponent={<strong>$</strong>}
          required
        />
      </div>

      <div className="shrink-0">
        <ButtonIcon
          icon={Trash2}
          sizeIcon="size-5"
          sizeBtn="size-[52px]"
          isRed
          onClick={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
};

const DraggablePartList = ({ parts, setParts }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = parts.findIndex((item) => item.id === active.id);
      const newIndex = parts.findIndex((item) => item.id === over.id);
      setParts(arrayMove(parts, oldIndex, newIndex));
    }
  };

  const handleChange = (id, updatedItem) => {
    setParts((prev) => prev.map((p) => (p.id === id ? updatedItem : p)));
  };

  const handleDelete = (id) => {
    setParts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={parts} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {parts.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onChange={handleChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default DraggablePartList;
