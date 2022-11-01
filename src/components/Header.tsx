import Link from "next/link"

export function Header(){

	return (
		<>
			<header className="flex justify-between p-4">
				<h1 className="text-lg font-bold">
					<Link href="/">OOMoney</Link>
				</h1>

				<nav className="mr-4 flex space-x-1 underline">
					<Link href="/">Home</Link>
					<Link href="/resumo">Resumo</Link>
				</nav>
      </header>
		</>
	)
}