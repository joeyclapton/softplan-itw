import { atom, useAtom } from "jotai";
import { IUser } from "../interfaces/user";
import UserService from "../services/users";

const userService = new UserService()

export const usersAtom = atom<IUser[]>([]);

export const fetchUsers = async (setUsers: (users: IUser[]) => void) => {
    const users = await userService.getAll();
    setUsers(users);
};

export const addUser = (newUser: IUser) => async (
    setUsers: (users: IUser[]) => void
) => {
    await userService.create(newUser);
    await fetchUsers(setUsers);
};

export const editUser = (editedUser: IUser) => async (
    setUsers: (users: IUser[]) => void
) => {
    await userService.updateUser(editedUser);
    await fetchUsers(setUsers);
};

export const deleteUser = (userId: number) => async (
    setUsers: (users: IUser[]) => void
) => {
    await userService.delete(userId);
    await fetchUsers(setUsers);
};