"use client";

import { useState } from "react";
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

const ChangePassword = ({ children, user }) => {
  const [password, setPassword] = useState<string>("");
  const userService = new UserService();

  const onSubmit = (event) => {
    event.preventDefault();

    const _user = user.user.user;

    try {
      userService.updateUser({
        ..._user,
        password,
      });
      toast("Senha atualizada com sucesso ✅");
    } catch (error) {
      toast.error("Erro ao atualizar a senha.");
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
          <DialogTitle>Edit your password</DialogTitle>
          <DialogDescription>
            Make changes to your profile password here. Click save when you&rsquo;re done.
          </DialogDescription>
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
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
