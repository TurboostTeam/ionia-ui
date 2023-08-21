import { Dialog, Transition } from "@headlessui/react";
import {
  type FC,
  Fragment,
  type PropsWithChildren,
  type ReactNode,
} from "react";

export interface FrameProps {
  topBar?: ReactNode;
  navigation?: ReactNode;
  showMobileNavigation?: boolean;
  onNavigationDismiss?: () => void;
}

export const Frame: FC<PropsWithChildren<FrameProps>> = ({
  children,
  navigation,
  topBar,
  showMobileNavigation,
  onNavigationDismiss,
}) => {
  // const [toasts, setToasts] = useState<FrameProps>([]);

  return (
    <div>
      {typeof topBar !== "undefined" && (
        <div className="fixed left-0 top-0 h-14 w-full">{topBar}</div>
      )}

      {typeof navigation !== "undefined" && (
        <>
          <div className="fixed left-0 top-14 hidden h-[calc(100%-theme(spacing.14))] w-60 md:block">
            {navigation}
          </div>

          <Transition.Root as={Fragment} show={showMobileNavigation}>
            <Dialog
              as="div"
              className="relative z-50 md:hidden"
              onClose={() => {
                onNavigationDismiss?.();
              }}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 left-0 top-14 h-[calc(100%-theme(spacing.14))] bg-gray-900/50" />
              </Transition.Child>

              <div className="fixed inset-0 left-0 top-14 flex h-[calc(100%-theme(spacing.14))]">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel>{navigation}</Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      )}

      <div className="pt-14 md:pl-60">{children}</div>
    </div>
  );
};
