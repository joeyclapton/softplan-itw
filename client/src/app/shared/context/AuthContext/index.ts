import { IUser } from "../../interfaces/user";
import LoginService, { IUserLogged } from "../../services/login";
import * as React from "react";

type AuthParams = {
  token: string;
};

type AuthContextData = {
  isAuthenticated: boolean;
  authenticate: (user: IUserLogged) => void;
  logout: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: ProviderProps) {
  const loginService = new LoginService();
  const localUser = localStorage.getItem("userLogged");
  const [isAuthenticated, setIsAuthenticated] = React.useState(() =>
    Boolean(localUser)
  );

  function authenticate(user: IUser) {
    setIsAuthenticated(true);
    loginService.login(user);
  }

  function logout() {
    setIsAuthenticated(false);
    loginService.logout();
  }

  return (
    <AuthContext.Provider value={{ authenticate, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be within its context");
  }
  return context;
}
