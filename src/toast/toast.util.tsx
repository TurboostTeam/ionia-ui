import { type ReactNode } from "react";
import {
  toast as hotToast,
  type ToastOptions as HotToastOptions,
} from "react-hot-toast";

import { Toast } from "./Toast";

export interface ToastOptions
  extends Pick<HotToastOptions, "position" | "duration"> {}

export const toast = (
  content: ReactNode,
  { position = "bottom-center", duration = 5000 }: ToastOptions = {}
): void => {
  hotToast.custom(
    (t) => (
      <Toast
        onDismiss={() => {
          hotToast.dismiss(t.id);
        }}
      >
        {content}
      </Toast>
    ),
    { position, duration }
  );
};
