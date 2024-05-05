import React, { useEffect } from "react";
import axios from 'axios';
import { useStoreDB } from "../../Store/store";
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

    return(
        <div>
        <h2>Здесь вы можете выбрать мастера!</h2>
        {store.map(store =>{
          return(
            <p>{store.FirstName}</p>
        )})}
        </div>
    )
}

export default Masters;