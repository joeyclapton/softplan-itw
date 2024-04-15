export interface IUser {
  id?: number;
  isAdmin?: boolean;
  createdAt?: string;
  name: string;
  email: string;
  password: string;
  job: string;
  avatar: string;
}
