import {
  type CSSProperties,
  type FC,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type Direction = "left" | "right" | "top" | "bottom";

function getPositionClass(
  direction: Direction,
  {
    offsetHeight,
    offsetWidth,
  }: {
    offsetHeight: number;
    offsetWidth: number;
  },
): CSSProperties {
  if (["left", "right"].includes(direction)) {
    return {
      top: "50%",
      transform: "translateY(-50%)",
      [direction]: `-${offsetWidth + 8}px`,
    };
  }

  return {
    left: "50%",
    transform: "translateX(-50%)",
    [direction]: `-${offsetHeight + 8}px`,
  };
}

export interface TooltipProps {
  children?: ReactNode;
  content?: ReactNode;
  direction?: Direction;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  direction = "top",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ offsetHeight: 0, offsetWidth: 0 });

  return (
    <span
      className="group/tooltip-hover relative bg-red-500"
      onMouseOver={(e) => {
        setSize({
          offsetHeight: ref.current?.offsetHeight ?? 0,
          offsetWidth: ref.current?.offsetWidth ?? 0,
        });
      }}
    >
      <span
        className={twMerge(
          "pointer-events-none max-w-[250px] break-words w-max absolute rounded opacity-0 bg-gray-700 p-2 text-sm text-white transition-opacity group-hover/tooltip-hover:opacity-100 z-20",
        )}
        ref={ref}
        style={getPositionClass(direction, size)}
      >
        {content}
      </span>

      {children}
    </span>
  );
};
