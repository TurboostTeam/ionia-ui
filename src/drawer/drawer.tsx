import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { type FC, Fragment } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";

export interface DrawerProps {
  open: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  title?: string | React.ReactNode;
  width?: number; // 弹出框宽度
  className?: string;
  mask?: boolean; // 是否显示遮罩层
  maskClosable?: boolean; // 点击遮罩层是否关闭
  closable?: boolean; // 是否显示关闭按钮
  footer?: React.ReactNode; // 底部内容
  wrapperClassName?: string;
}

export const Drawer: FC<DrawerProps> = ({
  open,
  onClose,
  children,
  title,
  width,
  className,
  mask = true,
  maskClosable = true,
  closable = true,
  footer,
  wrapperClassName,
}) => {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          maskClosable && onClose();
        }}
      >
        {/* 遮罩层 */}
        {mask && (
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
        )}

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className="pointer-events-auto w-96 max-w-screen-lg"
                  style={{
                    width,
                  }}
                >
                  <div
                    className={twMerge(
                      "flex h-full flex-col gap-4 overflow-y-scroll bg-white py-4 shadow-xl",
                      wrapperClassName,
                    )}
                  >
                    {typeof title === "undefined" && !closable ? null : (
                      <div className="px-4 sm:px-4">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                          </Dialog.Title>
                          {closable && (
                            <div className="ml-3 flex h-7 items-center">
                              <Button
                                icon={XMarkIcon}
                                variant="ghost"
                                onClick={onClose}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className={twMerge("relative flex-1 px-4", className)}>
                      {children}
                    </div>
                    {typeof footer !== "undefined" && (
                      <div className="px-4">{footer}</div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
