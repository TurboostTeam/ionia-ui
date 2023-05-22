import { Dialog, Transition } from "@headlessui/react";
import omit from "lodash-es/omit";
import { Fragment, type ReactNode } from "react";

import { Button, type ButtonProps as BaseButtonProps } from "../button";
import { forwardRef } from "../common";

interface ButtonProps extends BaseButtonProps {
  content?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ModalProps {
  open: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  primaryAction?: ButtonProps;
  secondaryActions?: ButtonProps[];
  onClose?: () => void;
}

export const Modal = forwardRef<ModalProps, "div">(
  ({
    open,
    title,
    children,
    footer,
    primaryAction,
    secondaryActions,
    onClose,
  }) => {
    return (
      <Transition appear as={Fragment} show={open}>
        <Dialog
          as="div"
          className="z-1000 relative"
          onClose={() => {
            onClose?.();
          }}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white align-middle shadow-xl transition-all">
                  {typeof title !== "undefined" && (
                    <Dialog.Title
                      as="h3"
                      className="border-b text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="mr-1 flex items-center p-4">
                        <div>{title}</div>

                        <div className="ml-auto">
                          <button
                            className="rounded-lg p-2 text-white hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              onClose?.();
                            }}
                          >
                            <svg className="h-5 w-5" viewBox="0 0 20 20">
                              <path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Dialog.Title>
                  )}

                  {typeof children !== "undefined" && (
                    <div className="p-4">{children}</div>
                  )}

                  {(typeof footer !== "undefined" ||
                    typeof primaryAction !== "undefined" ||
                    typeof secondaryActions !== "undefined") && (
                    <div className="border-t p-4">
                      {typeof footer !== "undefined"
                        ? footer
                        : (typeof primaryAction !== "undefined" ||
                            typeof secondaryActions !== "undefined") && (
                            <div className="flex justify-end space-x-1">
                              {typeof secondaryActions !== "undefined" &&
                                secondaryActions?.map((buttonProps, index) => {
                                  return (
                                    <Button
                                      key={index}
                                      {...omit(buttonProps, "content")}
                                    >
                                      {buttonProps?.content}
                                    </Button>
                                  );
                                })}

                              {typeof primaryAction !== "undefined" && (
                                <Button primary>
                                  {primaryAction?.content}
                                </Button>
                              )}
                            </div>
                          )}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
);
