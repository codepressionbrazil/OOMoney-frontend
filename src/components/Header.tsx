import Link from "next/link"
import { useAuth } from "../hook/useAuth"

export function Header(){

	const { execLogout } = useAuth()

	function handleLogout(){
		execLogout()
	}

	return (
		<>
			<header className="flex justify-between p-4">
				<h1 className="text-lg font-bold">
					<Link href="/">OOMoney</Link>
				</h1>

				<nav className="mr-4 flex space-x-3 underline">
					<Link href="/">Home</Link>
					<Link href="/resumo">Gerar resumo</Link>
					<a
						className="text-red-500 cursor-pointer"
						onClick={handleLogout}
					>
						Sair
					</a>
				</nav>
      </header>
		</>
	)
}