import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({store}) => {

const [props, setProps] = useState({})
useEffect(() =>{
    setProps(store);
}, [])

    return(
        <div className="CustomCard DerectionCard ColorCard">
            <img src="" alt=""></img>
            <div className="CustomTextCard">
                <Link to={`/Masters/${props.ID}`}><h2>{props.SecondName} {props.FirstName}</h2></Link>
                <h4>Спецализация: {props.Specialization}</h4>
                <div className="CustomQualiteCard">
                    <h3>Рейтинг: {props.Qualite}</h3>
                </div>
            </div>
        </div>
    )
} 

export default Card;