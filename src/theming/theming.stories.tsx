import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Card, CardContent } from "../atoms";

export default {
  title: "Theming 主题",
};

export const Default: FC = (args) => {
  const bg = ["bg-fill-primary", "bg-fill-secondary", "bg-fill-destructive"];

  return (
    <Card>
      <CardContent className="flex flex-col gap-1 p-2 sm:flex-row sm:gap-2">
        {bg.map((b) => (
          <div className="flex flex-col gap-1" key={b}>
            <div
              className={twMerge(
                "h-11 w-full rounded-md shadow-md md:rounded-lg",
                b,
              )}
            />
            <span>{b}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
