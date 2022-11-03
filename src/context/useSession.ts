// TODO Session provider
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface User {
  idConta: number;
  nome: string;
  usuario: string;
  email: string;
  senha?: string;
}

export function useLogin() {
  const [user, setUser] = useState<User>(getUser());

  async function execLogin(username: string, password: string) {
    try {
      const {data} = await api.get(
        `/login?username=${username}&password=${password}`
      );
      

      setUser(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  function getUser() {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null
  }

  function saveUser(userData: User) {
    if(!userData) return;
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(user);
  }

  return { user, execLogin, saveUser, getUser };
}