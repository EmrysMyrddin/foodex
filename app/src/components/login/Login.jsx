import React, { useState } from "react";
import { login } from '../../data/users'
import { client } from "../../data/client";
import { useNavigate } from 'react-router-dom'

export default function Login(){
	const navigate = useNavigate()

    const [u, setU] = useState()
    async function handleLogin(event) {
        event.preventDefault()
        const {data, error} = await client.query(login, 
            {password : event.target.password.value, username : event.target.username.value}
        ).toPromise()

        setU(error)

        localStorage.token = data.login.token
    }


    return (
        <>
            <h1>Connexion</h1>
            <form className="login-form" onSubmit={e => {
                handleLogin(e)
                if (localStorage.token) navigate('/ingredients', {replace: true})
            }}>
            <input name='username' />
            <input type="password" name='password' />
            {/* <a id="forgotten-password" href="./#">Mot de passe oublié</a> */}
            <button>Se connecter</button>
            {u?.message}
        </form>
        </>
        
    )
}