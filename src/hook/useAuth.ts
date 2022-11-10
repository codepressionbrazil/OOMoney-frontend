import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../services/api";

interface User {
  cpf: string;
  nome: string;
  usuario: string;
  email: string;
  senha?: string;
}

interface registerProps {
  nome: string,
  usuario: string,
  email: string,
  senha: string,
  telefone: number,
  cpf: number
}

export function useAuth() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(getUserFromSessionStorage());

  async function execRegister({
    nome,
    usuario,
    email,
    senha,
    telefone,
    cpf
  }: registerProps) {
    try {
      const response = await api.post('/pessoa', {
        nome, email, senha, telefone, cpf, usuario
      })

      if(response.status === 200) {
        router.push('/login')
      }

      if(response.status >= 400) {
        throw new Error(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function execLogin(email: string, password: string): Promise<void> {
    try {
      const { data } = await api.post("/pessoa/login", { email, senha: password });
      localStorage.setItem("user", JSON.stringify(data));
      saveUserToSessionStorage(data);
      setUser(data);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  function execLogout(): void {
    sessionStorage.removeItem("user");
    window.location.href = "/";
    setUser(null);
  }

  function getUserFromSessionStorage() {
    if (typeof window !== "undefined") {
      const user = sessionStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
  }

  function saveUserToSessionStorage(userData: User): void {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
  }

  return { user, execRegister, execLogin, execLogout, getUserFromSessionStorage };
}