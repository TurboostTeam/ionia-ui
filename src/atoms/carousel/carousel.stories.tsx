import type { Meta, StoryObj } from "@storybook/react";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import { Card } from "../card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from ".";

const meta = {
  title: "Atoms 原子组件/Base 基础/Carousel 旋转木马",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="flex h-[400px] w-[700px] items-center justify-center bg-black">
      <div className="w-full max-w-xs">
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem className="border bg-surface-secondary" key={index}>
                <Card className="p-6">
                  <div className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        align: "start",
      }}
      orientation="vertical"
    >
      <CarouselContent className="-mt-1 h-[500px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="w-64 pt-1 md:basis-1/3" key={index}>
            <div className="p-1">
              <Card>
                <div className="flex items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const AutoPlay: Story = {
  render: function AutoPlayStory() {
    const plugin = React.useMemo(
      () => Autoplay({ delay: 2000, stopOnInteraction: true }),
      [],
    );

    return (
      <div className="w-full max-w-sm">
        <Carousel plugins={[plugin]}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className="p-6">
                  <div className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              className="basis-1/2 pl-2 md:basis-1/3 md:pl-4"
              key={index}
            >
              <Card className="p-6">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
