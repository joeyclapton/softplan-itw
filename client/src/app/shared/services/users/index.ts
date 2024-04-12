import { IUser } from "../../interfaces/user";
import { data } from "./mock";

export default class UserService {
  initialize(users: Array<IUser>) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  getAll() {
    const users = localStorage.getItem("users");

    if (users) {
      return JSON.parse(users);
    }

    return [];
  }

  create(user: IUser) {
    const users = this.getAll();
    users.push(user);

    localStorage.setItem("users", users);
  }

  updatePassword(id: number, newPassword: string) {
    const users = this.getAll();
    const usersUpdated = users.map((user: IUser) => {
      if (user.id === id) user.password = newPassword;

      return user;
    });
    localStorage.setItem("users", usersUpdated);
  }

  delete(id: number) {
    const users = this.getAll();

    const usersUpdated = users.filter((user: IUser) => user.id !== id);

    localStorage.setItem("users", usersUpdated);
  }

  getUserByLogin(email: string, password: string): IUser {
    const users = this.getAll();

    return users.filter((user: IUser) => {
      return user.email === email && user.password === password;
    });
  }
}
