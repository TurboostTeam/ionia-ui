import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { type ReactElement, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { Dropdown, type DropdownSectionProps } from "../dropdown";
import { Input } from "../input";
import { useModal } from "../modal";
import { Tooltip } from "../tooltip";

export enum ViewItemEditType {
  RENAME = "rename",
  DELETE = "delete",
}

export interface ViewItem {
  key: string;
  label: string;
  canDelete?: boolean;
  canEdit?: boolean;
}

export interface ViewProps {
  items: ViewItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  canAdd?: boolean;
  onAdd?: (label: string, payload?: any) => void;
  onEdit?: (
    key: string,
    type: ViewItemEditType,
    payload?: { label: string },
  ) => void;
  onActiveChange?: (key: string) => void;
}

export function View({
  items,
  activeKey,
  defaultActiveKey,
  canAdd = false,
  onAdd,
  onEdit,
  onActiveChange,
}: ViewProps): ReactElement {
  const modal = useModal();
  const { control, getValues, trigger, setValue } = useForm();

  const [internalActiveKey, setInternalActiveKey] = useState<
    string | undefined
  >(defaultActiveKey ?? items[0]?.key);

  // 根据是否传入 activeKey 来决定激活的视图
  const effectiveActiveKey = useMemo(() => {
    return typeof activeKey !== "undefined" ? activeKey : internalActiveKey;
  }, [activeKey, internalActiveKey]);

  // 生成可操作的按钮
  const generateActionableButton = useCallback(
    (
      activator: ReactElement,
      { key, label, canDelete = true }: ViewItem,
    ): ReactElement => {
      const sections: DropdownSectionProps[] = [
        {
          items: [
            {
              content: "Rename view",
              size: "sm",
              onClick: () => {
                const keyMarker = `${key}_view_name`;

                setValue(keyMarker, label);

                const close = modal({
                  title: "Rename view",
                  content: (
                    <Controller
                      control={control}
                      name={keyMarker}
                      render={({ field, fieldState: { error } }) => (
                        <Input
                          label="Name"
                          maxLength={40}
                          {...field}
                          error={error?.message}
                          onChange={(e) => {
                            field.onChange(e);

                            // 如果存在错误，输入的时候触发验证
                            if (typeof error !== "undefined") {
                              trigger(keyMarker).catch(() => {});
                            }
                          }}
                        />
                      )}
                      rules={{
                        required: "view name is required",
                      }}
                    />
                  ),
                  primaryAction: {
                    content: "Save",
                    onClick: async () => {
                      const validatedPass = await trigger(keyMarker);

                      if (validatedPass) {
                        onEdit?.(key, ViewItemEditType.RENAME, {
                          label: getValues(keyMarker),
                        });
                        close();
                      }
                    },
                  },
                });
              },
            },
          ],
        },
      ];

      if (canDelete) {
        sections[0].items.push({
          content: "Delete view",
          variant: "ghost",
          classNames: {
            root: "text-destructive",
          },
          size: "sm",
          onClick: () => {
            const close = modal({
              title: "Delete view",
              content: (
                <p className="text-sm">
                  This can’t be undone. {label} view will no longer be available
                  in your admin.
                </p>
              ),
              primaryAction: {
                content: "Delete view",
                variant: "destructive",
                onClick: () => {
                  onEdit?.(key, ViewItemEditType.DELETE);

                  close();
                },
              },
            });
          },
        });
      }

      return (
        <Dropdown
          activator={activator}
          contentConfig={{ className: "p-2" }}
          key={key}
          sections={sections}
        />
      );
    },
    [control, getValues, modal, onEdit, setValue, trigger],
  );

  return (
    <ButtonGroup>
      {items.map((item) => {
        const { key, label, canEdit = true } = item;

        const button = (
          <Button
            classNames={{
              root: twMerge(
                "p-2",
                effectiveActiveKey === key &&
                  "bg-fill-transparent-hover text-default",
              ),
            }}
            key={key}
            size="sm"
            variant="ghost"
            onClick={() => {
              if (effectiveActiveKey !== key) {
                typeof activeKey !== "undefined"
                  ? onActiveChange?.(key)
                  : setInternalActiveKey(key);
              }
            }}
          >
            <div className="flex items-center gap-1">
              {label}

              {effectiveActiveKey === key && canEdit && (
                <ChevronDownIcon className="h-3.5 w-3.5" />
              )}
            </div>
          </Button>
        );

        return effectiveActiveKey === key && canEdit
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
            onClick={() => {
              const viewNameInputMarker = "new_view_name";

              const close = modal({
                title: "Create new View",
                content: (
                  <Controller
                    control={control}
                    name={viewNameInputMarker}
                    render={({ field, fieldState: { error } }) => (
                      <Input
                        label="Name"
                        maxLength={40}
                        {...field}
                        error={error?.message}
                        onChange={(e) => {
                          field.onChange(e);

                          // 如果存在错误，输入的时候触发验证
                          if (typeof error !== "undefined") {
                            trigger(viewNameInputMarker).catch(() => {});
                          }
                        }}
                      />
                    )}
                    rules={{
                      required: "view name is required",
                    }}
                  />
                ),
                primaryAction: {
                  content: "Save",
                  onClick: async () => {
                    const validatedPass = await trigger(viewNameInputMarker);

                    if (validatedPass) {
                      onAdd?.(getValues(viewNameInputMarker));
                      close();
                    }
                  },
                },
              });
            }}
          />
        </Tooltip>
      )}
    </ButtonGroup>
  );
}
