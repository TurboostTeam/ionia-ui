import {
  type DefaultToastOptions,
  type Renderable,
  type Toast,
  toast as baseToast,
  type ToastOptions,
  type ValueOrFunction,
} from "react-hot-toast";

enum IconType {
  INFO,
  WARN,
}

type Message = ValueOrFunction<Renderable, Toast>;
type ToastHandler = (message: Message, options?: ToastOptions) => string;

interface baseToastProps {
  (message: Message, opts?: ToastOptions): string;
  error: ToastHandler;
  success: ToastHandler;
  loading: ToastHandler;
  custom: ToastHandler;
  dismiss: (toastId?: string) => void;
  remove: (toastId?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: Renderable;
      success: ValueOrFunction<Renderable, T>;
      error: ValueOrFunction<Renderable, any>;
    },
    opts?: DefaultToastOptions
  ) => Promise<T>;
}

interface toastProps extends baseToastProps {
  info: ToastHandler;
  warn: ToastHandler;
}

const infoIcon = (type: IconType): Renderable => (
  <svg
    aria-hidden="true"
    color={type === IconType.INFO ? "#1677ff" : "#faac14"}
    data-icon="exclamation-circle"
    fill="currentColor"
    focusable="false"
    height="1em"
    viewBox="64 64 896 896"
    width="1em"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
  </svg>
);

const infoToast = (message: Message, options?: ToastOptions): string =>
  baseToast.error(message, {
    icon: infoIcon(IconType.INFO),
    ...options,
  });

const warnToast = (message: Message, options?: ToastOptions): string =>
  baseToast.error(message, {
    icon: infoIcon(IconType.WARN),
    ...options,
  });

const toast = baseToast as toastProps;

toast.info = infoToast;
toast.warn = warnToast;

export { toast };
