import { type FC } from "react";

export interface TopBarUserMenuProps {
  name: string;
  avatar?: string;
}

export const TopBarUserMenu: FC<TopBarUserMenuProps> = ({ name, avatar }) => {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-1 rounded p-0.5 text-sm hover:bg-gray-100">
      <div className="max-w-[theme(spacing.40)] truncate px-2">{name}</div>

      <div className="h-7 w-7 overflow-hidden rounded bg-gray-300">
        {typeof avatar !== "undefined" ? (
          <img alt={name} src={avatar} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {name.slice(0, 1)}
          </div>
        )}
      </div>
    </div>
  );
};
