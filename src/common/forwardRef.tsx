import { forwardRef as forwardReactRef } from "react";

import {
  type As,
  type ComponentWithAs,
  type PropsOf,
  type RightJoinProps,
} from "./component.types";

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >
): ComponentWithAs<Component, Props> {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}
