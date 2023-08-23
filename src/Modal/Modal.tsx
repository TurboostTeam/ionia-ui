import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { type FC, Fragment, type ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  primaryAction: ActionProps;
  secondaryActions?: ActionProps[];
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: twMerge(`max-w-[380px]`),
  md: twMerge(`max-w-[620px]`),
  lg: twMerge(`max-w-[980px] md:max-w-[calc(100%-2rem)] lg:max-w-[980px]`),
};

export const Modal: FC<ModalProps> = ({
  open,
  title,
  children,
  primaryAction,
  secondaryActions,
  onClose,
  size = "md",
}) => {
  const initialFocus = useRef(null);

  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={initialFocus}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4  text-center max-sm:p-0 sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  sizeMap[size],
                  `w-full relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all max-sm:rounded-none max-sm:max-w-full`,
                )}
              >
                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  <button
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    type="button"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex items-start">
                  <div className="mt-3 w-full text-left">
                    {typeof title !== "undefined" && (
                      <Dialog.Title
                        as="h3"
                        className="mr-5 text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    )}

                    <div className="mt-2 text-sm text-gray-500">{children}</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-row-reverse gap-2 sm:mt-4">
                  <Action primary ref={initialFocus} {...primaryAction} />

                  {secondaryActions?.map((action, index) => (
                    <Action key={index} {...action} />
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
