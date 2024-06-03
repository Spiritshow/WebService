import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Master.css";

//import { useStoreComments, useStoreDB } from "../../../../Store/store";

const Master = () => {

    // const comments = useStoreComments((state)=> state.comments);
    // const addComment = useStoreComments((state)=> state.addComment);

    const [comments, addComment] = useState([])

    //const data = useStoreDB((state) => state.data);
    //const addData = useStoreDB((state) => state.addData);

    const location = useLocation();
    const prop = location.state;

    const [value, setValue] = useState("");
    const [quality, setQuality] = useState();

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const hChange = (e) => {
        setQuality(e)
    }

    const send = () => {
        //addComment(comments,[...{value}]) пример какой должна быть строка кода 
        addComment([...[],value])
        // addData(data[prop.ID-1].Quality = (prop.Quality + quality)/2);
        // console.log((prop.Quality + quality)/2)
    }
    //console.log(comments)
    const BoxComment = () => {
        if(!!comments[0])
            comments.map(comment => {
        console.log(comment);
        return(<h4 className="Commenth"> Unknow: {comment}</h4>)})
        else
        return(<h4 className="NotComments"> Комментариев пока нет. Вы можите быть первым.</h4>)
    }
    
    return(
        <div className="CustomTextMasters">
            <div className="CustomInfo">
                <img src={prop.Images} alt="None" className="CustomInfoImg"/>
                <div className="CustomInfoText">
                    <div>
                        <h2>{prop.SecondName} {prop.FirstName} {prop.Patronymic}</h2>
                    </div>
                    <h3>Номер телефона:<br/>{prop.PhoneNumber}</h3>
                    <h3>Спецализация:<br/>{prop.Specialization}</h3>
                </div>
            </div>
            <h3>Описание:</h3>
            <h3>{prop.Description}</h3>
            <div className="LinkText">
                <h3>Ссылка на ВК мастера:</h3>
                <a href={prop.LinkVK}>{prop.LinkVK}</a>
            </div>
            <h3>Коментарии:</h3>
            <textarea onChange={handleChange}></textarea>
            <div className="ButtonLine">
                <h3>Оценка:  <input type="number" onChange={hChange}/></h3>
                <button onClick={send}>Отправить</button>
            </div>
            <BoxComment/>
        </div>
    )
}

export default Master;