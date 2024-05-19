import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from "./components/card";
import { useStoreDB } from "../../Store/store";
import "./Offering.css";

const Offering = () =>{
    const store = useStoreDB((state) => state.data)
    const addData = useStoreDB((state) => state.addData)
    const [posts, setPosts] = useState([]);
    const [pos, setPos] = useState('1')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/Offering');
            addData(response.data)
            setPosts(response.data)
          } catch (error) {
            console.error('Ошибка получения данных:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        if(pos === '1'){
          const ascendingFilms = [...store].sort((a, b) => a.TrustLevel - b.TrustLevel);
          setPosts(ascendingFilms);
        }else{
          const descendingFilms = [...store].sort((a, b) => b.TrustLevel - a.TrustLevel);

          setPosts(descendingFilms);
        }
      }, [pos]) //[pos, posts]

      const handleChange = (event) =>  {
        event.target.value === '1' ? setPos('1') : setPos('2')
      }

      const List = () =>{
        if(!!posts)
        return(posts.map(post =>(
          <Card store={post}/>)))
        else 
        return(<h4>Загрузка...</h4>)
      }

      console.log(posts)
    return(
        <div className="CustomTextMasters">
          <h2>Здесь вы можете выбрать работу вам по специальности!</h2>
          <div>
            <select onChange={handleChange}>
              <option value='1'>По возрастанию доверия</option>
              <option value='2'>По убыванию доверия</option>
            </select>
          </div>
          <List/>
          {/* {posts.map(post =>(
            <Card store={post}/>
          ))} */}
        </div>
    )
}

export default Offering;