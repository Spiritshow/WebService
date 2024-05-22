import React from "react";
import logo from '../../../logo.svg'
import './components/Header.css'
import { Link, useNavigate } from "react-router-dom";
import { useClass, useLoginDB } from "../../Store/store";


const Header = () =>{
    const addClass = useClass((state) => state.addClass);
    const navigate = useNavigate();
    const user = useLoginDB((state) => state.user);
    const addUser = useLoginDB((state) => state.addUser)

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

    const Edit = () => {

        const ButtonEdit = () => {
            if(user.user === "Master") {
                navigate('/EditMaster')
            }else{
                addClass(true);
            }
        }
        const ButtonExit = () => {
            addUser(null);
            addClass(false);
            navigate('/Offering');
        }

        return(
            <div className="LinkButton">
                <button onClick={ButtonEdit}>Редоктирование</button>
                <div className="Border"></div>
                <button onClick={ButtonExit}>Выход</button>
            </div>
        )
    }

    return(
    <header className="CustomHeader">
        <img src={logo} alt="logo"/>
        <Link to={"/"} className="CustomLink"><h4>Мастера</h4></Link>
        <Link to={"/Offering"} className="CustomLink"><h4>Предложения</h4></Link>
        {!user && <Enter/>}
        {!!user && <Edit/>}
    </header>
    )
} 

export default Header;