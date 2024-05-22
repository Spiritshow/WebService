import React, { useState } from 'react'
import './components/Sidebar.css'
import { Link } from 'react-router-dom'
import { useClass, useStore } from '../../Store/store'


const Sidebar = () => {

    const addClass = useClass((state) => state.addClass);

    const roll = () => {
        addClass(false);
    }

    const ListPage = () =>{
        return(<p>Здесь будут показаны ваши предложения.</p>)
    }

    const ListEditPage = () => {
        return(<p>Здесь будут показаны предложения, которые вы можете редактировать.</p>)
    }

    const AddPage = () => {
        return(
            <div>
                <hr/>
                <h3>Добавить предложение</h3>
                <hr/>
            </div>
        )
    }

    const EditClient = () => {
        return(
            <div>
                <hr/>
                <h3>Редактировать свои данные</h3>
                <hr/>
            </div>
        )
    }

    return(
        <div className="sidebar">
            <h2>Ваши сайты</h2>
            <hr/>
            <ListPage/>
            <h2>Редактировать</h2>
            <hr/>
            <ListEditPage/>
            <AddPage/>
            <EditClient/>
             <button onClick={roll}>Сверуть</button>
        </div>
    )
}

export default Sidebar;