import React, { useState } from "react";
import "./Login.css"

const Login = () =>{

    const [login, setLogin] = useState("");
    const hChangeLogin = (e) =>{
        setLogin(e.target.value);
    }

    const [password, setPassword] = useState("");
    const hChangePassword = (e) =>{
        setPassword(e.target.value);
    }

    const log = () =>{
        
    }

    return(
        <div className="CustomLoginText">
            <h3>логин:<input type="text" className="CustomLogin" onChange={hChangeLogin}></input></h3>
            <h3>пороль:<input type="text" className="CustomPassword" onChange={hChangePassword}></input></h3>
            <button onClick={log}>Войти</button>
        </div>
    )
}

export default Login;