import { useSortable } from "@dnd-kit/sortable";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { type ReactElement } from "react";

import { Button } from "../../Button";

interface RowDragHandleCellProps {
  rowId: string;
}

export function RowDragHandleCell({
  rowId,
}: RowDragHandleCellProps): ReactElement {
  const { listeners, setActivatorNodeRef, isDragging, attributes } =
    useSortable({
      id: rowId,
    });

  return (
    <Button
      ghost
      className={isDragging ? "cursor-grabbing" : "cursor-grab"}
      icon={Bars3Icon}
      ref={setActivatorNodeRef}
      size="sm"
      {...listeners}
      {...attributes}
    />
  );
}
