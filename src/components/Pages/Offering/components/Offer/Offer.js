import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Offer.css";
import logo from "../../../../../logo.svg";

const Offer = () => {

    const location = useLocation();
    const prop = location.state;
    
    return(
        <div className="CustomTextMasters">
            <div className="CustomInfo">
                <img src={logo} alt="None" className="CustomInfoImg"/>
                <div className="CustomInfoText">
                    <div>
                        <h2>{prop.Header}</h2>
                        <h4>Работодатель:<br/>
                        {prop.SecondName} {prop.FirstName} {prop.Patronymic}</h4>
                    </div>
                    <h3>Номер телефона:<br/>{prop.PhoneNumber}</h3>
                    <h3>Спецализация работ:<br/>{prop.SpecialtyWork}</h3>
                </div>
            </div>
            <h3>Адрес: {prop.Address}</h3>
            <h3 className="DescriptionText">Описание: {prop.DescriptionWorks}</h3>
            <div className="LinkText">
                <h3>Ссылка на VK работодателя:</h3>
                <a href={prop.LinkVK}>{prop.LinkVK}</a>
            </div>
        </div>
    )
}

export default Offer;