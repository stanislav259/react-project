import React, { createContext } from "react"

export interface AuthUser {
  username: string, 
  email: string,
}

export interface AuthContext {
  isAuth: boolean,
  setAuth: React.Dispatch<React.SetStateAction<boolean>>,
  isLoading: boolean,
  userData: AuthUser,
  setUserData: React.Dispatch<React.SetStateAction<boolean>>, 
}

export const AuthContext = createContext<AuthContext>({
  isAuth: false,
  setAuth: () => {},
  isLoading: true,
  userData: { username: "", email: "" },
  setUserData: () => {},
});