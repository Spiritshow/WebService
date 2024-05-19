import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({store}) => {

const [props, setProps] = useState({});
useEffect(() =>{
    setProps(store);
}, [])

    return(
        <div className="CustomCard DerectionCard ColorCard">
            <img src="" alt=""></img>
            <div className="CustomTextCard">
                <Link to={`/Offering/${props.ID}`} state={props}><h2>{props.Header}</h2></Link>
                <h4>Спецализация: {props.SpecialtyWork}</h4>
                <div className="CustomQualiteCard">
                    <h3>Рейтинг работодателя: {props.TrustLevel}</h3>
                </div>
            </div>
        </div>
    )
} 

export default Card;