import type { NextPage } from "next";


const Login:NextPage = () => {

	return (
		<>
        <img src="" alt="" />
        <div className="flex flex-col justify-center items-center">
            <h1>Seja bem vindo de volta!</h1>
        </div>
        <form className="flex flex-col justify-center items-center">
            <label htmlFor="email">Email</label>
            <input type="email" className="email-login"/>
            <label htmlFor="senha">Senha</label>
            <input type="password" className="senha-login"/>
            <button type="submit">Entrar</button>
        </form>
        <div className="flex flex-col justify-center items-center">
            <h1>Não tem conta? Faça o cadastro!</h1>
            <button>Cadastre-se!</button>       
        </div>
		</>
	)
}

export default Login;