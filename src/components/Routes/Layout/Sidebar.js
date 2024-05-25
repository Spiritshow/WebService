import React, { useEffect } from 'react'
import './components/Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useClass, useLoginDB, useOfferClient} from '../../Store/store'
import axios from 'axios'


const Sidebar = () => {

    const addData = useOfferClient((state) => state.addData)
    const store = useOfferClient((state) => state.data)
    const user = useLoginDB((state) => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('http://localhost:3001/OffersClient',{IDClient: user.id});
            addData(response.data)
          } catch (error) {
            console.error('Ошибка получения данных:', error);
          }
        };
    
        fetchData();
      }, []);

    const addClass = useClass((state) => state.addClass);

    const roll = () => {
        addClass(false);
    }

    const LinkOffer = () =>{
        // navigate(`/Offering/${store[0].ID}`);

    }

    const ListPage = () =>{
        if(!!store[0]){
            console.log(store);
            return(store.map(prop =>(
            <Link to={`/Offering/${prop.ID}`} state={prop}><h3>{prop.Header}</h3></Link>
            // <button onClick={LinkOffer}><h2>{prop.Header}</h2></button>
           )))
        } else
        return(<p>Здесь будут показаны ваши предложения.</p>)
    }

    const ListEditPage = () => {
        if(!!store[0]){
            console.log(store);
            return(store.map(prop =>(
            <Link to={`/Offering/${prop.ID}`} state={prop}><h3>{prop.Header}</h3></Link>
            // <button onClick={LinkOffer}><h2>{prop.Header}</h2></button>
           )))
        } else
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