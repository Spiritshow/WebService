import React from "react";
import logo from '../../../logo.svg'
import './components/Header.css'
import { Link } from "react-router-dom";


const Header = () =>{
    const LinkLogin = () => {

    }
    const LinkSing_up = () => {

    }

    return(
    <header className="CustomHeader">
        <img src={logo} alt="logo"/>
        <Link to={"/"} className="CustomLink"><h4>Мастера</h4></Link>
        <Link to={"/Offering"} className="CustomLink"><h4>Предложения</h4></Link>
        <div className="LinkButton">
            <button onClick={LinkLogin}>Вход</button>
            <div className="Border"></div>
            <button onClick={LinkSing_up}>Регистрация</button>
        </div>
    </header>
    )
} 

export default Header;