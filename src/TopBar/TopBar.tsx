import { Bars3Icon } from "@heroicons/react/24/outline";
import { type FC } from "react";

import { type ActionProps } from "../Action";
import { Button } from "../Button";
import { Popover } from "../Popover";

export interface TopBarUserMenuProps {
  name: string;
  avatar?: string;
  actions?: ActionProps[];
}

export interface TopBarProps {
  userMenu?: TopBarUserMenuProps;
  showNavigationToggle?: boolean;
  onNavigationToggle?: () => void;
}

export const TopBar: FC<TopBarProps> = ({
  userMenu,
  showNavigationToggle = false,
  onNavigationToggle,
}) => {
  // const [toasts, setToasts] = useState<FrameProps>([]);

  return (
    <div className="grid h-14 grid-cols-[1fr_minmax(auto,30rem)_1fr] items-center gap-1 border-b bg-white px-4">
      <div className="flex justify-start">
        {showNavigationToggle && (
          <Button
            ghost
            className="block md:hidden"
            icon={Bars3Icon}
            onClick={onNavigationToggle}
          />
        )}
      </div>
      <div className="flex justify-center"> </div>
      <div className="flex justify-end">
        {userMenu != null && (
          <Popover
            activator={
              <button className="flex cursor-pointer items-center justify-center gap-1 rounded p-0.5 text-sm hover:bg-gray-100">
                <div className="max-w-[theme(spacing.40)] truncate px-2">
                  {userMenu.name}
                </div>

                <div className="h-7 w-7 overflow-hidden rounded bg-gray-300">
                  {typeof userMenu.avatar !== "undefined" ? (
                    <img alt={userMenu.name} src={userMenu.avatar} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      {userMenu.name.slice(0, 1)}
                    </div>
                  )}
                </div>
              </button>
            }
          >
            {/* {userMenu.actions.map((action) => ()} */}
          </Popover>
        )}
      </div>
    </div>
  );
};
