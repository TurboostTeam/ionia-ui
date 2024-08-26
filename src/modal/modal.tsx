import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { type FC, Fragment, type ReactNode, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "@/action";
import { Button } from "@/button";
import { ButtonGroup } from "@/button-group";

const sizeMap = {
  sm: twMerge(`max-w-[380px]`),
  md: twMerge(`max-w-[620px]`),
  lg: twMerge(`max-w-[980px] md:max-w-[calc(100%-2rem)] lg:max-w-[980px]`),
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  primaryAction: ActionProps;
  secondaryActions?: ActionProps[];
  size?: "sm" | "md" | "lg";
}

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
        className="relative z-[1000]"
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

        <div className="fixed inset-0 overflow-y-auto">
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
                  `w-full relative transform rounded-lg bg-white p-4 flex flex-col gap-4 text-left shadow-xl transition-all max-sm:rounded-none max-sm:max-w-full`,
                )}
              >
                {/* header */}
                <div
                  className={twMerge(`flex items-center gap-2 justify-between`)}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  <Button icon={XMarkIcon} variant="ghost" onClick={onClose} />
                </div>

                {/* main */}
                <div className="w-full">{children}</div>

                {/* footer */}
                <div className="flex justify-end">
                  <ButtonGroup>
                    {secondaryActions?.map((action, index) => (
                      <Action key={index} {...action} />
                    ))}

                    <Action variant="primary" {...primaryAction} />
                  </ButtonGroup>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
