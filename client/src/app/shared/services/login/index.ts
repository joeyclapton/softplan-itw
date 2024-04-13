import { IUser } from "../../interfaces/user";

class LoginService {
  login(user: IUser) {
    localStorage.setItem("userLogged", JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem("userLogged");
  }
}

export default LoginService;
