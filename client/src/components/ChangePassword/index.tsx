"use client";

import { useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserService from "@/app/shared/services/users";
import { IUser } from "@/app/shared/interfaces/user";

type Props = {
  children: ReactNode;
  user: IUser;
}

const ChangePassword = ({ children, user }: Props) => {
  const [password, setPassword] = useState<string>("");
  const userService = new UserService();

  const onSubmit = (event) => {
    event.preventDefault();
    
    try {
      userService.updateUser({
        ...user,
        password,
      });
      toast("Updated password", {
        icon: "✅",
      });
      setPassword("");
    } catch (error) {
      toast.error("Error on updating password");
    }
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="mb-8">
            <div className="flex flex-col items-center">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.avatar} alt={user?.name} />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{user.job}</span>
            </div>
          </div>
          <div>
            <DialogTitle>Edit your password</DialogTitle>
            <DialogDescription>
              Make changes to your profile password here. Click save when you&rsquo;re done.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                New Password
              </Label>
              <Input id="password" type="password" value={password} className="col-span-3" onInput={onChangePassword} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={!password}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
