import type { NextPage } from "next";
import { useState } from "react"

import { FormControl } from "baseui/form-control";
import { Input, SIZE as InputSize } from "baseui/input";
import { Button, KIND as ButtonKind } from "baseui/button";

import { useAuth } from "../context/useAuth";

export default function Cadastro(){

  const [nome, setNome] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  const [confirmarSenha, setConfirmarSenha] = useState<string>('')
  const [telefone, setTelefone] = useState<number>(0)
  const [cpf, setCpf] = useState<number>(0)
  const [usuario, setUsuario] = useState<string>('')

  const { execRegister } = useAuth()

  const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(senha !== confirmarSenha){
      alert('Senhas não conferem')
      return
    }

    const data = {
      nome,
      email,
      senha,
      telefone,
      cpf,
      usuario
    }

    await execRegister(data)
  }

  return(
    <main className="mt-1 flex flex-col justify-center items-center">
      <h1 className="text-1xl">Cadastre-se!</h1>
      <form method="POST" onSubmit={handleCadastro} className="w-[30%]">
        <FormControl label="Nome">
          <Input
            value={nome}
            onChange={(e) => setNome(e.currentTarget.value)}
            placeholder="Nome"
            size={InputSize.compact}
          />
        </FormControl>
        <FormControl label="Email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
            size={InputSize.compact}
          />
        </FormControl>
        <FormControl label="Senha">
          <Input
            value={senha}
            onChange={(e) => setSenha(e.currentTarget.value)}
            placeholder="Senha"
            size={InputSize.compact}
          />
        </FormControl>
        <FormControl label="Confirmar Senha">
          <Input
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.currentTarget.value)}
            placeholder="Confirmar Senha"
            size={InputSize.compact}
          />
        </FormControl>
        <FormControl label="Telefone">
          <Input
            value={telefone}
            onChange={(e) => setTelefone(Number(e.currentTarget.value))}
            placeholder="Telefone"
            type="number"
            size={InputSize.compact}
          />
        </FormControl>
        
        <FormControl label="CPF">
          <Input
            value={cpf}
            onChange={(e) => setCpf(Number(e.currentTarget.value))}
            placeholder="CPF"
            type="number"
            size={InputSize.compact}
          />
        </FormControl>

        <FormControl label="Usuário">
          <Input
            value={usuario}
            onChange={(e) => setUsuario(e.currentTarget.value)}
            placeholder="Usuário"
            size={InputSize.compact}
          />
        </FormControl>
        <div className="flex justify-between">
          <Button type="reset" kind={ButtonKind.secondary}>Cancelar</Button>
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </main>
  )
}