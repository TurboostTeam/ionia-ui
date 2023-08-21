import { Bars3Icon } from "@heroicons/react/24/outline";
import { type FC } from "react";

import { Button } from "../Button";

export interface TopBarProps {
  showNavigationToggle?: boolean;
  onNavigationToggle?: () => void;
}

export const TopBar: FC<TopBarProps> = ({
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
      <div className="flex justify-end"> </div>
    </div>
  );
};
