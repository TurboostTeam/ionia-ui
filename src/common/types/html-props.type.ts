import { type ComponentPropsWithoutRef, type ElementType } from "react";

export type HTMLProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
};
