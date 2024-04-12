export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  job: string;
  isActive: boolean;
  role: "ADMIN" | "USER";
}
