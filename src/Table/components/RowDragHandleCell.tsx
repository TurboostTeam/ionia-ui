import { useSortable } from "@dnd-kit/sortable";
import { type ReactElement } from "react";

interface RowDragHandleCellProps {
  rowId: string;
}

export function RowDragHandleCell({
  rowId,
}: RowDragHandleCellProps): ReactElement {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });

  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button {...attributes} {...listeners}>
      🟰
    </button>
  );
}
