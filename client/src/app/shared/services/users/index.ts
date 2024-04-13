import { IUser } from "../../interfaces/user";

export default class UserService {
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
    console.log(id);
    const usersUpdated = users.filter((user: IUser) => {
      return user.id !== id;
    });
    console.log(usersUpdated);
    localStorage.setItem("users", JSON.stringify(usersUpdated));
  }

  getUserByLogin(email: string, password: string): IUser {
    const users = this.getAll();

    return users.find((user: IUser) => {
      return user.email === email && user.password === password;
    });
  }
}
