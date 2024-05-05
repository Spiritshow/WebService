import React, { useEffect } from "react";
import axios from 'axios';
import { useStoreDB } from "../../Store/store";
const Offering = () =>{
    // const store = useStoreDB((state) => state.date)
    // const addData = useStoreDB((state) => state.addData)

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get('http://localhost:3001/data');
    //         addData(response.data)
    //       } catch (error) {
    //         console.error('Ошибка получения данных:', error);
    //       }
    //     };
    
    //     fetchData();
    //   });

    //   console.log(store);

    return(
        <div>
        <h2>Здесь вы можете выбрать пердложения по работе!</h2>
        {/* {store.map(store =>(
            <p>{store.FirstName}</p>
        ))} */}
        </div>
    )
}

export default Offering;