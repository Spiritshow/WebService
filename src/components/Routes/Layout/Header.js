import React from "react";
import logo from '../../../logo.svg'

const Header = () =>{
    const handleChange = () =>  {

    }

    return(
    <header>
        {/* <img src={logo} alt="logo"/> */}
        <select onChange={handleChange}>
            <option value='1'>По возрастанию опыта работы</option>
            <option value='2'>По убыванию опыта работы</option>
        </select>
        {/* <button onClick={LinkLogin}>Вход</button> */}
    </header>
    )
} 

export default Header;