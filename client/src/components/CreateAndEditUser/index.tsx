"use client";
import { useAtom } from 'jotai'
import { editUser, addUser, usersAtom } from "@/app/shared/state/usersState";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import UserService from "@/app/shared/services/users";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IUser } from "@/app/shared/interfaces/user";

type Props = {
  children: React.ReactNode;
  action: "create" | "edit";
  user: IUser;
};

const CreateAndEditUser = ({ children, user, action }: Props) => {
  const [_, setUsers] = useAtom(usersAtom);
  const isCreate = action === "create";
  const defaultValues =
    action === "create"
      ? {
          email: "",
          password: "",
          name: "",
          avatar: "",
          job: "",
        }
      : {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          job: user.job,
        };

  const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().min(2),
    password: z.string().min(2),
    avatar: z.string().min(2),
    job: z.string().min(2),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isCreate) {
        await addUser(values)(setUsers);
        toast("User has been created", {
          icon: "✅",
        });
        return;
      }
      await editUser({...values, id: user.id})(setUsers);
      toast("User has been updated", {
        icon: "✅",
      });
    } catch (error) {
      isCreate ? toast.error("Error on create user, try again.") : toast.error("Error on updated user, try again.");
    } finally {
      form.reset();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(form.getValues());
    }
  };

  useEffect(() => {
    const isFormFilled = Object.values(form.getValues()).every((value) => value !== "");
    setIsFormValid(isFormFilled);
  }, [form.getValues()]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isCreate ? "Create a new user" : "Update your informations"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="w-full items-center justify-center gap-4 space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {action === "create" ? (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              ""
            )}
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job</FormLabel>
                  <FormControl>
                    <Input placeholder="Job" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input placeholder="Avatar url" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" disabled={!isFormValid}>
                  {isCreate ? "Create" : "Update"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAndEditUser;
