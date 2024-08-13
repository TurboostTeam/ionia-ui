import { Bars3Icon } from "@heroicons/react/24/outline";
import { type FC, type ReactElement } from "react";

import { Button } from "../Button";

export interface TopBarProps {
  userMenu?: ReactElement;
  logo?: ReactElement;
  showNavigationToggle?: boolean;
  onNavigationToggle?: () => void;
}

export const TopBar: FC<TopBarProps> = ({
  userMenu,
  logo,
  showNavigationToggle = false,
  onNavigationToggle,
}) => {
  return (
    <div className="flex h-14 items-center gap-4 border-b bg-white px-4">
      {showNavigationToggle && (
        <Button
          className="block md:hidden"
          icon={Bars3Icon}
          variant="ghost"
          onClick={onNavigationToggle}
        />
      )}

      {logo}
      <div className="ml-auto">{userMenu}</div>
    </div>
  );
};
