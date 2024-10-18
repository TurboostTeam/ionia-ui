import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../button";
import { FormItem, FormLabel } from "../form";
import { Input } from "../input/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".";

export default {
  title: "Atoms 原子组件/Overlay 叠层/Dialog 卡片",
  component: Dialog,
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
  },
} satisfies Meta<typeof Dialog>;

export const Default: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <Input
              className="col-span-3"
              defaultValue="Pedro Duarte"
              id="name"
            />
          </FormItem>

          <FormItem>
            <FormLabel>Username</FormLabel>
            <Input
              className="col-span-3"
              defaultValue="@peduarte"
              id="username"
            />
          </FormItem>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
