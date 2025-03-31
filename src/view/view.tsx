import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { type ReactElement, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { Dropdown, type DropdownSectionProps } from "../dropdown";
import { Tooltip } from "../tooltip";

interface ViewItem {
  id: string;
  name: string;
  canRemove?: boolean;
  canEdit?: boolean;
}

interface ViewProps {
  items: ViewItem[];
  canAdd?: boolean;
  onRemove?: (id: string) => void;
}

export function View({
  items,
  canAdd = true,
  onRemove,
}: ViewProps): ReactElement {
  const [activeKey, setActiveKey] = useState<string | undefined>(items[0]?.id);

  const generateActionableButton = useCallback(
    (
      activator: ReactElement,
      { id, canRemove = true }: ViewItem,
    ): ReactElement => {
      const sections: DropdownSectionProps[] = [
        {
          items: [
            {
              content: "Edit",
              size: "sm",
              id: "edit",
              onClick: () => {},
            },
          ],
        },
      ];

      if (canRemove) {
        sections[0].items.push({
          id: "remove",
          content: "Remove",
          variant: "destructive",
          size: "sm",
          onClick: () => {
            onRemove?.(id);
          },
        });
      }

      return (
        <Dropdown
          activator={activator}
          contentConfig={{ className: "p-2" }}
          sections={sections}
        />
      );
    },
    [onRemove],
  );

  return (
    <ButtonGroup>
      {items.map((item) => {
        const { id, name, canEdit = true } = item;

        const button = (
          <Button
            classNames={{
              root: twMerge(
                "p-2",
                activeKey === name && "bg-fill-transparent-hover text-default",
              ),
            }}
            key={id}
            size="sm"
            variant="ghost"
            onClick={() => {
              if (activeKey !== id) {
                setActiveKey(id);
              }
            }}
          >
            <div className="flex items-center gap-1">
              {name}

              {activeKey === id && canEdit && (
                <ChevronDownIcon className="h-3.5 w-3.5" />
              )}
            </div>
          </Button>
        );

        return activeKey === id && canEdit
          ? generateActionableButton(button, item)
          : button;
      })}

      {canAdd && (
        <Tooltip content="Create View">
          <Button
            classNames={{ root: "p-2" }}
            icon={PlusIcon}
            size="sm"
            variant="ghost"
          />
        </Tooltip>
      )}
    </ButtonGroup>
  );
}
