import { IUser } from "../../interfaces/user";

export default class UserService {
  url = "https://661d62bd98427bbbef01aea6.mockapi.io/api/v1/users";

  async getAll(): Promise<IUser[]> {
    const response = await fetch(this.url, { method: "GET" });
    const data = await response.json();

    return data;
  }

  async delete(id: number): Promise<any> {
    await fetch(`${this.url}/${id}`, { method: "DELETE" });
  }

  async updateUser(user: IUser): Promise<any> {
    const { id } = user;

    await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  async create(user: IUser): Promise<any> {
    await fetch(`${this.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }
}
