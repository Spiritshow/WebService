import React, { useState } from "react";
import axios from 'axios';
import "./Login.css"
import { useLoginDB } from "../../Store/store";
import { useNavigate } from "react-router-dom";

const Login = () =>{

    const navigate = useNavigate();
    const user = useLoginDB((state) => state.user);
    const addUser = useLoginDB((state) => state.addUser)

    const [login, setLogin] = useState("");
    const hChangeLogin = (e) =>{
        setLogin(e.target.value);
    }

    const [password, setPassword] = useState("");
    const hChangePassword = (e) =>{
        setPassword(e.target.value);
    }

    const log = async () =>{
        const response = await axios.post('http://localhost:3001/login',{
            login: login,
            password: password,
        });
    
        addUser(response.data);
        if(response.data.user === 'Master'){
            navigate('/Offering');
        }else if(response.data.user === 'Client'){
            navigate('/');
        }
        
    }

    return(
        <div className="login">
        <div className="CustomLoginText">
            <h3>логин:<input type="text" className="CustomLogin" onChange={hChangeLogin}></input></h3>
            <h3>пороль:<input type="text" className="CustomPassword" onChange={hChangePassword}></input></h3>
            <button onClick={log}>Войти</button>
        </div>
        </div>
    )
}

export default Login;