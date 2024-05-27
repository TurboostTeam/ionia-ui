import { useSortable } from "@dnd-kit/sortable";
import { type ReactElement } from "react";
import { AiOutlineHolder } from "react-icons/ai";

import { Button } from "../../Button";

interface RowDragHandleCellProps {
  rowId: string;
}

export function RowDragHandleCell({
  rowId,
}: RowDragHandleCellProps): ReactElement {
  const { listeners, setActivatorNodeRef, isDragging } = useSortable({
    id: rowId,
  });

  return (
    <Button
      ghost
      className={isDragging ? " cursor-grabbing" : "cursor-grab"}
      icon={AiOutlineHolder}
      ref={setActivatorNodeRef}
      size="sm"
      {...listeners}
    />
  );
}
