import { type ComponentType, type PropsWithoutRef, type SVGProps } from "react";

export type SVGComponent = ComponentType<
  PropsWithoutRef<SVGProps<SVGSVGElement>>
>;
