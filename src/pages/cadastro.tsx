import type { NextPage } from "next";

const Cadastro:NextPage = () => {

	return (
		<>
            <img src="" alt="" className=""/>
            <form action="">
            <input type="text" placeholder="Nome completo" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="CPF" />
            <input type="number" placeholder="Telefone" />
            <input type="text" placeholder="Nome de usuário" />
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme a senha" />
            </form>
            <button className="">Cadastre-se</button>
		</>
	)
}

export default Cadastro;