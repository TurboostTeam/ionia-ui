import { Dialog, Transition } from "@headlessui/react";
import { type FC, Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";

export interface DrawerProps {
  open: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  title?: string | React.ReactNode;
  width?: number; // 弹出框宽度
  className?: string;
  mask?: boolean; // 是否显示遮罩层
  maskClosable?: boolean; // 点击遮罩层是否关闭
  closeIcon?: React.ReactNode; // 关闭按钮图标
  closable?: boolean; // 是否显示关闭按钮
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
  closeIcon,
}) => {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        as="div"
        className="relative z-90 "
        onClose={() => {
          maskClosable && onClose();
        }}
      >
        {/* 遮罩层 */}
        {mask && (
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
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
                  className={twMerge(
                    `pointer-events-auto w-screen max-w-md`,
                    typeof width !== "undefined" && `w-${width}`,
                  )}
                >
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-sm font-semibold">
                          {title}
                        </Dialog.Title>
                        {typeof closable !== "undefined" && closable && (
                          <div className="ml-3 flex h-7 items-center">
                            <Button
                              ghost
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                              onClick={onClose}
                            >
                              {typeof closeIcon !== "undefined" ? (
                                closeIcon
                              ) : (
                                <AiOutlineClose className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={twMerge(
                        "relative mt-6 flex-1 px-4 sm:px-6",
                        className,
                      )}
                    >
                      {children}
                    </div>
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
