import * as SelectPrimitive from "@radix-ui/react-select";
import { type ComponentPropsWithoutRef, type FC } from "react";

export interface SelectProps
  extends Omit<
    ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    "onValueChange"
  > {
  onChange?: ComponentPropsWithoutRef<
    typeof SelectPrimitive.Root
  >["onValueChange"];
}

export const Select: FC<SelectProps> = ({ onChange, ...props }) => (
  <SelectPrimitive.Root {...props} onValueChange={onChange} />
);
