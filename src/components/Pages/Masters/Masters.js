import React, { useEffect } from "react";
import axios from 'axios';
import { useStoreDB } from "../../Store/store";
import Card from "./components/card";
import './components/Masters.css'

function Masters() {
    const store = useStoreDB((state) => state.data)
    const addData = useStoreDB((state) => state.addData)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/data');
            addData(response.data)
            
          } catch (error) {
            console.error('Ошибка получения данных:', error);
          }
        };
    
        fetchData();
      }, []);

      console.log(store)
    return(
        <div className="CustomTextMasters">
          <h2>Здесь вы можете выбрать мастера!</h2>
          {store.map(store =>{
            return(
              <Card store={store}/>
          )})}
        </div>
    )
}

export default Masters;