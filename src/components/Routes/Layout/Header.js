import React from "react";
import logo from '../../../logo.svg'
import './components/Header.css'
import { Link, useNavigate } from "react-router-dom";
import { useLoginDB } from "../../Store/store";


const Header = () =>{
    
    const navigate = useNavigate();
    const user = useLoginDB((state) => state.user);

    const Enter = () => {

        const LinkLogin = () => {
            navigate('/Login');
        }
        const LinkSing_up = () => {
            navigate('/Sign_up');
        }

        return(
            <div className="LinkButton">
                <button onClick={LinkLogin}>Вход</button>
                <div className="Border"></div>
                <button onClick={LinkSing_up}>Регистрация</button>
            </div>
        )
    }

    return(
    <header className="CustomHeader">
        <img src={logo} alt="logo"/>
        <Link to={"/"} className="CustomLink"><h4>Мастера</h4></Link>
        <Link to={"/Offering"} className="CustomLink"><h4>Предложения</h4></Link>
        {!user && <Enter/>}
    </header>
    )
} 

export default Header;