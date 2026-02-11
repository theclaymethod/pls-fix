import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SLIDE_CONFIG, type SlideConfig } from "@/deck/config";
import { SortableSlideCard } from "./sortable-slide-card";

interface SortableSlideGridProps {
  managementMode: boolean;
  isLocked: boolean;
  pendingFileKey: string | null;
  onReorder: (activeFileKey: string, overFileKey: string) => void;
  onDelete: (fileKey: string) => void;
}

export function SortableSlideGrid({
  managementMode,
  isLocked,
  pendingFileKey,
  onReorder,
  onDelete,
}: SortableSlideGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(String(active.id), String(over.id));
  };

  const slides: SlideConfig[] = SLIDE_CONFIG;
  const fileKeys = slides.map((s) => s.fileKey);

  if (!managementMode) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {slides.map((slide, i) => (
          <SortableSlideCard
            key={slide.fileKey}
            slide={slide}
            index={i}
            managementMode={false}
            isPending={false}
            isLocked={false}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={fileKeys} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {slides.map((slide, i) => (
            <SortableSlideCard
              key={slide.fileKey}
              slide={slide}
              index={i}
              managementMode={true}
              isPending={slide.fileKey === pendingFileKey}
              isLocked={isLocked}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
