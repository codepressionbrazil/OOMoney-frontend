import { useState } from "react";
import { Input, SIZE as InputSize } from "baseui/input";
import { Button, SIZE as ButtonSize } from "baseui/button";
import { FormControl } from "baseui/form-control";

import { useAuth } from "../hook/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login(){

	const router = useRouter()

	const [email, setEmail] = useState<string>('')
	const [senha, setSenha] = useState<string>('')

	const { execLogin } = useAuth()

	async function handleLogin(e: any) {
		e.preventDefault();
		await execLogin(email, senha)
	}

	return (
		<>
			<main className="mt-1 flex flex-col justify-center items-center min-h-screen">
				<h1 className="text-1xl">Login</h1>
				<form method="POST" className="w-[20%]">
					<FormControl label="Email">
						<Input
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
							placeholder="Email"
							type="email"
							size={InputSize.compact}
						/>
					</FormControl>
					<FormControl label="Senha">
						<Input
							value={senha}
							onChange={(e) => setSenha(e.currentTarget.value)}
							placeholder="Senha"
							type="password"
							size={InputSize.compact}
						/>
					</FormControl>
					<div className="flex justify-between mt-1">
						<Link href={"/cadastro"}>
							<Button size={ButtonSize.compact}>Cadastre-se</Button>
						</Link>
						<Button
							type="submit"
							size={ButtonSize.compact}
							onClick={handleLogin}
						>
							Entrar
						</Button>
					</div>
				</form>
			</main>
		</>
	)
}